import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  MARKETS,
  MARKET_CONTENT_UPDATED,
  marketFocusPath,
  marketPath,
} from "@/lib/markets";
import {
  PRIORITY_TIER_MARKETS,
  type MarketPriorityTier,
} from "@/lib/market-priority";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fujifenix.com"
).replace(/\/+$/, "");

/**
 * Business priority tiers drive the sitemap order and priority values:
 * Tier 1 export markets first, then Tier 2 B2B focus, Tier 3 expansion and
 * finally the manufacturing base / Asia priority markets. Search engines do
 * not rank by sitemap priority, but the ordering keeps the highest-value
 * pages first for manual review and crawl budgeting.
 */
const PRIORITY_RANK = new Map<string, number>();
([1, 2, 3] as const).forEach((tier) => {
  PRIORITY_TIER_MARKETS[tier].forEach((market, index) => {
    PRIORITY_RANK.set(market.slug, tier * 100 + index);
  });
});

function priorityTier(slug: string): MarketPriorityTier | null {
  for (const tier of [1, 2, 3] as const) {
    if (PRIORITY_TIER_MARKETS[tier].some((entry) => entry.slug === slug)) {
      return tier;
    }
  }
  return null;
}

const COUNTRY_PRIORITY: Record<MarketPriorityTier, number> = {
  1: 0.9,
  2: 0.8,
  3: 0.7,
};

const FOCUS_PRIORITY: Record<MarketPriorityTier, number> = {
  1: 0.8,
  2: 0.7,
  3: 0.6,
};

/** Markets ordered by business priority, then by dataset order. */
const ORDERED_MARKETS = [...MARKETS].sort(
  (a, b) => (PRIORITY_RANK.get(a.slug) ?? 9999) - (PRIORITY_RANK.get(b.slug) ?? 9999)
);

export const revalidate = 3600;

// Lean queries that also return _updatedAt for accurate lastModified values
const productsForSitemap = `
  *[_type == "product"] {
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "_updatedAt": _updatedAt
  }
`;

const categoriesForSitemap = `
  *[_type == "category"] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    client.fetch(productsForSitemap).catch(() => []),
    client.fetch(categoriesForSitemap).catch(() => []),
  ]);

  const lastMod = (date?: string | null) =>
    date ? new Date(date) : new Date();

  const marketLastMod = new Date(MARKET_CONTENT_UPDATED);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: marketLastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/cta`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map(
    (cat: { slug: string; _updatedAt?: string | null }) => ({
      url: `${BASE_URL}/products/${cat.slug}`,
      lastModified: lastMod(cat._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const productPages: MetadataRoute.Sitemap = (
    products || []
  ).map((p: { slug: string; categorySlug: string; _updatedAt?: string | null }) => ({
    url: `${BASE_URL}/products/${p.categorySlug}/${p.slug}`,
    lastModified: lastMod(p._updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // International market programme: hub + country pages + country x product pages.
  /**
   * hreflang alternates for a country-targeted English page.
   *
   * The page is English content targeted at one country, so the alternates are
   * `en-<CODE>` (self), the generic `en` and `x-default`. No translated
   * language alternates are emitted because translated pages do not exist —
   * Google Translate is a client-side overlay only.
   */
  const languageAlternates = (path: string, code: string) => {
    const url = `${BASE_URL}${path}`;
    return {
      languages: {
        en: url,
        [`en-${code.toUpperCase()}`]: url,
        "x-default": url,
      },
    };
  };

  const marketHub: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/markets`,
      lastModified: marketLastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const marketPages: MetadataRoute.Sitemap = ORDERED_MARKETS.map((market) => {
    const path = marketPath(market.slug);
    const tier = priorityTier(market.slug);
    return {
      url: `${BASE_URL}${path}`,
      lastModified: marketLastMod,
      changeFrequency: "monthly" as const,
      priority: tier ? COUNTRY_PRIORITY[tier] : 0.6,
      alternates: languageAlternates(path, market.code),
    };
  });

  const marketFocusPages: MetadataRoute.Sitemap = ORDERED_MARKETS.flatMap(
    (market) => {
      const tier = priorityTier(market.slug);
      return market.focuses.map((focus) => {
        const path = marketFocusPath(market.slug, focus);
        return {
          url: `${BASE_URL}${path}`,
          lastModified: marketLastMod,
          changeFrequency: "monthly" as const,
          priority: tier ? FOCUS_PRIORITY[tier] : 0.5,
          alternates: languageAlternates(path, market.code),
        };
      });
    }
  );

  /** Sitemap entries grouped by business priority tier. */
  const byTier = (tier: MarketPriorityTier | null) => {
    const prefixes = ORDERED_MARKETS.filter(
      (market) => priorityTier(market.slug) === tier
    ).map((market) => `${BASE_URL}/${market.code.toLowerCase()}`);

    const inTier = (url: string) =>
      prefixes.some(
        (prefix) => url === prefix || url.startsWith(`${prefix}/`)
      );

    return {
      countries: marketPages.filter((page) => inTier(page.url)),
      focuses: marketFocusPages.filter((page) => inTier(page.url)),
    };
  };

  const tier1 = byTier(1);
  const tier2 = byTier(2);
  const tier3 = byTier(3);
  const otherMarkets = byTier(null);

  return [
    staticPages[0], // home
    ...marketHub,
    // Tier 1 export markets first: their pages are the crawl priority.
    ...tier1.countries,
    ...tier1.focuses,
    ...staticPages.slice(1),
    ...categoryPages,
    ...productPages,
    ...tier2.countries,
    ...tier2.focuses,
    ...tier3.countries,
    ...tier3.focuses,
    ...otherMarkets.countries,
    ...otherMarkets.focuses,
  ];
}