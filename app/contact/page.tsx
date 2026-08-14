import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Fuji Fenix Elevator — Shanghai, China. Reach us by phone or email to discuss your next vertical transportation project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT US"
        title={["GET IN", "TOUCH"]}
        titleBlue
        description="Tell us about your project — our team will help you find the right solution."
        image="/about-lobby.jpg"
        breadcrumb="CONTACT"
      />
      <ContactContent />
    </>
  );
}
