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

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the Fuji Fenix product range — elevator systems including the Passenger Elevator Cabin with full technical specifications and architectural drawings.",
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    safeFetch<SanityCategoryItem[]>(categoriesQuery, {}, []),
    safeFetch<SanityProductItem[]>(allProductsQuery, {}, []),
  ]);

  return (
    <>
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