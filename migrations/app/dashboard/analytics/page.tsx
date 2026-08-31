'use client'

import { useEffect, useState } from 'react'
import { Eye, Users, TrendingUp, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  todayViews: number
  todayVisitors: number
  topPages: Array<{ page: string; views: number }>
  topCountries: Array<{ country: string; count: number }>
  dailyViews: Array<{ date: string; views: number; visitors: number }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    todayVisitors: 0,
    topPages: [],
    topCountries: [],
    dailyViews: [],
  })
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('7d')

  useEffect(() => {
    fetch(`/api/analytics?type=detailed&period=${period}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [period])

  const statCards = [
    { label: 'Total Views', value: data.totalViews, icon: Eye, color: '#0047BB', change: '+12%' },
    { label: 'Unique Visitors', value: data.uniqueVisitors, icon: Users, color: '#16a34a', change: '+8%' },
    { label: 'Today Views', value: data.todayViews, icon: TrendingUp, color: '#8b5cf6', change: '+5%' },
    { label: 'Countries', value: data.topCountries.length, icon: Globe, color: '#f59e0b', change: '' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#0047BB] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Analytics</h1>
          <p className="text-sm text-[#64748b] mt-1">Website traffic and performance</p>
        </div>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                period === p
                  ? 'bg-[#0047BB] text-white'
                  : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-[#e2e8f0] rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">{card.label}</p>
                <p className="text-2xl font-bold text-[#0f172a] mt-1">{card.value.toLocaleString()}</p>
              </div>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon size={20} style={{ color: card.color }} />
              </div>
            </div>
            {card.change && (
              <div className="flex items-center gap-1 mt-2">
                {card.change.startsWith('+') ? (
                  <ArrowUpRight size={14} className="text-[#16a34a]" />
                ) : (
                  <ArrowDownRight size={14} className="text-[#dc2626]" />
                )}
                <span className={`text-xs font-medium ${card.change.startsWith('+') ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                  {card.change}
                </span>
                <span className="text-xs text-[#94a3b8]">vs last period</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="font-semibold text-[#0f172a]">Top Pages</h2>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {data.topPages.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-[#94a3b8]">
                No data yet. Analytics tracking will appear here once visitors arrive.
              </div>
            ) : (
              data.topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3">
                  <span className="text-sm text-[#0f172a] truncate max-w-[250px]">{page.page}</span>
                  <span className="text-sm font-medium text-[#64748b]">{page.views.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="font-semibold text-[#0f172a]">Top Countries</h2>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {data.topCountries.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-[#94a3b8]">
                No geographic data yet.
              </div>
            ) : (
              data.topCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3">
                  <span className="text-sm text-[#0f172a]">{country.country}</span>
                  <span className="text-sm font-medium text-[#64748b]">{country.count.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
        <h2 className="font-semibold text-[#0f172a] mb-4">Daily Views</h2>
        {data.dailyViews.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#94a3b8]">
            No daily data yet. Chart will populate as traffic is tracked.
          </div>
        ) : (
          <div className="flex items-end gap-1 h-48">
            {data.dailyViews.map((day, i) => {
              const maxViews = Math.max(...data.dailyViews.map(d => d.views), 1)
              const height = (day.views / maxViews) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-[#0047BB] rounded-t-sm transition-all hover:bg-[#003da0]"
                    style={{ height: `${height}%`, minHeight: day.views > 0 ? '4px' : '0' }}
                    title={`${day.date}: ${day.views} views`}
                  />
                  {i % 7 === 0 && (
                    <span className="text-[9px] text-[#94a3b8]">{day.date.slice(5)}</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
