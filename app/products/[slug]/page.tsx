import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/app/data/content";
import PageHero from "@/app/components/PageHero";
import ProductDetailContent from "./ProductDetailContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={[product.name.toUpperCase()]}
        highlight={product.name.toUpperCase()}
        description={product.description}
        image={product.image ?? "/hero-elevator.jpg"}
        breadcrumb="PRODUCTS"
        breadcrumbHref="/products"
      />
      <ProductDetailContent product={product} />
    </>
  );
}
