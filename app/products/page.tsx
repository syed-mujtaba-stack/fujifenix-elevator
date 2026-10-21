import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/client";
import {
  allProductsQuery,
  categoriesQuery,
  type SanityCategoryItem,
  type SanityProductItem,
} from "@/sanity/lib/queries";
import PageHero from "@/app/components/PageHero";
import ProductsContent from "./ProductsContent";
import { StructuredData } from "@/app/components/StructuredData";
import { itemListSchema } from "@/lib/structured-data";
import { resolveStructuredImageUrl } from "@/app/lib/safeImageUrl";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Commercial & Residential Elevators, Escalators | Fuji Fenix Products",
  description:
    "Explore the complete vertical transportation portfolio from Fuji Fenix Elevator. High-speed passenger elevators, panoramic glass lifts, hospital bed lifts, heavy freight elevators, escalators, and moving walks.",
  keywords: [
    "Elevator Products",
    "Passenger Elevators",
    "Commercial Elevators",
    "Villa Home Elevators",
    "Panoramic Elevators",
    "Hospital Elevators",
    "Freight Lifts",
    "Escalators and Moving Walks",
    "Elevator Manufacturer Catalog",
  ],
  alternates: {
    canonical: "https://fujifenix.com/products",
  },
  openGraph: {
    title: "Elevator & Escalator Systems Catalog | Fuji Fenix",
    description:
      "Explore engineered vertical transportation solutions for residential, commercial, and high-traffic infrastructure projects.",
    url: "https://fujifenix.com/products",
    images: ["https://fujifenix.com/hero-elevator.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevator & Escalator Systems Catalog | Fuji Fenix",
    description:
      "Explore engineered vertical transportation solutions for residential, commercial, and high-traffic infrastructure projects.",
  },
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    safeFetch<SanityCategoryItem[]>(categoriesQuery, {}, []),
    safeFetch<SanityProductItem[]>(allProductsQuery, {}, []),
  ]);

  const catalogItems = [
    ...categories.map((c) => ({
      name: `${c.title} Elevators`,
      url: `/products/${c.slug}`,
      description:
        c.description ||
        `High quality ${c.title.toLowerCase()} systems engineered by Fuji Fenix.`,
      image: resolveStructuredImageUrl(c.image),
    })),
    ...products.slice(0, 10).map((p) => ({
      name: p.title,
      url: `/products/${p.categorySlug}/${p.slug}`,
      description: p.description || `${p.title} elevator model.`,
      image: resolveStructuredImageUrl(p.image),
    })),
  ];

  return (
    <>
      <StructuredData schema={itemListSchema(catalogItems)} />
      <PageHero
        eyebrow="OUR PRODUCTS"
        title={["OUR"]}
        highlight="PRODUCTS"
        description={`Explore ${products.length} elevator system${products.length === 1 ? "" : "s"} and components for residential, commercial, and infrastructure projects.`}
        image="/hero-elevator.jpg"
        breadcrumb="PRODUCTS"
      />
      <ProductsContent categories={categories} products={products} />
    </>
  );
}
