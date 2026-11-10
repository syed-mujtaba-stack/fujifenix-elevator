import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { hasPermission, type AdminRole } from '@/lib/admin'
import PopupForm from '../PopupForm'

export default async function NewPopupPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'popups.write')) redirect('/dashboard/popups')

  return <PopupForm initial={null} />
}