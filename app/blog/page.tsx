import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import Breadcrumbs from "@/app/markets/_components/Breadcrumbs";
import CtaBand from "@/app/markets/_components/CtaBand";
import SectionTitle from "@/app/markets/_components/SectionTitle";
import { BLOG_POSTS, blogPath } from "@/lib/blog-data";
import {
  BRAND_KEYWORDS,
  PRODUCT_KEYWORDS,
  SERVICE_KEYWORDS,
  TECHNICAL_KEYWORDS,
  BUYER_INTENT_KEYWORDS,
  MARKET_KEYWORDS,
  seoKeywords,
} from "@/lib/seo-keywords";
import {
  blogCollectionSchema,
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/structured-data";

const SITE_URL = "https://fujifenix.com";
const PATH = "/blog";

export const metadata: Metadata = {
  title: { absolute: "Elevator & Escalator Buying Guides | Fuji Fenix Blog" },
  description:
    "Practical elevator and escalator guides for developers, architects, contractors and distributors: supplier selection, product specification, export documents and priority market requirements.",
  keywords: seoKeywords(
    BRAND_KEYWORDS,
    PRODUCT_KEYWORDS,
    SERVICE_KEYWORDS,
    TECHNICAL_KEYWORDS,
    BUYER_INTENT_KEYWORDS,
    MARKET_KEYWORDS,
    [
      "elevator blog",
      "escalator blog",
      "elevator buying guide",
      "escalator buying guide",
      "vertical transportation guides",
      "elevator project guides",
      "elevator supplier guides",
      "elevator tender guide",
      "international elevator projects",
    ]
  ),
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
    languages: {
      en: `${SITE_URL}${PATH}`,
      "x-default": `${SITE_URL}${PATH}`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}${PATH}`,
    siteName: "Fuji Fenix Elevator",
    title: "Elevator & Escalator Buying Guides | Fuji Fenix Blog",
    description:
      "Supplier selection, product specification, export documentation and market guides for international vertical transportation projects.",
    images: [
      {
        url: `${SITE_URL}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Fuji Fenix elevator and escalator buying guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevator & Escalator Buying Guides | Fuji Fenix Blog",
    description:
      "Supplier selection, product specification, export documentation and market guides for international vertical transportation projects.",
    images: [`${SITE_URL}/og-home.jpg`],
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
};

const INDEX_FAQS = [
  {
    question: "What does the Fuji Fenix blog cover?",
    answer:
      "The blog explains how to specify elevators, escalators and moving walks for real projects: supplier selection, passenger versus home versus freight lifts, transit equipment, export documentation and priority market requirements.",
  },
  {
    question: "Is this advice specific to Fuji Fenix products?",
    answer:
      "The guides reflect the equipment Fuji Fenix manufactures in Shanghai and the questions project teams ask when specifying it. They are written to help buyers prepare a clear brief, drawing set and tender package.",
  },
  {
    question: "Can I ask about a project in a specific country?",
    answer:
      "Yes. The market guide links to dedicated country pages for Pakistan, the UAE, Saudi Arabia and other target markets. For a project-specific answer, send your drawings and brief through the contact page.",
  },
];

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <StructuredData schema={blogCollectionSchema()} />
      <StructuredData
        schema={itemListSchema(
          BLOG_POSTS.map((post) => ({
            name: post.title,
            url: `${SITE_URL}${blogPath(post.slug)}`,
            description: post.description,
            image: `${SITE_URL}${post.heroImage}`,
          }))
        )}
      />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}${PATH}` },
        ])}
      />
      <StructuredData schema={faqSchema(INDEX_FAQS)} />

      <PageHero
        eyebrow="KNOWLEDGE HUB"
        title={["ELEVATOR & ESCALATOR", "BUYING GUIDES"]}
        description="Clear, engineer-backed answers for developers, architects, contractors and distributors planning vertical transportation projects across international markets."
        image="/og-home.jpg"
        imageAlt="Fuji Fenix elevator and escalator project resources"
        breadcrumb="BLOG"
        titleBlue
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="Latest guide"
            title={featured.title}
            description={featured.description}
          />

          <Link
            href={blogPath(featured.slug)}
            className="group grid overflow-hidden border border-slate-200 bg-white transition-shadow hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)] lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative min-h-[280px] overflow-hidden bg-slate-100 md:min-h-[380px]">
              <Image
                src={featured.heroImage}
                alt={featured.heroAlt}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <span className="text-[#0047BB]">{featured.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{featured.readingMinutes} min read</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={featured.datePublished}>
                    {new Date(featured.datePublished).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="heading mt-6 text-[24px] leading-tight text-[#0f172a] md:text-[30px]">
                  {featured.title}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
                  {featured.description}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 border-b border-[#0047BB] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB]">
                Read the guide
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[1440px]">
          <SectionTitle
            eyebrow="All articles"
            title="Guides for every stage of a project"
            description="From the first supplier shortlist to the final export handover file, these articles explain what to ask and what to document."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={blogPath(post.slug)}
                className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition-shadow hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="relative h-[220px] overflow-hidden bg-slate-100">
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    <span className="text-[#0047BB]">{post.category}</span>
                    <span aria-hidden="true">/</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h3 className="heading mt-4 text-[19px] leading-snug text-[#0f172a]">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
                    {post.description}
                  </p>
                  <span className="mt-auto pt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB]">
                    Read article <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-gutter mx-auto max-w-[900px]">
          <SectionTitle
            eyebrow="FAQ"
            title="Questions before you read"
            description="Short answers to the questions we hear most often from project teams."
          />
          <div className="border-t border-slate-200">
            {INDEX_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-slate-200 py-5"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="subheading text-[14px] leading-snug text-[#0f172a] md:text-[15px]">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-slate-300 text-[16px] leading-none text-[#0047BB] transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to specify your vertical transportation package?"
        description="Send your project brief and drawings. We will confirm the configuration, documentation and delivery plan for your market."
        primaryHref="/contact"
        primaryLabel="Request a quotation"
        secondaryHref="/products"
        secondaryLabel="View products"
      />
    </>
  );
}
