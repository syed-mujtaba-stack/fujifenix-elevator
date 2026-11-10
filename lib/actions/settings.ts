'use server'

import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { authenticator } from 'otplib'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { requirePermission, logAudit, revokeAllSessions, passwordIssues, getRequestMeta } from '@/lib/admin'
import { sendPushToUsers, isPushConfigured } from '@/lib/push'

/** Called by the client right before NextAuth signOut so logouts are audited. */
export async function auditLogout() {
  const session = await auth()
  if (!session?.user?.id) return { ok: true }
  let req: Awaited<ReturnType<typeof getRequestMeta>> | null = null
  try {
    req = await getRequestMeta()
  } catch {
    req = null
  }
  await logAudit({
    action: 'logout',
    entityType: 'auth',
    entityId: session.user.id,
    actorId: session.user.id,
    sessionId: session.user.sessionId,
    ipAddress: req?.ip,
    userAgent: req?.userAgent,
  })
  return { ok: true }
}

export async function updateProfile(input: { name: string; phone?: string | null }) {
  const actor = await requirePermission('settings.write')
  if (!input.name?.trim()) throw new Error('Name is required')
  await adminClient.patch(actor.userId).set({ name: input.name.trim(), phone: input.phone?.trim() || undefined }).commit()
  await logAudit({
    action: 'profile_update',
    entityType: 'adminUser',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
  })
  revalidatePath('/dashboard/settings')
  return { ok: true }
}

export async function changePassword(input: { currentPassword: string; newPassword: string }) {
  const actor = await requirePermission('settings.write')
  const user = await adminClient.fetch<{ passwordHash: string } | null>(
    `*[_type == "adminUser" && _id == $id][0] { passwordHash }`,
    { id: actor.userId }
  )
  if (!user) throw new Error('User not found')
  const valid = await bcrypt.compare(input.currentPassword, user.passwordHash)
  if (!valid) throw new Error('Current password is incorrect')

  const issues = passwordIssues(input.newPassword)
  if (issues.length > 0) throw new Error(`Password must include: ${issues.join(', ')}`)

  const passwordHash = await bcrypt.hash(input.newPassword, 12)
  await adminClient
    .patch(actor.userId)
    .set({ passwordHash, passwordChangedAt: new Date().toISOString(), mustChangePassword: false, failedLoginAttempts: 0 })
    .unset(['lockoutUntil'])
    .commit()
  await logAudit({
    action: 'password_change',
    entityType: 'adminUser',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { forcedLogout: true },
  })
  // Force logout of every other session (against session hijacking after a breach).
  await revokeAllSessions(actor.userId, actor.userId, actor.sessionId, actor.sessionId)
  return { ok: true }
}

/* ── 2FA (TOTP) setup / verify / disable ───────────────────────────── */

export async function setupTwoFactor() {
  const actor = await requirePermission('settings.write')
  const existing = await adminClient.fetch<{ twoFactorEnabled: boolean } | null>(
    `*[_type == "adminUser" && _id == $id][0] { twoFactorEnabled }`,
    { id: actor.userId }
  )
  if (existing?.twoFactorEnabled) throw new Error('Two-factor is already enabled')
  const secret = authenticator.generateSecret()
  await adminClient.patch(actor.userId).set({ twoFactorSecret: secret }).commit()
  const otpauthUrl = authenticator.keyuri(actor.userId, 'Fuji Fenix Admin', secret)
  return { ok: true, secret, otpauthUrl }
}

export async function verifyTwoFactor(code: string) {
  const actor = await requirePermission('settings.write')
  if (!code?.trim()) throw new Error('Code is required')
  const user = await adminClient.fetch<{ twoFactorSecret: string | null } | null>(
    `*[_type == "adminUser" && _id == $id][0] { twoFactorSecret }`,
    { id: actor.userId }
  )
  if (!user?.twoFactorSecret) throw new Error('2FA setup was not started')
  const isValid = authenticator.check(code.trim(), user.twoFactorSecret)
  if (!isValid) throw new Error('Invalid code')
  await adminClient.patch(actor.userId).set({ twoFactorEnabled: true }).commit()
  await logAudit({
    action: '2fa_setup',
    entityType: 'adminUser',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
  })
  revalidatePath('/dashboard/settings')
  return { ok: true }
}

export async function disableTwoFactor(code: string) {
  const actor = await requirePermission('settings.write')
  if (!code?.trim()) throw new Error('Code is required')
  const user = await adminClient.fetch<{ twoFactorSecret: string | null } | null>(
    `*[_type == "adminUser" && _id == $id][0] { twoFactorSecret }`,
    { id: actor.userId }
  )
  if (!user?.twoFactorSecret) throw new Error('2FA is not configured')
  const isValid = authenticator.check(code.trim(), user.twoFactorSecret)
  if (!isValid) throw new Error('Invalid code')
  await adminClient.patch(actor.userId).set({ twoFactorEnabled: false }).unset(['twoFactorSecret']).commit()
  await logAudit({
    action: '2fa_disable',
    entityType: 'adminUser',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
  })
  revalidatePath('/dashboard/settings')
  return { ok: true }
}

export async function updatePreferences(input: {
  timezone?: string
  language?: string
  theme?: 'light' | 'dark' | 'system'
  notifications?: { newInquiry?: boolean; inquiryReply?: boolean; popupAlerts?: boolean; systemAlerts?: boolean }
}) {
  const actor = await requirePermission('settings.write')
  const current = await adminClient.fetch<{ preferences?: Record<string, any> | null } | null>(
    `*[_type == "adminUser" && _id == $id][0] { preferences }`,
    { id: actor.userId }
  )
  await adminClient
    .patch(actor.userId)
    .set({ preferences: { ...(current?.preferences ?? {}), ...input } })
    .commit()
  await logAudit({
    action: 'settings_update',
    entityType: 'adminUser',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { updated: Object.keys(input) },
  })
  revalidatePath('/dashboard/settings')
  return { ok: true }
}

/* ── Session management (own sessions for all, all for superadmin) ── */

export async function revokeSessionAction(sessionId: string) {
  const actor = await requirePermission('sessions.write')
  const target = await adminClient.fetch<{ _id: string; user: { _ref: string } | null } | null>(
    `*[_type == "adminSession" && sessionId == $sessionId][0] { _id, user { _ref } }`,
    { sessionId }
  )
  if (!target) throw new Error('Session not found')
  if (actor.role !== 'superadmin' && target.user?._ref !== actor.userId) {
    throw new Error('FORBIDDEN')
  }
  if (target.user?._ref === actor.userId && sessionId === actor.sessionId) {
    throw new Error('Use "Sign out" to end your current session')
  }
  await adminClient.patch(target._id).set({ isRevoked: true, revokedAt: new Date().toISOString(), revokedBy: { _ref: actor.userId } }).commit()
  await logAudit({
    action: 'session_revoke',
    entityType: 'adminSession',
    entityId: sessionId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
  })
  revalidatePath('/dashboard/settings/sessions')
  return { ok: true }
}

export async function revokeAllMySessionsAction() {
  const actor = await requirePermission('sessions.write')
  await logAudit({
    action: 'session_revoke_all',
    entityType: 'adminSession',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
  })
  await adminClient
    .patch({ query: `*[_type == "adminSession" && user._ref == $userId && sessionId != $sessionId]`, params: { userId: actor.userId, sessionId: actor.sessionId } })
    .set({ isRevoked: true, revokedAt: new Date().toISOString(), revokedBy: { _ref: actor.userId } })
    .commit()
  revalidatePath('/dashboard/settings/sessions')
  return { ok: true }
}

/** Awaitable request metadata for server components that render audit pages. */
export async function serverRequestMeta() {
  return getRequestMeta()
}

/** Web Push (Phase D): verify the browser push pipe with a real notification. */
export async function sendTestPush() {
  const actor = await requirePermission('settings.write')
  if (!isPushConfigured()) {
    throw new Error('VAPID keys are not configured on the server (NEXT_PUBLIC_VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY)')
  }
  const result = await sendPushToUsers(
    [actor.userId],
    { title: 'Fuji Fenix Admin', body: 'Push notifications are working.', url: '/dashboard', tag: 'push-test' }
  )
  await logAudit({
    action: 'push_test',
    entityType: 'push',
    entityId: actor.userId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { sent: result.sent },
  })
  if (result.sent === 0) {
    throw new Error('Subscribed on another device? No active push subscription found for this browser.')
  }
  return { ok: true, sent: result.sent }
}