"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Smartphone, MonitorSmartphone, Loader2, ShieldCheck, Search, Ban } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { revokeSessionAction } from "@/lib/actions/settings";

export interface SessionRow {
  _id: string;
  sessionId: string;
  user: { _id: string; name: string | null; email: string | null } | null;
  createdAt: string | null;
  lastSeenAt: string | null;
  expiresAt: string | null;
  ipAddress: string | null;
  device: string | null;
  isRevoked: boolean;
  revokedAt: string | null;
  isCurrent: boolean;
}

export default function SessionsClient({
  rows,
  isSuperAdmin,
  currentSessionId,
}: {
  rows: SessionRow[];
  isSuperAdmin: boolean;
  currentSessionId: string | null;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const users = useMemo(
    () => Array.from(new Map(rows.filter((r) => r.user).map((r) => [r.user!._id, r.user!.name ?? r.user!.email ?? r.user!._id])).entries()),
    [rows]
  );

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        const matchesQ =
          !q ||
          (r.device ?? "").toLowerCase().includes(q.toLowerCase()) ||
          (r.ipAddress ?? "").toLowerCase().includes(q.toLowerCase()) ||
          (r.user?.email ?? "").toLowerCase().includes(q.toLowerCase());
        const matchesUser = !userFilter || r.user?._id === userFilter;
        return matchesQ && matchesUser;
      }),
    [rows, q, userFilter]
  );

  const active = rows.filter((r) => !r.isRevoked).length;

  const revoke = async (r: SessionRow) => {
    if (r.isCurrent) {
      toast.error("Use \"Sign out\" to end your current session");
      return;
    }
    setBusy(r.sessionId);
    try {
      await revokeSessionAction(r.sessionId);
      toast.success("Session revoked");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to revoke session");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Active Sessions</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {active} active · {rows.length} total{isSuperAdmin ? " · all users (superadmin)" : " · your devices only"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search device, IP or email…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        {isSuperAdmin && (
          <div className="w-full sm:w-56">
            <Select
              value={userFilter}
              onValueChange={setUserFilter}
              options={[{ value: "", label: "All users" }, ...users.map(([id, label]) => ({ value: id, label }))]}
            />
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4 text-slate-400" /> Devices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 && (
            <p className="px-6 py-12 text-center text-sm text-slate-400">No sessions match your filters.</p>
          )}
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((r) => (
              <li key={r._id} className="flex items-center gap-4 px-6 py-4">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {r.device || "Unknown device"}
                    {r.isCurrent && <Badge className="ml-2" variant="success">This device</Badge>}
                    {r.isRevoked && <Badge className="ml-2" variant="danger">Revoked</Badge>}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                    {r.user ? `${r.user.name ?? r.user.email} · ` : ""}IP {r.ipAddress || "—"} · last seen{" "}
                    {r.lastSeenAt ? new Date(r.lastSeenAt).toLocaleString() : "—"} · expires{" "}
                    {r.expiresAt ? new Date(r.expiresAt).toLocaleDateString() : "—"}
                  </p>
                </div>
                {!r.isCurrent && !r.isRevoked && (
                  <Button size="sm" variant="outline" onClick={() => revoke(r)} disabled={busy === r.sessionId}>
                    {busy === r.sessionId ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />} Revoke
                  </Button>
                )}
                {r.isRevoked && (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Ban className="w-3.5 h-3.5" /> {r.revokedAt ? new Date(r.revokedAt).toLocaleDateString() : ""}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}