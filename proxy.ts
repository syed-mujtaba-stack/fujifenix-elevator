import { NextResponse, type NextRequest } from 'next/server'

/**
 * Route guard for the admin area.
 *
 * This is a coarse gate (cookie exists → allow). The authoritative check
 * (session validity + role + PII rules) happens server-side in the
 * `/dashboard/layout.tsx` and inside every server action via
 * `requirePermission`. If an unauthenticated request hits /dashboard we
 * bounce it to /login early; we never render any admin HTML unauthenticated.
 *
 * Next.js 16 renamed the middleware file convention to `proxy`.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const isAdminPath = pathname.startsWith('/dashboard')

  // /login is public. Everything under /dashboard requires a session cookie.
  if (isAdminPath) {
    const sessionToken =
      request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('__Secure-authjs.session-token')?.value

    if (!sessionToken) {
      const signInUrl = new URL('/login', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname + search)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Do not run on static assets or API/auth routes.
  matcher: ['/dashboard/:path*'],
}
