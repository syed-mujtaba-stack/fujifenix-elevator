"use client";

import { useCallback, useEffect, useState } from "react";
import { BellRing, BellOff, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { sendTestPush } from "@/lib/actions/settings";

/**
 * Browser push subscription card (Phase D). Requires the VAPID public key at
 * build time (NEXT_PUBLIC_VAPID_PUBLIC_KEY). When the server has no VAPID
 * keys configured the card renders a clear "not configured" state instead of
 * failing mysteriously.
 */
export function PushSettingsCard({ configured }: { configured: boolean }) {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported" | "unknown">("unknown");
  const [busy, setBusy] = useState<"subscribe" | "test" | null>(null);

  const checkPermission = useCallback(() => {
    if (typeof Notification === "undefined") {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const subscribe = async () => {
    if (typeof Notification === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      toast.error("This browser does not support push notifications");
      return;
    }
    setBusy("subscribe");
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") {
        toast.error("Permission denied — notifications stay off");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        toast.error("VAPID public key is missing on the build");
        return;
      }

      const existing = await registration.pushManager.getSubscription();
      const subscription = existing ?? (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as unknown as BufferSource,
      }));

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: subscription.toJSON() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Subscription failed");
      }
      toast.success("Notifications enabled for this browser");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not enable notifications");
    } finally {
      setBusy(null);
    }
  };

  const test = async () => {
    setBusy("test");
    try {
      await sendTestPush();
      toast.success("Test push sent — check the notification");
    } catch (err: any) {
      toast.error(err?.message ?? "Test push failed");
    } finally {
      setBusy(null);
    }
  };

  const enabled = permission === "granted";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          {enabled ? <BellRing className="w-4 h-4 text-green-500" /> : <BellOff className="w-4 h-4 text-slate-400" />}
          Browser push
        </span>
        {enabled ? (
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Enabled</span>
        ) : (
          <span className="text-xs text-slate-400">Off</span>
        )}
      </div>

      {!configured ? (
        <div className="text-xs text-slate-400 dark:text-slate-500 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-3">
          Server push is not configured yet. Add <code className="font-mono">NEXT_PUBLIC_VAPID_PUBLIC_KEY</code> and{" "}
          <code className="font-mono">VAPID_PRIVATE_KEY</code> (see <code className="font-mono">.env.local.example</code>) and rebuild.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {!enabled && (
            <Button size="sm" variant="outline" onClick={subscribe} disabled={busy === "subscribe"}>
              {busy === "subscribe" ? <Loader2 className="w-4 h-4 animate-spin" /> : <BellRing className="w-4 h-4" />}
              Enable push
            </Button>
          )}
          {enabled && (
            <Button size="sm" variant="outline" onClick={test} disabled={busy === "test"}>
              {busy === "test" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send test push
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}