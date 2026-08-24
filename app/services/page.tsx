import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end elevator and escalator services — manufacturing, installation, modernization, preventive maintenance, and 24/7 emergency response, built to the highest international safety standards.",
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
