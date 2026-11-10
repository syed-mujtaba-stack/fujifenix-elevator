"use client";

import { useEffect } from "react";

/**
 * Registers the admin service worker (offline shell + web push) once the
 * dashboard loads. Never blocks rendering.
 */
export function PwaRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          /* registration is progressive enhancement — ignore failures */
        });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}