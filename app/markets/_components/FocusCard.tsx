import Image from "next/image";
import Link from "next/link";
import { getSafeImageUrl } from "@/app/lib/safeImageUrl";
import type { ProductFocus } from "@/lib/product-focuses";

interface FocusCardProps {
  focus: ProductFocus;
  href: string;
  kicker?: string;
}

export default function FocusCard({ focus, href, kicker }: FocusCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0047BB] hover:shadow-[0_18px_44px_-28px_rgba(0,71,187,0.5)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={getSafeImageUrl(focus.image)}
          alt={focus.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/45 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 eyebrow text-white/90">
          {kicker ?? focus.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="heading text-[19px] text-[#0f172a] transition-colors group-hover:text-[#0047BB] md:text-[21px]">
          {focus.shortTitle}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-500">
          {focus.summary}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <span className="eyebrow text-[#0047BB]">View details</span>
          <span
            aria-hidden="true"
            className="text-[#0047BB] transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
