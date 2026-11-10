import Link from "next/link";

interface CtaBandProps {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function CtaBand({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Request a quotation",
  secondaryHref = "/products",
  secondaryLabel = "View product range",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-[#071324] py-16 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0047BB]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#3b82f6]/10 blur-3xl"
      />
      <div className="container-gutter relative mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#60a5fa]" aria-hidden="true" />
            <span className="eyebrow text-[#60a5fa]">Next step</span>
          </div>
          <h2
            className="heading text-white"
            style={{ fontSize: "var(--fs-h2)" }}
          >
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="group inline-flex items-center justify-center gap-3 bg-[#0047BB] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#003a99]"
          >
            {primaryLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center border border-white/20 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-white/60"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
