"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { createPopup, updatePopup } from "@/lib/actions/popups";
import { cn } from "@/lib/utils";

type PopupType = "modal" | "banner" | "slide-in" | "fullscreen";
type Trigger = "onLoad" | "onScroll" | "onExit" | "onClick" | "timer";

interface PopupInitial {
  _id?: string;
  title: string;
  type: PopupType;
  trigger: Trigger;
  triggerConfig?: { delay?: number | null; scrollPercentage?: number | null; selector?: string | null } | null;
  content?: {
    headline?: string | null;
    subheadline?: string | null;
    body?: string | null;
    primaryCTA?: { text?: string | null; url?: string | null; style?: string | null } | null;
    secondaryCTA?: { text?: string | null; url?: string | null; style?: string | null } | null;
  } | null;
  targeting?: {
    paths?: string[] | null;
    countries?: string[] | null;
    devices?: string[] | null;
    showOnce?: boolean | null;
    frequencyCap?: number | null;
  } | null;
  schedule?: { startDate?: string | null; endDate?: string | null; timezone?: string | null } | null;
  isActive: boolean;
  priority: number;
}

const TYPES: PopupType[] = ["modal", "banner", "slide-in", "fullscreen"];
const TRIGGERS: Trigger[] = ["onLoad", "onScroll", "onExit", "onClick", "timer"];

export default function PopupForm({ initial }: { initial?: PopupInitial | null }) {
  const router = useRouter();
  const isNew = !initial?._id;

  const [form, setForm] = useState<PopupInitial>(() => ({
    _id: initial?._id,
    title: initial?.title ?? "",
    type: initial?.type ?? "modal",
    trigger: initial?.trigger ?? "onLoad",
    triggerConfig: initial?.triggerConfig ?? {},
    content: initial?.content ?? { headline: "", subheadline: "", body: "", primaryCTA: {}, secondaryCTA: {} },
    targeting: initial?.targeting ?? { paths: [], countries: [], devices: [], showOnce: true, frequencyCap: null },
    schedule: initial?.schedule ?? { startDate: "", endDate: "", timezone: "Asia/Shanghai" },
    isActive: initial?.isActive ?? true,
    priority: initial?.priority ?? 0,
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof PopupInitial>(key: K, value: PopupInitial[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        type: form.type,
        trigger: form.trigger,
        triggerConfig: form.triggerConfig ?? null,
        content: form.content ?? {},
        targeting: form.targeting ?? null,
        schedule: form.schedule ?? null,
        isActive: form.isActive,
        priority: Number(form.priority ?? 0),
      };
      if (isNew) {
        const res = await createPopup(payload);
        toast.success("Popup created");
        router.push(`/dashboard/popups/${res.id}`);
        router.refresh();
      } else {
        await updatePopup(initial!._id!, payload);
        toast.success("Popup updated");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save popup");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/popups" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl font-bold">{isNew ? "New Popup" : `Edit: ${initial!.title}`}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure the popup, then preview it live.</p>
          </div>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          {isNew ? "Create popup" : "Save changes"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Title *" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Summer Promotion" />
              <div className="grid grid-cols-2 gap-4">
                <Select label="Type" value={form.type} onValueChange={(v) => set("type", v as PopupType)} options={TYPES.map((t) => ({ value: t, label: t }))} />
                <Select label="Trigger" value={form.trigger} onValueChange={(v) => set("trigger", v as Trigger)} options={TRIGGERS.map((t) => ({ value: t, label: t }))} />
              </div>
              {(form.trigger === "onScroll" || form.trigger === "timer" || form.trigger === "onClick") && (
                <div className="grid grid-cols-2 gap-4">
                  {form.trigger === "timer" && (
                    <Input label="Delay (seconds)" type="number" value={String(form.triggerConfig?.delay ?? "")} onChange={(e) => set("triggerConfig", { ...form.triggerConfig, delay: Number(e.target.value) || null })} />
                  )}
                  {form.trigger === "onScroll" && (
                    <Input label="Scroll %" type="number" value={String(form.triggerConfig?.scrollPercentage ?? "")} onChange={(e) => set("triggerConfig", { ...form.triggerConfig, scrollPercentage: Number(e.target.value) || null })} />
                  )}
                  {form.trigger === "onClick" && (
                    <Input label="Element selector" value={form.triggerConfig?.selector ?? ""} onChange={(e) => set("triggerConfig", { ...form.triggerConfig, selector: e.target.value })} placeholder="#cta-button" />
                  )}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Input label="Priority" type="number" value={String(form.priority)} onChange={(e) => set("priority", Number(e.target.value) || 0)} />
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="w-4 h-4 accent-[#0047BB]" />
                    Active live
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Headline" value={form.content?.headline ?? ""} onChange={(e) => set("content", { ...form.content, headline: e.target.value })} />
              <Input label="Subheadline" value={form.content?.subheadline ?? ""} onChange={(e) => set("content", { ...form.content, subheadline: e.target.value })} />
              <Textarea label="Body" value={form.content?.body ?? ""} onChange={(e) => set("content", { ...form.content, body: e.target.value })} />
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Primary CTA</p>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Button text" value={form.content?.primaryCTA?.text ?? ""} onChange={(e) => set("content", { ...form.content, primaryCTA: { ...form.content?.primaryCTA, text: e.target.value } })} />
                  <Input placeholder="URL (/cta, /contact…)" value={form.content?.primaryCTA?.url ?? ""} onChange={(e) => set("content", { ...form.content, primaryCTA: { ...form.content?.primaryCTA, url: e.target.value } })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Secondary CTA</p>
                  <div />
                  <Input placeholder="Button text" value={form.content?.secondaryCTA?.text ?? ""} onChange={(e) => set("content", { ...form.content, secondaryCTA: { ...form.content?.secondaryCTA, text: e.target.value } })} />
                  <Input placeholder="URL" value={form.content?.secondaryCTA?.url ?? ""} onChange={(e) => set("content", { ...form.content, secondaryCTA: { ...form.content?.secondaryCTA, url: e.target.value } })} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Targeting &amp; schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="URL paths (comma-separated)" value={(form.targeting?.paths ?? []).join(", ")} onChange={(e) => set("targeting", { ...form.targeting, paths: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="/, /products/*" />
              <Input label="Devices (comma-separated)" value={(form.targeting?.devices ?? []).join(", ")} onChange={(e) => set("targeting", { ...form.targeting, devices: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="desktop, mobile" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start" type="datetime-local" value={toLocalInput(form.schedule?.startDate)} onChange={(e) => set("schedule", { ...form.schedule, startDate: new Date(e.target.value).toISOString() })} />
                <Input label="End" type="datetime-local" value={toLocalInput(form.schedule?.endDate)} onChange={(e) => set("schedule", { ...form.schedule, endDate: new Date(e.target.value).toISOString() })} />
              </div>
              <Input label="Timezone" value={form.schedule?.timezone ?? "Asia/Shanghai"} onChange={(e) => set("schedule", { ...form.schedule, timezone: e.target.value })} />
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" checked={form.targeting?.showOnce ?? true} onChange={(e) => set("targeting", { ...form.targeting, showOnce: e.target.checked })} className="w-4 h-4 accent-[#0047BB]" />
                Show only once per visitor
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Live preview */}
        <div>
          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Live preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-hidden h-[420px]">
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                  <PopupPreview form={form} />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                Approximation of how the popup will render. Positioning and entrance animation are handled by the live site component.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

function toLocalInput(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function PopupPreview({ form }: { form: PopupInitial }) {
  const headline = form.content?.headline || "Your headline here";
  const sub = form.content?.subheadline || "";
  const body = form.content?.body || "";
  const primary = form.content?.primaryCTA;
  const secondary = form.content?.secondaryCTA;

  const CtaRow = (
    <div className="flex flex-wrap gap-2 pt-1">
      {primary?.text && (
        <span className={cn("px-4 py-2 rounded-lg text-sm font-semibold", primary.style === "primary" ? "bg-[#0047BB] text-white" : primary.style === "ghost" ? "text-[#0047BB]" : "bg-slate-200 text-slate-800")}>
          {primary.text}
        </span>
      )}
      {secondary?.text && (
        <span className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
          {secondary.text}
        </span>
      )}
    </div>
  );

  if (form.type === "banner") {
    return (
      <div className="w-full rounded-lg bg-slate-800 dark:bg-[#0e1626] text-white p-4 border border-white/10 shadow-lg flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-600 grid place-items-center text-white font-bold text-lg shrink-0">FF</div>
        <div className="min-w-0">
          <p className="text-sm font-bold">{headline}</p>
          {sub && <p className="text-xs text-slate-300 mt-0.5">{sub}</p>}
          {CtaRow}
        </div>
      </div>
    );
  }

  if (form.type === "slide-in") {
    return (
      <div className="w-72 rounded-xl bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-700 shadow-2xl p-5 self-end ml-auto">
        <p className="text-base font-bold text-slate-900 dark:text-slate-100">{headline}</p>
        {sub && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}
        {body && <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{body}</p>}
        {CtaRow}
      </div>
    );
  }

  if (form.type === "fullscreen") {
    return (
      <div className="w-[360px] rounded-xl bg-white dark:bg-[#0e1626] p-8 border border-slate-200 dark:border-slate-700 shadow-2xl text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-[#0047BB] grid place-items-center text-white text-xl font-black mb-4">FF</div>
        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{headline}</p>
        {sub && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}
        {body && <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{body}</p>}
        <div className="mt-4 flex justify-center">{CtaRow}</div>
      </div>
    );
  }

  // modal
  return (
    <div className="w-[340px] rounded-xl bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
      <div className="h-1.5 bg-[#0047BB]" />
      <div className="relative p-6">
        <X className="absolute top-4 right-4 w-4 h-4 text-slate-300 dark:text-slate-600" />
        <p className="text-lg font-bold text-slate-900 dark:text-slate-100 pr-6">{headline}</p>
        {sub && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}
        {body && <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{body}</p>}
        <div className="mt-4">{CtaRow}</div>
      </div>
    </div>
  );
}