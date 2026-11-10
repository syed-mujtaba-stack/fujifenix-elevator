import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { saveSubscription } from '@/lib/push'
import { logAudit, getRequestMeta } from '@/lib/admin'

const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const { endpoint, keys, expirationTime } = body?.subscription ?? {}
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 })
    }
    const req = await (async () => {
      try {
        return await getRequestMeta()
      } catch {
        return { userAgent: '', ip: '', device: 'Unknown' }
      }
    })()
    await saveSubscription(session.user.id, { endpoint, keys, expirationTime: expirationTime ?? null }, req.userAgent)
    await logAudit({
      action: 'push_subscribe',
      entityType: 'push',
      entityId: session.user.id,
      actorId: session.user.id,
      sessionId: session.user.sessionId,
    })
    // Provide the VAPID public key so the client can lazily create its sub.
    return NextResponse.json({ ok: true, publicKey: PUBLIC_VAPID_KEY || null })
  } catch (err) {
    console.error('[push/subscribe]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}