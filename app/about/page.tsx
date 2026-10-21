import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Fuji Fenix Elevator Manufacturer",
  description:
    "Learn about Fuji Fenix Elevator — a premier manufacturer of high-performance passenger elevators, escalators, and moving walks engineered in Shanghai with global quality certifications.",
  keywords: [
    "About Fuji Fenix",
    "Elevator Manufacturer Shanghai",
    "Elevator Company China",
    "Fuji Fenix History",
    "Vertical Transportation Engineering",
  ],
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
