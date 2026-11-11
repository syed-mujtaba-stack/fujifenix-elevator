import { NextResponse, type NextRequest } from "next/server";
import { getMarketByCode, marketPath } from "@/lib/markets";

export const dynamic = "force-dynamic";

/**
 * Lightweight geo lookup for the optional country suggestion.
 *
 * Country information comes from the hosting platform's request headers
 * (Vercel, Cloudflare) and is never stored. When no country is available the
 * endpoint returns `null` and the client simply shows nothing.
 *
 * The visitor is never redirected: the suggestion is a dismissible link.
 */
export async function GET(request: NextRequest) {
  const raw =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    "";

  const code = raw.trim().toUpperCase();
  const market = /^[A-Z]{2}$/.test(code) ? getMarketByCode(code) : undefined;

  return NextResponse.json(
    {
      detected: market ? market.code : null,
      market: market
        ? {
            code: market.code,
            country: market.country,
            shortName: market.shortName,
            path: marketPath(market.slug),
          }
        : null,
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
        Vary: "x-vercel-ip-country, cf-ipcountry",
      },
    }
  );
}
