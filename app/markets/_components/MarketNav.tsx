import Link from "next/link";
import {
  getMarketsInPriorityOrder,
  marketPath,
} from "@/lib/markets";

/**
 * Compact country switcher used on market pages.
 *
 * It is a plain server-rendered link list: crawlable, works without
 * JavaScript and never redirects a visitor. Geo suggestion is handled
 * separately by CountrySuggestion (opt-in, dismissible).
 */
export default function MarketNav({
  currentCode,
}: {
  currentCode?: string;
}) {
  return (
    <nav
      aria-label="Country markets"
      translate="no"
      className="notranslate border-b border-slate-200 bg-white"
    >
      <div className="container-gutter mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-4">
          <span className="eyebrow mr-1 text-slate-400">Markets</span>
          <Link
            href="/markets"
            className="border border-slate-200 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:border-[#0047BB] hover:text-[#0047BB]"
          >
            All
          </Link>
          {getMarketsInPriorityOrder().map((market) => {
            const active = market.code === currentCode?.toUpperCase();
            return (
              <Link
                key={market.slug}
                href={marketPath(market.slug)}
                aria-current={active ? "page" : undefined}
                className={`border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-[#0047BB] bg-[#0047BB] text-white"
                    : "border-slate-200 text-slate-500 hover:border-[#0047BB] hover:text-[#0047BB]"
                }`}
              >
                {market.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
