"use client";

import { motion } from "framer-motion";
import { 
  Package, 
  MessageSquare, 
  SquarePen, 
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const stats = [
  {
    name: 'Total Products',
    value: '17',
    change: '+2',
    changeType: 'increase',
    icon: Package,
    color: 'bg-blue-100 text-blue-600',
    iconColor: 'text-blue-600',
    href: '/dashboard/products',
  },
  {
    name: 'Active Inquiries',
    value: '23',
    change: '+5',
    changeType: 'increase',
    icon: MessageSquare,
    color: 'bg-green-100 text-green-600',
    iconColor: 'text-green-600',
    href: '/dashboard/inquiries',
  },
  {
    name: 'Active Popups',
    value: '3',
    change: '0',
    changeType: 'neutral',
    icon: SquarePen,
    color: 'bg-purple-100 text-purple-600',
    iconColor: 'text-purple-600',
    href: '/dashboard/popups',
  },
  {
    name: 'Admin Users',
    value: '4',
    change: '+1',
    changeType: 'increase',
    icon: Users,
    color: 'bg-orange-100 text-orange-600',
    iconColor: 'text-orange-600',
    href: '/dashboard/settings/users',
  },
]

const recentActivity = [
  { id: 1, type: 'inquiry', title: 'New inquiry: Passenger Elevator', meta: 'John Smith - 2 min ago', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: 2, type: 'product', title: 'Product updated: Home Elevators', meta: 'Sarah Chen - 15 min ago', color: 'text-green-600', bgColor: 'bg-green-100' },
  { id: 3, type: 'popup', title: 'Popup scheduled: Summer Sale', meta: 'Auto - in 2 hours', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { id: 4, type: 'inquiry', title: 'Inquiry replied: Hospital Bed Elevator', meta: 'Mike Johnson - 1 hour ago', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: 5, type: 'system', title: 'Backup completed', meta: 'System - 3 hours ago', color: 'text-slate-600', bgColor: 'bg-slate-100' },
]

const quickActions = [
  { name: 'Add Product', href: '/dashboard/products/new', icon: Package, color: 'bg-blue-100 text-blue-600' },
  { name: 'Create Popup', href: '/dashboard/popups/new', icon: SquarePen, color: 'bg-purple-100 text-purple-600' },
  { name: 'View Inquiries', href: '/dashboard/inquiries', icon: MessageSquare, color: 'bg-green-100 text-green-600' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Dashboard</h1>
            <p className="text-slate-500 mt-1">Overview of your Fuji Fenix admin portal</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                      <p className="text-3xl font-bold text-[#0f172a] mt-1">{stat.value}</p>
                    </div>
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.color)}>
                      <stat.icon className={cn('w-6 h-6', stat.iconColor)} />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Badge variant={stat.changeType === 'increase' ? 'success' : stat.changeType === 'decrease' ? 'danger' : 'neutral'}>
                      {stat.changeType === 'increase' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : stat.changeType === 'decrease' ? <ArrowDownRight className="w-3 h-3 mr-1" /> : null}
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

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <a href="/dashboard/activity" className="text-sm text-[#0047BB] hover:text-[#003A94]">View all</a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                    className="px-6 py-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                       <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', activity.bgColor)}>
                        {activity.type === 'inquiry' && <MessageSquare className="w-5 h-5" />}
                        {activity.type === 'product' && <Package className="w-5 h-5" />}
                        {activity.type === 'popup' && <SquarePen className="w-5 h-5" />}
                        {activity.type === 'system' && <Shield className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0f172a] truncate">{activity.title}</p>
                        <p className="text-xs text-slate-400 truncate">{activity.meta}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-2">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={action.name}
                    href={action.href}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200',
                      'bg-white border-slate-200 hover:border-[#0047BB] hover:bg-blue-50/50'
                    )}
                  >
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', action.color)}>
                      <action.icon className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-medium text-[#0f172a] text-center">{action.name}</span>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}