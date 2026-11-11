"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SuggestedMarket {
  code: string;
  country: string;
  shortName: string;
  path: string;
}

const STORAGE_KEY = "ff-geo-suggestion-dismissed";

/**
 * Optional, dismissible country suggestion.
 *
 * Deliberately NOT a redirect. It reads the visitor's country from /api/geo
 * (hosting header), shows a small card, and lets the visitor choose. The
 * choice is remembered in localStorage so it never nags.
 */
export default function CountrySuggestion() {
  const pathname = usePathname();
  const [market, setMarket] = useState<SuggestedMarket | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Admin, auth and Studio areas are not part of the public journey.
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/studio")
    ) {
      return;
    }

    let dismissed = false;
    try {
      dismissed = Boolean(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      // Storage may be blocked; treat as not dismissed.
    }
    if (dismissed) return;

    // Never suggest the market the visitor is already reading.
    const currentSegment = pathname.split("/")[1]?.toLowerCase() ?? "";

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch("/api/geo", { signal: controller.signal, cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { market?: SuggestedMarket | null } | null) => {
          const detected = data?.market;
          if (!detected) return;
          if (detected.code.toLowerCase() === currentSegment) return;
          setMarket(detected);
          setVisible(true);
        })
        .catch(() => {
          // Geo detection is best-effort only.
        });
    }, 1200);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  if (!visible || !market) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // Ignore storage failures.
    }
  };

  return (
    <aside
      aria-label="Country suggestion"
      translate="no"
      className="notranslate fixed bottom-4 left-4 z-[60] w-[calc(100%-2rem)] max-w-sm border border-slate-200 bg-white p-4 shadow-[0_18px_44px_-18px_rgba(7,19,36,0.45)] sm:bottom-6 sm:left-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-[#0047BB]">Suggested market</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
            It looks like you are visiting from{" "}
            <strong className="font-semibold text-[#0f172a]">
              {market.country}
            </strong>
            . View the country page for local project information.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss country suggestion"
          className="-mr-1 -mt-1 shrink-0 p-1 text-slate-400 transition-colors hover:text-[#0f172a]"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href={market.path}
          onClick={dismiss}
          className="inline-flex items-center gap-2 border-b border-[#0047BB] pb-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#0047BB] transition-opacity hover:opacity-70"
        >
          View {market.shortName} page
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          href="/markets"
          onClick={dismiss}
          className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-[#0f172a]"
        >
          All markets
        </Link>
      </div>
    </aside>
  );
}
