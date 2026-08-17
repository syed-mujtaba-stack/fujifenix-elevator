import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fuji Fenix Elevator offers comprehensive solutions — manufacturing, sales, and after-sales support of elevators and escalators, built to the highest international safety and performance standards.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title={["OUR"]}
        highlight="SERVICES"
        description="Total solution for vertical transportation — manufacturing, sales, and after-sales support."
        image="/hero-elevator.jpg"
        breadcrumb="SERVICES"
      />
      <ServicesContent />
    </>
  );
}
