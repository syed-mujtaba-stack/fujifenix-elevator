"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/admin/ThemeProvider";
import { AdminSidebar, type AdminNavItem } from "@/components/admin/Sidebar";
import { AdminTopBar } from "@/components/admin/TopBar";
import { PwaRegistration } from "@/components/admin/PwaRegistration";
import type { AdminRole } from "@/lib/admin";

export interface ShellUser {
  name?: string | null;
  email?: string | null;
  role: AdminRole;
}

export function AdminShell({
  nav,
  user,
  inquiryCount,
  mustChangePassword,
  children,
}: {
  nav: AdminNavItem[];
  user: ShellUser;
  inquiryCount: number;
  mustChangePassword?: boolean;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <SessionProvider>
        <PwaRegistration />
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1220] text-slate-900 dark:text-slate-100">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            nav={nav}
            role={user.role}
            userName={user.name}
          />
          <div className="lg:pl-64 min-h-screen flex flex-col">
            <AdminTopBar
              onMenuClick={() => setSidebarOpen(true)}
              inquiryCount={inquiryCount}
              user={user}
              mustChangePassword={mustChangePassword}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}