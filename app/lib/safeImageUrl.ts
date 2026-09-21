import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Normalizes image paths to raw (unencoded) public/ asset paths.
 *
 * Sources store mixed formats — raw spaces ("Passenger Elevator Cabin")
 * or pre-encoded paths ("%20", "%28", …). Anything pre-encoded is decoded
 * back to a raw disk path so `next/image`'s optimizer can resolve the file
 * exactly once: it URL-encodes the src itself when building
 * `/_next/image?url=…`, so an already-encoded src would double-encode and
 * 400 on Linux/Hostinger.
 */
export function getSafeImageUrl(rawSrc: string | null | undefined): string {
  if (!rawSrc) return "/hero-elevator.jpg";

  // Normalize pre-encoded input back to a raw disk path.
  let src = rawSrc.trim();
  try {
    src = decodeURIComponent(src);
  } catch {
    // contains a bare "%" — keep as-is
  }

  // Passenger Elevator Cabin mappings
  if (/Passenger[%20\s]*Elevator[%20\s]*Cabin/i.test(src)) {
    if (/pattern[%20\s]*etched/i.test(src)) {
      return "/Elevators/passenger-elevator/pattern-etched.png";
    }
    if (/mirror[%20\s]*strip/i.test(src)) {
      return "/Elevators/passenger-elevator/mirror-strip.png";
    }
    if (/vertical[%20\s]*striped/i.test(src)) {
      return "/Elevators/passenger-elevator/vertical-striped.png";
    }
    if (/grid[%20\s]*ceiling/i.test(src)) {
      return "/Elevators/passenger-elevator/grid-ceiling.png";
    }
    if (/golden|gold/i.test(src)) {
      return "/Elevators/passenger-elevator/luxury-golden.png";
    }
    if (/machine[%20\s]*room[%20\s]*type/i.test(src) && !/mrl|less/i.test(src)) {
      return "/Elevators/passenger-elevator/blueprints/machine-room.png";
    }
    if (/mrl|machine-room-less/i.test(src)) {
      return "/Elevators/passenger-elevator/blueprints/mrl.png";
    }
    if (/hall[%20\s]*door/i.test(src)) {
      return "/Elevators/passenger-elevator/blueprints/hall-door.png";
    }
    if (/Passenger[%20\s]*Elevator[%20\s]*Cabin\.png/i.test(src)) {
      return "/Elevators/passenger-elevator/hero.png";
    }
  }

  // Home Elevators special character mappings
  if (/dual-tone[%20\s]*wood/i.test(src)) {
    return "/Elevators/Home Elevators/dual-tone-wood-steel.png";
  }
  if (/villa[%20\s]*home/i.test(src)) {
    return "/Elevators/Home Elevators/villa-wood-steel.png";
  }

  return src;
}

/**
 * Resolves an image source (Sanity asset, absolute URL, local path, or
 * gallery filename) into an absolute, URL-safe string for use in JSON-LD
 * structured data. Returns undefined when nothing usable is found.
 */
export function resolveStructuredImageUrl(rawSrc: unknown): string | undefined {
  if (!rawSrc) return undefined;

  // Sanity image asset reference
  if (typeof rawSrc === "object") {
    try {
      return urlFor(rawSrc as SanityImageSource)
        .width(1200)
        .auto("format")
        .url();
    } catch {
      return undefined;
    }
  }

  if (typeof rawSrc !== "string") return undefined;

  const src = rawSrc.trim();
  if (!src) return undefined;

  // Already absolute (CDN or external)
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  // Local public path — encode once so the URL is valid in JSON-LD.
  // (next/image gets the raw path via getSafeImageUrl, NOT this helper.)
  if (src.startsWith("/")) return encodeURI(src);

  // File-name style (e.g. "Passenger Elevator Cabin.png") → safe mapping or local path
  const resolved = getSafeImageUrl(src);
  return resolved.startsWith("/") ? encodeURI(resolved) : resolved;
}