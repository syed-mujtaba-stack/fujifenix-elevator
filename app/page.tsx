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
import { client } from "@/sanity/lib/client";
import { featuredProductsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
  description:
    "Fuji Fenix Elevator is a leading provider of elevator and escalator solutions, combining advanced technology with precision engineering for residential, commercial, healthcare, and infrastructure projects.",
};

export default async function Home() {
  const products = await client.fetch(featuredProductsQuery);
  return (
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
  );
}
