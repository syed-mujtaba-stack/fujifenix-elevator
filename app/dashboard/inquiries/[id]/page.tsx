import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminInquiryDetailQuery } from '@/lib/admin-queries'
import InquiryDetailClient, { type InquiryDetail } from '../InquiryDetailClient'

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole

  const canReadPII = hasPermission(role, 'inquiries.read')
  const canWrite = hasPermission(role, 'inquiries.write')
  if (!canReadPII) redirect('/dashboard/inquiries')

  const [detail, admins] = await Promise.all([
    adminClient.fetch<any>(adminInquiryDetailQuery, { id }),
    adminClient.fetch<Array<{ _id: string; name: string | null }>>(
      `*[_type == "adminUser" && isActive == true] | order(name asc) { _id, name }`
    ),
  ])

  if (!detail) notFound()

  const data: InquiryDetail = {
    _id: detail._id,
    name: detail.name ?? '—',
    email: detail.email ?? '',
    phone: detail.phone ?? null,
    country: detail.country ?? null,
    city: detail.city ?? null,
    company: detail.company ?? null,
    subject: detail.subject ?? 'No subject',
    message: detail.message ?? '',
    projectType: detail.projectType ?? null,
    floors: detail.floors ?? null,
    units: detail.units ?? null,
    status: detail.status ?? 'new',
    source: detail.source ?? 'contact',
    assignedToId: detail.assignedTo?._id ?? null,
    assignedToName: detail.assignedTo?.name ?? null,
    replies: (detail.replies ?? []).map((r: any) => ({
      key: r._key ?? String(Math.random()),
      message: r.message ?? '',
      sentBy: r.sentBy ?? 'Unknown',
      sentAt: r.sentAt ?? null,
      isInternal: Boolean(r.isInternal),
    })),
    createdAt: detail.createdAt ?? null,
    updatedAt: detail.updatedAt ?? null,
  }

  return <InquiryDetailClient detail={data} admins={admins} canWrite={canWrite} isSuperAdmin={role === 'superadmin'} />
}