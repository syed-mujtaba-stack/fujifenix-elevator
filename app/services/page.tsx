import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Elevator Installation, Modernization & Maintenance Services | Fuji Fenix",
  description:
    "Comprehensive lifecycle elevator and escalator services: precision manufacturing, turnkey installation, complete system modernization, 24/7 maintenance, and emergency response.",
  keywords: [
    "Elevator Services",
    "Elevator Modernization",
    "Elevator Maintenance",
    "Elevator Installation",
    "Escalator Maintenance",
    "Vertical Transportation Services",
  ],
  alternates: {
    canonical: "https://fujifenix.com/services",
  },
  openGraph: {
    title: "Elevator Services & Modernization | Fuji Fenix",
    description:
      "End-to-end vertical transportation services: engineering, installation, modernization, and preventative maintenance.",
    url: "https://fujifenix.com/services",
    images: ["https://fujifenix.com/building-exterior.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevator Services & Modernization | Fuji Fenix",
    description:
      "End-to-end vertical transportation services: engineering, installation, modernization, and preventative maintenance.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title={["TOTAL CARE,"]}
        highlight="EVERY FLOOR"
        description="Manufacturing, installation, modernization, maintenance, and rapid emergency response — one partner for the entire lifecycle of your vertical transportation."
        image="/building-exterior.jpg"
        breadcrumb="SERVICES"
      />
      <ServicesContent />
    </>
  );
}
