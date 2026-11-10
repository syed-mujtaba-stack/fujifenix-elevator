"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Loader2, Trash2, Pencil, Eye, MousePointerClick, Activity } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { togglePopupActive, deletePopup } from "@/lib/actions/popups";

export interface PopupRow {
  _id: string;
  title: string;
  type: string;
  trigger: string;
  isActive: boolean;
  priority: number;
  impressions: number;
  clicks: number;
  conversions: number;
  _updatedAt: string | null;
}

const TYPE_LABEL: Record<string, string> = {
  modal: "Modal",
  banner: "Banner",
  "slide-in": "Slide-in",
  fullscreen: "Fullscreen",
};

export default function PopupsClient({ popups, canWrite }: { popups: PopupRow[]; canWrite: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState<{ id: string; action: "toggle" | "delete" } | null>(null);

  const handleToggle = async (p: PopupRow) => {
    setPending({ id: p._id, action: "toggle" });
    try {
      await togglePopupActive(p._id, !p.isActive);
      toast.success(p.isActive ? "Popup paused" : "Popup activated");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setPending(null);
    }
  };

  const handleDelete = async (p: PopupRow) => {
    if (!confirm(`Delete popup "${p.title}"?`)) return;
    setPending({ id: p._id, action: "delete" });
    try {
      await deletePopup(p._id);
      toast.success("Popup deleted");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed");
    } finally {
      setPending(null);
    }
  };

  const active = popups.filter((p) => p.isActive).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Popups &amp; Banners</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {popups.length} total · <span className="text-green-600 dark:text-green-400">{active} active</span>
          </p>
        </div>
        {canWrite && (
          <Link href="/dashboard/popups/new">
            <Button size="sm">
              <Plus className="w-4 h-4" /> Create Popup
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All popups</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-slate-400">
                    No popups yet. Create your first one.
                  </TableCell>
                </TableRow>
              )}
              {popups.map((p) => {
                const busy = pending?.id === p._id;
                return (
                  <TableRow key={p._id}>
                    <TableCell>
                      <Link href={`/dashboard/popups/${p._id}`} className="font-medium text-slate-800 dark:text-slate-100 hover:text-[#0047BB] dark:hover:text-blue-400">
                        {p.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="info">{TYPE_LABEL[p.type] ?? p.type}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400 text-xs">{p.trigger}</TableCell>
                    <TableCell>
                      {p.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="neutral">Paused</Badge>}
                    </TableCell>
                    <TableCell className="text-right text-slate-500 dark:text-slate-400">{p.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-slate-500 dark:text-slate-400">{p.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-slate-500 dark:text-slate-400">{p.conversions.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/dashboard/popups/${p._id}`} title="Edit">
                          <Button size="icon" variant="ghost">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        {canWrite && (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => handleToggle(p)} disabled={busy} title={p.isActive ? "Pause" : "Activate"}>
                              {busy && pending?.action === "toggle" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(p)} disabled={busy} title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
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
    </div>
  );
}