import Link from "next/link";
import { PRODUCT_MENU } from "@/app/data/content";

interface ProductSidebarProps {
  currentHref: string;
}

export default function ProductSidebar({ currentHref }: ProductSidebarProps) {
  const items = PRODUCT_MENU.flatMap((g) => g.items);

  return (
    <div className="border border-slate-200 bg-[#f8fafc] p-3 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="eyebrow text-[#0047BB] px-3 pt-2 pb-3">PRODUCTS</div>
      <nav className="flex flex-col gap-1" aria-label="Products">
        {items.map((it) => {
          const active = it.href === currentHref;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors duration-150 ${
                active
                  ? "bg-blue-50/70 text-[#0047BB] font-semibold"
                  : "text-slate-600 hover:bg-blue-50/50 hover:text-[#0047BB]"
              }`}
            >
              <span
                className={`h-1 w-1 flex-shrink-0 rounded-full ${
                  active ? "bg-[#0047BB]" : "bg-slate-300"
                }`}
                aria-hidden="true"
              />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
