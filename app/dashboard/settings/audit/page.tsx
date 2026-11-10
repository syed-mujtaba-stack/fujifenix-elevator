import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminAuditQuery } from '@/lib/admin-queries'
import AuditClient, { type AuditRow } from './AuditClient'

export default async function AuditPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'audit.read')) redirect('/dashboard')

  const raw = await adminClient.fetch<any[]>(adminAuditQuery)

  const rows: AuditRow[] = raw.map((a) => ({
    _id: a._id,
    action: a.action ?? 'unknown',
    entityType: a.entityType ?? '—',
    entityId: a.entityId ?? null,
    actor: a.actor ?? 'System',
    sessionId: a.sessionId ?? null,
    metadata: a.metadata ?? null,
    ipAddress: a.ipAddress ?? null,
    userAgent: a.userAgent ?? null,
    createdAt: a.createdAt ?? a._createdAt ?? null,
  }))

  return <AuditClient rows={rows} />
}