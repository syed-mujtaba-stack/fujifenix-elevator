import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ProjectsContent from "./ProjectsContent";
import {
  BRAND_KEYWORDS,
  PRODUCT_KEYWORDS,
  APPLICATION_KEYWORDS,
  MARKET_KEYWORDS,
  seoKeywords,
} from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Global Elevator Installation Projects & Case Studies | Fuji Fenix",
  description:
    "Explore worldwide elevator and escalator installations by Fuji Fenix Elevator: high-rise towers, airport transit, luxury residential developments, and commercial shopping centers.",
  keywords: seoKeywords(
    BRAND_KEYWORDS,
    PRODUCT_KEYWORDS,
    APPLICATION_KEYWORDS,
    MARKET_KEYWORDS,
    [
      "elevator projects",
      "elevator case studies",
      "commercial elevator installations",
      "Fuji Fenix projects",
      "vertical transportation case studies",
      "escalator installation projects",
      "international elevator installations",
      "elevator project portfolio",
    ]
  ),
  alternates: {
    canonical: "https://fujifenix.com/projects",
  },
  openGraph: {
    title: "Global Elevator Projects & Installations | Fuji Fenix",
    description:
      "Explore prestigious vertical transportation projects successfully installed across the globe by Fuji Fenix.",
    url: "https://fujifenix.com/projects",
    images: ["https://fujifenix.com/hero-elevator.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Elevator Projects & Installations | Fuji Fenix",
    description:
      "Explore prestigious vertical transportation projects successfully installed across the globe by Fuji Fenix.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR PROJECTS"
        title={["FEATURED PROJECTS"]}
        description="A selection of vertical transportation installations across residential, commercial, healthcare, and infrastructure projects."
        image="/hero-elevator.jpg"
        breadcrumb="PROJECTS"
        titleBlue
      />
      <ProjectsContent />
    </>
  );
}
