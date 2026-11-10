"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  Package,
  MessageSquare,
  SquarePen,
  Users,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { AdminRole } from "@/lib/admin";

export interface DashboardData {
  stats: {
    products: number;
    productsActive: number;
    inquiries: number;
    inquiriesNew: number;
    inquiriesOpen: number;
    popups: number;
    popupsActive: number;
    users: number;
  };
  recentActivity: Array<{
    _id: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    actor?: string | null;
    ipAddress?: string | null;
    createdAt?: string | null;
    metadata?: string | null;
  }>;
  recentInquiries: Array<{
    _id: string;
    name: string;
    email: string;
    subject: string | null;
    status: string;
    _createdAt: string;
  }>;
  trends: Array<{ date: string; count: number }>;
  canReadInquiries: boolean;
  canWrite: boolean;
  canWritePopups: boolean;
  userName: string | null;
  role: AdminRole;
}

const ACTIVITY_LABEL: Record<string, string> = {
  create: "created",
  update: "updated",
  delete: "deleted",
  login: "logged in",
  login_failed: "failed login attempt",
  logout: "logged out",
  password_change: "changed a password",
  "2fa_setup": "enabled 2FA",
  "2fa_disable": "disabled 2FA",
  session_revoke: "revoked a session",
  session_revoke_all: "revoked all sessions",
  role_change: "changed a role",
  user_create: "created a user",
  user_update: "updated a user",
  user_deactivate: "deactivated a user",
  export: "exported data",
  settings_update: "updated settings",
  profile_update: "updated profile",
};

const STATUS: Record<string, "new" | "reading" | "replied" | "closed"> = {
  new: "new",
  reading: "reading",
  replied: "replied",
  closed: "closed",
};

export default function DashboardClient({ data }: { data: DashboardData }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  const kpis: Array<{ label: string; value: number | string; sub: string; icon: any; tint: string; href: string }> = [
    {
      label: "Products",
      value: data.stats.products,
      sub: `${data.stats.productsActive} published`,
      icon: Package,
      tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      href: "/dashboard/products",
    },
    {
      label: "New Inquiries",
      value: data.stats.inquiriesNew,
      sub: `${data.stats.inquiriesOpen} open`,
      icon: MessageSquare,
      tint: "bg-green-500/10 text-green-600 dark:text-green-400",
      href: "/dashboard/inquiries?status=new",
    },
    {
      label: "Active Popups",
      value: data.stats.popupsActive,
      sub: `${data.stats.popups} total`,
      icon: SquarePen,
      tint: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      href: "/dashboard/popups",
    },
    {
      label: "Admin Users",
      value: data.stats.users,
      sub: "active accounts",
      icon: Users,
      tint: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      href: "/dashboard/settings/users",
    },
  ];

  const totalTrend = data.trends.reduce((a, b) => a + b.count, 0);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{today}</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {greeting}, {data.userName || "Admin"} 👋
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {totalTrend > 0
              ? `${totalTrend} inquiries in the last 14 days.`
              : "No inquiries in the last 14 days."}{" "}
            Here&apos;s what&apos;s happening on fujifenix.com.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.canWrite && (
            <Link href="/dashboard/products/new">
              <Button size="sm">
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </Link>
          )}
          {data.canWritePopups && (
            <Link href="/dashboard/popups/new">
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" /> Create Popup
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link href={kpi.href} key={kpi.label} className="group">
              <Card className="hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{kpi.value}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{kpi.sub}</p>
                    </div>
                    <span className={`grid place-items-center w-10 h-10 rounded-xl ${kpi.tint}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Trends + Recent inquiries */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Inquiries — last 14 days</CardTitle>
            <Badge variant="neutral">New leads</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trends} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
                  <defs>
                    <linearGradient id="inquiryFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0047BB" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0047BB" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(v) => format(new Date(v), "MMM d")}
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-slate-400"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-slate-400"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    labelFormatter={(v) => format(new Date(String(v)), "MMM d, yyyy")}
                    formatter={(val: any) => [val, "Inquiries"]}
                    contentStyle={{
                      background: "var(--admin-surface, #fff)",
                      border: "1px solid var(--admin-border, #e2e8f0)",
                      borderRadius: 12,
                      fontSize: 13,
                    }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#0047BB" strokeWidth={2} fill="url(#inquiryFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent inquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400" /> Recent Inquiries
            </CardTitle>
            <Link href="/dashboard/inquiries" className="text-xs font-medium text-[#0047BB] dark:text-blue-400 hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {!data.canReadInquiries ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Your role ({data.role}) has aggregate-only access. Contact details are hidden to protect visitor privacy.
                </p>
              </div>
            ) : data.recentInquiries.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-slate-400 dark:text-slate-500">No inquiries yet.</div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.recentInquiries.map((inq) => (
                  <li key={inq._id}>
                    <Link
                      href={`/dashboard/inquiries/${inq._id}`}
                      className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                        {inq.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                          {inq.name}
                        </span>
                        <span className="block text-xs text-slate-400 dark:text-slate-500 truncate">
                          {inq.subject || "—"}
                        </span>
                      </span>
                      <Badge size="sm" variant={STATUS[inq.status] ?? "neutral"}>
                        {inq.status}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity + Quick actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-400" /> Recent Activity
            </CardTitle>
            <Badge variant="neutral">Audit trail</Badge>
          </CardHeader>
          <CardContent className="p-0">
            {data.recentActivity.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-slate-400 dark:text-slate-500">No activity recorded yet.</div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.recentActivity.map((a) => (
                  <li key={a._id} className="flex items-start gap-3 px-6 py-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#0047BB] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-medium">{a.actor || "System"}</span>{" "}
                        {ACTIVITY_LABEL[a.action] ?? a.action}{" "}
                        <span className="text-slate-400 dark:text-slate-500">{a.entityType}</span>
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {a.createdAt ? format(new Date(a.createdAt), "MMM d, HH:mm") : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <QuickLink href="/dashboard/products/new" label="Add a product" enabled={data.canWrite} />
            <QuickLink href="/dashboard/products" label="Browse products" enabled />
            <QuickLink href="/dashboard/inquiries?status=new" label="Review new inquiries" enabled={data.canReadInquiries} />
            <QuickLink href="/dashboard/popups/new" label="Create a popup" enabled={data.canWritePopups} />
            <QuickLink href="/dashboard/analytics" label="View analytics" enabled />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({ href, label, enabled }: { href: string; label: string; enabled: boolean }) {
  if (!enabled) return null;
  return (
    <Link
      href={href}
      className="group flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#0047BB]/50 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-colors"
    >
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0047BB]" />
    </Link>
  );
}