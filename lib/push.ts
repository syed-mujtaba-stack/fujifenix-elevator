import webpush from 'web-push'
import { adminClient } from '@/sanity/lib/server'

/**
 * Web Push (Phase D). Subscriptions are stored as standalone `pushSubscription`
 * docs in Sanity; a user may have devices across browsers.
 *
 * VAPID keys must be present in the environment:
 *   NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
 * (generate with `npx web-push generate-vapid-keys --json`).
 */

export interface PushSubscriptionPayload {
  endpoint: string
  expirationTime?: number | null
  keys: { p256dh: string; auth: string }
}

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const privateKey = process.env.VAPID_PRIVATE_KEY
const subject = process.env.VAPID_SUBJECT || 'mailto:admin@fujifenix.com'

if (isPushConfigured()) {
  webpush.setVapidDetails(subject, publicKey!, privateKey!)
}

export function isPushConfigured(): boolean {
  return Boolean(publicKey && privateKey)
}

export interface PushMessage {
  title: string
  body: string
  url?: string
  tag?: string
}

export async function saveSubscription(userId: string, subscription: PushSubscriptionPayload, userAgent?: string) {
  const { endpoint, keys } = subscription
  const existing = await fetchSubscriptionByEndpoint(endpoint)
  if (existing) return { ok: true, id: existing._id } // already subscribed

  const doc = await adminClient.create({
    _type: 'pushSubscription',
    endpoint,
    keys: { p256dh: keys.p256dh, auth: keys.auth },
    userAgent: userAgent || undefined,
    adminUser: { _ref: userId },
    createdAt: new Date().toISOString(),
  })
  return { ok: true, id: doc._id }
}

export async function removeSubscription(endpoint: string) {
  await adminClient
    .delete({ query: `*[_type == "pushSubscription" && endpoint == $endpoint][0]`, params: { endpoint } })
    .catch(() => undefined)
  return { ok: true }
}

export async function removeSubscriptionsForUser(userId: string) {
  await adminClient
    .delete({ query: `*[_type == "pushSubscription" && adminUser._ref == $userId]`, params: { userId } })
    .catch(() => undefined)
  return { ok: true }
}

async function fetchSubscriptionByEndpoint(endpoint: string) {
  return adminClient.fetch<{ _id: string } | null>(
    `*[_type == "pushSubscription" && endpoint == $endpoint][0] { _id }`,
    { endpoint }
  )
}

/** Send a push to every subscription owned by the given admin users. */
export async function sendPushToUsers(userIds: string[], message: PushMessage) {
  if (!isPushConfigured() || userIds.length === 0) return { ok: true, sent: 0, skipped: 0, configured: false }

  const subs = await adminClient.fetch<
    Array<{ endpoint: string; keys: { p256dh: string; auth: string } | null }>
  >(`*[_type == "pushSubscription" && adminUser._ref in $ids] { endpoint, keys }`, { ids: userIds })

  if (subs.length === 0) return { ok: true, sent: 0, skipped: 0, configured: true }

  const payload = JSON.stringify({ title: message.title, body: message.body, url: message.url, tag: message.tag })
  let sent = 0
  let skipped = 0
  let failed = 0
  for (const sub of subs) {
    if (!sub.keys) {
      skipped++
      continue
    }
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
        },
        payload
      )
      sent++
    } catch (err: any) {
      // 404/410 — subscription is gone; drop it.
      if (err?.statusCode === 404 || err?.statusCode === 410) {
        await removeSubscription(sub.endpoint)
        skipped++
      } else {
        failed++
      }
    }
  }
  return { ok: true, sent, skipped, failed, configured: true }
}