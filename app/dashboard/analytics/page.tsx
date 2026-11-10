import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminStatsQuery, adminPopupsListQuery } from '@/lib/admin-queries'
import AnalyticsClient, { type AnalyticsData } from './AnalyticsClient'

export default async function AnalyticsPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'analytics.read')) redirect('/dashboard')

  const now = Date.now()
  const since30 = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString()
  const since90 = new Date(now - 90 * 24 * 60 * 60 * 1000).toISOString()

  const [stats, inquiriesRaw, popupsRaw, auditRaw] = await Promise.all([
    adminClient.fetch<any>(adminStatsQuery),
    adminClient.fetch<Array<{ status: string | null; source: string | null; _createdAt: string }>>(
      `*[_type == "inquiry"] { status, source, _createdAt }`
    ),
    adminClient.fetch<any[]>(adminPopupsListQuery),
    adminClient.fetch<Array<{ action: string; _createdAt: string }>>(
      `*[_type == "auditLog" && _createdAt >= $since][0...500] { action, _createdAt }`,
      { since: since90 }
    ),
  ])

  // Bucket inquiries per day (30 days)
  const trend: AnalyticsData['trend'] = []
  for (let i = 29; i >= 0; i--) {
    const key = new Date(now - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    trend.push({ date: key, count: inquiriesRaw.filter((r) => r._createdAt.slice(0, 10) === key).length })
  }

  const byStatus = (["new", "reading", "replied", "closed"] as const).map((s) => ({
    name: s,
    value: inquiriesRaw.filter((r) => (r.status ?? 'new') === s).length,
  }))
  const bySource = (["contact", "cta", "popup"] as const).map((s) => ({
    name: s,
    value: inquiriesRaw.filter((r) => (r.source ?? 'contact') === s).length,
  }))

  const popupPerformance = popupsRaw.map((p) => ({
    title: p.title ?? 'Untitled',
    impressions: p.analytics?.impressions ?? 0,
    clicks: p.analytics?.clicks ?? 0,
    conversions: p.analytics?.conversions ?? 0,
    ctr: (p.analytics?.impressions ?? 0) > 0 ? Math.round((((p.analytics?.clicks ?? 0) / p.analytics.impressions) * 1000)) / 10 : 0,
  }))

  const activityCounts: Record<string, number> = {}
  for (const a of auditRaw) {
    activityCounts[a.action] = (activityCounts[a.action] ?? 0) + 1
  }

  const data: AnalyticsData = {
    stats,
    trend,
    byStatus,
    bySource,
    popupPerformance,
    activity: Object.entries(activityCounts)
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    totalInquiries30d: trend.reduce((a, b) => a + b.count, 0),
    since30,
  }

  return <AnalyticsClient data={data} />
}