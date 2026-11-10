"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Lock, ShieldCheck, MonitorSmartphone, Loader2, Copy, Check, Save,
  KeyRound, Smartphone, Globe, Palette, BellRing, Eye, EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { useAdminTheme } from "@/components/admin/ThemeProvider";
import { PushSettingsCard } from "@/components/admin/PushSettingsCard";
import { ROLE_LABELS, type AdminRole } from "@/lib/roles";
import {
  updateProfile, changePassword, setupTwoFactor, verifyTwoFactor, disableTwoFactor,
  updatePreferences, revokeSessionAction, revokeAllMySessionsAction,
} from "@/lib/actions/settings";
import { cn } from "@/lib/utils";

export interface SettingsData {
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  role: AdminRole;
  preferences: Record<string, any>;
  twoFactorEnabled: boolean;
  mustChangePassword: boolean;
  createdAt: string | null;
  lastLogin: string | null;
  sessions: Array<{
    _id: string;
    sessionId: string;
    createdAt: string | null;
    lastSeenAt: string | null;
    expiresAt: string | null;
    ipAddress?: string | null;
    device?: string | null;
    isRevoked: boolean;
    isCurrent: boolean;
  }>;
  canWrite: boolean;
  pushConfigured: boolean;
}

type Tab = "profile" | "security" | "preferences" | "sessions";

const TIMEZONES = [
  "UTC", "Asia/Shanghai", "Asia/Dubai", "Asia/Singapore", "Europe/London",
  "America/New_York", "Australia/Sydney",
].map((t) => ({ value: t, label: t }));

export default function SettingsClient({ data }: { data: SettingsData }) {
  const router = useRouter();
  const { setTheme } = useAdminTheme();
  const [tab, setTab] = useState<Tab>(data.mustChangePassword ? "security" : "profile");

  const tabs: Array<{ key: Tab; label: string; icon: any; badge?: string }> = [
    { key: "profile", label: "Profile", icon: User },
    { key: "security", label: "Security", icon: Lock, badge: data.mustChangePassword ? "!" : undefined },
    { key: "preferences", label: "Preferences", icon: Palette },
    { key: "sessions", label: "Sessions", icon: MonitorSmartphone, badge: String(data.sessions.filter((s) => !s.isRevoked).length) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {data.name} · <span className="capitalize">{ROLE_LABELS[data.role]}</span> {!data.canWrite && "· read-only view"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-0 -mb-px">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors",
                active
                  ? "border-[#0047BB] text-[#0047BB] dark:text-blue-400"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {t.label}
              {t.badge && <span className="text-xs font-bold text-amber-600">{t.badge}</span>}
            </button>
          );
        })}
      </div>

      {tab === "profile" && <ProfileTab data={data} canWrite={data.canWrite} />}
      {tab === "security" && <SecurityTab data={data} canWrite={data.canWrite} />}
      {tab === "preferences" && <PreferencesTab data={data} canWrite={data.canWrite} />}
      {tab === "sessions" && <SessionsTab data={data} />}
    </div>
  );
}

/* ── Profile ──────────────────────────────────────────────────────── */

function ProfileTab({ data, canWrite }: { data: SettingsData; canWrite: boolean }) {
  const router = useRouter();
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      await updateProfile({ name, phone: phone || null });
      toast.success("Profile updated");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} disabled={!canWrite} />
          <Input label="Email (sign-in)" value={data.email} disabled />
          <Input label="Phone (PII — superadmin only in admin UI)" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!canWrite} placeholder="+86 21 0000 0000" />
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400 dark:text-slate-500 space-y-0.5">
              <p>Member since {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "—"}</p>
              <p>Last login {data.lastLogin ? new Date(data.lastLogin).toLocaleString() : "—"}</p>
            </div>
            {canWrite && (
              <Button size="sm" onClick={save} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Security ─────────────────────────────────────────────────────── */

function SecurityTab({ data, canWrite }: { data: SettingsData; canWrite: boolean }) {
  const router = useRouter();

  // Password change
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [changing, setChanging] = useState(false);

  // 2FA
  const [setupStep, setSetupStep] = useState<"idle" | "shown" | "verify">(data.twoFactorEnabled ? "idle" : "idle");
  const [secret, setSecret] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [code, setCode] = useState("");
  const [twoFactorBusy, setTwoFactorBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const changePw = async () => {
    if (next !== confirm) return toast.error("New passwords do not match");
    setChanging(true);
    try {
      await changePassword({ currentPassword: current, newPassword: next });
      toast.success("Password changed — other sessions signed out");
      setCurrent(""); setNext(""); setConfirm("");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to change password");
    } finally {
      setChanging(false);
    }
  };

  const startSetup = async () => {
    setTwoFactorBusy(true);
    try {
      const res = await setupTwoFactor();
      setSecret(res.secret);
      setOtpauthUrl(res.otpauthUrl);
      setSetupStep("verify");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to start 2FA setup");
    } finally {
      setTwoFactorBusy(false);
    }
  };

  const confirmSetup = async () => {
    setTwoFactorBusy(true);
    try {
      await verifyTwoFactor(code);
      toast.success("Two-factor enabled 🎉");
      setSetupStep("idle");
      setCode("");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid code");
    } finally {
      setTwoFactorBusy(false);
    }
  };

  const disable = async () => {
    if (!code.trim()) return toast.error("Enter your current 2FA code to disable");
    setTwoFactorBusy(true);
    try {
      await disableTwoFactor(code);
      toast.success("Two-factor disabled");
      setCode("");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid code");
    } finally {
      setTwoFactorBusy(false);
    }
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="max-w-2xl space-y-6">
      {data.mustChangePassword && (
        <div className="rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Your administrator set this password. Change it now before other tasks.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-slate-400" /> Change password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Current password" type={show ? "text" : "password"} value={current} onChange={(e) => setCurrent(e.target.value)} disabled={!canWrite} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="New password" type={show ? "text" : "password"} value={next} onChange={(e) => setNext(e.target.value)} disabled={!canWrite} />
            <Input label="Confirm new password" type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} disabled={!canWrite} />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setShow((v) => !v)} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-300">
              {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />} {show ? "Hide" : "Show"} passwords
            </button>
            {canWrite && (
              <Button size="sm" onClick={changePw} disabled={changing}>
                {changing ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />} Change password
              </Button>
            )}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Policy: ≥12 characters, upper + lower case, a number and a special character. All other sessions are signed out.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" /> Two-factor authentication (TOTP)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.twoFactorEnabled ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="success">Enabled</Badge>
                <span className="text-sm text-slate-600 dark:text-slate-300">Your account requires a 6-digit code at sign-in.</span>
              </div>
              {canWrite && (
                <div className="flex items-end gap-3">
                  <Input label="Enter current code to disable" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" inputMode="numeric" maxLength={6} />
                  <Button size="sm" variant="danger" onClick={disable} disabled={twoFactorBusy}>
                    {twoFactorBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />} Disable
                  </Button>
                </div>
              )}
            </div>
          ) : setupStep === "idle" ? (
            <div className="flex flex-col items-start gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Add an authenticator app (Google Authenticator, Authy, 1Password…) for stronger sign-in protection.
              </p>
              {canWrite && (
                <Button size="sm" onClick={startSetup} disabled={twoFactorBusy}>
                  {twoFactorBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />} Enable 2FA
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Open your authenticator app and add this account using the secret below (or scan the otpauth URL from the app&apos;s manual entry).
              </p>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
                <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Account secret</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-slate-800 dark:text-slate-100 break-all flex-1">{secret}</code>
                  <Button size="icon" variant="ghost" onClick={copySecret}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 break-all">{otpauthUrl}</p>
              </div>
              <div className="flex items-end gap-3">
                <Input label="6-digit code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" inputMode="numeric" maxLength={6} />
                <Button size="sm" onClick={confirmSetup} disabled={twoFactorBusy}>
                  {twoFactorBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Verify
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Preferences ──────────────────────────────────────────────────── */

function PreferencesTab({ data, canWrite }: { data: SettingsData; canWrite: boolean }) {
  const router = useRouter();
  const { setTheme } = useAdminTheme();
  const [timezone, setTimezone] = useState(data.preferences?.timezone ?? "Asia/Shanghai");
  const [language, setLanguage] = useState(data.preferences?.language ?? "en");
  const [theme, setThemePref] = useState(data.preferences?.theme ?? "system");
  const [notif, setNotif] = useState({
    newInquiry: data.preferences?.notifications?.newInquiry ?? true,
    inquiryReply: data.preferences?.notifications?.inquiryReply ?? true,
    popupAlerts: data.preferences?.notifications?.popupAlerts ?? true,
    systemAlerts: data.preferences?.notifications?.systemAlerts ?? true,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updatePreferences({ timezone, language, theme, notifications: notif });
      setTheme(theme as any);
      toast.success("Preferences saved");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" /> Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select label="Timezone" value={timezone} onValueChange={setTimezone} options={TIMEZONES} disabled={!canWrite} />
          <Select label="Language" value={language} onValueChange={setLanguage} options={[{ value: "en", label: "English" }, { value: "zh-CN", label: "Chinese (Simplified)" }]} disabled={!canWrite} />
          <div>
            <p className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              {(["light", "dark", "system"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => canWrite && setThemePref(t)}
                  disabled={!canWrite}
                  className={cn(
                    "px-3 py-2 rounded-lg border text-sm font-medium capitalize transition-colors",
                    theme === t
                      ? "border-[#0047BB] bg-blue-50 text-[#0047BB] dark:bg-blue-500/15 dark:text-blue-300"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-slate-400" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {([
            ["newInquiry", "New inquiry received"],
            ["inquiryReply", "Inquiry replied / updated"],
            ["popupAlerts", "Popup performance alerts"],
            ["systemAlerts", "System & security alerts"],
          ] as const).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between py-1.5 cursor-pointer">
              <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
              <input
                type="checkbox"
                checked={notif[key]}
                onChange={(e) => setNotif((n) => ({ ...n, [key]: e.target.checked }))}
                disabled={!canWrite}
                className="w-4 h-4 accent-[#0047BB]"
              />
            </label>
          ))}
          {canWrite && (
            <Button size="sm" onClick={save} disabled={saving} className="mt-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save preferences
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-slate-400" /> Push notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PushSettingsCard configured={data.pushConfigured} />
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Sessions ─────────────────────────────────────────────────────── */

function SessionsTab({ data }: { data: SettingsData }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | "all" | null>(null);
  const active = data.sessions.filter((s) => !s.isRevoked);

  const revoke = async (sid: string) => {
    setBusy(sid);
    try {
      await revokeSessionAction(sid);
      toast.success("Session revoked");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  const revokeAll = async () => {
    if (!confirm("Sign out every other session? Your current session stays active.")) return;
    setBusy("all");
    try {
      await revokeAllMySessionsAction();
      toast.success("Other sessions revoked");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{active.length} active session{active.length === 1 ? "" : "s"}</p>
        {active.length > 1 && (
          <Button size="sm" variant="outline" onClick={revokeAll} disabled={busy === "all"}>
            {busy === "all" ? <Loader2 className="w-4 h-4 animate-spin" /> : <MonitorSmartphone className="w-4 h-4" />} Sign out all others
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-slate-400" /> Devices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data.sessions.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-slate-400">No sessions recorded.</p>
          )}
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.sessions.map((s) => (
              <li key={s._id} className="flex items-center gap-4 px-6 py-4">
                <span className={cn(
                  "grid place-items-center w-10 h-10 rounded-xl shrink-0",
                  s.isCurrent ? "bg-green-500/10 text-green-600 dark:text-green-400" : s.isRevoked ? "bg-red-500/10 text-red-500" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                )}>
                  <Smartphone className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {s.device || "Unknown device"}
                    {s.isCurrent && <Badge className="ml-2" variant="success">This device</Badge>}
                    {s.isRevoked && <Badge className="ml-2" variant="danger">Revoked</Badge>}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    IP {s.ipAddress || "—"} · last seen {s.lastSeenAt ? new Date(s.lastSeenAt).toLocaleString() : "—"} · created {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
                  </p>
                </div>
                {!s.isCurrent && !s.isRevoked && (
                  <Button size="sm" variant="outline" onClick={() => revoke(s.sessionId)} disabled={busy === s.sessionId}>
                    {busy === s.sessionId ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />} Revoke
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}