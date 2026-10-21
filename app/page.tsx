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
import { itemListSchema } from "@/lib/structured-data";
import { resolveStructuredImageUrl } from "@/app/lib/safeImageUrl";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute: "Fuji Fenix Elevator | Global Elevator & Escalator Manufacturer",
  },
  description:
    "Fuji Fenix Elevator is a world-leading manufacturer of passenger elevators, panoramic lifts, freight elevators, home elevators, and commercial escalators. Engineered in Shanghai for global safety, reliability, and architectural excellence.",
  keywords: [
    "Elevator Manufacturer",
    "Escalator Supplier",
    "Passenger Elevators China",
    "Commercial Elevators",
    "Villa Home Elevators",
    "Panoramic Glass Lifts",
    "Hospital Bed Elevators",
    "Freight Goods Lifts",
    "Elevator Modernization",
    "Fuji Elevator Factory",
    "Shanghai Fuji Fenix Elevator",
  ],
  alternates: {
    canonical: "https://fujifenix.com",
  },
  openGraph: {
    title: "Fuji Fenix Elevator | Global Elevator & Escalator Manufacturer",
    description:
      "Leading manufacturer of commercial & residential elevators, escalators, and moving walks with worldwide delivery.",
    url: "https://fujifenix.com",
    siteName: "Fuji Fenix Elevator",
    images: [
      {
        url: "https://fujifenix.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Fuji Fenix Elevator Factory and Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuji Fenix Elevator | Global Elevator & Escalator Manufacturer",
    description:
      "Leading manufacturer of commercial & residential elevators, escalators, and moving walks with worldwide delivery.",
    images: ["https://fujifenix.com/og-home.jpg"],
  },
};

export default async function Home() {
  const products = await safeFetch<SanityProductItem[]>(featuredProductsQuery, {}, []);

  return (
    <>
      {/* Featured Products ItemList Schema for Google SERP Rich Catalog markup */}
      {products.length > 0 && (
        <StructuredData
          schema={itemListSchema(
            products.slice(0, 8).map((p) => ({
              name: p.title,
              url: `/products/${p.categorySlug}/${p.slug}`,
              description:
                p.description ||
                `${p.title} - High performance elevator system by Fuji Fenix Elevator.`,
              image: resolveStructuredImageUrl(p.image),
            }))
          )}
        />
      )}
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
