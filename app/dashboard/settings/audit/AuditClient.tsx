"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

export interface AuditRow {
  _id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  actor: string;
  sessionId: string | null;
  metadata: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string | null;
}

const ACTION_VARIANTS: Record<string, "danger" | "success" | "warning" | "info" | "neutral"> = {
  delete: "danger",
  login: "success",
  login_failed: "danger",
  logout: "neutral",
  password_change: "warning",
  session_revoke: "warning",
  session_revoke_all: "warning",
  role_change: "warning",
  user_deactivate: "danger",
  "2fa_setup": "success",
  "2fa_disable": "warning",
  export: "info",
  user_create: "success",
};

export default function AuditClient({ rows }: { rows: AuditRow[] }) {
  const [q, setQ] = useState("");
  const [action, setAction] = useState("");
  const [entity, setEntity] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const actions = useMemo(() => Array.from(new Set(rows.map((r) => r.action))).sort(), [rows]);
  const entities = useMemo(() => Array.from(new Set(rows.map((r) => r.entityType))).sort(), [rows]);

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        const matchesQ =
          !q ||
          r.actor.toLowerCase().includes(q.toLowerCase()) ||
          (r.entityId ?? "").toLowerCase().includes(q.toLowerCase()) ||
          (r.ipAddress ?? "").toLowerCase().includes(q.toLowerCase());
        const matchesAction = !action || r.action === action;
        const matchesEntity = !entity || r.entityType === entity;
        return matchesQ && matchesAction && matchesEntity;
      }),
    [rows, q, action, entity]
  );

  const parseMetadata = (raw: string | null): { ok: boolean; pretty: string } => {
    if (!raw) return { ok: false, pretty: "" };
    try {
      const obj = JSON.parse(raw);
      return { ok: true, pretty: JSON.stringify(obj, null, 2) };
    } catch {
      return { ok: false, pretty: raw };
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Audit Log</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {filtered.length} events · append-only record of admin actions (superadmin only)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search actor, ID, IP…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="w-full sm:w-48">
          <Select value={action} onValueChange={setAction} options={[{ value: "", label: "All actions" }, ...actions.map((a) => ({ value: a, label: a }))]} />
        </div>
        <div className="w-full sm:w-48">
          <Select value={entity} onValueChange={setEntity} options={[{ value: "", label: "All entities" }, ...entities.map((e) => ({ value: e, label: e }))]} />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400" />
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>When</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-slate-400">
                    No audit events match your filters.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((r) => {
                const meta = parseMetadata(r.metadata);
                const isOpen = expanded === r._id;
                return (
                  <TableRow key={r._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={ACTION_VARIANTS[r.action] ?? "neutral"}>{r.action}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{r.entityType}</span>
                      {r.entityId && <span className="block text-[11px] text-slate-400 font-mono truncate max-w-[140px]">{r.entityId}</span>}
                    </TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">{r.actor}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">{r.ipAddress ?? "—"}</TableCell>
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
                    </TableCell>
                    <TableCell>
                      {meta.ok ? (
                        <button
                          onClick={() => setExpanded(isOpen ? null : r._id)}
                          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                          aria-label="Toggle metadata"
                        >
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filtered.some((r) => expanded === r._id) && (
            <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4">
              {(() => {
                const r = filtered.find((x) => x._id === expanded);
                if (!r) return null;
                const meta = parseMetadata(r.metadata);
                return (
                  <div className="space-y-2">
                    <pre className="rounded-lg bg-slate-50 dark:bg-slate-900 p-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre-wrap">
                      {meta.pretty}
                    </pre>
                    {r.userAgent && <p className="text-xs text-slate-400 dark:text-slate-500 truncate">UA: {r.userAgent}</p>}
                  </div>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}