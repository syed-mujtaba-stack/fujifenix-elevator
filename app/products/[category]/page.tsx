import type { Metadata } from "next";
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
  return {
    title: cat.title,
    description: cat.description ?? `${cat.title} products from Fuji Fenix Elevator.`,
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

  return (
    <>
      <PageHero
        eyebrow="PRODUCT CATEGORY"
        title={[cat.title.toUpperCase()]}
        description={cat.description ?? `${products.length} products in this category.`}
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