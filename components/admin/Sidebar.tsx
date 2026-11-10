"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  SquarePen,
  TrendingUp,
  Users,
  ScrollText,
  MonitorSmartphone,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_LABELS, type AdminRole } from "@/lib/roles";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: "dashboard" | "products" | "inquiries" | "popups" | "analytics" | "users" | "audit" | "sessions" | "settings";
  badge?: number | null;
}

const ICONS: Record<AdminNavItem["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  products: Package,
  inquiries: MessageSquare,
  popups: SquarePen,
  analytics: TrendingUp,
  users: Users,
  audit: ScrollText,
  sessions: MonitorSmartphone,
  settings: Settings,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  nav: AdminNavItem[];
  role: AdminRole;
  userName?: string | null;
}

const GROUPS: { title: string; keys: AdminNavItem["icon"][] }[] = [
  { title: "Overview", keys: ["dashboard"] },
  { title: "Manage", keys: ["products", "inquiries", "popups", "analytics"] },
  { title: "Security", keys: ["users", "audit", "sessions"] },
  { title: "Account", keys: ["settings"] },
];

export function AdminSidebar({ isOpen, onClose, nav, role, userName }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const byIcon = (icon: AdminNavItem["icon"]) => nav.find((n) => n.icon === icon);
  const has = (icon: AdminNavItem["icon"]) => Boolean(byIcon(icon));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 w-64 bg-[#071324] text-slate-300 z-50",
          "transition-transform duration-300 shadow-2xl border-r border-white/5",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        aria-label="Admin sidebar"
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#0047BB] text-white font-black tracking-tight text-sm">
              FF
            </span>
            <span className="leading-tight">
              <span className="block text-white text-sm font-bold tracking-wide">Fuji Fenix</span>
              <span className="block text-[11px] text-slate-400 uppercase tracking-widest">Admin</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-white/10 text-slate-300"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {GROUPS.filter((g) => g.keys.some(has)).map((group) => (
            <div key={group.title}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.keys
                  .map(byIcon)
                  .filter(Boolean)
                  .map((item) => {
                    const Icon = ICONS[item!.icon];
                    return (
                      <li key={item!.href}>
                        <Link
                          href={item!.href}
                          onClick={onClose}
                          className={cn(
                            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                            "transition-colors duration-150",
                            isActive(item!.href)
                              ? "bg-[#0047BB] text-white shadow-[0_4px_16px_rgba(0,71,187,0.45)]"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <Icon className="w-[18px] h-[18px]" />
                          <span className="flex-1">{item!.label}</span>
                          {item!.badge ? (
                            <span className="min-w-[20px] h-5 px-1.5 grid place-items-center rounded-full bg-red-500 text-white text-[11px] font-semibold">
                              {item!.badge > 99 ? "99+" : item!.badge}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/5 p-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">{userName ?? "Admin"}</span>
            <span className="shrink-0 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 uppercase tracking-wider">
              {ROLE_LABELS[role]}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}