import type { Metadata } from "next";
import CtaContent from "./CtaContent";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Start your vertical transportation project with Fuji Fenix Elevator. Share your requirements and get a tailored solution.",
};

export default function CtaPage() {
  return <CtaContent />;
}
