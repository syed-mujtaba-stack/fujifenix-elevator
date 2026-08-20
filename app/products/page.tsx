import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";
import PageHero from "@/app/components/PageHero";
import ProductsContent from "./ProductsContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full range of Fuji Fenix elevator and escalator systems, cabin components, and accessories — passenger elevators, bed elevators, sightseeing elevators, home elevators, and more.",
};

export default async function ProductsPage() {
  const categories = await client.fetch(categoriesQuery);

  return (
    <>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title={["OUR"]}
        highlight="PRODUCTS"
        description={`Discover ${categories.length} product categories covering elevator systems, cabin components, and accessories.`}
        image="/hero-elevator.jpg"
        breadcrumb="PRODUCTS"
      />
      <ProductsContent categories={categories} />
    </>
  );
}