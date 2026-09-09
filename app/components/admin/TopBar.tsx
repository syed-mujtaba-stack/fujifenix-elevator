"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  LogOut,
  Search,
  Shield,
  Clock,
  Bell,
  User,
  ArrowDownUp,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminTopBar({
  onMenuClick,
  isSidebarOpen,
}: {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Close sidebar when topbar search is focused on mobile
    const handleClickOutside = (event: MouseEvent) => {
      if (searchOpen && event.target instanceof HTMLElement && !event.target.closest(".absolute")) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchOpen]);

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        bg-white/90 backdrop-blur-md shadow-[0_2px_24px_rgba(15,23,42,0.04)]
        py-3 md:py-5
      "
    >
      {/* Thin blue top border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#0047BB]" aria-hidden="true" />

      {/* Bottom hairline */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-slate-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* ── DESKTOP ROW (≥1280px) ── */}
      <div className="hidden xl:flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16">
        {/* LEFT: Logo / Admin Title */}
        <div className="flex items-center gap-3">
          <span className="text-[#0047BB] text-xl font-bold tracking-wider">FUJI FENIX</span>
          <span className="text-slate-500 text-sm">Admin</span>
        </div>

        {/* CENTER: Navigation */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center list-none m-0 p-0" style={{ gap: "clamp(16px, 2vw, 32px)" }}>
            {[
              { label: "Dashboard", href: "/dashboard", active: pathname === "/" },
              { label: "Products", href: "/dashboard/products", active: pathname.startsWith("/dashboard/products") },
              { label: "Inquiries", href: "/dashboard/inquiries", active: pathname.startsWith("/dashboard/inquiries") },
              { label: "Popups", href: "/dashboard/popups", active: pathname.startsWith("/dashboard/popups") },
              { label: "Settings", href: "/dashboard/settings", active: pathname.startsWith("/dashboard/settings") },
            ].map((l) => {
              const active = l.active || pathname === l.href;
              return (
                <li
                  key={l.label}
                  className={cn("whitespace-nowrap", active ? "relative" : "")
                }
                >
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "eyebrow inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200",
                      active ? "text-[#0047BB]" : "text-slate-600 hover:text-[#0047BB]"
                    )}
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: Utilities */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Language selector / search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-8 py-1.5 pr-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent w-64"
              onClick={() => setSearchOpen(true)}
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
          </div>

          {/* Get A Quote CTA */}
          <Link
            href="/cta"
            className="group inline-flex items-center justify-center gap-2 bg-[#0047BB] hover:bg-[#003A94] text-white eyebrow px-5 py-2.5 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            NEW INQUIRY
            <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
          </Link>

          {/* Sidebar toggle for mobile */}
          <button
            className="flex items-center justify-center w-11 h-11 -mr-1 text-[#0f172a] rounded-sm
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]"
            onClick={() => onMenuClick()}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isSidebarOpen}
            aria-controls="admin-sidebar"
          >
            <span className="relative w-5 h-[14px] flex flex-col justify-between" aria-hidden="true">
              <span
                className={`absolute top-0 left-0 w-5 h-px bg-current origin-center transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-px bg-current transition-opacity duration-300 ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute bottom-0 left-0 w-5 h-px bg-current origin-center transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── MOBILE / TABLET ROW (<1280px) ── */}
      <div className="xl:hidden flex items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="text-[#0047BB] text-xl font-bold tracking-wider">FUJI FENIX</span>
        </div>

        <button
          className="flex items-center justify-center w-11 h-11 -mr-1 text-[#0f172a] rounded-sm
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]"
          onClick={() => onMenuClick()}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          aria-controls="admin-sidebar"
        >
          <span className="relative w-5 h-[14px] flex flex-col justify-between" aria-hidden="true">
            <span
              className={`absolute top-0 left-0 w-5 h-px bg-current origin-center transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-px bg-current transition-opacity duration-300 ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute bottom-0 left-0 w-5 h-px bg-current origin-center transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}