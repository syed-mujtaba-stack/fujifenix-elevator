import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import AboutContent from "./AboutContent";
import {
  BRAND_KEYWORDS,
  GLOBAL_MARKET_KEYWORDS,
  MARKET_KEYWORDS,
  seoKeywords,
} from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "About Us | Fuji Fenix Elevator Manufacturer",
  description:
    "Learn about Fuji Fenix Elevator — a premier manufacturer of high-performance passenger elevators, escalators, and moving walks engineered in Shanghai with global quality certifications.",
  keywords: seoKeywords(
    BRAND_KEYWORDS,
    GLOBAL_MARKET_KEYWORDS,
    MARKET_KEYWORDS,
    [
      "About Fuji Fenix",
      "Fuji Fenix history",
      "elevator manufacturer Shanghai",
      "elevator company China",
      "Shanghai elevator factory",
      "vertical transportation engineering",
      "elevator manufacturing expertise",
      "elevator quality control",
      "elevator research and development",
      "global elevator manufacturer",
      "elevator export experience",
    ]
  ),
  alternates: {
    canonical: "https://fujifenix.com/about",
  },
  openGraph: {
    title: "About Fuji Fenix Elevator | Precision Engineering & Manufacturing",
    description:
      "Discover our global footprint, manufacturing facilities, safety certifications, and commitment to vertical transportation.",
    url: "https://fujifenix.com/about",
    images: ["https://fujifenix.com/about-lobby.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Fuji Fenix Elevator | Precision Engineering & Manufacturing",
    description:
      "Discover our global footprint, manufacturing facilities, safety certifications, and commitment to vertical transportation.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT FUJI FENIX"
        title={["ABOUT US"]}
        description="Advanced technology, precision engineering, and total solutions for vertical transportation."
        image="/about-lobby.jpg"
        breadcrumb="ABOUT"
        titleBlue
      />
      <AboutContent />
    </>
  );
}
