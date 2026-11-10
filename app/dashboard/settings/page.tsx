import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, listSessions, type AdminRole } from '@/lib/admin'
import { adminSettingsQuery } from '@/lib/admin-queries'
import { isPushConfigured } from '@/lib/push'
import SettingsClient, { type SettingsData } from './SettingsClient'

export default async function SettingsPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'settings.write') && role !== 'viewer') redirect('/dashboard')
  // Viewers can view their own settings read-only.
  const canWrite = hasPermission(role, 'settings.write')

  const [user, sessions] = await Promise.all([
    adminClient.fetch<any>(adminSettingsQuery, { id: session!.user.id }),
    listSessions(session!.user.id, (session!.user as any).sessionId),
  ])

  const data: SettingsData = {
    userId: session!.user.id,
    name: user?.name ?? session?.user?.name ?? '',
    email: session?.user?.email ?? user?.email ?? '',
    phone: user?.phone ?? null,
    role: role,
    preferences: user?.preferences ?? {},
    twoFactorEnabled: Boolean(user?.twoFactorEnabled),
    mustChangePassword: Boolean(user?.mustChangePassword),
    createdAt: user?.createdAt ?? null,
    lastLogin: user?.lastLogin ?? null,
    sessions: (sessions ?? []).map((s) => ({
      _id: s._id,
      sessionId: s.sessionId,
      createdAt: s.createdAt,
      lastSeenAt: s.lastSeenAt,
      expiresAt: s.expiresAt,
      ipAddress: s.ipAddress,
      device: s.device,
      isRevoked: s.isRevoked,
      isCurrent: Boolean(s.isCurrent),
    })),
    canWrite,
    pushConfigured: isPushConfigured(),
  }

  return <SettingsClient data={data} />
}