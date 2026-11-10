import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminInquiryListQuery } from '@/lib/admin-queries'
import InboxClient, { type InquiryRow } from './InboxClient'

export default async function InquiriesPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole

  const canReadPII = hasPermission(role, 'inquiries.read')
  const canWrite = hasPermission(role, 'inquiries.write')
  const canAggregate = hasPermission(role, 'inquiries.aggregate')
  if (!canReadPII && !canAggregate) redirect('/dashboard')

  const raw = await adminClient.fetch<any[]>(adminInquiryListQuery)

  // PII minimisation: roles without 'inquiries.read' get neither contact
  // details nor subject/message content — only aggregate view of the funnel.
  const inquiries: InquiryRow[] = canReadPII
    ? raw.map((r) => ({
        _id: r._id,
        name: r.name ?? '—',
        email: r.email ?? '',
        phone: r.phone ?? null,
        country: r.country ?? null,
        city: r.city ?? null,
        company: r.company ?? null,
        subject: r.subject ?? '—',
        status: r.status ?? 'new',
        source: r.source ?? 'contact',
        assignedTo: r.assignedTo ?? null,
        createdAt: r.createdAt ?? r._createdAt ?? null,
      }))
    : raw.map((r) => ({
        _id: r._id,
        name: '—',
        email: '',
        phone: null,
        country: null,
        city: null,
        company: null,
        subject: '—',
        status: r.status ?? 'new',
        source: r.source ?? 'contact',
        assignedTo: null,
        createdAt: r.createdAt ?? r._createdAt ?? null,
      }))

  return (
    <InboxClient
      inquiries={inquiries}
      canReadPII={canReadPII}
      canWrite={canWrite}
      role={role}
    />
  )
}