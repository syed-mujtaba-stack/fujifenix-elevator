"use client";

import { format } from "date-fns";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface AnalyticsData {
  stats: {
    products: number;
    inquiries: number;
    inquiriesNew: number;
    popups: number;
    popupsActive: number;
    users: number;
  };
  trend: Array<{ date: string; count: number }>;
  byStatus: Array<{ name: string; value: number }>;
  bySource: Array<{ name: string; value: number }>;
  popupPerformance: Array<{ title: string; impressions: number; clicks: number; conversions: number; ctr: number }>;
  activity: Array<{ action: string; count: number }>;
  totalInquiries30d: number;
  since30: string;
}

const COLORS = ["#0047BB", "#3b82f6", "#0ea5e9", "#22c55e", "#eab308", "#a855f7"];
const STATUS_COLORS: Record<string, string> = {
  new: "#2563eb",
  reading: "#f59e0b",
  replied: "#10b981",
  closed: "#94a3b8",
};

const TOOLTIP_STYLE = {
  background: "var(--admin-surface, #fff)",
  border: "1px solid var(--admin-border, #e2e8f0)",
  borderRadius: 12,
  fontSize: 13,
};

export default function AnalyticsClient({ data }: { data: AnalyticsData }) {
  const popupTotals = data.popupPerformance.reduce(
    (a, p) => ({ impressions: a.impressions + p.impressions, clicks: a.clicks + p.clicks, conversions: a.conversions + p.conversions }),
    { impressions: 0, clicks: 0, conversions: 0 }
  );

  const kpis = [
    { label: "Products", value: data.stats.products, sub: "listed" },
    { label: "Inquiries (30d)", value: data.totalInquiries30d, sub: "new leads" },
    { label: "Popup impressions", value: popupTotals.impressions.toLocaleString(), sub: "all time" },
    { label: "Popup conversions", value: popupTotals.conversions.toLocaleString(), sub: "clicks → inquiries" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Analytics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Derived from live Sanity data (since {format(new Date(data.since30), "MMM d, yyyy")} for trends).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <p className="text-sm text-slate-500 dark:text-slate-400">{k.label}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{k.value}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Inquiry volume — last 30 days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trend} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
                  <defs>
                    <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0047BB" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0047BB" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => format(new Date(v), "MMM d")} tick={{ fontSize: 11 }} className="text-slate-400" axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-slate-400" axisLine={false} tickLine={false} />
                  <Tooltip labelFormatter={(v) => format(new Date(String(v)), "MMM d, yyyy")} formatter={(val: any) => [val, "Inquiries"]} contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="count" stroke="#0047BB" strokeWidth={2} fill="url(#analyticsFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.byStatus} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {data.byStatus.map((entry, i) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Popup performance (impr., clicks, conv.)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.popupPerformance} margin={{ top: 8, right: 12, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" vertical={false} />
                  <XAxis dataKey="title" tick={{ fontSize: 10 }} className="text-slate-400" axisLine={false} tickLine={false} interval={0} angle={-14} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} className="text-slate-400" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(100,116,139,0.08)" }} contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="impressions" fill="#0047BB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="clicks" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inquiry source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.bySource.map((s, i) => {
                  const max = Math.max(...data.bySource.map((x) => x.value), 1);
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="capitalize text-slate-600 dark:text-slate-300">{s.name}</span>
                        <span className="font-semibold">{s.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(s.value / max) * 100}%`, background: COLORS[i % COLORS.length] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent audit activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.activity.slice(0, 6).map((a) => (
                  <li key={a.action} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300 capitalize">{a.action.replace(/_/g, " ")}</span>
                    <Badge variant="neutral">{a.count}</Badge>
                  </li>
                ))}
                {data.activity.length === 0 && (
                  <li className="text-sm text-slate-400">No audit events in the last 90 days.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}