import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SolutionsContent from "./SolutionsContent";
import {
  BRAND_KEYWORDS,
  PRODUCT_KEYWORDS,
  APPLICATION_KEYWORDS,
  MARKET_KEYWORDS,
  seoKeywords,
} from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Industry Elevator Solutions | Residential, Commercial & Healthcare | Fuji Fenix",
  description:
    "Tailored vertical transportation solutions from Fuji Fenix Elevator: high-rise office towers, residential towers, luxury villas, healthcare hospitals, retail malls, and public transit.",
  keywords: seoKeywords(
    BRAND_KEYWORDS,
    PRODUCT_KEYWORDS,
    APPLICATION_KEYWORDS,
    MARKET_KEYWORDS,
    [
      "elevator solutions",
      "commercial elevator solutions",
      "residential elevator systems",
      "hospital elevator solutions",
      "transit hub elevators",
      "villa lift solutions",
      "building vertical transportation planning",
    ]
  ),
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
