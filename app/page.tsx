import type { Metadata } from "next";
import Hero from "./components/Hero";
import CapabilitiesStrip from "./components/CapabilitiesStrip";
import BrandStatement from "./components/BrandStatement";
import AboutSection from "./components/AboutSection";
import HorizontalSolutions from "./components/HorizontalSolutions";
import TechnologyBlueprint from "./components/TechnologyBlueprint";
import ProductShowcase from "./components/ProductShowcase";
import ProjectsShowcase from "./components/ProjectsShowcase";
import WhyFujiFenix from "./components/WhyFujiFenix";
import { safeFetch } from "@/sanity/lib/client";
import { featuredProductsQuery, type SanityProductItem } from "@/sanity/lib/queries";
import { StructuredData } from "./components/StructuredData";
import { productSchema } from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
  description:
    "Fuji Fenix Elevator is a leading provider of elevator and escalator solutions, combining advanced technology with precision engineering for residential, commercial, healthcare, and infrastructure projects.",
};

export default async function Home() {
  const products = await safeFetch<SanityProductItem[]>(featuredProductsQuery, {}, []);
  return (
    <>
      {/* Product Structured Data for featured products */}
      {products.slice(0, 4).map((product) => (
        <StructuredData
          key={product._id}
          schema={productSchema({
            title: product.title,
            description: product.description || "",
            image: product.image as string,
            category: product.category,
            features: product.features || [],
            slug: product.slug,
          })}
        />
      ))}
      <main className="min-h-screen bg-white text-[#0f172a] flex flex-col overflow-x-hidden">
        <Hero />
        <CapabilitiesStrip />
        <BrandStatement />
        <AboutSection />
        <HorizontalSolutions products={products} />
        <TechnologyBlueprint />
        <ProductShowcase products={products} />
        <ProjectsShowcase />
        <WhyFujiFenix />
      </main>
    </>
  );
}
