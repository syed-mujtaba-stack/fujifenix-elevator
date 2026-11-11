import Link from "next/link";
import { marketPath, marketPriorityLabel, type Market } from "@/lib/markets";

export default function MarketCard({ market }: { market: Market }) {
  return (
    <Link
      href={marketPath(market.slug)}
      className="group flex h-full flex-col border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0047BB] hover:shadow-[0_18px_44px_-28px_rgba(0,71,187,0.5)] md:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow text-[#0047BB]">{market.region}</span>
        <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {marketPriorityLabel(market)}
        </span>
      </div>

      <h3 className="heading mt-5 text-[clamp(22px,2.4vw,28px)] text-[#0f172a] transition-colors group-hover:text-[#0047BB]">
        {market.country}
      </h3>

      <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-slate-500">
        {market.metaDescription}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {market.cities.slice(0, 3).map((city) => (
          <span
            key={city}
            className="border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500"
          >
            {city}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-6">
        <span className="eyebrow text-[#0047BB]">Explore market</span>
        <span
          aria-hidden="true"
          className="text-[#0047BB] transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}
