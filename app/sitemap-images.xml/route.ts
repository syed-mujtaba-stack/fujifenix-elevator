import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import {
  getSafeImageUrl,
  resolveStructuredImageUrl,
} from "@/app/lib/safeImageUrl";

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fujifenix.com";

/**
 * Image sitemap (Google Images).
 * Lists every product image (Sanity asset + local gallery + technical
 * drawings) plus key static site visuals, with the <image:image> extension.
 * Invisible to visitors — crawl-only feed for search engines.
 */

const productsQuery = `
  *[_type == "product"] {
    "slug": slug.current,
    "categorySlug": category->slug.current,
    title,
    description,
    image,
    gallery[] { src, alt },
    technicalDrawings[] { title, src }
  }
`;

type ImageEntry = { loc: string; title?: string; caption?: string };

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Normalize a local/public path into an absolute, single-encoded URL.
 * Sources may store raw spaces ("Car Elevator") or pre-encoded paths
 * ("%20") — decode-then-encode converges both to one canonical form and
 * prevents double-encoding (encodeURI would escape "%" itself).
 */
const absoluteUrl = (src: string) => {
  const safe = getSafeImageUrl(src);
  let decoded = safe;
  try {
    decoded = decodeURIComponent(safe);
  } catch {
    // contains a bare "%" — fall through with the raw string
  }
  if (/^https?:\/\//i.test(decoded)) return decoded;
  if (decoded.startsWith("/")) return encodeURI(BASE_URL + decoded);
  return encodeURI(BASE_URL + "/" + decoded);
};

/** URL-encode every path segment (% not double-encoded by encodeURI). */
const renderImages = (pageUrl: string, images: ImageEntry[]) => {
  const seen = new Set<string>();
  const unique = images.filter((img) => {
    if (seen.has(img.loc)) return false;
    seen.add(img.loc);
    return true;
  });

  if (unique.length === 0) return "";

  const tags = unique
    .map(
      (img) =>
        `    <image:image>\n` +
        `      <image:loc>${escapeXml(img.loc)}</image:loc>\n` +
        (img.title ? `      <image:title>${escapeXml(img.title)}</image:title>\n` : "") +
        (img.caption ? `      <image:caption>${escapeXml(img.caption)}</image:caption>\n` : "") +
        `    </image:image>`
    )
    .join("\n");

  return `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>\n${tags}\n  </url>`;
};

export async function GET() {
  const [products] = await Promise.all([
    client.fetch(productsQuery).catch(() => [] as any[]),
  ]);

  const entries: string[] = [];

  // Key static site visuals (rendered on the home/about/products pages)
  const staticPages: { page: string; images: { loc: string; title: string }[] }[] = [
    {
      page: BASE_URL,
      images: [
        { loc: absoluteUrl("/hero-elevator.jpg"), title: "Fuji Fenix Elevator — Modern Vertical Transportation Solutions" },
        { loc: absoluteUrl("/building-exterior.jpg"), title: "Fuji Fenix Elevator — Building Solutions" },
        { loc: absoluteUrl("/about-lobby.jpg"), title: "Fuji Fenix Premium Elevator Lobby" },
        { loc: absoluteUrl("/home-elevator.jpg"), title: "Fuji Fenix Home Elevator" },
        { loc: absoluteUrl("/panoramic.jpg"), title: "Fuji Fenix Panoramic Elevator" },
        { loc: absoluteUrl("/escalator.jpg"), title: "Fuji Fenix Escalator" },
        { loc: absoluteUrl("/realistic-earth.jpg"), title: "Fuji Fenix Elevator — Global Coverage" },
      ],
    },
  ];

  for (const page of staticPages) {
    entries.push(renderImages(page.page, page.images));
  }

  // Product pages — Sanity main image + gallery + technical drawings
  for (const product of products as any[]) {
    if (!product.slug || !product.categorySlug) continue;

    const pageUrl = `${BASE_URL}/products/${product.categorySlug}/${product.slug}`;
    const images: ImageEntry[] = [];

    const main = resolveStructuredImageUrl(product.image);
    if (main) {
      images.push({ loc: main, title: product.title, caption: product.description || product.title });
    }

    for (const gallery of product.gallery || []) {
      if (gallery?.src) {
        images.push({
          loc: absoluteUrl(gallery.src),
          title: gallery.alt || product.title,
          caption: product.title,
        });
      }
    }

    for (const drawing of product.technicalDrawings || []) {
      if (drawing?.src) {
        images.push({ loc: absoluteUrl(drawing.src), title: drawing.title || `${product.title} Technical Drawing` });
      }
    }

    entries.push(renderImages(pageUrl, images));
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    entries.filter(Boolean).join("\n") +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}