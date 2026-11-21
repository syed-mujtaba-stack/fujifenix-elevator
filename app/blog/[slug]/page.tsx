import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import { StructuredData } from "@/app/components/StructuredData";
import Breadcrumbs from "@/app/markets/_components/Breadcrumbs";
import CtaBand from "@/app/markets/_components/CtaBand";
import SectionTitle from "@/app/markets/_components/SectionTitle";
import { BLOG_POSTS, blogPath, getBlogPost } from "@/lib/blog-data";
import {
  BRAND_KEYWORDS,
  BUYER_INTENT_KEYWORDS,
  MARKET_KEYWORDS,
  seoKeywords,
} from "@/lib/seo-keywords";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/structured-data";

const SITE_URL = "https://fujifenix.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}${blogPath(post.slug)}`;
  const keywords = seoKeywords(
    BRAND_KEYWORDS,
    [post.focusKeyphrase],
    post.keywords,
    BUYER_INTENT_KEYWORDS,
    MARKET_KEYWORDS
  );

  return {
    title: { absolute: post.seoTitle },
    description: post.description,
    keywords,
    authors: [{ name: post.author, url: SITE_URL }],
    creator: post.author,
    category: post.category,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: "Fuji Fenix Elevator",
      title: post.seoTitle,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      section: post.category,
      tags: post.keywords.slice(0, 12),
      images: [
        {
          url: `${SITE_URL}${post.heroImage}`,
          width: 1200,
          height: 630,
          alt: post.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [`${SITE_URL}${post.heroImage}`],
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
      "geo.region":
        post.slug === "elevator-manufacturer-china-shanghai" ? "CN" : "GLOBAL",
      ...(post.slug === "elevator-manufacturer-china-shanghai"
        ? { "geo.placename": "Shanghai, China" }
        : {}),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}${blogPath(post.slug)}`;
  const breadcrumbs = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.category, url: `${SITE_URL}/blog` },
    { name: post.title, url },
  ];
  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <StructuredData
        schema={blogPostingSchema({
          title: post.title,
          description: post.description,
          path: blogPath(post.slug),
          image: post.heroImage,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: post.author,
          category: post.category,
          keywords: post.keywords,
          about: [post.focusKeyphrase, ...post.keywords.slice(0, 5)],
        })}
      />
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />
      <StructuredData schema={faqSchema(post.faqs)} />

      <PageHero
        eyebrow={post.category.toUpperCase()}
        title={[post.title]}
        description={post.description}
        image={post.heroImage}
        imageAlt={post.heroAlt}
        breadcrumb="BLOG"
        breadcrumbHref="/blog"
        titleBlue
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category, href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="bg-white py-14 md:py-20">
        <div className="container-gutter mx-auto max-w-[1180px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                <span className="text-[#0047BB]">{post.category}</span>
                <span aria-hidden="true">/</span>
                <span>{post.readingMinutes} min read</span>
                <span aria-hidden="true">/</span>
                <time dateTime={post.datePublished}>
                  {new Date(post.datePublished).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              {/* PageHero renders the H1; this is the in-article title block. */}
              <h2 className="heading mt-6 max-w-3xl text-[28px] leading-tight text-[#0f172a] md:text-[40px]">
                {post.title}
              </h2>

              <p className="body-text mt-6 max-w-3xl">{post.description}</p>

              <div className="mt-10 border-l-2 border-[#0047BB] bg-slate-50 p-6 md:p-8">
                <span className="eyebrow text-[#0047BB]">Key takeaways</span>
                <ul className="mt-5 space-y-3">
                  {post.takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex gap-3 text-[14px] leading-relaxed text-slate-600 md:text-[15px]"
                    >
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0047BB]" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {post.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 pt-12 md:pt-16">
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="heading text-[22px] leading-snug text-[#0f172a] md:text-[28px]">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-6 space-y-5 pl-0 md:pl-10">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-[1.85] text-slate-600 md:text-[16px]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets ? (
                      <ul className="space-y-3 border border-slate-200 bg-slate-50 p-5 md:p-6">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-[14px] leading-relaxed text-slate-600 md:text-[15px]"
                          >
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0047BB]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.links ? (
                      <div className="flex flex-wrap gap-x-7 gap-y-3">
                        {section.links.map((link) => (
                          <Link
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            className="border-b border-[#0047BB] pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0047BB] transition-opacity hover:opacity-70"
                          >
                            {link.label} <span aria-hidden="true">&rarr;</span>
                          </Link>
                        ))}
                      </div>
                    ) : null}

                    {section.image ? (
                      <figure className="mt-8">
                        <div className="relative h-[260px] overflow-hidden border border-slate-200 bg-slate-100 md:h-[420px]">
                          <Image
                            src={section.image.src}
                            alt={section.image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1180px) 100vw, 820px"
                          />
                        </div>
                        <figcaption className="mt-3 text-[12px] italic text-slate-400">
                          {section.image.caption}
                        </figcaption>
                      </figure>
                    ) : null}
                  </div>
                </section>
              ))}

              <section className="mt-14 border-t border-slate-200 pt-12 md:mt-20 md:pt-16">
                <SectionTitle
                  eyebrow="FAQ"
                  title="Frequently asked questions"
                  description="Concise answers for buyers comparing elevator and escalator suppliers."
                />
                <div className="border-t border-slate-200">
                  {post.faqs.map((faq) => (
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
              </section>

              <section className="mt-14 border-t border-slate-200 pt-12 md:mt-20 md:pt-16">
                <span className="eyebrow text-[#0047BB]">Continue reading</span>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {post.related.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="border border-slate-200 p-5 transition-colors hover:border-[#0047BB]"
                    >
                      <span className="subheading block text-[14px] leading-snug text-[#0f172a]">
                        {link.label}
                      </span>
                      <span aria-hidden="true" className="mt-3 inline-block text-[#0047BB]">
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-slate-200 bg-slate-50 p-6">
                <span className="eyebrow text-[#0047BB]">In this guide</span>
                <nav aria-label="Article sections" className="mt-5">
                  <ol className="space-y-3">
                    {post.sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex gap-3 text-[13px] leading-snug text-slate-500 transition-colors hover:text-[#0047BB]"
                        >
                          <span className="text-slate-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <span className="eyebrow text-slate-400">Focus keyword</span>
                  <p className="mt-3 text-[14px] font-medium leading-snug text-[#0f172a]">
                    {post.focusKeyphrase}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-full items-center justify-center bg-[#0047BB] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#00389a]"
                >
                  Discuss your project
                </Link>
              </div>

              <div className="mt-6 border border-slate-200 p-6">
                <span className="eyebrow text-slate-400">More guides</span>
                <ul className="mt-4 space-y-4">
                  {relatedPosts.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={blogPath(item.slug)}
                        className="text-[13px] leading-snug text-slate-600 transition-colors hover:text-[#0047BB]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/blog"
                      className="eyebrow text-[#0047BB] text-[10px]"
                    >
                      ALL GUIDES &rarr;
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <CtaBand
        title="Turn the guide into a project proposal"
        description="Send your drawings and brief. We will confirm the elevator or escalator configuration, documents and delivery plan for your market."
        primaryHref="/contact"
        primaryLabel="Request a quotation"
        secondaryHref="/blog"
        secondaryLabel="Read more guides"
      />
    </>
  );
}
