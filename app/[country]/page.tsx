import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import {
  getMarketByCode,
  getRelatedMarkets,
  MARKETS,
  marketFocusPath,
  marketPath,
  waveLabel,
} from "@/lib/markets";
import {
  absoluteUrl,
  countryLanguageTag,
  marketMetadata,
  marketServiceSchema,
  webPageSchema,
} from "@/lib/market-seo";
import { PRODUCT_FOCUSES } from "@/lib/product-focuses";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import Breadcrumbs from "@/app/markets/_components/Breadcrumbs";
import CtaBand from "@/app/markets/_components/CtaBand";
import FaqList from "@/app/markets/_components/FaqList";
import FocusCard from "@/app/markets/_components/FocusCard";
import MarketCard from "@/app/markets/_components/MarketCard";
import MarketNav from "@/app/markets/_components/MarketNav";
import MarketNote from "@/app/markets/_components/MarketNote";
import SectionTitle from "@/app/markets/_components/SectionTitle";

export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETS.map((market) => ({ country: market.code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const market = getMarketByCode(country);
  return market ? marketMetadata(market) : {};
}

const SUPPLY_POINTS = [
  {
    title: "Manufacturer engineering",
    description:
      "Systems are engineered to the approved shaft, traffic and finish requirements, then built and tested at our Shanghai manufacturing base.",
  },
  {
    title: "Project documentation",
    description:
      "Layout drawings, interface schedules, test documentation and export paperwork are prepared for consultants, contractors and customs.",
  },
  {
    title: "Product breadth",
    description:
      "Passenger, home, high-speed, hospital, freight, panoramic and vehicle elevators, plus escalators and moving walks, from one supplier.",
  },
  {
    title: "Partner-ready delivery",
    description:
      "Equipment can be supplied to the buyer's installer or an appointed local partner, with installation guidance and spare-parts information.",
  },
];

export default async function CountryMarketPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const market = getMarketByCode(country);
  if (!market) notFound();

  const focuses = market.focuses
    .map((slug) => PRODUCT_FOCUSES[slug])
    .filter(Boolean);
  const related = getRelatedMarkets(market);

  const breadcrumbItems = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Markets", url: absoluteUrl("/markets") },
    { name: market.country, url: absoluteUrl(marketPath(market.slug)) },
  ];

  const snapshot = [
    { label: "Region", value: market.region },
    { label: "Programme", value: waveLabel(market.wave) },
    { label: "Currency", value: market.currency },
    { label: "Languages", value: market.languages.join(", ") },
    { label: "Shipping ports", value: market.logistics.ports },
    { label: "Key cities", value: market.cities.slice(0, 5).join(", ") },
  ];

  return (
    <>
      <StructuredData schema={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData schema={marketServiceSchema(market)} />
      <StructuredData schema={faqSchema(market.faqs)} />
      <StructuredData
        schema={webPageSchema({
          name: `Elevators and escalators for ${market.country}`,
          description: market.metaDescription,
          path: marketPath(market.slug),
          about: `Elevator and escalator supply for ${market.country}`,
          language: countryLanguageTag(market.code),
          image: market.heroImage,
        })}
      />

      <PageHero
        eyebrow={`${waveLabel(market.wave)} · ${market.region}`}
        title={market.headline}
        description={market.metaDescription}
        image={market.heroImage}
        imageAlt={market.heroAlt}
        breadcrumb="MARKETS"
        breadcrumbHref="/markets"
        titleBlue
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets" },
          { label: market.country },
        ]}
      />

      <MarketNav currentCode={market.code} />

      {/* Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0047BB]" aria-hidden="true" />
              <span className="eyebrow text-[#0047BB]">Market overview</span>
            </div>
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Elevator &amp; escalator supply for {market.country}
            </h2>
            <div className="mt-6 space-y-5">
              {market.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[15px] leading-relaxed text-slate-600 md:text-[15.5px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <MarketNote className="mt-8" />
          </div>

          <aside className="h-fit border border-slate-200 bg-slate-50 p-6 md:p-8">
            <span className="eyebrow text-[#0047BB]">Market snapshot</span>
            <dl className="mt-6 divide-y divide-slate-200">
              {snapshot.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {fact.label}
                  </dt>
                  <dd className="text-[12.5px] leading-relaxed text-[#0f172a] sm:text-right">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#0047BB] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB] transition-opacity hover:opacity-70"
            >
              Discuss this market
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* Demand drivers */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Market demand"
            title={`What is driving demand in ${market.shortName}`}
            description={`The building types and investment priorities shaping elevator and escalator requirements across ${market.country}.`}
          />
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {market.demandDrivers.map((driver, index) => (
              <div key={driver.title} className="bg-white p-6 md:p-8">
                <span className="heading text-[32px] leading-none text-slate-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subheading mt-5 text-[15px] text-[#0f172a]">
                  {driver.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-500">
                  {driver.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product solutions */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow={`${market.shortName} product solutions`}
            title="Priority products for this market"
            description="Each product page combines the technical product overview with local project context, shipping routes and market-specific questions."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focuses.map((focus) => (
              <FocusCard
                key={focus.slug}
                focus={focus}
                href={marketFocusPath(market.slug, focus.slug)}
                kicker={market.shortName}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-relaxed text-slate-500">
              Looking for a product outside this priority list? The full range
              is available for project-specific review.
            </p>
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-2 border-b border-[#0047BB] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB] transition-opacity hover:opacity-70"
            >
              Browse all products
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Project types / buyers */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="container-gutter mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0047BB]" aria-hidden="true" />
              <span className="eyebrow text-[#0047BB]">Project types</span>
            </div>
            <h2 className="heading text-[clamp(26px,3vw,36px)] text-[#0f172a]">
              Buildings we support
            </h2>
            <ul className="mt-7 divide-y divide-slate-200 border-t border-slate-200">
              {market.projectTypes.map((projectType) => (
                <li key={projectType} className="flex items-center gap-4 py-4">
                  <span className="text-[#0047BB]" aria-hidden="true">
                    &rarr;
                  </span>
                  <span className="text-[14px] leading-relaxed text-slate-600">
                    {projectType}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0047BB]" aria-hidden="true" />
              <span className="eyebrow text-[#0047BB]">Who we work with</span>
            </div>
            <h2 className="heading text-[clamp(26px,3vw,36px)] text-[#0f172a]">
              Project partners
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {market.buyerSegments.map((segment) => (
                <div
                  key={segment}
                  className="border border-slate-200 bg-white p-4 text-[13px] leading-snug text-slate-600"
                >
                  {segment}
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-slate-500">
              We support the commercial and technical teams responsible for
              specification, procurement, installation and facility operation.
            </p>
          </div>
        </div>
      </section>

      {/* Logistics & compliance */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Delivery & compliance"
            title={`Getting equipment to ${market.shortName} projects`}
            description="Shipping routes, documentation and local approval contexts that shape how equipment is delivered and accepted."
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="border border-slate-200 p-6 md:p-8">
              <span className="eyebrow text-[#0047BB]">Shipping &amp; logistics</span>
              <h3 className="subheading mt-4 text-[18px] text-[#0f172a]">
                {market.logistics.ports}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
                {market.logistics.note}
              </p>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Documentation package
                </p>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
                  <li>Packing list, commercial invoice and export documentation</li>
                  <li>Layout, shaft and interface drawings</li>
                  <li>Product data, test records and operating guidance</li>
                </ul>
              </div>
            </div>

            <div className="border border-slate-200 p-6 md:p-8">
              <span className="eyebrow text-[#0047BB]">Compliance context</span>
              <div className="mt-4 space-y-5">
                {market.compliance.map((item) => (
                  <div key={item.standard}>
                    <h3 className="subheading text-[14px] text-[#0f172a]">
                      {item.standard}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-slate-200 pt-5 text-[12px] leading-relaxed text-slate-500">
                Compliance statements are indicative. The final standard,
                certification and approval matrix is confirmed with the project
                consultant and local authority before contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fuji Fenix */}
      <section className="bg-[#071324] py-16 text-white md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Why Fuji Fenix"
            title={`A manufacturer for ${market.shortName} project teams`}
            description="Engineering, documentation and delivery support designed around international construction workflows."
            dark
          />
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {SUPPLY_POINTS.map((point, index) => (
              <div key={point.title} className="bg-[#071324] p-6 md:p-8">
                <span className="eyebrow text-[#60a5fa]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subheading mt-4 text-[15px] text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">
                  {point.description}
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
              eyebrow={`${market.shortName} FAQ`}
              title={`Questions from ${market.shortName} project teams`}
              description="Product, compliance and delivery questions specific to this market."
            />
            <FaqList faqs={market.faqs} />
          </div>
        </div>
      </section>

      {/* Related markets */}
      {related.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="container-gutter mx-auto max-w-[1440px]">
            <SectionTitle
              eyebrow="Related markets"
              title="Explore neighbouring and comparable markets"
              description="Compare how product requirements, logistics and compliance differ across the region."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedMarket) => (
                <MarketCard key={relatedMarket.slug} market={relatedMarket} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Discuss a project in ${market.country}`}
        description="Send the building type, location, shaft details and target timeline. We will confirm the product configuration, documentation and delivery route for the project."
        primaryHref="/contact"
        primaryLabel="Request a quotation"
        secondaryHref="/markets"
        secondaryLabel="All markets"
      />
    </>
  );
}
