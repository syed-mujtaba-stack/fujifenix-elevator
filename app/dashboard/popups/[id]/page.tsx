import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminPopupDetailQuery } from '@/lib/admin-queries'
import PopupForm from '../PopupForm'

export default async function EditPopupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'popups.write')) redirect('/dashboard/popups')

  const raw = await adminClient.fetch<any>(adminPopupDetailQuery, { id })
  if (!raw) notFound()

  return (
    <PopupForm
      initial={{
        _id: raw._id,
        title: raw.title ?? '',
        type: raw.type ?? 'modal',
        trigger: raw.trigger ?? 'onLoad',
        triggerConfig: raw.triggerConfig ?? null,
        content: raw.content ?? {},
        targeting: raw.targeting ?? {},
        schedule: raw.schedule ?? null,
        isActive: raw.isActive ?? false,
        priority: raw.priority ?? 0,
      }}
    />
  )
}