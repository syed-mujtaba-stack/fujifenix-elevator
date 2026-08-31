'use client'

import { useEffect, useState } from 'react'
import { Package, MessageSquare, BarChart3, TrendingUp, Users, Eye } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalProducts: number
  totalInquiries: number
  newInquiries: number
  totalViews: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalViews: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState<Array<{
    _id: string
    name: string
    email: string
    subject: string
    status: string
    createdAt: string
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/analytics?type=stats').then(r => r.json()),
      fetch('/api/anquiries?limit=5').then(r => r.json()),
    ])
      .then(([statsData, inquiriesData]) => {
        setStats(statsData)
        setRecentInquiries(inquiriesData.inquiries || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: '#0047BB' },
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: '#16a34a' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: TrendingUp, color: '#f59e0b' },
    { label: 'Page Views', value: stats.totalViews, icon: Eye, color: '#8b5cf6' },
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
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-sm text-[#64748b] mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">{card.label}</p>
                <p className="text-2xl font-bold text-[#0f172a] mt-1">{card.value}</p>
              </div>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon size={20} style={{ color: card.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/products"
          className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:shadow-md transition-shadow group"
        >
          <Package size={24} className="text-[#0047BB] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-[#0f172a]">Manage Products</h3>
          <p className="text-sm text-[#64748b] mt-1">Edit, add, or remove products</p>
        </Link>
        <Link
          href="/dashboard/inquiries"
          className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:shadow-md transition-shadow group"
        >
          <MessageSquare size={24} className="text-[#16a34a] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-[#0f172a]">View Inquiries</h3>
          <p className="text-sm text-[#64748b] mt-1">Respond to customer inquiries</p>
        </Link>
        <Link
          href="/dashboard/analytics"
          className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:shadow-md transition-shadow group"
        >
          <BarChart3 size={24} className="text-[#8b5cf6] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-[#0f172a]">View Analytics</h3>
          <p className="text-sm text-[#64748b] mt-1">Traffic and conversion data</p>
        </Link>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
          <h2 className="font-semibold text-[#0f172a]">Recent Inquiries</h2>
          <Link href="/dashboard/inquiries" className="text-sm text-[#0047BB] hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-[#f1f5f9]">
          {recentInquiries.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-[#94a3b8]">
              No inquiries yet
            </div>
          ) : (
            recentInquiries.map((inquiry) => (
              <Link
                key={inquiry._id}
                href={`/dashboard/inquiries/${inquiry._id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f1f5f9] flex items-center justify-center text-sm font-bold text-[#64748b]">
                    {inquiry.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">{inquiry.name}</p>
                    <p className="text-xs text-[#94a3b8]">{inquiry.subject || inquiry.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      inquiry.status === 'new'
                        ? 'bg-[#fef3c7] text-[#92400e]'
                        : inquiry.status === 'replied'
                        ? 'bg-[#dcfce7] text-[#166534]'
                        : 'bg-[#f1f5f9] text-[#64748b]'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
