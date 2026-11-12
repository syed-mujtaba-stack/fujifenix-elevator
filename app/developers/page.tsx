import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";

const SITE_URL = "https://fujifenix.com";

export const metadata: Metadata = {
  title: { absolute: "Website Development Team | Fuji Fenix" },
  description:
    "The Fuji Fenix website is designed and developed by Yusra Ateeq and Syed Mujtaba Abbas, full-stack and agentic AI engineers based in Karachi, Pakistan. View their profiles, focus areas and portfolios.",
  keywords: [
    "Fuji Fenix website development",
    "Fuji Fenix developer",
    "Yusra Ateeq",
    "Syed Mujtaba Abbas",
    "full-stack developer Karachi",
    "agentic AI engineer",
  ],
  alternates: {
    canonical: `${SITE_URL}/developers`,
  },
  openGraph: {
    title: "Website Development Team | Fuji Fenix",
    description:
      "The full-stack and agentic AI engineers who designed and built the Fuji Fenix website.",
    url: `${SITE_URL}/developers`,
    siteName: "Fuji Fenix Elevator",
    locale: "en_US",
    type: "profile",
    images: [`${SITE_URL}/hero-elevator.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Team | Fuji Fenix",
    description:
      "The full-stack and agentic AI engineers who designed and built the Fuji Fenix website.",
    images: [`${SITE_URL}/hero-elevator.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface DeveloperLink {
  label: string;
  href: string;
}

interface Developer {
  name: string;
  initials: string;
  role: string;
  location: string;
  bio: string;
  focus: string[];
  portfolio: string;
  links: DeveloperLink[];
}

const DEVELOPERS: Developer[] = [
  {
    name: "Yusra Ateeq",
    initials: "YA",
    role: "Agentic AI Engineer & Full Stack Developer",
    location: "Karachi, Pakistan",
    bio: "Full-stack and agentic AI engineer building intelligent web applications, modern UI systems and cloud deployments. Works across the stack, from interface design to production infrastructure.",
    focus: ["Agentic AI", "Full-stack", "Cloud & DevOps"],
    portfolio: "https://yusraateeq-portfolio.vercel.app/",
    links: [
      { label: "GitHub", href: "https://github.com/yusraateeq" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yusra-ateeq-00797a2b1",
      },
    ],
  },
  {
    name: "Syed Mujtaba Abbas",
    initials: "SMA",
    role: "Full-Stack Developer, Agentic AI Engineer & Founder",
    location: "Karachi, Pakistan",
    bio: "Full-stack developer and agentic AI engineer specialising in Next.js e-commerce platforms, headless CMS architecture and WhatsApp AI agents. Founder of AlphaMind, AlphaTech AI and SetupCI.",
    focus: ["Next.js & React", "Sanity CMS", "Agentic AI", "Python backends"],
    portfolio: "https://www.syedmujtabaabbas.xyz/",
    links: [],
  },
];

const BUILD_STACK = [
  {
    title: "Next.js 16 & React 19",
    description:
      "App Router rendering, static generation for market pages and metadata-driven SEO across the site.",
  },
  {
    title: "Sanity headless CMS",
    description:
      "Editor-managed products and categories with structured content delivered through GROQ queries.",
  },
  {
    title: "Tailwind CSS design system",
    description:
      "A shared visual language of typography, spacing and components used across every page.",
  },
  {
    title: "Vercel deployment",
    description:
      "Production hosting with regional caching, security headers and preview deployments for each change.",
  },
];

export default function DevelopersPage() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/developers#page`,
    url: `${SITE_URL}/developers`,
    name: "Website Development Team | Fuji Fenix",
    description:
      "The developers who designed and built the Fuji Fenix website.",
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: DEVELOPERS.map((developer) => ({
      "@type": "Person",
      name: developer.name,
      jobTitle: developer.role,
      url: developer.portfolio,
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
      },
      knowsAbout: developer.focus,
      sameAs: developer.links.map((link) => link.href),
      worksFor: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    })),
  };

  return (
    <>
      <StructuredData schema={profilePageSchema} />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Developers", url: "/developers" },
        ])}
      />

      <PageHero
        eyebrow="DEVELOPMENT TEAM"
        title={["THE DEVELOPERS"]}
        description="The engineers who designed, built and maintain the Fuji Fenix website."
        image="/hero-elevator.jpg"
        imageAlt="Fuji Fenix elevator"
        breadcrumb="DEVELOPERS"
        titleBlue
      />

      {/* Team cards */}
      <section className="bg-white section-gap">
        <div className="container-gutter">
          <div className="mb-10 flex items-center gap-3 md:mb-14">
            <div className="h-px w-8 bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">WHO BUILT THIS SITE</span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              A two-person team behind the build
            </h2>
            <p className="body-text mt-5 text-slate-500">
              The Fuji Fenix website was designed and developed by an
              independent team of full-stack and agentic AI engineers. They work
              with Fuji Fenix on the site&apos;s design system, content
              architecture, market pages and ongoing technical maintenance.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {DEVELOPERS.map((developer) => (
              <article
                key={developer.name}
                className="group flex h-full flex-col border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0047BB] hover:shadow-[0_18px_44px_-28px_rgba(0,71,187,0.5)] md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    aria-hidden="true"
                    className="heading flex h-16 w-16 flex-shrink-0 items-center justify-center border border-slate-200 bg-[#f8fafc] text-[22px] text-[#0047BB]"
                  >
                    {developer.initials}
                  </div>
                  <span className="eyebrow text-right text-[9.5px] text-slate-400">
                    WEB · AI · CLOUD
                  </span>
                </div>

                <h3 className="heading mt-7 text-[clamp(24px,2.6vw,32px)] text-[#0f172a]">
                  {developer.name}
                </h3>
                <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0047BB]">
                  {developer.role}
                </div>
                <div className="mt-1.5 text-[12px] text-slate-500">
                  {developer.location}
                </div>

                <p className="mt-5 text-[14px] leading-relaxed text-slate-500">
                  {developer.bio}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {developer.focus.map((item) => (
                    <li
                      key={item}
                      className="border border-slate-200 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  <a
                    href={developer.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${developer.name} portfolio`}
                    className="inline-flex items-center gap-2 bg-[#0047BB] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-[#003a99]"
                  >
                    Portfolio
                    <span aria-hidden="true">&nearr;</span>
                  </a>
                  {developer.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${developer.name} on ${link.label}`}
                      className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 transition-colors duration-200 hover:border-[#0047BB] hover:text-[#0047BB]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Build stack */}
      <section className="border-y border-slate-200 bg-slate-50 section-gap">
        <div className="container-gutter">
          <div className="mb-10 flex items-center gap-3 md:mb-14">
            <div className="h-px w-8 bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">HOW THE SITE IS BUILT</span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Modern, static-first engineering
            </h2>
            <p className="body-text mt-5 text-slate-500">
              The site is built for speed, crawlability and long-term
              maintainability, so market pages, product pages and the CMS stay
              consistent as the programme grows.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {BUILD_STACK.map((item) => (
              <div key={item.title} className="bg-white p-6 md:p-7">
                <h3 className="subheading text-[15px] text-[#0f172a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white section-gap">
        <div className="container-gutter">
          <div className="flex flex-col gap-6 border border-slate-200 bg-[#071324] p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow text-[#60a5fa]">WORK WITH FUJI FENIX</span>
              <h2 className="heading mt-4 text-[clamp(24px,2.8vw,34px)] text-white">
                Planning an elevator or escalator project?
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
                Send the building type, location, shaft information and target
                timeline. Our team will confirm the configuration, documentation
                and delivery plan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0047BB] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-[#003a99]"
              >
                Request a quotation
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:border-[#0047BB] hover:text-[#60a5fa]"
              >
                Explore markets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
