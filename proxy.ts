import { NextResponse, type NextRequest } from 'next/server'
import { getMarket, marketFocusPath, marketPath } from '@/lib/markets'
import { PRODUCT_FOCUSES, type FocusSlug } from '@/lib/product-focuses'

/**
 * Request-time routing rules.
 *
 * 1. Legacy market URLs. Country pages moved from `/markets/<slug>` to ISO
 *    country-code URLs (`/cn`, `/pk`, `/ae`). The redirect happens in the proxy
 *    so the response is a real HTTP 308 rather than a rendered page with a
 *    meta refresh — crawlers consolidate link equity on the canonical URL.
 *
 * 2. Admin route guard. This is a coarse gate (cookie exists → allow). The
 *    authoritative check (session validity + role + PII rules) happens
 *    server-side in `/dashboard/layout.tsx` and inside every server action via
 *    `requirePermission`. If an unauthenticated request hits /dashboard we
 *    bounce it to /login early; we never render any admin HTML unauthenticated.
 *
 * Next.js 16 renamed the middleware file convention to `proxy`.
 */

const LEGACY_MARKET = /^\/markets\/([^/]+)(?:\/([^/]+))?\/?$/

function permanentRedirect(request: NextRequest, path: string) {
  const url = request.nextUrl.clone()
  url.pathname = path
  url.search = ''
  return NextResponse.redirect(url, 308)
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // 1. Legacy country market URLs → country-code URLs.
  const legacy = LEGACY_MARKET.exec(pathname)
  if (legacy) {
    const market = getMarket(decodeURIComponent(legacy[1]))
    if (market) {
      const focusSegment = legacy[2]
      if (!focusSegment) {
        return permanentRedirect(request, marketPath(market.slug))
      }
      const focus = PRODUCT_FOCUSES[focusSegment as FocusSlug]
      if (focus && market.focuses.includes(focus.slug)) {
        return permanentRedirect(
          request,
          marketFocusPath(market.slug, focus.slug)
        )
      }
    }
  }

  // 2. Admin guard.
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
  matcher: ['/dashboard/:path*', '/markets/:path*'],
}
