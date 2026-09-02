import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
  interface User {
    id: string
    role: string
    twoFactorEnabled: boolean
  }
  interface Session {
    user: {
      id: string
      role: string
      twoFactorEnabled: boolean
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
  }
}

const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const authorizeCallback = async (credentials: { email?: string; password?: string; twoFactorCode?: string } | undefined) => {
  if (!credentials?.email || !credentials?.password) {
    throw new Error('Email and password required')
  }

  const admin = await sanityWriteClient.fetch(
    `*[_type == "adminUser" && email == $email && isActive == true][0] {
      _id,
      email,
      name,
      role,
      passwordHash,
      twoFactorSecret,
    }`,
    { email: credentials.email }
  )

  if (!admin) {
    throw new Error('Invalid credentials')
  }

  const isValid = await bcrypt.compare(credentials.password as string, admin.passwordHash)
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  if (admin.twoFactorSecret) {
    if (!credentials.twoFactorCode) {
      throw new Error('2FA_REQUIRED')
    }
    const TOTP = (await import('otplib')).authenticator
    const isValid2FA = TOTP.check(credentials.twoFactorCode as string, admin.twoFactorSecret)
    if (!isValid2FA) {
      throw new Error('Invalid 2FA code')
    }
  }

  await sanityWriteClient.patch(admin._id).set({
    lastLogin: new Date().toISOString(),
  }).commit()

  return {
    id: admin._id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    twoFactorEnabled: !!admin.twoFactorSecret,
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
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
      }
      if (trigger === 'update' && session) {
        token.role = session.user?.role ?? token.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.twoFactorEnabled = token.twoFactorEnabled
      }
      return session
    },
  },
})