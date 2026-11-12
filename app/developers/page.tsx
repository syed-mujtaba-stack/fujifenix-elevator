import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";

const SITE_URL = "https://fujifenix.com";

export const metadata: Metadata = {
  title: { absolute: "Website Development Team | Fuji Fenix" },
  description:
    "The Fuji Fenix website is designed and developed by Yusra Ateeq and Syed Mujtaba Abbas — full-stack developers and agentic AI engineers based in Karachi, Pakistan. Explore their skills, experience and social profiles.",
  keywords: [
    "Fuji Fenix website development",
    "Fuji Fenix developer",
    "Yusra Ateeq",
    "Syed Mujtaba Abbas",
    "full-stack developer Karachi",
    "agentic AI engineer",
    "Next.js developer",
    "Sanity CMS developer",
    "DevOps engineer",
    "WordPress expert",
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

type SocialKey = "github" | "linkedin" | "instagram";

interface DeveloperSocial {
  key: SocialKey;
  label: string;
  href: string;
}

interface SkillGroup {
  title: string;
  items: string[];
}

interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  description: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
}

interface Developer {
  slug: string;
  name: string;
  image: string;
  imagePosition: string;
  role: string;
  roleShort: string;
  location: string;
  bio: string;
  stats: { value: string; label: string }[];
  focus: string[];
  portfolio: string;
  socials: DeveloperSocial[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  worksFor?: string[];
}

const DEVELOPERS: Developer[] = [
  {
    slug: "yusra-ateeq",
    name: "Yusra Ateeq",
    image: "/developers/yusra-ateeq.jpg",
    imagePosition: "object-top",
    role: "Full-Stack Developer · Agentic AI · DevOps · WordPress Expert",
    roleShort: "Full-Stack Developer · Agentic AI · DevOps",
    location: "Nazimabad, Karachi, Pakistan",
    bio: "Full-stack developer with 2+ years across modern web technologies and AI-powered applications. Combines engineering with a business background (BBA) to turn client requirements into production software, with 20+ projects delivered for 15+ clients across web, AI and WordPress.",
    stats: [
      { value: "2+", label: "Years experience" },
      { value: "20+", label: "Projects" },
      { value: "15+", label: "Clients" },
      { value: "64", label: "Technologies" },
    ],
    focus: ["Agentic AI", "Full Stack", "Cloud & DevOps", "WordPress"],
    portfolio: "https://yusraateeq-portfolio.vercel.app/",
    socials: [
      { key: "github", label: "GitHub", href: "https://github.com/yusraateeq" },
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yusra-ateeq-00797a2b1/",
      },
      {
        key: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/ateeq.yusra",
      },
    ],
    skills: [
      {
        title: "Languages",
        items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
      },
      {
        title: "Frontend",
        items: [
          "React",
          "Next.js",
          "Tailwind CSS",
          "Redux",
          "Framer Motion",
          "GSAP",
          "Three.js",
          "shadcn/ui",
        ],
      },
      {
        title: "Backend",
        items: [
          "Node.js",
          "Express.js",
          "FastAPI",
          "REST APIs",
          "WebSockets",
          "Auth",
        ],
      },
      {
        title: "Databases",
        items: ["MongoDB", "PostgreSQL", "Neon", "Firebase", "Redis"],
      },
      {
        title: "Agentic AI",
        items: [
          "OpenAI",
          "Gemini",
          "Claude",
          "OpenRouter",
          "LangChain",
          "RAG",
          "AI Agents",
          "MCP",
          "Prompt Engineering",
        ],
      },
      {
        title: "DevOps & Cloud",
        items: [
          "Docker",
          "GitHub Actions",
          "Linux",
          "Nginx",
          "CI/CD",
          "AWS",
          "Google Cloud",
          "Azure",
          "Vercel",
          "Cloudflare",
          "Supabase",
          "DigitalOcean",
        ],
      },
      {
        title: "CMS & Design",
        items: [
          "Sanity",
          "WordPress",
          "Headless CMS",
          "Figma",
          "UI Design",
          "UX Design",
          "Wireframing",
          "Prototyping",
        ],
      },
    ],
    experience: [
      {
        role: "Business Development",
        org: "1MindSoft",
        period: "Mar 2024 – Aug 2025",
        description:
          "Worked with international clients on requirement analysis and technical feasibility, bridging technical teams and business stakeholders.",
      },
      {
        role: "Full Stack Development Intern",
        org: "Code Alfa",
        period: "Internship",
        description:
          "Contributed to full-stack web development projects across frontend and backend features.",
      },
      {
        role: "WordPress Development Intern",
        org: "Codex Cue",
        period: "Internship",
        description:
          "Developed and maintained WordPress websites, themes and content structures.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Business Administration",
        institution: "University of Ziauddin",
        period: "2025 – 2028",
      },
      {
        degree: "Diploma in Web Development",
        institution: "Pak Collegiate",
        period: "Nov 2023 – Apr 2024",
      },
    ],
    certifications: [
      "Full Stack Web Development — Pak Collegiate, 2024",
      "WordPress Development — Codex Cue, 2024",
    ],
  },
  {
    slug: "syed-mujtaba-abbas",
    name: "Syed Mujtaba Abbas",
    image: "/developers/syed-mujtaba-abbas.jpg",
    imagePosition: "object-top",
    role: "Full-Stack Developer · Agentic AI · DevOps · Robotics AI",
    roleShort: "Full-Stack Developer · Agentic AI · DevOps",
    location: "Karachi, Pakistan",
    bio: "AI-focused full-stack developer and founder of AlphaMind, AlphaTech AI and SetupCI, with 25+ shipped production systems. Specialises in Next.js 16 and Sanity CMS e-commerce platforms, WhatsApp Cloud API agents, Playwright automation, FastAPI/Django backends and cloud delivery.",
    stats: [
      { value: "25+", label: "Shipped systems" },
      { value: "3", label: "Companies founded" },
      { value: "8", label: "Core domains" },
      { value: "2", label: "PyPI packages" },
    ],
    focus: [
      "Next.js & Sanity CMS",
      "Agentic AI",
      "Automation",
      "Cloud & DevOps",
    ],
    portfolio: "https://www.syedmujtabaabbas.xyz/",
    socials: [
      {
        key: "github",
        label: "GitHub",
        href: "https://github.com/syed-mujtaba-stack",
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mjsyed/",
      },
      {
        key: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/m.j_syed/",
      },
    ],
    skills: [
      {
        title: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "GSAP",
          "Framer Motion",
          "Three.js",
          "React Native",
        ],
      },
      {
        title: "CMS & E-commerce",
        items: [
          "Sanity Headless CMS",
          "GROQ",
          "Headless storefronts",
          "Custom admin panels",
          "PostgreSQL",
          "Supabase",
        ],
      },
      {
        title: "Agentic AI",
        items: [
          "OpenAI Agents SDK",
          "Google Gemini API",
          "OpenRouter",
          "RAG systems",
          "Realtime voice agents",
          "Multi-agent orchestration",
        ],
      },
      {
        title: "Automation",
        items: [
          "WhatsApp Cloud API",
          "Meta webhooks",
          "Playwright",
          "Google Maps lead scraping",
          "Google Sheets CRM sync",
        ],
      },
      {
        title: "Backend",
        items: [
          "Python",
          "FastAPI",
          "Django REST Framework",
          "Node.js",
          "Redis",
          "PyPI packaging",
        ],
      },
      {
        title: "DevOps & Cloud",
        items: [
          "Docker",
          "GitHub Actions",
          "CI/CD",
          "Vercel",
          "Cloud deployment",
          "Technical SEO",
        ],
      },
      {
        title: "Robotics AI",
        items: ["Physical AI", "Humanoid robotics", "Embodied intelligence"],
      },
    ],
    experience: [
      {
        role: "Independent Tech Consultant",
        org: "Full-Stack & AI",
        period: "Jan 2024 – Present",
        description:
          "Delivers end-to-end software and AI solutions for international clients — architecture, agentic workflows, Next.js/Sanity platforms and cloud deployment.",
      },
      {
        role: "Founder",
        org: "AlphaMind",
        period: "2025 – Present",
        description:
          "AI product studio building AI-native learning and coding platforms such as EduGenius and GemCode.",
      },
      {
        role: "Founder",
        org: "AlphaTech AI",
        period: "2025 – Present",
        description:
          "AI automation and full-stack agency behind BotFlow (WhatsApp AI agent builder) and LeadHunter v2.",
      },
      {
        role: "Founder & Creator",
        org: "SetupCI",
        period: "2025 – Present",
        description:
          "Open-source Python CLI tools published on PyPI (setupci, mj-fte) with companion documentation portals.",
      },
    ],
    education: [
      {
        degree: "B.S. in Robotics",
        institution: "Superior University, Karachi",
      },
      {
        degree: "Agentic AI",
        institution:
          "GIAIC — Governor Sindh Initiative for AI, Web 3.0 & Metaverse",
      },
    ],
    certifications: [],
    worksFor: ["AlphaMind", "AlphaTech AI", "SetupCI"],
  },
];

const SOCIAL_ICONS: Record<SocialKey, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

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
    description: "The developers who designed and built the Fuji Fenix website.",
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: DEVELOPERS.map((developer) => ({
      "@type": "Person",
      "@id": `${SITE_URL}/developers#${developer.slug}`,
      name: developer.name,
      jobTitle: developer.role,
      description: developer.bio,
      image: `${SITE_URL}${developer.image}`,
      url: developer.portfolio,
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
      },
      knowsAbout: developer.skills.flatMap((group) => group.items),
      sameAs: developer.socials.map((social) => social.href),
      ...(developer.worksFor
        ? {
            worksFor: developer.worksFor.map((name) => ({
              "@type": "Organization",
              name,
            })),
          }
        : {}),
      alumniOf: developer.education.map((item) => ({
        "@type": "EducationalOrganization",
        name: item.institution,
      })),
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
              The Fuji Fenix website was designed and developed by an independent
              team of full-stack developers and agentic AI engineers. They work
              with Fuji Fenix on the site&apos;s design system, content
              architecture, market pages and ongoing technical maintenance.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {DEVELOPERS.map((developer) => (
              <article
                key={developer.name}
                className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0047BB] hover:shadow-[0_18px_44px_-28px_rgba(0,71,187,0.5)]"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={developer.image}
                    alt={`${developer.name} — ${developer.role}`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    priority={false}
                    className={`object-cover ${developer.imagePosition} transition-transform duration-700 group-hover:scale-[1.03]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="heading text-[clamp(24px,2.6vw,32px)] text-white">
                        {developer.name}
                      </h3>
                      <div className="mt-1 text-[11px] text-slate-200">
                        {developer.location}
                      </div>
                    </div>
                    <a
                      href={developer.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${developer.name} portfolio`}
                      className="inline-flex flex-shrink-0 items-center gap-2 bg-[#0047BB] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-[#003a99]"
                    >
                      Portfolio
                      <span aria-hidden="true">&nearr;</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <div className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] text-[#0047BB]">
                    {developer.role}
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
                    {developer.bio}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {developer.focus.map((item) => (
                      <li
                        key={item}
                        className="border border-slate-200 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
                    {developer.stats.map((stat) => (
                      <div key={stat.label} className="bg-white px-3 py-3">
                        <dt className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                          {stat.label}
                        </dt>
                        <dd className="heading mt-1 text-[20px] text-[#0f172a]">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                    {developer.socials.map((social) => {
                      const Icon = SOCIAL_ICONS[social.key];
                      return (
                        <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${developer.name} on ${social.label}`}
                          title={`${developer.name} on ${social.label}`}
                          className="inline-flex items-center gap-2 border border-slate-200 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600 transition-colors duration-200 hover:border-[#0047BB] hover:bg-[#0047BB] hover:text-white"
                        >
                          <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                          {social.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-y border-slate-200 bg-slate-50 section-gap">
        <div className="container-gutter">
          <div className="mb-10 flex items-center gap-3 md:mb-14">
            <div className="h-px w-8 bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">SKILLS &amp; EXPERTISE</span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              What each developer brings
            </h2>
            <p className="body-text mt-5 text-slate-500">
              Skills and specialisations as published on their own portfolios,
              grouped by discipline.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {DEVELOPERS.map((developer) => (
              <div
                key={developer.slug}
                className="border border-slate-200 bg-white p-7 md:p-9"
              >
                <div className="border-b border-slate-200 pb-5">
                  <h3 className="heading text-[22px] text-[#0f172a]">
                    {developer.name}
                  </h3>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0047BB]">
                    {developer.roleShort}
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {developer.skills.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        {group.title}
                      </h4>
                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & education */}
      <section className="bg-white section-gap">
        <div className="container-gutter">
          <div className="mb-10 flex items-center gap-3 md:mb-14">
            <div className="h-px w-8 bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">
              EXPERIENCE &amp; EDUCATION
            </span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Professional background
            </h2>
            <p className="body-text mt-5 text-slate-500">
              Roles, companies and academic foundations for each member of the
              build team.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {DEVELOPERS.map((developer) => (
              <div
                key={developer.slug}
                className="border border-slate-200 bg-white p-7 md:p-9"
              >
                <div className="border-b border-slate-200 pb-5">
                  <h3 className="heading text-[22px] text-[#0f172a]">
                    {developer.name}
                  </h3>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0047BB]">
                    {developer.roleShort}
                  </div>
                </div>

                <ol className="mt-7 space-y-6 border-l border-slate-200 pl-5">
                  {developer.experience.map((item) => (
                    <li key={`${item.org}-${item.role}`} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 border-2 border-white bg-[#0047BB] ring-1 ring-[#0047BB]"
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h4 className="subheading text-[14px] text-[#0f172a]">
                          {item.role}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                          {item.period}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0047BB]">
                        {item.org}
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Education
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {developer.education.map((item) => (
                      <li key={item.degree}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span className="text-[13px] font-semibold text-[#0f172a]">
                            {item.degree}
                          </span>
                          {item.period ? (
                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                              {item.period}
                            </span>
                          ) : null}
                        </div>
                        <div className="text-[12px] text-slate-500">
                          {item.institution}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {developer.certifications.length > 0 ? (
                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Certifications
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {developer.certifications.map((item) => (
                        <li
                          key={item}
                          className="text-[12px] leading-relaxed text-slate-500"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
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
