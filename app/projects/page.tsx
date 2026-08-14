import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore a selection of Fuji Fenix vertical transportation installations — high-rise towers, retail complexes, executive offices, and luxury residences delivered worldwide.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR PROJECTS"
        title={["FEATURED PROJECTS"]}
        description="A selection of vertical transportation installations across residential, commercial, healthcare, and infrastructure projects."
        image="/building-exterior.jpg"
        breadcrumb="PROJECTS"
        titleBlue
      />
      <ProjectsContent />
    </>
  );
}
