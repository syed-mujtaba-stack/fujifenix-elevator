import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import {
  FOCUS_ORDER,
  PRODUCT_FOCUSES,
} from "@/lib/product-focuses";
import {
  MARKETS,
  getMarket,
  getMarketsInPriorityOrder,
  getPriorityMarkets,
  getRegionOrder,
  type Market,
} from "@/lib/markets";
import {
  PRIORITY_TIER_COPY,
  type MarketPriorityTier,
} from "@/lib/market-priority";
import {
  absoluteImage,
  absoluteUrl,
  marketItemListSchema,
  webPageSchema,
} from "@/lib/market-seo";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import Breadcrumbs from "./_components/Breadcrumbs";
import CtaBand from "./_components/CtaBand";
import FaqList from "./_components/FaqList";
import FocusCard from "./_components/FocusCard";
import MarketCard from "./_components/MarketCard";
import SectionTitle from "./_components/SectionTitle";

const PATH = "/markets";

export const metadata: Metadata = {
  title: { absolute: "Global Elevator & Escalator Markets | Fuji Fenix" },
  description:
    "Fuji Fenix supplies elevators and escalators across 22 markets, with priority export focus on Pakistan, the UAE and Dubai, Saudi Arabia, Kenya, Ethiopia, South Africa, Nigeria and Tanzania. Country pages cover product solutions, standards and shipping routes.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, "x-default": PATH },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PATH,
    siteName: "Fuji Fenix Elevator",
    title: "Global Elevator & Escalator Markets | Fuji Fenix",
    description:
      "Manufacturer-backed elevator and escalator supply for priority export markets across South Asia, the Gulf and Africa, plus validated Asia expansion markets.",
    images: [
      {
        url: absoluteImage("/realistic-earth.jpg"),
        width: 1200,
        height: 630,
        alt: "Fuji Fenix international elevator and escalator markets",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "GLOBAL",
  },
};

const HUB_FAQS = [
  {
    question: "Which countries does Fuji Fenix supply elevators and escalators to?",
    answer:
      "Our market programme covers 22 countries. Tier 1 priority export markets are Pakistan, the UAE (including Dubai), Saudi Arabia, Kenya, Ethiopia, South Africa, Nigeria and Tanzania. Tier 2 market-specific B2B focus markets are Bangladesh, Qatar, Oman, Kuwait and Indonesia. Malaysia, Vietnam, Thailand and the Philippines form the validated expansion tier. China is our manufacturing base, and India, Japan, South Korea and Singapore remain Asia priority markets. Projects in other countries can be reviewed on request, subject to logistics and service coverage.",
  },
  {
    question: "Can equipment be configured to local standards?",
    answer:
      "Yes. Projects normally follow the destination market's standards and approval process. The compliance matrix, documentation and any additional certification requirements are agreed during contract review with the project consultant and local authority.",
  },
  {
    question: "Do you provide installation and maintenance in every market?",
    answer:
      "Installation and maintenance can be delivered through appointed local partners or the buyer's own team. Local coverage is confirmed per project; factory engineering support, documentation and spare-parts guidance are available where required.",
  },
  {
    question: "What information is needed for a market-specific quotation?",
    answer:
      "Share the project location, building type, number of floors and stops, expected traffic, shaft dimensions, product type and target timeline. Our team will confirm the configuration, standards, documentation and shipping plan.",
  },
  {
    question: "Can you supply spare parts and technical support after delivery?",
    answer:
      "A recommended spare-parts list, operating guidance and maintenance information are supplied with the equipment. Ongoing support can be coordinated with the appointed local service partner or directly with our factory team.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Project review",
    description:
      "We review building type, traffic, shaft dimensions, standards, finishes and the construction programme with the project team.",
  },
  {
    number: "02",
    title: "Engineering & approvals",
    description:
      "Layout and interface drawings, equipment schedules and finish selections are prepared for consultant review before production.",
  },
  {
    number: "03",
    title: "Manufacturing & testing",
    description:
      "Equipment is built to the approved configuration, tested at our Shanghai facility and prepared for export packing.",
  },
  {
    number: "04",
    title: "Export & site support",
    description:
      "Documentation, shipping coordination and installation guidance are provided to the buyer, contractor or appointed local partner.",
  },
];

/**
 * Manufacturing base and Asia priority markets that sit outside the three
 * explicit export tiers. They stay visible on the hub but do not dilute the
 * tier 1–3 targeting story.
 */
const ASIA_PRIORITY_SLUGS = [
  "china",
  "india",
  "japan",
  "south-korea",
  "singapore",
] as const;

export default function MarketsPage() {
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Markets", url: absoluteUrl("/markets") },
  ];

  const regionOrder = getRegionOrder();
  const regions = regionOrder
    .map((region) => ({
      region,
      markets: MARKETS.filter((market) => market.region === region),
    }))
    .filter((entry) => entry.markets.length > 0);

  const priorityMarkets: Record<MarketPriorityTier, Market[]> = {
    1: getPriorityMarkets(1),
    2: getPriorityMarkets(2),
    3: getPriorityMarkets(3),
  };

  const asiaPriorityMarkets = ASIA_PRIORITY_SLUGS.map((slug) =>
    getMarket(slug)
  ).filter((market): market is Market => Boolean(market));

  const stats = [
    { value: `${MARKETS.length}`, label: "Target markets" },
    {
      value: `${priorityMarkets[1].length}`,
      label: PRIORITY_TIER_COPY[1].statLabel,
    },
    {
      value: `${priorityMarkets[2].length}`,
      label: PRIORITY_TIER_COPY[2].statLabel,
    },
    {
      value: `${priorityMarkets[3].length}`,
      label: PRIORITY_TIER_COPY[3].statLabel,
    },
  ];

  return (
    <>
      <StructuredData
        schema={breadcrumbSchema(breadcrumbs)}
      />
      <StructuredData
        schema={marketItemListSchema(getMarketsInPriorityOrder())}
      />
      <StructuredData
        schema={faqSchema(HUB_FAQS)}
      />
      <StructuredData
        schema={webPageSchema({
          name: "Global Elevator & Escalator Markets",
          description:
            "Fuji Fenix elevator and escalator supply for international markets across Asia, the Middle East and Africa.",
          path: PATH,
          about: "International elevator and escalator supply",
        })}
      />

      <PageHero
        eyebrow="GLOBAL MARKETS"
        title={["ELEVATORS & ESCALATORS", "FOR INTERNATIONAL PROJECTS"]}
        description="Manufacturer-backed vertical transportation for developers, contractors and distributors across priority export markets in South Asia, the Gulf and Africa — engineered in Shanghai and delivered to project."
        image="/realistic-earth.jpg"
        imageAlt="Global elevator and escalator supply markets"
        breadcrumb="MARKETS"
        titleBlue
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Markets" }]} />

      {/* Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <SectionTitle
                eyebrow="International supply"
                title="One manufacturer. Multiple market requirements."
                description="Fuji Fenix designs and manufactures elevators, escalators and moving walks in Shanghai for projects that need reliable equipment, clear documentation and commercially practical delivery."
              />
              <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
                <p>
                  International projects rarely share the same brief. A Dubai
                  tower, a Nairobi hospital, a Dhaka apartment building and a
                  Saudi giga-project each need a different mix of handling
                  capacity, finishes, standards and logistics. Our market pages
                  set out how the same manufacturing platform is configured for
                  each environment.
                </p>
                <p>
                  Country pages lead to product-specific market pages for the
                  combinations that matter most — passenger elevators, home
                  lifts, hospital bed lifts, freight systems, panoramic cabins,
                  escalators and moving walks. Every page is built around the
                  market&apos;s cities, project types, compliance context and
                  shipping route.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white px-4 py-5 text-center">
                    <div className="heading text-[clamp(26px,3vw,38px)] text-[#0047BB]">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 bg-slate-50 p-6 md:p-8">
              <span className="eyebrow text-[#0047BB]">Market coverage</span>
              <h3 className="heading mt-4 text-[24px] text-[#0f172a]">
                Where Fuji Fenix is targeting growth
              </h3>
              <div className="mt-6 space-y-3">
                {regions.map((row) => (
                  <div
                    key={row.region}
                    className="flex flex-col gap-1 border-b border-slate-200 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f172a]">
                      {row.region}
                    </span>
                    <span className="text-right text-[12px] leading-relaxed text-slate-500">
                      {row.markets.map((market) => market.country).join(" · ")}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border-b border-[#0047BB] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB] transition-opacity hover:opacity-70"
              >
                Discuss a project in another market
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Priority target markets */}
      {([1, 2, 3] as MarketPriorityTier[]).map((tier) => {
        const markets = priorityMarkets[tier];
        const copy = PRIORITY_TIER_COPY[tier];
        return (
          <section
            key={tier}
            className={`border-t border-slate-200 py-16 md:py-20 ${
              tier === 2 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <div className="container-gutter mx-auto max-w-[1440px]">
              <SectionTitle
                eyebrow={copy.eyebrow}
                title={copy.title}
                description={copy.description}
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {markets.map((market) => (
                  <MarketCard key={market.slug} market={market} />
                ))}
              </div>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {markets.length} {markets.length === 1 ? "market" : "markets"} ·{" "}
                {copy.label}
              </p>
            </div>
          </section>
        );
      })}

      {/* Manufacturing base & remaining Asia priority markets */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Manufacturing base & Asia priority"
            title="Shanghai manufacturing, Asia growth"
            description="China is our manufacturing base. India, Japan, South Korea and Singapore remain Asia priority markets alongside the export tiers above."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {asiaPriorityMarkets.map((market) => (
              <MarketCard key={market.slug} market={market} />
            ))}
          </div>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {asiaPriorityMarkets.length} markets · Manufacturing base and Asia
            priority
          </p>
        </div>
      </section>

      {/* Product focus */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Product range"
            title="Vertical transportation for every building type"
            description="Explore the product families supplied through the market programme. Each product page explains configurations, applications and the information needed to quote."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_ORDER.map((slug) => (
              <FocusCard
                key={slug}
                focus={PRODUCT_FOCUSES[slug]}
                href={PRODUCT_FOCUSES[slug].productHref}
                kicker={PRODUCT_FOCUSES[slug].category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="How we work"
            title="From project brief to delivered equipment"
            description="A clear engineering and export process keeps consultants, contractors and buyers aligned from first drawing to site delivery."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map((step) => (
              <div
                key={step.number}
                className="relative border border-slate-200 bg-white p-6 md:p-7"
              >
                <span className="heading text-[44px] leading-none text-slate-200">
                  {step.number}
                </span>
                <h3 className="subheading mt-5 text-[15px] text-[#0f172a]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionTitle
              eyebrow="International supply FAQ"
              title="Questions buyers ask before a project starts"
              description="Market-specific pages answer local questions. These are the common questions that apply across the programme."
            />
            <FaqList faqs={HUB_FAQS} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Planning a project in one of these markets?"
        description="Send the building type, location, shaft information and target timeline. Our team will come back with the right product configuration, documentation and delivery plan."
        primaryHref="/contact"
        primaryLabel="Request a quotation"
        secondaryHref="/products"
        secondaryLabel="Explore products"
      />
    </>
  );
}
