"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Loader2, ShieldCheck, Sword, UserX, KeyRound, X, RefreshCw, Mail } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { ROLE_LABELS, type AdminRole } from "@/lib/roles";
import { createUser, updateUser, resetUserPassword, generateTempPassword } from "@/lib/actions/users";
import { cn } from "@/lib/utils";

export interface UserRow {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  role: AdminRole;
  isActive: boolean;
  twoFactorEnabled: boolean;
  mustChangePassword: boolean;
  lastLogin: string | null;
  createdAt: string | null;
  openSessions: number;
}

const ROLES: AdminRole[] = ["superadmin", "admin", "editor", "viewer"];

export default function UsersClient({
  users,
  isSuperAdmin,
  currentUserId,
  currentRole,
}: {
  users: UserRow[];
  isSuperAdmin: boolean;
  currentUserId: string;
  currentRole: AdminRole;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())),
    [users, q]
  );

  const handleRoleChange = async (u: UserRow, next: string) => {
    if (u._id === currentUserId && next !== "superadmin" && currentRole === "superadmin") {
      toast.error("You cannot demote yourself");
      return;
    }
    setBusy(u._id);
    try {
      await updateUser(u._id, { role: next as AdminRole });
      toast.success(`${u.name} is now ${ROLE_LABELS[next as AdminRole]}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update role");
    } finally {
      setBusy(null);
    }
  };

  const handleToggleActive = async (u: UserRow) => {
    if (u._id === currentUserId) {
      toast.error("You cannot deactivate your own account");
      return;
    }
    setBusy(u._id);
    try {
      await updateUser(u._id, { isActive: !u.isActive });
      toast.success(u.isActive ? `${u.name} deactivated` : `${u.name} activated`);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  const handleResetPassword = async (u: UserRow) => {
    if (u._id === currentUserId) {
      toast.error("Change your own password in Settings");
      return;
    }
    const newPassword = window.prompt(`New password for ${u.name} (min 12 chars):`);
    if (!newPassword) return;
    setBusy(u._id);
    try {
      await resetUserPassword(u._id, newPassword);
      toast.success("Password reset — user must change it at next login");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Admin Users</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {users.length} accounts · only {isSuperAdmin ? "superadmins" : "admins"} can manage users
          </p>
        </div>
        {isSuperAdmin && (
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" /> New user
          </Button>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input placeholder="Search by name or email…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last login</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => {
                const isSelf = u._id === currentUserId;
                return (
                  <TableRow key={u._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                          {(u.name || u.email)[0]?.toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 dark:text-slate-100 truncate">
                            {u.name}
                            {isSelf && <span className="ml-2 text-xs text-slate-400">(you)</span>}
                            {u.mustChangePassword && <span className="ml-2 text-xs text-amber-500">reset-pending</span>}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {isSuperAdmin ? (
                        <Select
                          value={u.role}
                          options={ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }))}
                          onValueChange={(v) => handleRoleChange(u, v)}
                          disabled={busy === u._id || (isSelf && currentRole === "superadmin")}
                          className="w-36"
                        />
                      ) : (
                        <Badge variant={u.role === "superadmin" ? "danger" : "neutral"}>{ROLE_LABELS[u.role]}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {u.twoFactorEnabled ? <Badge variant="success">Enabled</Badge> : <Badge variant="neutral">Off</Badge>}
                    </TableCell>
                    <TableCell>
                      {u.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Disabled</Badge>}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Never"}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400">{u.openSessions}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {isSuperAdmin && (
                          <Button size="icon" variant="ghost" onClick={() => handleResetPassword(u)} disabled={busy === u._id || isSelf} title="Reset password">
                            <KeyRound className="w-4 h-4" />
                          </Button>
                        )}
                        {isSuperAdmin && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className={cn(u.isActive ? "text-red-500" : "text-green-600")}
                            onClick={() => handleToggleActive(u)}
                            disabled={busy === u._id || isSelf}
                            title={u.isActive ? "Deactivate" : "Activate"}
                          >
                            {u.isActive ? <UserX className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); router.refresh(); }} />}
    </div>
  );
}

function CreateUserModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("editor");
  const [tempPassword, setTempPassword] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);

  const genPassword = async () => {
    try {
      setTempPassword(await generateTempPassword());
      setRevealed(true);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    }
  };

  const submit = async () => {
    if (!name.trim() || !email.trim()) return toast.error("Name and email are required");
    if (tempPassword.length < 12) return toast.error("Temporary password must be ≥12 characters (use Generate)");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return toast.error("Enter a valid email");
    setSaving(true);
    try {
      await createUser({ name, email, role, tempPassword });
      toast.success("User created — share the temp password securely");
      onCreated();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to create user");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Create admin user</CardTitle>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4" /></button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@fujifenix.com" />
          <Select label="Role" value={role} onValueChange={(v) => setRole(v as AdminRole)} options={ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }))} />
          <div>
            <div className="flex items-end gap-2">
              <Input label="Temporary password" value={tempPassword} onChange={(e) => setTempPassword(e.target.value)} disabled={!revealed} placeholder="Generate one…" />
              <Button size="sm" variant="outline" onClick={genPassword}>
                <RefreshCw className="w-4 h-4" /> Generate
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Share it via a secure channel — the user must change it on first login.
            </p>
          </div>
          <Button className="w-full" onClick={submit} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sword className="w-4 h-4" />} Create user
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}