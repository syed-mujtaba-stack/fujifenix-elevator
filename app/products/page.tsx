import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ProductsContent from "./ProductsContent";
import { PRODUCTS } from "@/app/data/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full range of Fuji Fenix elevators and escalators — passenger elevators, home elevators, high-speed elevators, panoramic elevators, escalators, and moving walks.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title={[]}
        highlight="PRODUCTS"
        description={`Discover ${PRODUCTS.length} product lines engineered for performance, safety, and design.`}
        image="/hero-elevator.jpg"
        breadcrumb="PRODUCTS"
      />
      <ProductsContent />
    </>
  );
}
