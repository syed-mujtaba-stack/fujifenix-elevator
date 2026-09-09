"use client";

import { motion } from "framer-motion";
import {
  Package,
  MessageSquare,
  Bell,
  Users,
  ArrowUpRight,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatItem {
  name: string;
  value: number;
  icon: "package" | "message" | "bell" | "users";
  color: string;
  iconColor: string;
  href: string;
}

interface ActivityItem {
  id: string;
  type: "inquiry" | "product" | "popup" | "system";
  title: string;
  meta: string;
  color: string;
  bgColor: string;
}

interface DashboardClientProps {
  stats: StatItem[];
  recentActivity: ActivityItem[];
}

const iconMap = {
  package: Package,
  message: MessageSquare,
  bell: Bell,
  users: Users,
};

const quickActions = [
  { name: "Add Product", href: "/dashboard/products/new", icon: Package, color: "bg-blue-100 text-blue-600" },
  { name: "Create Popup", href: "/dashboard/popups/new", icon: Bell, color: "bg-purple-100 text-purple-600" },
  { name: "View Inquiries", href: "/dashboard/inquiries", icon: MessageSquare, color: "bg-green-100 text-green-600" },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
];

export default function DashboardClient({ stats, recentActivity }: DashboardClientProps) {
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
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
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
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                        <Icon className={cn("w-6 h-6", stat.iconColor)} />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <a href={stat.href} className="text-sm text-[#0047BB] hover:text-[#003A94] font-medium flex items-center gap-1">
                        View details
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Inquiries</CardTitle>
                <a href="/dashboard/inquiries" className="text-sm text-[#0047BB] hover:text-[#003A94]">
                  View all
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentActivity.length === 0 ? (
                <div className="px-6 py-8 text-center text-slate-400 text-sm">No inquiries yet</div>
              ) : (
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
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", activity.bgColor)}>
                          {activity.type === "inquiry" && <MessageSquare className={cn("w-5 h-5", activity.color)} />}
                          {activity.type === "product" && <Package className={cn("w-5 h-5", activity.color)} />}
                          {activity.type === "popup" && <Bell className={cn("w-5 h-5", activity.color)} />}
                          {activity.type === "system" && <Shield className={cn("w-5 h-5", activity.color)} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0f172a] truncate">{activity.title}</p>
                          <p className="text-xs text-slate-400 truncate">{activity.meta}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
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
                      "flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200",
                      "bg-white border-slate-200 hover:border-[#0047BB] hover:bg-blue-50/50"
                    )}
                  >
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", action.color)}>
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
  );
}
