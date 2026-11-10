import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import { getSafeImageUrl } from "@/app/lib/safeImageUrl";
import {
  getMarket,
  getRelatedMarkets,
  MARKETS,
  marketFocusPath,
  marketPath,
} from "@/lib/markets";
import {
  absoluteUrl,
  marketFocusMetadata,
  marketFocusServiceSchema,
  webPageSchema,
} from "@/lib/market-seo";
import {
  PRODUCT_FOCUSES,
  type FocusSlug,
  type ProductFocus,
} from "@/lib/product-focuses";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import Breadcrumbs from "../../_components/Breadcrumbs";
import CtaBand from "../../_components/CtaBand";
import FaqList from "../../_components/FaqList";
import FocusCard from "../../_components/FocusCard";
import MarketNote from "../../_components/MarketNote";
import SectionTitle from "../../_components/SectionTitle";

export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETS.flatMap((market) =>
    market.focuses.map((focus) => ({
      country: market.slug,
      focus,
    }))
  );
}

function resolveFocus(
  country: string,
  focusSlug: string
): { market: NonNullable<ReturnType<typeof getMarket>>; focus: ProductFocus } | null {
  const market = getMarket(country);
  const focus = PRODUCT_FOCUSES[focusSlug as FocusSlug];
  if (!market || !focus || !market.focuses.includes(focus.slug)) return null;
  return { market, focus };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; focus: string }>;
}): Promise<Metadata> {
  const { country, focus } = await params;
  const resolved = resolveFocus(country, focus);
  return resolved ? marketFocusMetadata(resolved.market, resolved.focus) : {};
}

export default async function MarketFocusPage({
  params,
}: {
  params: Promise<{ country: string; focus: string }>;
}) {
  const { country, focus: focusSlug } = await params;
  const resolved = resolveFocus(country, focusSlug);
  if (!resolved) notFound();

  const { market, focus } = resolved;
  const focusNote = market.focusNotes[focus.slug] ?? focus.summary;
  const relatedMarkets = getRelatedMarkets(market);
  const otherFocuses = market.focuses
    .filter((slug) => slug !== focus.slug)
    .map((slug) => PRODUCT_FOCUSES[slug]);

  const faqs = [...focus.faqs, ...market.faqs.slice(0, 3)];

  const breadcrumbItems = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Markets", url: absoluteUrl("/markets") },
    { name: market.country, url: absoluteUrl(marketPath(market.slug)) },
    {
      name: focus.shortTitle,
      url: absoluteUrl(marketFocusPath(market.slug, focus.slug)),
    },
  ];

  return (
    <>
      <StructuredData schema={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData schema={marketFocusServiceSchema(market, focus)} />
      <StructuredData schema={faqSchema(faqs)} />
      <StructuredData
        schema={webPageSchema({
          name: `${focus.title} for ${market.country}`,
          description: focusNote,
          path: marketFocusPath(market.slug, focus.slug),
          about: `${focus.title} for ${market.country}`,
        })}
      />

      <PageHero
        eyebrow={`${market.shortName} · ${focus.category}`}
        title={[
          focus.shortTitle.toUpperCase(),
          `FOR ${market.shortName.toUpperCase()} PROJECTS`,
        ]}
        description={`Engineered ${focus.shortTitle.toLowerCase()} for ${market.country} projects — technical drawings, factory testing and export support from Fuji Fenix.`}
        image={getSafeImageUrl(focus.image)}
        imageAlt={focus.imageAlt}
        breadcrumb="MARKETS"
        breadcrumbHref="/markets"
        titleBlue
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets" },
          { label: market.country, href: marketPath(market.slug) },
          { label: focus.shortTitle },
        ]}
      />

      {/* Product-market intro */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0047BB]" aria-hidden="true" />
              <span className="eyebrow text-[#0047BB]">
                Product &amp; market fit
              </span>
            </div>
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              {focus.shortTitle} for {market.shortName} projects
            </h2>
            <p className="mt-6 text-[15.5px] leading-relaxed text-slate-600">
              {focusNote}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
              {focus.summary}
            </p>
            <MarketNote className="mt-8" />
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={getSafeImageUrl(focus.image)}
                alt={`${focus.title} for ${market.country} projects`}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 border border-slate-200 bg-white p-4 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.35)] sm:left-8 sm:right-auto sm:max-w-xs sm:p-5">
              <div className="eyebrow text-[#0047BB]">Project focus</div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
                {market.shortName} · {focus.category}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="mt-6 border-y border-slate-200 bg-slate-50 py-16 md:mt-10 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Applications"
            title={`Where ${focus.shortTitle.toLowerCase()} are used`}
            description="Typical building applications for this product family. Final configuration is matched to the project brief and local requirements."
          />
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {focus.applications.map((application, index) => (
              <div
                key={application}
                className="flex items-start gap-4 bg-white p-5 md:p-6"
              >
                <span className="heading text-[24px] leading-none text-slate-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[13.5px] leading-relaxed text-slate-600">
                  {application}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configuration options */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Configuration"
            title="Options engineered around the project"
            description="Capacities, speeds, dimensions and finishes are confirmed against the approved shaft, traffic analysis and local code requirements."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {focus.configurations.map((configuration, index) => (
              <div
                key={configuration.title}
                className="border border-slate-200 p-6 md:p-7"
              >
                <span className="eyebrow text-[#0047BB]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subheading mt-4 text-[16px] text-[#0f172a]">
                  {configuration.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-500">
                  {configuration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply to market */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow={`Supply to ${market.shortName}`}
            title={`Delivering ${focus.shortTitle.toLowerCase()} to ${market.country}`}
            description="Logistics, documentation and approval context for this market."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-slate-200 bg-white p-6 md:p-8">
              <span className="eyebrow text-[#0047BB]">Shipping &amp; logistics</span>
              <h3 className="subheading mt-4 text-[18px] text-[#0f172a]">
                {market.logistics.ports}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
                {market.logistics.note}
              </p>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Export package
                </p>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
                  <li>Approved layout and interface drawings</li>
                  <li>Product data, test records and operating guidance</li>
                  <li>Packing list, invoice and customs documentation</li>
                </ul>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-6 md:p-8">
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
                The final standard, certification and approval matrix is
                confirmed with the project consultant and local authority before
                contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturer support */}
      <section className="bg-[#071324] py-16 text-white md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Manufacturer support"
            title={`Why source ${focus.shortTitle.toLowerCase()} from Fuji Fenix`}
            description="A single manufacturing, engineering and documentation partner from concept to delivery."
            dark
          />
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {focus.supplyPoints.map((point, index) => (
              <div key={point} className="bg-[#071324] p-6 md:p-8">
                <span className="eyebrow text-[#60a5fa]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[14px] leading-relaxed text-slate-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-relaxed text-slate-400">
              Need the full technical product page?
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={focus.productHref}
                className="inline-flex items-center gap-2 border-b border-[#60a5fa] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#60a5fa] transition-opacity hover:opacity-70"
              >
                {focus.title}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href={`/products/${focus.categorySlug}`}
                className="inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 transition-opacity hover:opacity-70"
              >
                {focus.category}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionTitle
              eyebrow={`${market.shortName} FAQ`}
              title={`${focus.shortTitle} questions for ${market.shortName}`}
              description="Technical and market-specific questions buyers ask before requesting a quotation."
            />
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Other focuses in this market */}
      {otherFocuses.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="container-gutter mx-auto max-w-[1440px]">
            <SectionTitle
              eyebrow={`More for ${market.shortName}`}
              title={`Other products for ${market.country} projects`}
              description="Explore the rest of the priority product range for this market."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherFocuses.map((otherFocus) => (
                <FocusCard
                  key={otherFocus.slug}
                  focus={otherFocus}
                  href={marketFocusPath(market.slug, otherFocus.slug)}
                  kicker={market.shortName}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Same product, related markets */}
      {relatedMarkets.length > 0 ? (
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="container-gutter mx-auto max-w-[1440px]">
            <SectionTitle
              eyebrow="Related markets"
              title={`${focus.shortTitle} in other markets`}
              description="Compare product pages across neighbouring and comparable markets."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMarkets.map((relatedMarket) => {
                const hasFocus = relatedMarket.focuses.includes(focus.slug);
                return (
                  <Link
                    key={relatedMarket.slug}
                    href={
                      hasFocus
                        ? marketFocusPath(relatedMarket.slug, focus.slug)
                        : marketPath(relatedMarket.slug)
                    }
                    className="group flex items-center justify-between gap-4 border border-slate-200 px-5 py-4 transition-colors hover:border-[#0047BB]"
                  >
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#0047BB]">
                        {hasFocus ? focus.shortTitle : "Market overview"}
                      </span>
                      <span className="mt-1 block text-[14px] font-semibold text-[#0f172a]">
                        {relatedMarket.country}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[#0047BB] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
            <p className="mt-6 text-[12.5px] leading-relaxed text-slate-500">
              Looking for another country?{" "}
              <Link
                href="/markets"
                className="font-semibold text-[#0047BB] underline-offset-4 hover:underline"
              >
                View all markets
              </Link>
              .
            </p>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Need ${focus.shortTitle.toLowerCase()} for a ${market.shortName} project?`}
        description="Send the project location, building type, shaft details and target timeline. We will respond with the right configuration, documentation and delivery plan."
        primaryHref="/contact"
        primaryLabel="Request a quotation"
        secondaryHref={marketPath(market.slug)}
        secondaryLabel={`${market.shortName} market overview`}
      />
    </>
  );
}
