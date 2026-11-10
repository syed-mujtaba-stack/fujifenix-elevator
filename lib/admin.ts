import { randomUUID } from 'crypto'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { ROLE_LABELS, ROLE_ORDER, ROLES, type AdminRole } from '@/lib/roles'

export { ROLE_LABELS, ROLE_ORDER, ROLES }
export type { AdminRole } from '@/lib/roles'

/* ─────────────────────────────────────────────────────────────────────────
   Roles & Permissions (Phase A — Admin Privacy & Security)
   ───────────────────────────────────────────────────────────────────────── */

export type AdminRoleType = AdminRole

export type Permission =
  | 'products.read'
  | 'products.write'
  | 'inquiries.read' // includes PII
  | 'inquiries.aggregate' // counts/sources only, no PII
  | 'inquiries.write'
  | 'popups.read'
  | 'popups.write'
  | 'analytics.read'
  | 'users.read'
  | 'users.write'
  | 'sessions.read'
  | 'sessions.write'
  | 'audit.read'
  | 'settings.write'

const PERMISSIONS: Record<AdminRole, Record<Permission, boolean>> = {
  viewer: {
    'products.read': true,
    'products.write': false,
    'inquiries.read': false, // NO PII for viewers
    'inquiries.aggregate': true,
    'inquiries.write': false,
    'popups.read': true,
    'popups.write': false,
    'analytics.read': true,
    'users.read': false,
    'users.write': false,
    'sessions.read': false,
    'sessions.write': false,
    'audit.read': false,
    'settings.write': false,
  },
  editor: {
    'products.read': true,
    'products.write': true,
    'inquiries.read': false,
    'inquiries.aggregate': true,
    'inquiries.write': false,
    'popups.read': true,
    'popups.write': false,
    'analytics.read': true,
    'users.read': false,
    'users.write': false,
    'sessions.read': false,
    'sessions.write': false,
    'audit.read': false,
    'settings.write': true, // own profile / password / prefs only
  },
  admin: {
    'products.read': true,
    'products.write': true,
    'inquiries.read': true,
    'inquiries.aggregate': true,
    'inquiries.write': true,
    'popups.read': true,
    'popups.write': true,
    'analytics.read': true,
    'users.read': false,
    'users.write': false,
    'sessions.read': true, // own sessions
    'sessions.write': true, // revoke own sessions
    'audit.read': false,
    'settings.write': true,
  },
  superadmin: {
    'products.read': true,
    'products.write': true,
    'inquiries.read': true,
    'inquiries.aggregate': true,
    'inquiries.write': true,
    'popups.read': true,
    'popups.write': true,
    'analytics.read': true,
    'users.read': true,
    'users.write': true,
    'sessions.read': true, // all sessions
    'sessions.write': true, // revoke any session
    'audit.read': true,
    'settings.write': true,
  },
}

export function hasPermission(role: AdminRole | undefined | null, permission: Permission): boolean {
  if (!role) return false
  return PERMISSIONS[role]?.[permission] ?? false
}

/** Verify the calling admin is authenticated and allowed the given permission. */
export async function requirePermission(permission: Permission) {
  const session = await auth()
  if (!session?.user?.id || !session.user.role) {
    throw new Error('AUTH_REQUIRED')
  }
  const role = session.user.role as AdminRole
  if (!hasPermission(role, permission)) {
    throw new Error('FORBIDDEN')
  }
  return { userId: session.user.id as string, role, sessionId: (session as any).user.sessionId as string | undefined }
}

/* ─────────────────────────────────────────────────────────────────────────
   Request metadata (IP / UA / device) for audit + new-device detection
   ───────────────────────────────────────────────────────────────────────── */

export async function getRequestMeta() {
  const h = await headers()
  const userAgent = h.get('user-agent') ?? ''
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    h.get('cf-connecting-ip') ||
    'unknown'
  return { userAgent, ip, device: summarizeDevice(userAgent) }
}

export function summarizeDevice(ua: string): string {
  let os = 'Unknown OS'
  if (/windows/i.test(ua)) os = 'Windows'
  else if (/mac os|macintosh/i.test(ua)) os = 'macOS'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/iphone|ipad|ios/i.test(ua)) os = 'iOS'
  else if (/linux/i.test(ua)) os = 'Linux'
  let browser = 'Browser'
  if (/edg\//i.test(ua)) browser = 'Edge'
  else if (/chrome/i.test(ua)) browser = 'Chrome'
  else if (/firefox/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua)) browser = 'Safari'
  else if (/opera|opr\//i.test(ua)) browser = 'Opera'
  return `${browser} on ${os}`
}

/* ─────────────────────────────────────────────────────────────────────────
   Audit log (append-only by policy — no update/delete endpoints exist)
   ───────────────────────────────────────────────────────────────────────── */

export async function logAudit(input: {
  action: string
  entityType: string
  entityId?: string | null
  metadata?: Record<string, unknown> | null
  actorId?: string | null
  sessionId?: string | null
  ipAddress?: string | null
  userAgent?: string | null
}) {
  let req: Awaited<ReturnType<typeof getRequestMeta>> | null = null
  try {
    req = await getRequestMeta()
  } catch {
    /* not available in every runtime */
  }
  try {
    await adminClient.create({
      _type: 'auditLog',
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? undefined,
      adminUser: input.actorId ? { _ref: input.actorId } : undefined,
      sessionId: input.sessionId ?? undefined,
      metadata: input.metadata ? JSON.stringify(input.metadata) : undefined,
      ipAddress: input.ipAddress ?? req?.ip ?? undefined,
      userAgent: input.userAgent ?? req?.userAgent ?? undefined,
      createdAt: new Date().toISOString(),
    })
  } catch (err) {
    // Audit failure must never crash the caller, but surface it in logs.
    console.error('[audit] failed to write:', err)
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   Sessions (remote revoke, list own/all)
   ───────────────────────────────────────────────────────────────────────── */

export interface AdminSessionInfo {
  _id: string
  sessionId: string
  createdAt: string | null
  lastSeenAt: string | null
  expiresAt: string | null
  ipAddress?: string | null
  device?: string | null
  isRevoked: boolean
  revokedAt: string | null
  isCurrent?: boolean
}

export async function createSession(input: {
  userId: string
  expiresInMs: number
  ipAddress?: string
  userAgent?: string
  device?: string
}) {
  const sessionId = randomUUID()
  const now = new Date().toISOString()
  await adminClient.create({
    _type: 'adminSession',
    sessionId,
    user: { _ref: input.userId },
    createdAt: now,
    lastSeenAt: now,
    expiresAt: new Date(Date.now() + input.expiresInMs).toISOString(),
    ipAddress: input.ipAddress ?? undefined,
    userAgent: input.userAgent ?? undefined,
    device: input.device ?? undefined,
    isRevoked: false,
  })
  // Garbage-collect this user's expired/old sessions (keeps data minimal).
  await adminClient.delete({ query: `*[_type == "adminSession" && user._ref == $userId && (isRevoked == true || expiresAt < $now)][0...50]`, params: { userId: input.userId, now } }).catch(() => undefined)
  return sessionId
}

export async function touchSession(sessionId: string) {
  await adminClient
    .patch({ query: `*[_type == "adminSession" && sessionId == $sessionId][0]`, params: { sessionId } })
    .set({ lastSeenAt: new Date().toISOString() })
    .commit()
    .catch(() => undefined)
}

export async function isSessionValid(sessionId: string | undefined): Promise<boolean> {
  if (!sessionId) return false
  const doc = await adminClient.fetch<{ _id: string; isRevoked: boolean; expiresAt: string | null } | null>(
    `*[_type == "adminSession" && sessionId == $sessionId][0] { _id, isRevoked, expiresAt }`,
    { sessionId }
  )
  if (!doc) return false
  if (doc.isRevoked) return false
  if (doc.expiresAt && new Date(doc.expiresAt).getTime() < Date.now()) return false
  return true
}

export async function revokeSession(sessionIdToRevoke: string, actorId: string, actorSessionId?: string) {
  await adminClient
    .patch({ query: `*[_type == "adminSession" && sessionId == $sessionId][0]`, params: { sessionId: sessionIdToRevoke } })
    .set({ isRevoked: true, revokedAt: new Date().toISOString(), revokedBy: { _ref: actorId } })
    .commit()
  await logAudit({
    action: 'session_revoke',
    entityType: 'adminSession',
    entityId: sessionIdToRevoke,
    actorId,
    sessionId: actorSessionId,
    metadata: { revokedSessionId: sessionIdToRevoke },
  })
}

export async function revokeAllSessions(userId: string, actorId: string, actorSessionId?: string, exceptSessionId?: string) {
  // Mark revoked (including any other sessions of this user), keep the current
  // one alive when exceptSessionId is given.
  if (exceptSessionId) {
    await adminClient
      .patch({ query: `*[_type == "adminSession" && user._ref == $userId && sessionId != $sessionId]`, params: { userId, sessionId: exceptSessionId } })
      .set({ isRevoked: true, revokedAt: new Date().toISOString(), revokedBy: { _ref: actorId } })
      .commit()
  } else {
    await adminClient
      .patch({ query: `*[_type == "adminSession" && user._ref == $userId]`, params: { userId } })
      .set({ isRevoked: true, revokedAt: new Date().toISOString(), revokedBy: { _ref: actorId } })
      .commit()
  }
  await logAudit({
    action: 'session_revoke_all',
    entityType: 'adminSession',
    entityId: userId,
    actorId,
    sessionId: actorSessionId,
    metadata: { userId, keptCurrent: !!exceptSessionId },
  })
}

export async function listSessions(userId: string, currentSessionId?: string): Promise<AdminSessionInfo[]> {
  const docs = await adminClient.fetch<AdminSessionInfo[]>(
    `*[_type == "adminSession" && user._ref == $userId] | order(_createdAt desc) [0...100] {
      _id,
      sessionId,
      createdAt,
      lastSeenAt,
      expiresAt,
      ipAddress,
      device,
      isRevoked,
      revokedAt
    }`,
    { userId }
  )
  return docs.map((d) => ({ ...d, isCurrent: d.sessionId === currentSessionId }))
}

/* ─────────────────────────────────────────────────────────────────────────
   Login hardening (rate limit + lockout) — persisted on the user document
   ───────────────────────────────────────────────────────────────────────── */

const MAX_FAILED = 5
const LOCKOUT_MS = 30 * 60 * 1000 // 30 min

export async function recordLoginFailure(userId: string) {
  const user = await adminClient.fetch<{ failedLoginAttempts: number } | null>(
    `*[_type == "adminUser" && _id == $id][0] { failedLoginAttempts }`,
    { id: userId }
  )
  const attempts = (user?.failedLoginAttempts ?? 0) + 1
  const lockoutUntil = attempts >= MAX_FAILED ? new Date(Date.now() + LOCKOUT_MS).toISOString() : undefined
  await adminClient
    .patch(userId)
    .set({ failedLoginAttempts: attempts, lockoutUntil: lockoutUntil ?? undefined })
    .commit()
  return { attempts, lockoutUntil }
}

export async function resetLoginFailures(userId: string) {
  await adminClient
    .patch(userId)
    .set({ failedLoginAttempts: 0 })
    .unset(['lockoutUntil'])
    .commit()
}

export async function isAccountLocked(userId: string): Promise<{ locked: boolean; retryAfterMs?: number }> {
  const user = await adminClient.fetch<{ lockoutUntil: string | null } | null>(
    `*[_type == "adminUser" && _id == $id][0] { lockoutUntil }`,
    { id: userId }
  )
  if (!user?.lockoutUntil) return { locked: false }
  const until = new Date(user.lockoutUntil).getTime()
  if (until > Date.now()) return { locked: true, retryAfterMs: until - Date.now() }
  return { locked: false }
}

/** Strong-password policy shared by login-related flows. */
export const PASSWORD_POLICY = {
  minLength: 12,
  requireUpper: true,
  requireLower: true,
  requireNumber: true,
  requireSpecial: true,
  maxLength: 128,
}

export function passwordIssues(password: string): string[] {
  const issues: string[] = []
  if (password.length < PASSWORD_POLICY.minLength) issues.push(`At least ${PASSWORD_POLICY.minLength} characters`)
  if (PASSWORD_POLICY.requireUpper && !/[A-Z]/.test(password)) issues.push('One uppercase letter')
  if (PASSWORD_POLICY.requireLower && !/[a-z]/.test(password)) issues.push('One lowercase letter')
  if (PASSWORD_POLICY.requireNumber && !/[0-9]/.test(password)) issues.push('One number')
  if (PASSWORD_POLICY.requireSpecial && !/[^A-Za-z0-9]/.test(password)) issues.push('One special character')
  return issues
}