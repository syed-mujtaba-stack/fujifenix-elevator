import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ProductsContent from "./ProductsContent";
import { PRODUCT_CATEGORIES } from "@/app/data/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full range of Fuji Fenix elevator and escalator systems, cabin components, and accessories — passenger elevators, bed elevators, sightseeing elevators, home elevators, and more.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title={["OUR"]}
        highlight="PRODUCTS"
        description={`Discover ${PRODUCT_CATEGORIES.length} product categories covering elevator systems, cabin components, and accessories.`}
        image="/hero-elevator.jpg"
        breadcrumb="PRODUCTS"
      />
      <ProductsContent />
    </>
  );
}
