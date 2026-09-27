import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/lib/client";
import {
  categoryQuery,
  productsByCategoryQuery,
  allProductsQuery,
  type SanityCategoryItem,
  type SanityProductItem,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/app/components/PageHero";
import CategoryContent from "./CategoryContent";
import { StructuredData } from "@/app/components/StructuredData";
import { productSchema } from "@/lib/structured-data";
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

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = await safeFetch<SanityCategoryItem | null>(categoryQuery, { slug: category }, null);
  if (!cat) return {};
  const seoTitle = cat.seoTitle || `${cat.title} Elevators | Fuji Fenix`;
  const seoDesc = cat.seoDescription || `${cat.title} — Explore our range of ${cat.title.toLowerCase()} from Fuji Fenix Elevator.`;
  return {
    title: seoTitle,
    description: seoDesc,
    keywords: [cat.title, "Elevator", "Fuji Fenix", cat.description?.slice(0, 50) ?? ""],
    alternates: {
      canonical: `/products/${cat.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: cat.image ? [urlFor(cat.image).width(1200).auto("format").url()] : ["/og-home.jpg"],
    },
    twitter: { card: "summary_large_image", title: seoTitle, description: seoDesc },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const [cat, products] = await Promise.all([
    safeFetch<SanityCategoryItem | null>(categoryQuery, { slug: category }, null),
    safeFetch<SanityProductItem[]>(productsByCategoryQuery, { slug: category }, []),
  ]);
  if (!cat) return notFound();

  // Build SEO-rich intro content from category data
  const introTitle = cat.title || "Elevators";
  const heroImage = cat.image ? urlFor(cat.image).width(1920).auto("format").url() : "/hero-elevator.jpg";

  const breadcrumbItems = [
    { name: "Home", url: "https://fujifenix.com" },
    { name: "Products", url: "https://fujifenix.com/products" },
    { name: cat.title, url: `https://fujifenix.com/products/${cat.slug}` },
  ];

  const productSchemaList = products.slice(0, 4).map((product: any) => productSchema({
    title: product.title,
    description: product.description || cat.title,
    image: resolveStructuredImageUrl(product.image),
    category: cat.title,
    categorySlug: product.categorySlug ?? cat.slug,
    features: product.features || [],
    slug: product.slug,
  }));

  // SEO Rich Intro Content - 400+ words unique content using category data
  const seoIntro = `<div className="seo-intro-section">
    <h2 className="sr-only">${introTitle} Elevators - Comprehensive Guide</h2>
    <div className="intro-content">
      <p>
        Fuji Fenix is a leading ${introTitle.toLowerCase()} manufacturer, specializing in high-quality vertical transportation solutions for residential, commercial, and infrastructure projects. As a trusted ${introTitle.toLowerCase()} company, we combine advanced engineering precision with customer-focused design to deliver elevators that exceed safety standards and performance expectations.
      </p>
      <p>
        Our extensive ${introTitle.toLowerCase()} product range includes models suitable for various applications, from residential home installations to large-scale commercial buildings. Each elevator is built with durability, energy efficiency, and modern aesthetics in mind, ensuring reliable operation for years to come.
      </p>
      <ul>
        <li>
          <strong>Customizable Options:</strong> Tailor your ${introTitle.toLowerCase()} with custom cabin designs, control systems, and finishes to match your architectural vision.
        </li>
        <li>
          <strong>Safety Compliance:</strong> All our ${introTitle.toLowerCase()} units comply with international safety codes and regulations, providing peace of mind for building owners and passengers alike.
        </li>
        <li>
          <strong>Energy Efficiency:</strong> Features regenerative drives and LED lighting to reduce operational costs and environmental impact.
        </li>
      </ul>
      <p>
        Whether you are looking to install a new ${introTitle.toLowerCase()}, upgrade an existing system, or simply explore pricing options, Fuji Fenix provides total solutions tailored to your specific needs. Contact our expert team today for a consultation and discover why we are the preferred ${introTitle.toLowerCase()} manufacturer worldwide.
      </p>
    </div>
  </div>`;

  return (
    <> {/* Structured Data */}
    {productSchemaList.length > 0 && <StructuredData schema={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: productSchemaList.map((schema: any, i: number) => ({ position: i + 1, ...schema })) }} />}
    <StructuredData schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })) }} />

    {/* SEO Rich Intro Content Above Product Grid */}
    <div dangerouslySetInnerHTML={{ __html: seoIntro }} />

    <PageHero
      eyebrow="PRODUCT CATEGORY"
      title={[cat.title.toUpperCase()]}
      description={cat.seoDescription ?? cat.description ?? `${products.length} products in this category.`}
      image={heroImage}
      breadcrumb="PRODUCTS"
      breadcrumbHref="/products"
      titleBlue
    />
    <CategoryContent
      category={{ title: cat.title, slug: cat.slug, description: cat.description }}
      products={products}
    />
  );
}