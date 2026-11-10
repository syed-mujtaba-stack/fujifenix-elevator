"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Settings,
  Keyboard,
  Shield,
  LogOut,
  KeyRound,
  ScrollText,
  MonitorSmartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminTheme, type AdminTheme } from "@/components/admin/ThemeProvider";
import { ROLE_LABELS, type AdminRole } from "@/lib/roles";
import { auditLogout } from "@/lib/actions/settings";

interface TopBarProps {
  onMenuClick: () => void;
  inquiryCount: number;
  user: { name?: string | null; email?: string | null; role: AdminRole };
  mustChangePassword?: boolean;
}

const TITLES: Array<{ match: RegExp; title: string }> = [
  { match: /^\/dashboard\/products\/new$/, title: "New Product" },
  { match: /^\/dashboard\/products\/.+/, title: "Edit Product" },
  { match: /^\/dashboard\/products/, title: "Products" },
  { match: /^\/dashboard\/inquiries\/.+/, title: "Inquiry Detail" },
  { match: /^\/dashboard\/inquiries/, title: "Inquiries" },
  { match: /^\/dashboard\/popups\/new/, title: "New Popup" },
  { match: /^\/dashboard\/popups\/.+/, title: "Edit Popup" },
  { match: /^\/dashboard\/popups/, title: "Popups" },
  { match: /^\/dashboard\/analytics/, title: "Analytics" },
  { match: /^\/dashboard\/settings\/users/, title: "Admin Users" },
  { match: /^\/dashboard\/settings\/audit/, title: "Audit Log" },
  { match: /^\/dashboard\/settings\/sessions/, title: "Sessions" },
  { match: /^\/dashboard\/settings/, title: "Settings" },
  { match: /^\/dashboard$/, title: "Dashboard" },
];

function pageTitle(pathname: string) {
  for (const t of TITLES) if (t.match.test(pathname)) return t.title;
  return "Admin";
}

const THEME_OPTIONS: { value: AdminTheme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

export function AdminTopBar({ onMenuClick, inquiryCount, user, mustChangePassword }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useAdminTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setMenuOpen(false);
    setThemeOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await auditLogout();
    } catch {
      /* audit must never block sign-out */
    }
    await signOut({ callbackUrl: "/login" });
  };

  const initials = (user.name || user.email || "A")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-[#0b1220]/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
          {pageTitle(pathname)}
        </h1>

        {/* Command shortcut hint (search is on list pages) */}
        <button
          onClick={() => router.push("/dashboard/products?q=")}
          className="hidden md:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-lg text-sm text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span className="text-xs">Search products…</span>
        </button>

        <div className="flex-1" />

        {/* Notification bell */}
        <Link
          href="/dashboard/inquiries?status=new"
          className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={`${inquiryCount} new inquiries`}
        >
          <Bell className="w-5 h-5" />
          {inquiryCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-red-500 text-white text-[10px] font-bold">
              {inquiryCount > 99 ? "99+" : inquiryCount}
            </span>
          )}
        </Link>

        {/* Theme + user menus (shared outside-click boundary) */}
        <div className="relative flex items-center" ref={menuRef}>
          <button
            onClick={() => {
              setThemeOpen((v) => !v);
              setMenuOpen(false);
            }}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="w-5 h-5" /> : theme === "light" ? <Sun className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          </button>
          {themeOpen && (
            <div className="absolute right-14 top-full mt-2 w-40 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0e1626] shadow-xl p-1.5 z-50">
              {THEME_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setTheme(opt.value);
                      setThemeOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                      active
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={() => {
              setMenuOpen((v) => !v);
              setThemeOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full bg-[#0047BB] text-white text-xs font-bold">
              {initials}
            </span>
            <span className="hidden sm:block text-left leading-tight">
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100 max-w-[160px] truncate">
                {user.name || "Admin"}
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">{ROLE_LABELS[user.role]}</span>
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0e1626] shadow-xl p-1.5 z-50">
              <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name || "Admin"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email || ""}</p>
              </div>
              <div className="py-1">
                <MenuLink href="/dashboard/settings" icon={Settings} label="Profile & Security" />
                <MenuLink href="/dashboard/settings/sessions" icon={MonitorSmartphone} label="My Sessions" />
                {user.role === "superadmin" && (
                  <>
                    <MenuLink href="/dashboard/settings/users" icon={Shield} label="Admin Users" />
                    <MenuLink href="/dashboard/settings/audit" icon={ScrollText} label="Audit Log" />
                  </>
                )}
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {mustChangePassword && (
        <div className="px-4 sm:px-6 pb-3">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-4 py-2.5 text-sm text-amber-800 dark:text-amber-200"
          >
            <KeyRound className="w-4 h-4 shrink-0" />
            Your password was set by an administrator. Please change it before continuing critical work.
            <span className="ml-auto font-semibold underline underline-offset-2">Change password</span>
          </Link>
        </div>
      )}
    </header>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Settings;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}