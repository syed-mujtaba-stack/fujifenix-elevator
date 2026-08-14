import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Fuji Fenix Elevator is a leading manufacturer of advanced elevator and escalator systems, combining cutting-edge technology with precision engineering for residential, commercial, healthcare, and infrastructure projects worldwide.",
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
