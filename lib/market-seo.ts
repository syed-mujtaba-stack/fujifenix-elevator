/**
 * SEO helpers for the /markets programme.
 *
 * Canonicals are relative (metadataBase is configured in app/layout.tsx).
 * hreflang deliberately lists only English + x-default: there are no
 * indexable translated market pages yet, and adding unsupported language
 * alternates would be incorrect. Add locale paths here only when real
 * translated pages exist.
 */

import type { Metadata } from "next";
import type { Market } from "@/lib/markets";
import { marketFocusPath, marketPath } from "@/lib/markets";
import type { FocusSlug, ProductFocus } from "@/lib/product-focuses";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fujifenix.com"
).replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Turn a raw public image path into an absolute, single-encoded URL.
 * Raw paths may contain spaces, ampersands and parentheses.
 */
export function absoluteImage(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return encodeURI(`${SITE_URL}${path}`);
}

function marketAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: path,
    languages: {
      en: path,
      "x-default": path,
    },
  };
}

export function marketMetadata(market: Market): Metadata {
  const path = marketPath(market.slug);
  const image = absoluteImage(market.heroImage);

  return {
    title: { absolute: market.metaTitle },
    description: market.metaDescription,
    keywords: market.keywords,
    alternates: marketAlternates(path),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: "Fuji Fenix Elevator",
      title: market.metaTitle,
      description: market.metaDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: market.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: market.metaTitle,
      description: market.metaDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": market.code,
      "geo.placename": market.country,
    },
  };
}

export function marketFocusMetadata(
  market: Market,
  focus: ProductFocus
): Metadata {
  const path = marketFocusPath(market.slug, focus.slug);
  const title = `${focus.shortTitle} for ${market.shortName} Projects | Fuji Fenix`;
  const description = `${focus.title} for ${market.country} projects by Fuji Fenix. Engineered configurations, technical drawings and export supply for ${market.cities[0]} and beyond.`;
  const image = absoluteImage(focus.image);

  return {
    title: { absolute: title },
    description,
    keywords: [
      ...focus.keywords.map((keyword) => `${keyword} ${market.shortName}`),
      `${focus.shortTitle.toLowerCase()} ${market.country}`,
      `elevator supplier ${market.shortName}`,
    ],
    alternates: marketAlternates(path),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: "Fuji Fenix Elevator",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${focus.title} for ${market.country} - Fuji Fenix`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": market.code,
      "geo.placename": market.country,
    },
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "en",
    ...(input.about ? { about: input.about } : {}),
    isPartOf: {
      "@type": "WebSite",
      name: "Fuji Fenix Elevator",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Shanghai Fuji Fenix Elevator Co Ltd.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}

export function marketServiceSchema(market: Market) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Elevator & Escalator Supply for ${market.country}`,
    serviceType:
      "Elevator and escalator manufacturing, engineering and export supply",
    description: market.metaDescription,
    url: absoluteUrl(marketPath(market.slug)),
    areaServed: {
      "@type": "Country",
      name: market.country,
    },
    provider: {
      "@type": "Organization",
      name: "Shanghai Fuji Fenix Elevator Co Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
      availableLanguage: ["en"],
    },
  };
}

export function marketFocusServiceSchema(
  market: Market,
  focus: ProductFocus
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${focus.title} for ${market.country}`,
    serviceType: focus.title,
    category: focus.category,
    description: `${focus.summary} Supplied for projects in ${market.country}.`,
    url: absoluteUrl(marketFocusPath(market.slug, focus.slug)),
    areaServed: {
      "@type": "Country",
      name: market.country,
    },
    provider: {
      "@type": "Organization",
      name: "Shanghai Fuji Fenix Elevator Co Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
      availableLanguage: ["en"],
    },
  };
}

export function marketItemListSchema(markets: Market[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fuji Fenix international markets",
    numberOfItems: markets.length,
    itemListElement: markets.map((market, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Elevators and escalators for ${market.country}`,
      url: absoluteUrl(marketPath(market.slug)),
    })),
  };
}

export function focusLinksForMarket(
  market: Market,
  focuses: ProductFocus[],
  exclude?: FocusSlug
) {
  return focuses
    .filter((focus) => focus.slug !== exclude)
    .map((focus) => ({
      href: marketFocusPath(market.slug, focus.slug),
      label: `${focus.shortTitle} for ${market.shortName}`,
    }));
}
