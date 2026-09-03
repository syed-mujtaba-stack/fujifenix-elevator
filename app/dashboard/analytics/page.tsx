"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const mockAnalytics = {
  products: { total: 17, published: 14, draft: 3, views: 45200, thisMonth: 5200 },
  inquiries: { total: 23, new: 5, reading: 8, replied: 7, closed: 3, thisMonth: 12 },
  popups: { total: 5, active: 2, impressions: 125000, clicks: 2100, conversions: 156, ctr: 1.68 },
  traffic: { totalVisits: 89400, uniqueVisitors: 34200, avgSession: '3m 42s', bounceRate: '42.3%' },
}

const trafficData = [
  { month: 'Jan', visits: 12400, unique: 4800 },
  { month: 'Feb', visits: 15200, unique: 5600 },
  { month: 'Mar', visits: 13800, unique: 5200 },
  { month: 'Apr', visits: 16500, unique: 6100 },
  { month: 'May', visits: 18900, unique: 6800 },
  { month: 'Jun', visits: 22400, unique: 7900 },
]

const productCategoryData = [
  { category: 'Elevators', count: 7, views: 28400 },
  { category: 'Escalators & Moving Walks', count: 3, views: 8900 },
  { category: 'Specialized Solutions', count: 5, views: 5600 },
  { category: 'Transportation', count: 2, views: 2300 },
]

const inquirySourceData = [
  { source: 'Contact Form', count: 12 },
  { source: 'Get a Quote', count: 8 },
  { source: 'Popup', count: 3 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Analytics</h1>
            <p className="text-slate-500 mt-1">Track performance across products, inquiries, and popups</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange} className="w-40">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Total Products', value: mockAnalytics.products.total, change: '+2', icon: Package, color: 'bg-blue-100 text-blue-600', href: '/dashboard/products' },
            { name: 'Active Inquiries', value: mockAnalytics.inquiries.total, change: '+5', icon: MessageSquare, color: 'bg-green-100 text-green-600', href: '/dashboard/inquiries' },
            { name: 'Popup Impressions', value: mockAnalytics.popups.impressions.toLocaleString(), change: '+12%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', href: '/dashboard/popups' },
            { name: 'Total Visits', value: mockAnalytics.traffic.totalVisits.toLocaleString(), change: '+8%', icon: Users, color: 'bg-orange-100 text-orange-600', href: '/dashboard/analytics' },
          ].map((stat, index) => (
            <motion.div key={stat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}>
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                      <p className="text-3xl font-bold text-[#0f172a] mt-1">{stat.value}</p>
                    </div>
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.color)}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color.replace('bg-', 'text-').replace('100', '600') }} />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Badge variant={stat.change.startsWith('+') ? 'success' : 'danger'}>
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      {stat.change} this month
                    </Badge>
                    <a href={stat.href} className="text-sm text-[#0047BB] hover:text-[#003A94] font-medium">
                      View details →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <div className="h-full flex items-end justify-center gap-4 px-2">
              {trafficData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div className="w-full flex-1 flex items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.visits / 25000) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className={cn(
                        'w-full rounded-t transition-all duration-300',
                        'bg-gradient-to-t from-[#0047BB] to-[#007bff]'
                      )}
                      style={{ minHeight: '8px' }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{data.month}</span>
                  <span className="text-xs text-slate-400">{data.visits.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Visits</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500" /> Unique</span>
            </div>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productCategoryData.map((cat, index) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', 
                      cat.category === 'Elevators' && 'bg-blue-100',
                      cat.category === 'Escalators & Moving Walks' && 'bg-green-100',
                      cat.category === 'Specialized Solutions' && 'bg-purple-100',
                      cat.category === 'Transportation' && 'bg-orange-100'
                    )}>
                      <Package className="w-5 h-5" style={{ color: 
                        cat.category === 'Elevators' ? '#2563eb' :
                        cat.category === 'Escalators & Moving Walks' ? '#16a34a' :
                        cat.category === 'Specialized Solutions' ? '#9333ea' : '#ea580c'
                      }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0f172a] truncate">{cat.category}</p>
                      <p className="text-xs text-slate-400">{cat.count} products</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#0f172a]">{cat.views.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">views</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Inquiry Sources & Popup Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Inquiry Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {inquirySourceData.map((src, index) => (
              <motion.div
                key={src.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center',
                    src.source === 'Contact Form' && 'bg-blue-100',
                    src.source === 'Get a Quote' && 'bg-green-100',
                    src.source === 'Popup' && 'bg-purple-100'
                  )}>
                    <MessageSquare className="w-5 h-5" style={{ color: 
                      src.source === 'Contact Form' ? '#2563eb' :
                      src.source === 'Get a Quote' ? '#16a34a' : '#9333ea'
                    }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">{src.source}</p>
                    <p className="text-xs text-slate-400">{src.count} inquiries</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#0f172a]">{src.count}</p>
                  <p className="text-xs text-slate-400">{(src.count / mockAnalytics.inquiries.total * 100).toFixed(1)}%</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Popup Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className={cn('text-center p-4 rounded-lg', 'bg-blue-50')}>
                <p className="text-2xl font-bold text-blue-600">{mockAnalytics.popups.impressions.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Impressions</p>
              </div>
              <div className={cn('text-center p-4 rounded-lg', 'bg-green-50')}>
                <p className="text-2xl font-bold text-green-600">{mockAnalytics.popups.clicks.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Clicks</p>
              </div>
              <div className={cn('text-center p-4 rounded-lg', 'bg-purple-50')}>
                <p className="text-2xl font-bold text-purple-600">{mockAnalytics.popups.conversions}</p>
                <p className="text-sm text-slate-500">Conversions</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0047BB]">{mockAnalytics.popups.ctr}%</p>
                <p className="text-sm text-slate-500">CTR</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{mockAnalytics.popups.active}</p>
                <p className="text-sm text-slate-500">Active Popups</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{mockAnalytics.popups.total}</p>
                <p className="text-sm text-slate-500">Total Popups</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Metrics Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Key Metrics Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Avg. Session Duration', value: mockAnalytics.traffic.avgSession, icon: Clock },
                { label: 'Bounce Rate', value: mockAnalytics.traffic.bounceRate, icon: TrendingUp },
                { label: 'Unique Visitors', value: mockAnalytics.traffic.uniqueVisitors.toLocaleString(), icon: Users },
                { label: 'Conversion Rate', value: `${((mockAnalytics.popups.conversions / mockAnalytics.popups.clicks) * 100).toFixed(1)}%`, icon: TrendingUp },
              ].map((metric, index) => (
                <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }} className="text-center p-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <metric.icon className="w-6 h-6 text-slate-500" />
                  </div>
                  <p className="text-2xl font-bold text-[#0f172a]">{metric.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}