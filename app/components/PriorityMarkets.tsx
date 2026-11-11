import Link from "next/link";
import {
  getPriorityMarkets,
  marketPath,
  marketPriorityLabel,
} from "@/lib/markets";
import {
  PRIORITY_TIER_COPY,
  PRIORITY_TIER_MARKETS,
  priorityMarketHref,
} from "@/lib/market-priority";

/**
 * Priority markets band on the home page.
 *
 * Tier 1 markets get full cards because they are the primary export and
 * sourcing targets. Tier 2 and tier 3 are exposed as compact link groups so
 * every priority country is one click from the highest-authority page.
 */
export default function PriorityMarkets() {
  const tier1 = getPriorityMarkets(1);

  return (
    <section id="markets" className="border-t border-slate-200 bg-white section-gap">
      <div className="container-gutter">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-[#0047BB]" />
          <span className="eyebrow text-[#0047BB]">PRIORITY MARKETS</span>
        </div>

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="heading text-[#0f172a]"
            style={{ fontSize: "var(--fs-h2)" }}
          >
            TARGETED FOR
            <br />
            <span className="text-[#0047BB]">EXPORT GROWTH</span>
          </h2>
          <p className="body-text max-w-md text-slate-500">
            Manufacturer and export sourcing, regional elevator and escalator
            supply, and product and application demand — focused on eight priority
            markets across South Asia, the Gulf and Africa.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {tier1.map((market) => (
            <Link
              key={market.slug}
              href={marketPath(market.slug)}
              className="group flex flex-col bg-white p-6 transition-colors duration-300 hover:bg-[#f8fafc] md:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow text-[#0047BB]">{market.region}</span>
                <span
                  aria-hidden="true"
                  className="text-[#0047BB] transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </div>
              <h3 className="heading mt-5 text-[clamp(20px,2.2vw,26px)] text-[#0f172a] transition-colors group-hover:text-[#0047BB]">
                {market.shortName}
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
                {market.cities.slice(0, 3).join(" · ")}
              </p>
              <span className="mt-5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {marketPriorityLabel(market)}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-2">
          {([2, 3] as const).map((tier) => {
            const copy = PRIORITY_TIER_COPY[tier];
            return (
              <div key={tier}>
                <div className="eyebrow text-[#0047BB]">{copy.eyebrow}</div>
                <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-slate-500">
                  {copy.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {PRIORITY_TIER_MARKETS[tier].map((entry) => (
                    <Link
                      key={entry.slug}
                      href={priorityMarketHref(entry.code)}
                      className="border border-slate-200 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 transition-colors hover:border-[#0047BB] hover:text-[#0047BB]"
                    >
                      {entry.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 border-b border-[#0047BB] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB] transition-opacity hover:opacity-70"
          >
            Explore all markets
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
