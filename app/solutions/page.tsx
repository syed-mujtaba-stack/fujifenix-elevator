import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SolutionsContent from "./SolutionsContent";

export const metadata: Metadata = {
  title: "Industry Elevator Solutions | Residential, Commercial & Healthcare | Fuji Fenix",
  description:
    "Tailored vertical transportation solutions from Fuji Fenix Elevator: high-rise office towers, residential towers, luxury villas, healthcare hospitals, retail malls, and public transit.",
  keywords: [
    "Elevator Solutions",
    "Commercial Elevator Solutions",
    "Residential Elevator Systems",
    "Hospital Elevator Solutions",
    "Transit Hub Elevators",
    "Villa Lift Solutions",
  ],
  alternates: {
    canonical: "https://fujifenix.com/solutions",
  },
  openGraph: {
    title: "Industry Vertical Transportation Solutions | Fuji Fenix",
    description:
      "Engineered vertical transportation tailored for residential, commercial, medical, and industrial building projects.",
    url: "https://fujifenix.com/solutions",
    images: ["https://fujifenix.com/hero-elevator.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Vertical Transportation Solutions | Fuji Fenix",
    description:
      "Engineered vertical transportation tailored for residential, commercial, medical, and industrial building projects.",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="INDUSTRY SOLUTIONS"
        title={["SOLUTIONS"]}
        description="From high-rise towers to shopping centers, private villas to transit hubs, hospitals to dumbwaiters — we deliver end-to-end vertical transportation solutions tailored to every environment."
        image="/hero-elevator.jpg"
        breadcrumb="SOLUTIONS"
        titleBlue
      />
      <SolutionsContent />
    </>
  );
}
