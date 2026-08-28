import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/lib/client";
import { productQuery, type SanityProductDetail } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/app/components/PageHero";
import { PRODUCT_IMAGE_OVERRIDES } from "@/app/data/productImageOverrides";
import ProductDetailContent from "./ProductDetailContent";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await safeFetch<{ category: string; slug: string }[]>(
    `*[_type == "product"] { "category": category->slug.current, "slug": slug.current }`,
    {},
    []
  );
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }): Promise<Metadata> {
  const { product } = await params;
  const p = await safeFetch<SanityProductDetail | null>(productQuery, { slug: product }, null);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description ?? `${p.title} from Fuji Fenix Elevator.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { product } = await params;
  const p = await safeFetch<SanityProductDetail | null>(productQuery, { slug: product }, null);
  if (!p) return notFound();

  const overrideImage = PRODUCT_IMAGE_OVERRIDES[p.slug];
  const heroImage = overrideImage ?? (p.image ? urlFor(p.image).width(1920).auto("format").url() : "/hero-elevator.jpg");

  return (
    <>
      <PageHero
        eyebrow={p.category?.toUpperCase() ?? "PRODUCT"}
        title={[p.title.toUpperCase()]}
        image={heroImage}
        breadcrumb="PRODUCTS"
        breadcrumbHref="/products"
        titleBlue
        centered
      />
      <ProductDetailContent product={p} />
    </>
  );
}