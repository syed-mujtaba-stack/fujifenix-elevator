import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
      <div className="container-gutter mx-auto max-w-[1440px]">
        <ol className="flex flex-wrap items-center gap-2 py-4">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-[10px] text-slate-300">
                  /
                </span>
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="eyebrow text-slate-500 transition-colors hover:text-[#0047BB]"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="eyebrow text-[#0047BB]">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
