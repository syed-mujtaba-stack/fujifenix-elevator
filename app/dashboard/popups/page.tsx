import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminPopupsListQuery } from '@/lib/admin-queries'
import PopupsClient, { type PopupRow } from './PopupsClient'

export default async function PopupsPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'popups.read')) redirect('/dashboard')

  const popups = await adminClient.fetch<any[]>(adminPopupsListQuery)

  const rows: PopupRow[] = popups.map((p) => ({
    _id: p._id,
    title: p.title ?? 'Untitled',
    type: p.type ?? 'modal',
    trigger: p.trigger ?? 'onLoad',
    isActive: Boolean(p.isActive),
    priority: p.priority ?? 0,
    impressions: p.analytics?.impressions ?? 0,
    clicks: p.analytics?.clicks ?? 0,
    conversions: p.analytics?.conversions ?? 0,
    _updatedAt: p._updatedAt ?? null,
  }))

  return (
    <PopupsClient
      popups={rows}
      canWrite={hasPermission(role, 'popups.write')}
    />
  )
}