import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminSessionsQuery } from '@/lib/admin-queries'
import SessionsClient, { type SessionRow } from './SessionsClient'

export default async function SessionsPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'sessions.read')) redirect('/dashboard')

  const currentSessionId = (session!.user as any).sessionId as string | undefined
  const raw = await adminClient.fetch<any[]>(adminSessionsQuery)
  const isSuperAdmin = role === 'superadmin'

  // Admins only see their own sessions; superadmins see every session.
  const visible = isSuperAdmin ? raw : raw.filter((s) => s.user?._id === session!.user.id)

  const rows: SessionRow[] = visible.map((s) => ({
    _id: s._id,
    sessionId: s.sessionId ?? '',
    user: s.user ?? null,
    createdAt: s.createdAt ?? null,
    lastSeenAt: s.lastSeenAt ?? null,
    expiresAt: s.expiresAt ?? null,
    ipAddress: s.ipAddress ?? null,
    device: s.device ?? null,
    isRevoked: Boolean(s.isRevoked),
    revokedAt: s.revokedAt ?? null,
    isCurrent: s.sessionId === currentSessionId,
  }))

  return <SessionsClient rows={rows} isSuperAdmin={isSuperAdmin} currentSessionId={currentSessionId ?? null} />
}