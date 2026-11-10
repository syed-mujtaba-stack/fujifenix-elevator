/**
 * Client-safe role definitions. This module must NOT import next/headers or
 * any server-only code — it is used by client components (Sidebar, TopBar,
 * settings, users) for labels and role types.
 */

export type AdminRole = "superadmin" | "admin" | "editor" | "viewer"

export const ROLES: AdminRole[] = ["superadmin", "admin", "editor", "viewer"]

export const ROLE_LABELS: Record<AdminRole, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
}

export const ROLE_ORDER: Record<AdminRole, number> = {
  viewer: 0,
  editor: 1,
  admin: 2,
  superadmin: 3,
}