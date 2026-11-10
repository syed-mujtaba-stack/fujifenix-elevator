'use server'

import { revalidatePath } from 'next/cache'
import { adminClient } from '@/sanity/lib/server'
import { requirePermission, logAudit } from '@/lib/admin'

const INQUIRY_STATUSES = ['new', 'reading', 'replied', 'closed'] as const

export async function updateInquiryStatus(id: string, status: string) {
  const actor = await requirePermission('inquiries.write')
  if (!INQUIRY_STATUSES.includes(status as any)) throw new Error('Invalid status')
  const target = await adminClient.fetch<{ _id: string } | null>(`*[_type == "inquiry" && _id == $id][0] { _id }`, { id })
  if (!target) throw new Error('Inquiry not found')
  await adminClient
    .patch(id)
    .set({ status, updatedAt: new Date().toISOString() })
    .commit()
  await logAudit({
    action: 'update',
    entityType: 'inquiry',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { field: 'status', value: status },
  })
  revalidatePath('/dashboard/inquiries')
  revalidatePath(`/dashboard/inquiries/${id}`)
  return { ok: true }
}

export async function addInquiryReply(input: { inquiryId: string; message: string; isInternal: boolean }) {
  const actor = await requirePermission('inquiries.write')
  if (!input.message?.trim()) throw new Error('Message is required')
  const doc = {
    _key: `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    message: input.message.trim(),
    sentBy: { _ref: actor.userId },
    sentAt: new Date().toISOString(),
    isInternal: input.isInternal,
  }
  await adminClient
    .patch(input.inquiryId)
    .setIfMissing({ replies: [] })
    .insert('after', 'replies[-1]', [doc])
    .set({ updatedAt: new Date().toISOString(), ...(input.isInternal ? {} : { status: 'replied' }) })
    .commit()
  await logAudit({
    action: 'update',
    entityType: 'inquiry',
    entityId: input.inquiryId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { field: input.isInternal ? 'internal_note' : 'reply_sent' },
  })
  revalidatePath('/dashboard/inquiries')
  revalidatePath(`/dashboard/inquiries/${input.inquiryId}`)
  return { ok: true }
}

export async function assignInquiry(inquiryId: string, userId: string | null) {
  const actor = await requirePermission('inquiries.write')
  if (userId) {
    const exists = await adminClient.fetch<{ _id: string } | null>(`*[_type == "adminUser" && _id == $id][0] { _id }`, { id: userId })
    if (!exists) throw new Error('Assignee not found')
  }
  await adminClient
    .patch(inquiryId)
    .set({ assignedTo: userId ? { _ref: userId } : null, updatedAt: new Date().toISOString() })
    .commit()
  await logAudit({
    action: 'update',
    entityType: 'inquiry',
    entityId: inquiryId,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { field: 'assignedTo', value: userId ?? 'unassigned' },
  })
  revalidatePath('/dashboard/inquiries')
  revalidatePath(`/dashboard/inquiries/${inquiryId}`)
  return { ok: true }
}

/** Superadmin-only physical delete (retention policy: prefer closing, not deleting). */
export async function deleteInquiry(id: string) {
  const actor = await requirePermission('inquiries.write')
  if (actor.role !== 'superadmin') throw new Error('FORBIDDEN')
  const target = await adminClient.fetch<{ _id: string; subject: string | null } | null>(
    `*[_type == "inquiry" && _id == $id][0] { _id, subject }`,
    { id }
  )
  if (!target) throw new Error('Inquiry not found')
  await adminClient.delete(id)
  await logAudit({
    action: 'delete',
    entityType: 'inquiry',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { subject: target.subject },
  })
  revalidatePath('/dashboard/inquiries')
  return { ok: true }
}

/** Full PII export (GDPR subject-request / backup). CSV string returned to the admin. */
export async function exportInquiries() {
  const actor = await requirePermission('inquiries.read')
  const rows = await adminClient.fetch<Array<Record<string, any>>>(
    `*[_type == "inquiry"] | order(_createdAt desc) {
      _id, name, email, phone, country, city, company, subject, message,
      "assignedTo": assignedTo->name, status, source, createdAt
    }`
  )
  await logAudit({
    action: 'export',
    entityType: 'inquiry',
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { rows: rows.length },
  })
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Country', 'City', 'Company', 'Subject', 'Message', 'AssignedTo', 'Status', 'Source', 'CreatedAt']
  const esc = (v: unknown) => {
    const s = String(v ?? '')
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const csv = [headers.join(','), ...rows.map((r) => [r._id, r.name, r.email, r.phone, r.country, r.city, r.company, r.subject, r.message, r.assignedTo, r.status, r.source, r.createdAt].map(esc).join(','))].join('\n')
  return { ok: true, csv }
}