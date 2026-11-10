import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { logAudit } from '@/lib/admin'
import { getRequestMeta } from '@/lib/admin'

/**
 * Audited sign-out: records the logout before handing control back to
 * NextAuth's own sign-out route (so the session cookie is destroyed).
 */
export async function GET() {
  const session = await auth()
  if (session?.user) {
    const req = await (async () => {
      try {
        return await getRequestMeta()
      } catch {
        return { ip: 'unknown', userAgent: '' }
      }
    })()
    await logAudit({
      action: 'logout',
      entityType: 'auth',
      entityId: session.user.id,
      actorId: session.user.id,
      sessionId: session.user.sessionId,
      ipAddress: req.ip,
      userAgent: req.userAgent,
    })
  }
  // Return a special status; the client finishes the sign-out flow via NextAuth.
  return NextResponse.redirect(new URL('/api/auth/signout', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
}

export async function POST() {
  return GET()
}