import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/lib/client";
import {
  categoryQuery,
  productsByCategoryQuery,
  type SanityCategoryItem,
  type SanityProductItem,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/app/components/PageHero";
import CategoryContent from "./CategoryContent";
import { StructuredData } from "@/app/components/StructuredData";
import { productSchema, itemListSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";
import { resolveStructuredImageUrl } from "@/app/lib/safeImageUrl";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await safeFetch<{ slug: string }[]>(
    `*[_type == "category"] { "slug": slug.current }`,
    {},
    []
  );
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await safeFetch<SanityCategoryItem | null>(categoryQuery, { slug: category }, null);
  if (!cat) return {};

  const catTitle = cat.title || "Elevator";
  const seoTitle = cat.seoTitle || `${catTitle} Elevators & Lifts Manufacturer | Fuji Fenix`;
  const seoDesc =
    cat.seoDescription ||
    `High-performance ${catTitle.toLowerCase()} systems engineered by Fuji Fenix Elevator. Explore custom cabin finishes, energy-efficient VVVF drives, and full safety compliance.`;

  const ogImage = cat.image
    ? urlFor(cat.image).width(1200).height(630).auto("format").url()
    : "https://fujifenix.com/og-home.jpg";

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: [
      `${catTitle} Elevators`,
      `${catTitle} Manufacturer`,
      `${catTitle} Supplier China`,
      `Commercial ${catTitle}`,
      "Fuji Fenix Elevator",
      "Vertical Transportation Systems",
      "Shanghai Elevator Factory",
    ],
    alternates: {
      canonical: `https://fujifenix.com/products/${cat.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://fujifenix.com/products/${cat.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${catTitle} Elevators by Fuji Fenix`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const [cat, products] = await Promise.all([
    safeFetch<SanityCategoryItem | null>(categoryQuery, { slug: category }, null),
    safeFetch<SanityProductItem[]>(productsByCategoryQuery, { slug: category }, []),
  ]);
  if (!cat) return notFound();

  const introTitle = cat.title || "Elevator";
  const heroImage = cat.image
    ? urlFor(cat.image).width(1920).auto("format").url()
    : "/hero-elevator.jpg";

  const breadcrumbItems = [
    { name: "Home", url: "https://fujifenix.com" },
    { name: "Products", url: "https://fujifenix.com/products" },
    { name: `${cat.title} Elevators`, url: `https://fujifenix.com/products/${cat.slug}` },
  ];

  // Curated FAQs for rich search snippets and high topical authority
  const categoryFaqs = [
    {
      question: `What customization options are available for Fuji Fenix ${introTitle.toLowerCase()} systems?`,
      answer: `Fuji Fenix provides extensive customization for ${introTitle.toLowerCase()} cabins, including mirror or hairline stainless steel, titanium gold etching, panoramic glass panels, custom ceilings with energy-saving LED lighting, granite or marble flooring, and smart touch COP/LOP control panels.`,
    },
    {
      question: `What international safety standards do Fuji Fenix ${introTitle.toLowerCase()} models meet?`,
      answer: `All Fuji Fenix ${introTitle.toLowerCase()} systems strictly comply with European EN81-20/50 safety codes, CE marking, and ISO 9001:2015 quality management standards. Every unit is equipped with multi-beam infrared door sensors, overspeed governors, safety gear brakes, and automatic emergency rescue (ARD) devices.`,
    },
    {
      question: `How energy-efficient are Fuji Fenix ${introTitle.toLowerCase()} drives?`,
      answer: `Our ${introTitle.toLowerCase()} units utilize permanent magnet synchronous gearless traction machines (PMSM) paired with advanced VVVF frequency inverters, reducing power consumption by up to 40% compared to conventional geared elevator drives. Optional regenerative energy drives feed power back into the building grid during braking.`,
    },
    {
      question: `Does Fuji Fenix ship and support ${introTitle.toLowerCase()} installations globally?`,
      answer: `Yes, Fuji Fenix ships complete elevator systems and spare parts to over 50 countries worldwide. We offer comprehensive engineering drawings, electrical schematics, remote technical assistance, and on-site supervisor dispatch for complex infrastructure projects.`,
    },
  ];

  return (
    <>
      {/* Structured Data: Breadcrumbs */}
      <StructuredData schema={breadcrumbSchema(breadcrumbItems)} />

      {/* Structured Data: ItemList of Products in this Category */}
      {products.length > 0 && (
        <StructuredData
          schema={itemListSchema(
            products.map((p) => ({
              name: p.title,
              url: `/products/${p.categorySlug || cat.slug}/${p.slug}`,
              description:
                p.description ||
                `${p.title} engineered by Fuji Fenix in the ${introTitle} category.`,
              image: resolveStructuredImageUrl(p.image),
            }))
          )}
        />
      )}

      {/* Structured Data: FAQ Schema for Google SERP Rich Snippets */}
      <StructuredData schema={faqSchema(categoryFaqs)} />

      {/* Page Hero */}
      <PageHero
        eyebrow="PRODUCT CATEGORY"
        title={[cat.title.toUpperCase()]}
        description={
          cat.seoDescription ??
          cat.description ??
          `Explore our high-performance range of ${cat.title.toLowerCase()} systems engineered for safety, smoothness, and durability.`
        }
        image={heroImage}
        breadcrumb="PRODUCTS"
        breadcrumbHref="/products"
        titleBlue
      />

      {/* Product Grid Content */}
      <CategoryContent
        category={{ title: cat.title, slug: cat.slug, description: cat.description }}
        products={products}
      />

      {/* SEO & Technical Overview Section (Clean, Professional, Google-Optimized) */}
      <section className="bg-slate-50 border-t border-slate-200/80 py-16 md:py-20 text-[#0F172A]">
        <div className="container-gutter max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#0047BB] uppercase">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A]">
              Comprehensive Guide to {introTitle} Solutions
            </h2>
            <div className="w-12 h-1 bg-[#0047BB] mx-auto mt-4 rounded-full" />
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
            <p>
              As a premier <strong>{introTitle.toLowerCase()} manufacturer and global supplier</strong>,
              Shanghai Fuji Fenix Elevator combines advanced Japanese precision engineering with
              cutting-edge intelligent manufacturing. Whether you require vertical transportation for
              modern residential high-rises, commercial office towers, healthcare facilities, or
              public transit hubs, our {introTitle.toLowerCase()} systems are tailored to optimize
              passenger throughput, ride comfort, and structural efficiency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0047BB] flex items-center justify-center font-bold text-lg mb-3">
                  01
                </div>
                <h3 className="font-semibold text-[#0F172A] text-base mb-2">
                  Safety First (EN81 & CE)
                </h3>
                <p className="text-sm text-slate-500 leading-normal">
                  Redundant safety mechanisms, bi-directional overspeed governors, and instantaneous
                  fire-rated door systems ensure total passenger security.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0047BB] flex items-center justify-center font-bold text-lg mb-3">
                  02
                </div>
                <h3 className="font-semibold text-[#0F172A] text-base mb-2">
                  PMSM Gearless Efficiency
                </h3>
                <p className="text-sm text-slate-500 leading-normal">
                  Permanent magnet synchronous traction saves up to 40% electrical energy and
                  operates with near-silent acoustics and zero hydraulic oil usage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0047BB] flex items-center justify-center font-bold text-lg mb-3">
                  03
                </div>
                <h3 className="font-semibold text-[#0F172A] text-base mb-2">
                  Custom Architectural Finishes
                </h3>
                <p className="text-sm text-slate-500 leading-normal">
                  Cabin interiors, ceiling illuminations, handrails, and touchless control interfaces
                  custom-crafted to match your architectural vision.
                </p>
              </div>
            </div>

            <p>
              Every {introTitle.toLowerCase()} manufactured in our Shanghai facility undergoes
              rigorous 100% factory pre-assembly and multi-point quality testing prior to export.
              With decades of vertical transportation expertise, our engineering team collaborates
              closely with architects, developers, and general contractors to provide customized shaft
              drawings, load calculations, and energy analysis.
            </p>
          </div>

          {/* Frequently Asked Questions Accordion / List */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-6">
              Frequently Asked Questions About {introTitle} Elevators
            </h3>
            <div className="space-y-4">
              {categoryFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-slate-200 p-5 md:p-6 transition-all hover:border-[#0047BB]/40"
                >
                  <h4 className="text-base font-semibold text-[#0F172A] flex items-start gap-2">
                    <span className="text-[#0047BB] font-bold">Q:</span>
                    <span>{faq.question}</span>
                  </h4>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA */}
          <div className="mt-12 p-6 md:p-8 rounded-xl bg-gradient-to-r from-[#002B7F] to-[#0047BB] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h4 className="text-lg md:text-xl font-bold">
                Need a Custom Quote for {introTitle} Elevators?
              </h4>
              <p className="text-sm text-blue-100 mt-1">
                Send us your hoistway dimensions, travel height, and capacity requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[#0047BB] font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm flex-shrink-0"
            >
              Request Technical Proposal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
