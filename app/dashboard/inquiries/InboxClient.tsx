"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Download, RefreshCw, Loader2, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { updateInquiryStatus, exportInquiries } from "@/lib/actions/inquiries";
import type { AdminRole } from "@/lib/admin";
import { cn } from "@/lib/utils";

export interface InquiryRow {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  company: string | null;
  subject: string;
  status: string;
  source: string;
  assignedTo: string | null;
  createdAt: string | null;
}

export const STATUS_META: Record<string, { variant: "new" | "reading" | "replied" | "closed"; label: string; color: string }> = {
  new: { variant: "new", label: "New", color: "text-blue-600" },
  reading: { variant: "reading", label: "Reading", color: "text-amber-600" },
  replied: { variant: "replied", label: "Replied", color: "text-green-600" },
  closed: { variant: "closed", label: "Closed", color: "text-slate-500" },
};

const SOURCES = ["all", "contact", "cta", "popup"];

export default function InboxClient({
  inquiries,
  canReadPII,
  canWrite,
  role,
}: {
  inquiries: InquiryRow[];
  canReadPII: boolean;
  canWrite: boolean;
  role: AdminRole;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") ?? "";

  const [q, setQ] = useState("");
  const [status, setStatus] = useState(statusParam);
  const [source, setSource] = useState("all");
  const [exporting, setExporting] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = !status || inq.status === status;
      const matchesSource = source === "all" || inq.source === source;
      const matchesQ = !q || inq.subject.toLowerCase().includes(q.toLowerCase()) || (canReadPII && inq.name.toLowerCase().includes(q.toLowerCase()));
      return matchesStatus && matchesSource && matchesQ;
    });
  }, [inquiries, q, status, source, canReadPII]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: inquiries.length };
    for (const s of ["new", "reading", "replied", "closed"]) c[s] = inquiries.filter((i) => i.status === s).length;
    return c;
  }, [inquiries]);

  const handleStatus = async (id: string, next: string) => {
    setUpdating(id);
    try {
      await updateInquiryStatus(id, next);
      toast.success(`Marked as "${next}"`);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await exportInquiries();
      if (!res.ok || !res.csv) throw new Error("Export failed");
      const blob = new Blob([res.csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Inquiries exported");
    } catch (err: any) {
      toast.error(err?.message ?? "Export failed");
    } finally {
      setExporting(false);
    }
  };

  const tabs = [
    { key: "", label: "All", count: counts.all },
    { key: "new", label: "New", count: counts.new },
    { key: "reading", label: "Reading", count: counts.reading },
    { key: "replied", label: "Replied", count: counts.replied },
    { key: "closed", label: "Closed", count: counts.closed },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Inquiries</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {filtered.length} shown · {counts.new} new
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!canReadPII && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mr-2">
              <EyeOff className="w-3.5 h-3.5" /> PII hidden for {role} role
            </span>
          )}
          {canReadPII && (
            <Button size="sm" variant="outline" onClick={handleExport} disabled={exporting}>
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setStatus(t.key);
              router.replace(t.key ? `/dashboard/inquiries?status=${t.key}` : "/dashboard/inquiries", { scroll: false });
            }}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors",
              status === t.key
                ? "bg-[#0047BB] border-[#0047BB] text-white"
                : "bg-white dark:bg-[#0e1626] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
            )}
          >
            {t.label} <span className="opacity-70 ml-0.5">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder={canReadPII ? "Search by subject or name…" : "Search by subject…"} value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="w-full sm:w-52">
          <Select value={source} onValueChange={setSource} options={SOURCES.map((s) => ({ value: s, label: s === "all" ? "All sources" : s }))} />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inbox</CardTitle>
          <Button size="icon" variant="ghost" onClick={() => router.refresh()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {canReadPII && <TableHead>Contact</TableHead>}
                <TableHead>Subject</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                {canReadPII && <TableHead>Assigned to</TableHead>}
                {canWrite && <TableHead className="text-right">Quick action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={canReadPII ? 7 : 4} className="py-12 text-center text-slate-400">
                    No inquiries match.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((inq) => (
                <TableRow key={inq._id}>
                  {canReadPII && (
                    <TableCell>
                      <Link href={`/dashboard/inquiries/${inq._id}`} className="block">
                        <span className="font-medium text-slate-800 dark:text-slate-100 hover:text-[#0047BB] dark:hover:text-blue-400">
                          {inq.name}
                        </span>
                        <span className="block text-xs text-slate-400 dark:text-slate-500 truncate">{inq.email}</span>
                      </Link>
                    </TableCell>
                  )}
                  <TableCell>
                    <Link href={`/dashboard/inquiries/${inq._id}`} className="text-slate-700 dark:text-slate-300 hover:text-[#0047BB] dark:hover:text-blue-400 font-medium">
                      {inq.subject}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{inq.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_META[inq.status]?.variant ?? "neutral"}>{STATUS_META[inq.status]?.label ?? inq.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "—"}
                  </TableCell>
                  {canReadPII && (
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400">{inq.assignedTo ?? "Unassigned"}</TableCell>
                  )}
                  {canWrite && (
                    <TableCell>
                      <div className="flex items-center justify-end">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatus(inq._id, e.target.value)}
                          disabled={updating === inq._id}
                          className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1220] px-2 py-1.5"
                        >
                          <option value="new">New</option>
                          <option value="reading">Reading</option>
                          <option value="replied">Replied</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}