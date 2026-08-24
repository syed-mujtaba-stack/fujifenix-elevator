import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allProductsQuery, categoriesQuery } from "@/sanity/lib/queries";
import PageHero from "@/app/components/PageHero";
import ProductsContent from "./ProductsContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full range of Fuji Fenix elevator and escalator systems, cabin components, and accessories — passenger elevators, bed elevators, sightseeing elevators, home elevators, and more.",
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(allProductsQuery),
  ]);

  return (
    <>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title={["OUR"]}
        highlight="PRODUCTS"
        description={`Explore ${products.length} elevator systems, components, and accessories for residential, commercial, and infrastructure projects.`}
        image="/hero-elevator.jpg"
        breadcrumb="PRODUCTS"
      />
      <ProductsContent categories={categories} products={products} />
    </>
  );
}