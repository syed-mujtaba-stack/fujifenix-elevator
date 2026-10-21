import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Fuji Fenix Elevator | Request a Quote & Engineering Consultation",
  description:
    "Get in touch with Fuji Fenix Elevator in Shanghai, China. Request price quotes, technical specifications, hoistway layout drawings, or after-sales elevator support.",
  keywords: [
    "Contact Fuji Fenix",
    "Elevator Price Quote",
    "Elevator Manufacturer Contact",
    "Shanghai Elevator Factory Contact",
    "Elevator Supplier Inquiries",
  ],
  alternates: {
    canonical: "https://fujifenix.com/contact",
  },
  openGraph: {
    title: "Contact Fuji Fenix Elevator | Global Sales & Support",
    description:
      "Connect with our elevator engineering specialists for customized quotations and technical project planning.",
    url: "https://fujifenix.com/contact",
    images: ["https://fujifenix.com/about-lobby.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Fuji Fenix Elevator | Global Sales & Support",
    description:
      "Connect with our elevator engineering specialists for customized quotations and technical project planning.",
  },
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
