import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminUsersQuery } from '@/lib/admin-queries'
import UsersClient, { type UserRow } from './UsersClient'

export default async function UsersPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'users.read')) redirect('/dashboard')

  const users = await adminClient.fetch<any[]>(adminUsersQuery)

  const rows: UserRow[] = users.map((u) => ({
    _id: u._id,
    name: u.name ?? '—',
    email: u.email ?? '',
    phone: u.phone ?? null,
    role: u.role ?? 'viewer',
    isActive: Boolean(u.isActive),
    twoFactorEnabled: Boolean(u.twoFactorEnabled),
    mustChangePassword: Boolean(u.mustChangePassword),
    lastLogin: u.lastLogin ?? null,
    createdAt: u.createdAt ?? null,
    openSessions: u.openSessions ?? 0,
  }))

  return <UsersClient users={rows} isSuperAdmin={role === 'superadmin'} currentUserId={session!.user.id} currentRole={role} />
}