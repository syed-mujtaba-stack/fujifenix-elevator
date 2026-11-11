/**
 * Business priority tiers for the international market programme.
 *
 * This file intentionally contains only lightweight display and routing data so
 * it can be imported by client components (for example the footer) without
 * pulling the full market content dataset into the browser bundle.
 *
 * Tier 1: manufacturer/export sourcing; regional elevator and escalator supply;
 *         product and application demand.
 * Tier 2: market-specific B2B discovery and relevant product solutions.
 * Tier 3: expansion validated by search demand, competition, partner coverage
 *         and lead quality.
 */

export type MarketPriorityTier = 1 | 2 | 3;

export interface PriorityMarketRef {
  slug: string;
  /** Full country name, used in structured data. */
  name: string;
  /** Compact label used in navigation, cards and the footer. */
  shortName: string;
  /** ISO 3166-1 alpha-2 code. */
  code: string;
}

export interface PriorityTierCopy {
  eyebrow: string;
  title: string;
  description: string;
  /** Short badge used on market cards. */
  shortLabel: string;
  /** Full label used on country pages. */
  label: string;
  /** Plural label used in hub statistics. */
  statLabel: string;
}

export const PRIORITY_TIER_MARKETS: Record<
  MarketPriorityTier,
  readonly PriorityMarketRef[]
> = {
  1: [
    { slug: "pakistan", name: "Pakistan", shortName: "Pakistan", code: "PK" },
    {
      slug: "uae",
      name: "United Arab Emirates",
      shortName: "UAE",
      code: "AE",
    },
    {
      slug: "saudi-arabia",
      name: "Saudi Arabia",
      shortName: "Saudi Arabia",
      code: "SA",
    },
    { slug: "kenya", name: "Kenya", shortName: "Kenya", code: "KE" },
    { slug: "ethiopia", name: "Ethiopia", shortName: "Ethiopia", code: "ET" },
    {
      slug: "south-africa",
      name: "South Africa",
      shortName: "South Africa",
      code: "ZA",
    },
    { slug: "nigeria", name: "Nigeria", shortName: "Nigeria", code: "NG" },
    { slug: "tanzania", name: "Tanzania", shortName: "Tanzania", code: "TZ" },
  ],
  2: [
    {
      slug: "bangladesh",
      name: "Bangladesh",
      shortName: "Bangladesh",
      code: "BD",
    },
    { slug: "qatar", name: "Qatar", shortName: "Qatar", code: "QA" },
    { slug: "oman", name: "Oman", shortName: "Oman", code: "OM" },
    { slug: "kuwait", name: "Kuwait", shortName: "Kuwait", code: "KW" },
    {
      slug: "indonesia",
      name: "Indonesia",
      shortName: "Indonesia",
      code: "ID",
    },
  ],
  3: [
    { slug: "malaysia", name: "Malaysia", shortName: "Malaysia", code: "MY" },
    { slug: "vietnam", name: "Vietnam", shortName: "Vietnam", code: "VN" },
    { slug: "thailand", name: "Thailand", shortName: "Thailand", code: "TH" },
    {
      slug: "philippines",
      name: "Philippines",
      shortName: "Philippines",
      code: "PH",
    },
  ],
};

export const PRIORITY_TIER_COPY: Record<MarketPriorityTier, PriorityTierCopy> =
  {
    1: {
      eyebrow: "Tier 1 · Priority export markets",
      title: "Manufacturer and export sourcing markets",
      description:
        "These markets carry the strongest combination of export sourcing, regional elevator and escalator supply, and product and application demand. They anchor the international programme across South Asia, the Gulf and Africa.",
      shortLabel: "Priority export",
      label: "Priority export market",
      statLabel: "Priority export markets",
    },
    2: {
      eyebrow: "Tier 2 · Market-specific B2B focus",
      title: "Market-specific B2B discovery",
      description:
        "A focused group where buyers actively research suppliers and product solutions. Page content, product combinations and internal links are tuned to the discovery patterns of each market.",
      shortLabel: "B2B focus",
      label: "Market-specific B2B focus",
      statLabel: "B2B focus markets",
    },
    3: {
      eyebrow: "Tier 3 · Validated expansion",
      title: "Validated expansion markets",
      description:
        "Expansion markets selected on search demand, competition, partner coverage and lead quality. They extend the programme once the priority tiers are established.",
      shortLabel: "Expansion",
      label: "Validated expansion market",
      statLabel: "Expansion markets",
    },
  };

/** Canonical country path for a priority market reference. */
export function priorityMarketHref(code: string): string {
  return `/${code.toLowerCase()}`;
}
