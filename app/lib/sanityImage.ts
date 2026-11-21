import type { ImageLoader, ImageLoaderProps } from "next/image";

/**
 * Sanity CDN image delivery.
 *
 * `urlFor(...).auto("format")` already produces CDN-optimized URLs, but by
 * default `next/image` wraps them in `/_next/image?url=...`. On a self-hosted
 * Node server (Hostinger) every cache miss makes the server fetch the remote
 * asset from Sanity, re-encode it with sharp and cache it locally. That adds
 * seconds to image loading, while Vercel's edge optimizer hides the cost.
 *
 * Sanity is a real image CDN, so we let the browser request it directly and
 * keep responsive `srcset` widths. Local /public images keep the built-in
 * Next.js optimizer, which reads a local file and stays fast on Hostinger.
 */

function isSanityHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === "cdn.sanity.io" || host.endsWith(".sanity.work");
}

/** True only for absolute Sanity CDN URLs (matching next.config remotePatterns). */
export function isSanityImageUrl(
  src: string | null | undefined
): src is string {
  if (!src || !/^https?:\/\//i.test(src)) return false;
  try {
    return isSanityHost(new URL(src).hostname);
  } catch {
    return false;
  }
}

/**
 * Per-image loader: Sanity serves the requested `w`/`q` directly, so no
 * request ever travels through the Hostinger image optimizer.
 */
export function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  try {
    const url = new URL(src);
    url.searchParams.set("w", String(Math.max(1, Math.round(width))));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    // Never upscale beyond the source asset.
    url.searchParams.set("fit", "max");
    return url.toString();
  } catch {
    return src;
  }
}

/**
 * Returns the Sanity loader for remote images, or `undefined` so next/image
 * falls back to the built-in optimizer for local /public assets.
 */
export function imageLoaderFor(
  src: string | null | undefined
): ImageLoader | undefined {
  return isSanityImageUrl(src) ? sanityImageLoader : undefined;
}
