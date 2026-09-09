"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, LogOut, Settings, Shield, Clock, Bell, Users, Package, MessageSquare, SquarePen, TrendingUp, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navHeight?: number;
}

export function AdminSidebar({ isOpen, onClose, navHeight = 64 }: SidebarProps) {
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
    { label: "Popups", href: "/dashboard/popups", icon: SquarePen },
    { label: "Settings", href: "/dashboard/settings", icon: Shield },
  ];

  const adminLinks = [
    { label: "Admin Users", href: "/dashboard/settings/users", icon: Users, requireSuperAdmin: true },
  ];

  return (
    <div
      className="
        fixed left-0 top-0 bottom-0 w-64 bg-[#071324] transition-all duration-300
        shadow-[0_8px_32px_rgba(15,23,42,0.08)]
        z-50
        border-r border-slate-100
      "
      onClick={onClose}
      aria-label="Admin sidebar"
    >
      <div className="h-16 flex items-center justify-center border-b border-slate-100">
        <span className="text-white text-lg font-bold tracking-wider">Fuji Fenix Admin</span>
      </div>

      <nav className="flex flex-col px-4 py-6 overflow-y-auto gap-2">
        {/* Dashboard links */}
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="
              flex items-center gap-3 py-3 px-3 rounded-md text-slate-400 hover:text-[#0047BB] transition-colors duration-150
              group
            "
            aria-current={link.href === window.location.pathname ? "page" : undefined}
          >
            <link.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium transition-colors duration-150">{link.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div className="h-px bg-slate-100 my-6" />

        {/* Admin-only links (superadmin) */}
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="
              flex items-center gap-3 py-3 px-3 rounded-md text-slate-400 hover:text-[#0047BB] transition-colors duration-150
              group
            "
          >
            <link.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium transition-colors duration-150">{link.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div className="h-px bg-slate-100 my-6" />

        {/* Authentication & Security */}
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem("isLoggedIn");
              if (isLoggedIn) {
                sessionStorage.removeItem("isLoggedIn");
                onClose();
              } else {
                window.location.href = "/auth/login";
              }
            }}
          >
            {typeof window !== "undefined" && sessionStorage.getItem("isLoggedIn")
              ? <LogOut className="w-4 h-4 mr-2" />
              : <LogIn className="w-4 h-4 mr-2" />}
            {typeof window !== "undefined" && sessionStorage.getItem("isLoggedIn")
              ? "Logout" : "Login"}
          </Button>
        </div>
      </nav>
    </div>
  );
}