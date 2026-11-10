import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { removeSubscription } from '@/lib/push'
import { logAudit } from '@/lib/admin'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const endpoint = body?.endpoint
    if (!endpoint) {
      return NextResponse.json({ error: 'endpoint required' }, { status: 400 })
    }
    await removeSubscription(endpoint)
    await logAudit({
      action: 'push_unsubscribe',
      entityType: 'push',
      entityId: session.user.id,
      actorId: session.user.id,
      sessionId: session.user.sessionId,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[push/unsubscribe]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}