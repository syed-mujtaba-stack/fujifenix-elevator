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

  return (
    <>
      {/* Structured Data */}
      {productSchemaList.length > 0 && <StructuredData schema={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: productSchemaList.map((schema: any, i: number) => ({ position: i + 1, ...schema })) }} />}
      <StructuredData schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })) }} />

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
    </>
  );
}