import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { productQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/app/components/PageHero";
import ProductDetailContent from "./ProductDetailContent";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await client.fetch<{ category: string; slug: string }[]>(
    `*[_type == "product"] { "category": category->slug.current, "slug": slug.current }`
  );
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }): Promise<Metadata> {
  const { product } = await params;
  const p = await client.fetch(productQuery, { slug: product });
  if (!p) return {};
  return {
    title: p.title,
    description: p.description ?? `${p.title} from Fuji Fenix Elevator.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { product } = await params;
  const p = await client.fetch(productQuery, { slug: product });
  if (!p) return notFound();

  const heroImage = p.image ? urlFor(p.image).width(1920).auto("format").url() : "/hero-elevator.jpg";

  return (
    <>
      <PageHero
        eyebrow={p.category?.toUpperCase() ?? "PRODUCT"}
        title={[p.title.toUpperCase()]}
        description={p.description ?? undefined}
        image={heroImage}
        breadcrumb="PRODUCTS"
        breadcrumbHref="/products"
        titleBlue
      />
      <ProductDetailContent product={p} />
    </>
  );
}