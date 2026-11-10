'use server'

import { revalidatePath } from 'next/cache'
import { adminClient } from '@/sanity/lib/server'
import { requirePermission, logAudit } from '@/lib/admin'

export interface PopupInput {
  title: string
  type: 'modal' | 'banner' | 'slide-in' | 'fullscreen'
  trigger: 'onLoad' | 'onScroll' | 'onExit' | 'onClick' | 'timer'
  triggerConfig?: { delay?: number | null; scrollPercentage?: number | null; selector?: string | null } | null
  content: {
    headline?: string | null
    subheadline?: string | null
    body?: string | null
    primaryCTA?: { text?: string | null; url?: string | null; style?: string | null } | null
    secondaryCTA?: { text?: string | null; url?: string | null; style?: string | null } | null
  }
  targeting?: {
    paths?: string[] | null
    countries?: string[] | null
    devices?: string[] | null
    showOnce?: boolean | null
    frequencyCap?: number | null
  } | null
  schedule?: { startDate?: string | null; endDate?: string | null; timezone?: string | null } | null
  isActive: boolean
  priority: number
}

export async function createPopup(input: PopupInput) {
  const actor = await requirePermission('popups.write')
  if (!input.title?.trim()) throw new Error('Title is required')
  const doc = await adminClient.create({
    _type: 'popup',
    title: input.title.trim(),
    type: input.type ?? 'modal',
    trigger: input.trigger ?? 'onLoad',
    triggerConfig: input.triggerConfig ?? undefined,
    content: {
      headline: input.content?.headline || undefined,
      subheadline: input.content?.subheadline || undefined,
      body: input.content?.body || undefined,
      primaryCTA: input.content?.primaryCTA?.text || input.content?.primaryCTA?.url
        ? { text: input.content.primaryCTA.text || undefined, url: input.content.primaryCTA.url || undefined, style: input.content.primaryCTA.style || 'primary' }
        : undefined,
      secondaryCTA: input.content?.secondaryCTA?.text || input.content?.secondaryCTA?.url
        ? { text: input.content.secondaryCTA.text || undefined, url: input.content.secondaryCTA.url || undefined, style: input.content.secondaryCTA.style || 'secondary' }
        : undefined,
    },
    targeting: input.targeting ?? undefined,
    schedule: input.schedule ?? undefined,
    isActive: input.isActive ?? true,
    priority: input.priority ?? 0,
    analytics: { impressions: 0, clicks: 0, conversions: 0 },
  })
  await logAudit({
    action: 'create',
    entityType: 'popup',
    entityId: doc._id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { title: input.title },
  })
  revalidatePath('/dashboard/popups')
  return { ok: true, id: doc._id }
}

export async function updatePopup(id: string, input: PopupInput) {
  const actor = await requirePermission('popups.write')
  if (!input.title?.trim()) throw new Error('Title is required')
  const target = await adminClient.fetch<{ _id: string } | null>(`*[_type == "popup" && _id == $id][0] { _id }`, { id })
  if (!target) throw new Error('Popup not found')
  await adminClient
    .patch(id)
    .set({
      title: input.title.trim(),
      type: input.type ?? 'modal',
      trigger: input.trigger ?? 'onLoad',
      triggerConfig: input.triggerConfig ?? undefined,
      content: {
        headline: input.content?.headline || undefined,
        subheadline: input.content?.subheadline || undefined,
        body: input.content?.body || undefined,
        primaryCTA: input.content?.primaryCTA?.text || input.content?.primaryCTA?.url
          ? { text: input.content.primaryCTA.text || undefined, url: input.content.primaryCTA.url || undefined, style: input.content.primaryCTA.style || 'primary' }
          : undefined,
        secondaryCTA: input.content?.secondaryCTA?.text || input.content?.secondaryCTA?.url
          ? { text: input.content.secondaryCTA.text || undefined, url: input.content.secondaryCTA.url || undefined, style: input.content.secondaryCTA.style || 'secondary' }
          : undefined,
      },
      targeting: input.targeting ?? undefined,
      schedule: input.schedule ?? undefined,
      isActive: input.isActive ?? true,
      priority: input.priority ?? 0,
    })
    .commit()
  await logAudit({
    action: 'update',
    entityType: 'popup',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { title: input.title },
  })
  revalidatePath('/dashboard/popups')
  return { ok: true }
}

export async function togglePopupActive(id: string, isActive: boolean) {
  const actor = await requirePermission('popups.write')
  await adminClient.patch(id).set({ isActive }).commit()
  await logAudit({
    action: 'update',
    entityType: 'popup',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { field: 'isActive', value: isActive },
  })
  revalidatePath('/dashboard/popups')
  return { ok: true }
}

export async function deletePopup(id: string) {
  const actor = await requirePermission('popups.write')
  const target = await adminClient.fetch<{ _id: string; title: string } | null>(`*[_type == "popup" && _id == $id][0] { _id, title }`, { id })
  if (!target) throw new Error('Popup not found')
  await adminClient.delete(id)
  await logAudit({
    action: 'delete',
    entityType: 'popup',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { title: target.title },
  })
  revalidatePath('/dashboard/popups')
  return { ok: true }
}