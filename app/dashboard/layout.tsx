import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { AdminShell, type ShellUser } from "@/components/admin/AdminShell";
import type { AdminNavItem } from "@/components/admin/Sidebar";
import { adminClient } from "@/sanity/lib/server";
import { isSessionValid, hasPermission, type AdminRole } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Server-side gate for the entire /dashboard area.
 *
 * 1. Authenticated? (cookie)                                              → middleware handles.
 * 2. Session document still valid (not revoked, not expired)?             → here.
 * 3. Account still active + current role read from the database?          → here.
 *
 * The database is authoritative for role + active status so demotion or
 * deactivation takes effect on the next navigation — not only on re-login.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const valid = await isSessionValid((session.user as any).sessionId as string | undefined);
  if (!valid) {
    redirect("/login?error=sessionrevoked");
  }

  const user = await adminClient.fetch<
    { role: string; isActive: boolean; name: string | null; mustChangePassword?: boolean } | null
  >(`*[_type == "adminUser" && _id == $id][0] { role, isActive, name, mustChangePassword }`, {
    id: session.user.id,
  });

  if (!user || !user.isActive) {
    redirect("/login?error=deactivated");
  }

  const role = user.role as AdminRole;

  const newInquiryCount = await adminClient.fetch<number>(`count(*[_type == "inquiry" && status == "new"])`);

  const nav: AdminNavItem[] = [];
  if (hasPermission(role, "products.read")) nav.push({ label: "Products", href: "/dashboard/products", icon: "products" });
  if (hasPermission(role, "inquiries.aggregate"))
    nav.push({ label: "Inquiries", href: "/dashboard/inquiries", icon: "inquiries", badge: newInquiryCount });
  if (hasPermission(role, "popups.read")) nav.push({ label: "Popups", href: "/dashboard/popups", icon: "popups" });
  if (hasPermission(role, "analytics.read")) nav.push({ label: "Analytics", href: "/dashboard/analytics", icon: "analytics" });
  if (hasPermission(role, "users.read")) nav.push({ label: "Admin Users", href: "/dashboard/settings/users", icon: "users" });
  if (hasPermission(role, "audit.read")) nav.push({ label: "Audit Log", href: "/dashboard/settings/audit", icon: "audit" });
  if (hasPermission(role, "sessions.read")) nav.push({ label: "Sessions", href: "/dashboard/settings/sessions", icon: "sessions" });
  nav.push({ label: "Settings", href: "/dashboard/settings", icon: "settings" });

  const shellUser: ShellUser = {
    name: user.name,
    email: session.user.email,
    role,
  };

  return (
    <AdminShell nav={nav} user={shellUser} inquiryCount={newInquiryCount} mustChangePassword={user.mustChangePassword}>
      {children}
    </AdminShell>
  );
}