import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminStatsQuery, adminRecentActivityQuery } from '@/lib/admin-queries'
import DashboardClient from './DashboardClient'
import type { DashboardData } from './DashboardClient'

async function buildTrends(): Promise<DashboardData['trends']> {
  const since = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
  const raw = await adminClient.fetch<Array<{ _createdAt: string }>>(
    `*[_type == "inquiry" && _createdAt >= $since] { _createdAt }`,
    { since }
  )
  const days: DashboardData['trends'] = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().slice(0, 10)
    days.push({ date: key, count: raw.filter((r) => r._createdAt.slice(0, 10) === key).length })
  }
  return days
}

export default async function DashboardPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  const canReadInquiries = hasPermission(role, 'inquiries.read')
  const canWrite = hasPermission(role, 'products.write')
  const canWritePopups = hasPermission(role, 'popups.write')

  const [{ stats, recentActivity }] = await Promise.all([
    (async () => {
      const stats = await adminClient.fetch<any>(adminStatsQuery)
      const recentActivity = await adminClient.fetch<any[]>(adminRecentActivityQuery)
      return { stats, recentActivity }
    })(),
  ])

  const recentInquiries = canReadInquiries
    ? await adminClient.fetch<any[]>(
        `*[_type == "inquiry"] | order(_createdAt desc) [0...6] {
          _id, name, email, subject, status, _createdAt
        }`
      )
    : []

  const [trends] = await Promise.all([buildTrends()])

  const data: DashboardData = {
    stats,
    recentActivity,
    recentInquiries,
    trends,
    canReadInquiries,
    canWrite,
    canWritePopups,
    userName: session?.user?.name ?? null,
    role,
  }

  return <DashboardClient data={data} />
}