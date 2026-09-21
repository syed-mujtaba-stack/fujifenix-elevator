import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/lib/client";
import {
  productQuery,
  categoriesQuery,
  allProductsQuery,
  type SanityProductDetail,
  type SanityCategoryItem,
  type SanityProductItem,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/app/components/PageHero";
import ProductSidebar from "@/app/components/ProductSidebar";
import { PRODUCT_IMAGE_OVERRIDES } from "@/app/data/productImageOverrides";
import { HERO_HEADINGS } from "@/app/data/content";
import ProductDetailContent from "./ProductDetailContent";
import { StructuredData } from "@/app/components/StructuredData";
import { productSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";
import { resolveStructuredImageUrl, getSafeImageUrl } from "@/app/lib/safeImageUrl";

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
  const seoTitle = p.seoTitle || `${p.title} | Fuji Fenix Elevator`;
  const seoDesc = p.seoDescription || `${p.title} — ${p.description?.slice(0, 150) ?? "Elevator system from Fuji Fenix"}`;
  return {
    title: seoTitle,
    description: seoDesc,
    keywords: [p.title, p.category, "Elevator", "Fuji Fenix", p.categorySlug],
    alternates: {
      canonical: `/products/${p.categorySlug}/${p.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: p.image ? [urlFor(p.image).width(1200).auto("format").url()] : ["/og-home.jpg"],
    },
    twitter: { card: "summary_large_image", title: seoTitle, description: seoDesc },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { product } = await params;
  const [p, categories, allProducts] = await Promise.all([
    safeFetch<SanityProductDetail | null>(productQuery, { slug: product }, null),
    safeFetch<SanityCategoryItem[]>(categoriesQuery, {}, []),
    safeFetch<SanityProductItem[]>(allProductsQuery, {}, []),
  ]);
  if (!p) return notFound();

  const overrideImage = PRODUCT_IMAGE_OVERRIDES[p.slug];
  const heroImage = overrideImage
    ? getSafeImageUrl(overrideImage)
    : p.image
      ? urlFor(p.image).width(1920).auto("format").url()
      : "/hero-elevator.jpg";
  const heroHeading = (HERO_HEADINGS[p.slug] ?? p.title).toUpperCase();
  const currentHref = `/products/${p.categorySlug}/${p.slug}`;

  const breadcrumbItems = [
    { name: "Home", url: "https://fujifenix.com" },
    { name: "Products", url: "https://fujifenix.com/products" },
    { name: p.category, url: `https://fujifenix.com/products/${p.categorySlug}` },
    { name: p.title, url: currentHref },
  ];

  const structuredData = productSchema({
    title: p.title,
    description: p.description || p.tagline || p.category,
    image: resolveStructuredImageUrl(p.image),
    category: p.category,
    categorySlug: p.categorySlug,
    features: p.features || [],
    keyFeatures: p.keyFeatures || [],
    slug: p.slug,
    tagline: p.tagline ?? undefined,
  });

  return (
    <>
      {/* Structured Data */}
      <StructuredData schema={structuredData} />
      {p.faq && p.faq.length > 0 && <StructuredData schema={faqSchema(p.faq)} />}
      <StructuredData schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })) }} />

      <PageHero
        eyebrow={p.category?.toUpperCase() ?? "PRODUCT"}
        title={[heroHeading]}
        image={heroImage}
        breadcrumb="PRODUCTS"
        breadcrumbHref="/products"
        titleBlue
        centered
      />

      {/* Product page layout: sticky products sidebar (desktop) + content */}
      <div className="px-4 sm:px-6 md:px-10 xl:px-14 py-12 md:py-16">
        <div className="lg:flex lg:gap-12 xl:gap-16">
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <ProductSidebar
                currentHref={currentHref}
                categories={categories}
                products={allProducts}
              />
            </div>
          </aside>
          <div className="min-w-0 flex-1">
            <ProductDetailContent product={p} />
          </div>
        </div>
      </div>
    </>
  );
}