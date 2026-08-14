import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SolutionsContent from "./SolutionsContent";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Industry-specific vertical transportation solutions from Fuji Fenix — precision-engineered for residential, commercial, healthcare, and infrastructure projects worldwide.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="INDUSTRY SOLUTIONS"
        title={["SOLUTIONS"]}
        description="From high-rise towers to shopping centers, private villas to transit hubs, hospitals to dumbwaiters — we deliver end-to-end vertical transportation solutions tailored to every environment."
        image="/building-exterior.jpg"
        breadcrumb="SOLUTIONS"
        titleBlue
      />
      <SolutionsContent />
    </>
  );
}
