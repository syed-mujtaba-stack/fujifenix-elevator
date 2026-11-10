"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Loader2, AlertTriangle, Trash2, Send, StickyNote, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import {
  addInquiryReply,
  updateInquiryStatus,
  assignInquiry,
  deleteInquiry,
} from "@/lib/actions/inquiries";
import { STATUS_META } from "./InboxClient";

export interface InquiryDetail {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  company: string | null;
  subject: string;
  message: string;
  projectType: string | null;
  floors: string | null;
  units: string | null;
  status: string;
  source: string;
  assignedToId: string | null;
  assignedToName: string | null;
  replies: Array<{ key: string; message: string; sentBy: string; sentAt: string | null; isInternal: boolean }>;
  createdAt: string | null;
  updatedAt: string | null;
}

export default function InquiryDetailClient({
  detail,
  admins,
  canWrite,
  isSuperAdmin,
}: {
  detail: InquiryDetail;
  admins: Array<{ _id: string; name: string | null }>;
  canWrite: boolean;
  isSuperAdmin: boolean;
}) {
  const router = useRouter();
  const [replyText, setReplyText] = useState("");
  const [busy, setBusy] = useState<"reply" | "note" | "status" | "assign" | "delete" | null>(null);

  const handleReply = async (isInternal: boolean) => {
    if (!replyText.trim()) {
      toast.error("Write a message first");
      return;
    }
    setBusy(isInternal ? "note" : "reply");
    try {
      await addInquiryReply({ inquiryId: detail._id, message: replyText, isInternal });
      setReplyText("");
      toast.success(isInternal ? "Internal note added" : "Reply sent to conversation");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save");
    } finally {
      setBusy(null);
    }
  };

  const handleStatus = async (next: string) => {
    setBusy("status");
    try {
      await updateInquiryStatus(detail._id, next);
      toast.success(`Status → ${STATUS_META[next]?.label ?? next}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  const handleAssign = async (userId: string) => {
    setBusy("assign");
    try {
      await assignInquiry(detail._id, userId || null);
      toast.success(userId ? "Assigned" : "Unassigned");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Permanently delete this inquiry? Prefer closing it instead.")) return;
    setBusy("delete");
    try {
      await deleteInquiry(detail._id);
      toast.success("Inquiry deleted");
      router.push("/dashboard/inquiries");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <Link href="/dashboard/inquiries" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{detail.subject}</h2>
              <Badge variant={STATUS_META[detail.status]?.variant ?? "neutral"}>{STATUS_META[detail.status]?.label ?? detail.status}</Badge>
              <Badge variant="neutral">{detail.source}</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {detail.name} · {detail.email} · {detail.createdAt ? new Date(detail.createdAt).toLocaleString() : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {canWrite && (
            <select
              value={detail.status}
              onChange={(e) => handleStatus(e.target.value)}
              disabled={busy === "status"}
              className="text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1220] px-3 py-2"
            >
              <option value="new">New</option>
              <option value="reading">Reading</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          )}
          {isSuperAdmin && (
            <Button size="sm" variant="danger" onClick={handleDelete} disabled={busy === "delete"}>
              {busy === "delete" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{detail.message}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thread</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {detail.replies.length === 0 && (
                <p className="text-sm text-slate-400 dark:text-slate-500">No replies yet.</p>
              )}
              {detail.replies.map((r) => (
                <div
                  key={r.key}
                  className={cn(
                    "rounded-xl border p-4",
                    r.isInternal
                      ? "border-amber-200 dark:border-amber-500/30 bg-amber-50/60 dark:bg-amber-500/5"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30"
                  )}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {r.isInternal && <StickyNote className="inline w-3.5 h-3.5 mr-1.5 text-amber-500" />}
                      {r.sentBy || "Unknown"}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{r.sentAt ? new Date(r.sentAt).toLocaleString() : ""}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{r.message}</p>
                  {r.isInternal && (
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">Internal note — never sent to client</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {canWrite && (
            <Card>
              <CardHeader>
                <CardTitle>Add reply or note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply for the client, or an internal note…"
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => handleReply(false)} disabled={busy === "reply"}>
                    {busy === "reply" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send reply
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleReply(true)} disabled={busy === "note"}>
                    {busy === "note" ? <Loader2 className="w-4 h-4 animate-spin" /> : <StickyNote className="w-4 h-4" />} Internal note
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Side info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact (PII)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row icon={Mail} label="Email" value={detail.email} href={`mailto:${detail.email}`} />
              <Row icon={Phone} label="Phone" value={detail.phone ?? "—"} href={detail.phone ? `tel:${detail.phone}` : undefined} />
              <Row icon={Building2} label="Company" value={detail.company ?? "—"} />
              <Row icon={MapPin} label="Location" value={[detail.city, detail.country].filter(Boolean).join(", ") || "—"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Type</span>
                <span className="font-medium">{detail.projectType ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Floors</span>
                <span className="font-medium">{detail.floors ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Units</span>
                <span className="font-medium">{detail.units ?? "—"}</span>
              </div>
            </CardContent>
          </Card>

          {canWrite && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-400" /> Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={detail.assignedToId ?? ""}
                  options={[
                    { value: "", label: "Unassigned" },
                    ...admins.map((a) => ({ value: a._id, label: a.name ?? a._id })),
                  ]}
                  onValueChange={handleAssign}
                  disabled={busy === "assign"}
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-slate-400 mt-0.5" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visitor data is personal information. Access is restricted to {isSuperAdmin ? "superadmins and admins" : "admins"}.
                Every status change and reply is recorded in the audit log.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
        <p className={cn("text-sm text-slate-700 dark:text-slate-300 mt-0.5 truncate", href && "text-[#0047BB] dark:text-blue-400 hover:underline")}>
          {value}
        </p>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}