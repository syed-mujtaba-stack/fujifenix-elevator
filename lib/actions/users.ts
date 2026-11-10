'use server'

import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import { adminClient } from '@/sanity/lib/server'
import { requirePermission, logAudit, revokeAllSessions, type AdminRole } from '@/lib/admin'

export async function createUser(input: { name: string; email: string; role: AdminRole; tempPassword: string }) {
  const actor = await requirePermission('users.write')
  if (!input.name?.trim() || !input.email?.trim()) throw new Error('Name and email are required')
  if (input.tempPassword.length < 12) throw new Error('Temporary password must be at least 12 characters')
  if (!['superadmin', 'admin', 'editor', 'viewer'].includes(input.role)) throw new Error('Invalid role')

  const existing = await adminClient.fetch<{ _id: string } | null>(
    `*[_type == "adminUser" && email == $email][0] { _id }`,
    { email: input.email.toLowerCase().trim() }
  )
  if (existing) throw new Error('An admin user with this email already exists')

  // Only one superadmin allowed.
  if (input.role === 'superadmin') {
    const superadmins = await adminClient.fetch<number>(`count(*[_type == "adminUser" && role == "superadmin"])`)
    if (superadmins > 0) throw new Error('A superadmin already exists. Promote an existing user instead.')
  }

  const passwordHash = await bcrypt.hash(input.tempPassword, 12)
  const doc = await adminClient.create({
    _type: 'adminUser',
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    role: input.role,
    passwordHash,
    isActive: true,
    mustChangePassword: true,
    twoFactorEnabled: false,
    failedLoginAttempts: 0,
    createdAt: new Date().toISOString(),
  })
  await logAudit({
    action: 'user_create',
    entityType: 'adminUser',
    entityId: doc._id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { email: input.email, role: input.role, tempPasswordIssued: true },
  })
  revalidatePath('/dashboard/settings/users')
  return { ok: true, id: doc._id, tempPassword: input.tempPassword }
}

/** Generate a strong random temporary password (used by "reset password" flows). */
export async function generateTempPassword() {
  await requirePermission('users.write')
  return randomBytes(12).toString('base64url').slice(0, 18)
}

export async function updateUser(id: string, input: { name?: string; role?: AdminRole; isActive?: boolean }) {
  const actor = await requirePermission('users.write')
  if (actor.userId === id && (input.role !== undefined && input.role !== 'superadmin')) {
    throw new Error('You cannot demote yourself')
  }
  if (actor.userId === id && input.isActive === false) {
    throw new Error('You cannot deactivate your own account')
  }
  const target = await adminClient.fetch<{ _id: string; role: string } | null>(
    `*[_type == "adminUser" && _id == $id][0] { _id, role }`,
    { id }
  )
  if (!target) throw new Error('User not found')

  // Only one superadmin allowed.
  if (input.role === 'superadmin' && target.role !== 'superadmin') {
    const superadmins = await adminClient.fetch<number>(`count(*[_type == "adminUser" && role == "superadmin"])`)
    if (superadmins > 0) throw new Error('A superadmin already exists.')
  }

  const patch: Record<string, unknown> = {}
  if (input.name?.trim()) patch.name = input.name.trim()
  if (input.isActive !== undefined) patch.isActive = input.isActive
  if (input.role !== undefined && input.role !== target.role) {
    patch.role = input.role
    await logAudit({
      action: 'role_change',
      entityType: 'adminUser',
      entityId: id,
      actorId: actor.userId,
      sessionId: actor.sessionId,
      metadata: { from: target.role, to: input.role },
    })
  }
  await adminClient.patch(id).set(patch).commit()
  await logAudit({
    action: 'user_update',
    entityType: 'adminUser',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { ...patch, deactivated: input.isActive === false },
  })
  // Deactivating a user kills all their sessions immediately.
  if (input.isActive === false) {
    await revokeAllSessions(id, actor.userId, actor.sessionId)
  }
  revalidatePath('/dashboard/settings/users')
  return { ok: true }
}

export async function resetUserPassword(id: string, newPassword: string) {
  const actor = await requirePermission('users.write')
  if (newPassword.length < 12) throw new Error('New password must be at least 12 characters')
  if (actor.userId === id) throw new Error('Use "Change password" on your own account instead')
  const passwordHash = await bcrypt.hash(newPassword, 12)
  await adminClient
    .patch(id)
    .set({ passwordHash, mustChangePassword: true, passwordChangedAt: new Date().toISOString(), failedLoginAttempts: 0, lockoutUntil: undefined as unknown as string })
    .unset(['lockoutUntil'])
    .commit()
  await logAudit({
    action: 'password_change',
    entityType: 'adminUser',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { resetBySuperadmin: true },
  })
  await revokeAllSessions(id, actor.userId, actor.sessionId)
  revalidatePath('/dashboard/settings/users')
  return { ok: true }
}