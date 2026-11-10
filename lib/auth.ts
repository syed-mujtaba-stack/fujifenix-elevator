import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { adminClient } from '@/sanity/lib/server'
import { getRequestMeta, createSession, logAudit, isAccountLocked, recordLoginFailure, resetLoginFailures } from '@/lib/admin'

declare module 'next-auth' {
  interface User {
    id: string
    role: string
    twoFactorEnabled: boolean
    sessionId?: string
    mustChangePassword?: boolean
  }
  interface Session {
    user: {
      id: string
      role: string
      twoFactorEnabled: boolean
      sessionId?: string
      mustChangePassword?: boolean
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    role: string
    twoFactorEnabled: boolean
    sessionId: string
    mustChangePassword?: boolean
  }
}

const SESSION_JWT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000 // session doc lifetime (matches jwt.maxAge)

const authorizeCallback = async (credentials: { email?: string; password?: string; twoFactorCode?: string } | undefined) => {
  if (!credentials?.email || !credentials?.password) {
    throw new Error('Email and password required')
  }

  const reqMeta = await (async () => {
    try {
      return await getRequestMeta()
    } catch {
      return { userAgent: '', ip: 'unknown', device: 'Unknown' }
    }
  })()

  const admin = await adminClient.fetch<{
    _id: string
    email: string
    name: string | null
    role: string
    passwordHash: string
    twoFactorSecret: string | null
    twoFactorEnabled: boolean
    mustChangePassword: boolean
    failedLoginAttempts: number
    isActive: boolean
  } | null>(
    `*[_type == "adminUser" && email == $email][0] {
      _id, email, name, role, passwordHash, twoFactorSecret, twoFactorEnabled,
      mustChangePassword, failedLoginAttempts, isActive
    }`,
    { email: credentials.email.toLowerCase().trim() }
  )

  // Generic error — do not reveal whether the account exists.
  const invalid = async () => {
    if (admin) {
      const { attempts } = await recordLoginFailure(admin._id).catch(() => ({ attempts: 0 }))
      logAudit({
        action: 'login_failed',
        entityType: 'auth',
        entityId: admin._id,
        actorId: admin._id,
        ipAddress: reqMeta.ip,
        userAgent: reqMeta.userAgent,
        metadata: { email: admin.email, attempts },
      })
    }
    return null
  }

  if (!admin || !admin.passwordHash || !admin.isActive) {
    return invalid()
  }

  const { locked, retryAfterMs } = await isAccountLocked(admin._id)
  if (locked) {
    const mins = Math.ceil((retryAfterMs ?? 0) / 60000)
    throw new Error(`Too many failed attempts. Account locked, retry in ~${mins} min.`)
  }

  const isValid = await bcrypt.compare(credentials.password, admin.passwordHash)
  if (!isValid) {
    return invalid()
  }

  // 2FA (TOTP via otplib)
  if (admin.twoFactorEnabled && admin.twoFactorSecret) {
    if (!credentials.twoFactorCode) {
      throw new Error('2FA_REQUIRED')
    }
    const TOTP = (await import('otplib')).authenticator
    const isValid2FA = TOTP.check(credentials.twoFactorCode as string, admin.twoFactorSecret)
    if (!isValid2FA) {
      const InvalidCodeMsg = 'Invalid 2FA code'
      logAudit({
        action: 'login_failed',
        entityType: 'auth',
        entityId: admin._id,
        actorId: admin._id,
        ipAddress: reqMeta.ip,
        userAgent: reqMeta.userAgent,
        metadata: { reason: 'invalid 2FA', email: admin.email },
      })
      throw new Error(InvalidCodeMsg)
    }
  }

  // All checks passed — reset lockout state, record login + session.
  await resetLoginFailures(admin._id).catch(() => undefined)

  const sessionId = await createSession({
    userId: admin._id,
    expiresInMs: SESSION_JWT_MAX_AGE_MS,
    ipAddress: reqMeta.ip,
    userAgent: reqMeta.userAgent,
    device: reqMeta.device,
  })

  await adminClient
    .patch(admin._id)
    .set({
      lastLogin: new Date().toISOString(),
      lastLoginIp: reqMeta.ip,
      lastLoginDevice: reqMeta.device,
    })
    .commit()
    .catch(() => undefined)

  logAudit({
    action: 'login',
    entityType: 'auth',
    entityId: admin._id,
    actorId: admin._id,
    sessionId,
    ipAddress: reqMeta.ip,
    userAgent: reqMeta.userAgent,
    metadata: { email: admin.email, device: reqMeta.device },
  })

  return {
    id: admin._id,
    email: admin.email,
    name: admin.name ?? undefined,
    role: admin.role,
    twoFactorEnabled: admin.twoFactorEnabled,
    sessionId,
    mustChangePassword: admin.mustChangePassword,
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60, // session cookie max age (15 min of inactivity)
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // token up to 7 days
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        twoFactorCode: { label: '2FA Code', type: 'text' },
      },
      authorize: authorizeCallback as any,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.twoFactorEnabled = user.twoFactorEnabled
        token.sessionId = user.sessionId ?? ''
        token.mustChangePassword = user.mustChangePassword ?? false
      }
      if (trigger === 'update' && session) {
        token.role = session.user?.role ?? token.role
        token.twoFactorEnabled = session.user?.twoFactorEnabled ?? token.twoFactorEnabled
        token.mustChangePassword = session.user?.mustChangePassword ?? token.mustChangePassword
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.twoFactorEnabled = token.twoFactorEnabled
        session.user.sessionId = token.sessionId
        session.user.mustChangePassword = token.mustChangePassword
      }
      return session
    },
  },
})