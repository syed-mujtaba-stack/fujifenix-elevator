/**
 * Shared SEO keyword vocabulary for Fuji Fenix metadata.
 *
 * Next.js renders `keywords` arrays as a comma-separated <meta name="keywords">
 * tag. Keeping the vocabulary in one place means the same terms are applied
 * consistently across static pages, dynamic product pages and market pages
 * without duplicating long arrays in every route.
 *
 * Only terms that describe published products, services and validated target
 * markets are included. No unconfirmed local-office, manufacturing or
 * certification claims are added here.
 */

export const BRAND_KEYWORDS: readonly string[] = [
  "Fuji Fenix",
  "Fuji Fenix Elevator",
  "Fuji Fenix Elevators",
  "Fuji Fenix Escalator",
  "Fuji Fenix Shanghai",
  "Shanghai Fuji Fenix Elevator",
  "Fuji Fenix Elevator Co Ltd",
  "Fuji Fenix vertical transportation",
];

export const PRODUCT_KEYWORDS: readonly string[] = [
  "elevator manufacturer",
  "elevator supplier",
  "elevator exporter",
  "elevator factory",
  "escalator manufacturer",
  "escalator supplier",
  "escalator exporter",
  "moving walk manufacturer",
  "moving walk supplier",
  "passenger elevators",
  "passenger lifts",
  "passenger elevator manufacturer",
  "home elevators",
  "villa elevators",
  "home lifts",
  "high speed elevators",
  "high rise elevators",
  "panoramic elevators",
  "glass elevators",
  "glass lifts",
  "hospital elevators",
  "hospital bed lifts",
  "freight elevators",
  "goods lifts",
  "heavy duty freight elevators",
  "car elevators",
  "vehicle elevators",
  "dumbwaiters",
  "stair lifts",
  "MRL elevators",
  "machine room less elevators",
  "gearless traction elevators",
  "platform lifts",
  "escalators",
  "moving walks",
  "autowalks",
  "travelators",
  "platform screen doors",
  "elevator modernization",
  "elevator renovation",
  "elevator replacement",
  "elevator spare parts",
  "custom elevator cabins",
  "elevator cabin finishes",
  "elevator doors",
];

export const SERVICE_KEYWORDS: readonly string[] = [
  "elevator installation",
  "elevator installation services",
  "escalator installation",
  "elevator maintenance",
  "preventive elevator maintenance",
  "elevator service company",
  "elevator repair",
  "elevator modernization services",
  "elevator consultation",
  "elevator project engineering",
  "elevator technical drawings",
  "elevator shaft drawings",
  "elevator load calculation",
  "elevator traffic analysis",
  "elevator factory testing",
  "elevator export documentation",
  "elevator shipping logistics",
  "elevator commissioning",
  "elevator after sales service",
  "elevator emergency support",
  "turnkey elevator installation",
  "vertical transportation services",
];

export const APPLICATION_KEYWORDS: readonly string[] = [
  "commercial elevators",
  "residential elevators",
  "apartment elevators",
  "office elevators",
  "hotel elevators",
  "shopping mall escalators",
  "retail escalators",
  "hospital lift systems",
  "airport escalators",
  "metro station escalators",
  "railway station elevators",
  "stadium escalators",
  "school elevators",
  "university elevators",
  "industrial elevators",
  "warehouse freight elevators",
  "luxury villa lifts",
  "high rise tower elevators",
  "mixed use development elevators",
  "public infrastructure elevators",
  "transit hub vertical transportation",
  "parking garage elevators",
  "elevator solutions for buildings",
  "vertical transportation for architects",
  "elevator solutions for contractors",
];

export const TECHNICAL_KEYWORDS: readonly string[] = [
  "VVVF elevator drive",
  "gearless traction machine",
  "elevator group control",
  "destination dispatch elevators",
  "elevator safety devices",
  "emergency rescue device",
  "elevator speed governor",
  "elevator buffer",
  "elevator door operator",
  "elevator control cabinet",
  "elevator regenerative drive",
  "elevator energy efficiency",
  "low noise elevator",
  "elevator accessibility",
  "fire rated elevator",
  "international elevator standards",
  "elevator compliance documentation",
  "elevator code compliance",
  "elevator interface drawings",
  "elevator civil works requirements",
];

export const BUYER_INTENT_KEYWORDS: readonly string[] = [
  "buy elevators",
  "buy escalators",
  "elevator price",
  "elevator cost",
  "elevator quotation",
  "request elevator quote",
  "elevator tender",
  "elevator bid",
  "bulk elevator supplier",
  "wholesale elevators",
  "elevator distributor",
  "elevator dealer",
  "elevator agent",
  "OEM elevator manufacturer",
  "ODM elevator supplier",
  "custom elevator manufacturer",
  "elevator project supplier",
  "elevator supply contract",
  "elevator exporter China",
  "elevator manufacturer direct",
  "vertical transportation supplier",
  "elevator sourcing",
  "escalator sourcing",
  "elevator supplier for projects",
];

export const GLOBAL_MARKET_KEYWORDS: readonly string[] = [
  "elevator manufacturer China",
  "elevator supplier China",
  "elevator factory Shanghai",
  "elevator exporter China",
  "escalator manufacturer China",
  "Shanghai elevator supplier",
  "China elevator exporter",
  "elevator supplier Asia",
  "elevator manufacturer Asia",
  "global elevator supplier",
  "international escalator supplier",
  "elevator export partner",
  "vertical transportation exporter",
];

/**
 * Validated target markets from lib/market-priority.ts plus the established
 * manufacturing/Asia focus. Dubai is covered through the UAE terms.
 */
export const MARKET_KEYWORDS: readonly string[] = [
  "elevator supplier Pakistan",
  "elevator manufacturer Pakistan",
  "escalator supplier Pakistan",
  "elevator supplier UAE",
  "elevator manufacturer UAE",
  "elevator supplier Dubai",
  "elevator manufacturer Dubai",
  "escalator supplier Dubai",
  "elevator supplier Saudi Arabia",
  "elevator manufacturer Saudi Arabia",
  "escalator supplier Saudi Arabia",
  "elevator supplier Kenya",
  "elevator supplier Ethiopia",
  "elevator supplier South Africa",
  "elevator supplier Nigeria",
  "elevator supplier Tanzania",
  "elevator supplier Bangladesh",
  "elevator supplier Qatar",
  "elevator supplier Oman",
  "elevator supplier Kuwait",
  "elevator supplier Indonesia",
  "elevator supplier Malaysia",
  "elevator supplier Vietnam",
  "elevator supplier Thailand",
  "elevator supplier Philippines",
  "elevator supplier India",
  "elevator manufacturer India",
  "elevator supplier Japan",
  "elevator supplier South Korea",
  "elevator supplier Singapore",
  "elevator exporter to Africa",
  "elevator exporter to Middle East",
  "elevator supplier South Asia",
  "elevator supplier Southeast Asia",
];

/** Combine keyword groups, dropping empty and case-insensitive duplicates. */
export function seoKeywords(
  ...groups: (readonly string[] | string[])[]
): string[] {
  const seen = new Set<string>();
  const keywords: string[] = [];

  for (const group of groups) {
    for (const raw of group) {
      const keyword = raw.trim();
      if (!keyword) continue;
      const key = keyword.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      keywords.push(keyword);
    }
  }

  return keywords;
}
