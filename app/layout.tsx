import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import PageTransition from "./components/PageTransition";
import AnimatedEngineeringBackground from "./components/AnimatedEngineeringBackground";
import PageLoader from "./components/PageLoader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fujifenix.com"),
  title: {
    default: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
    template: "%s | Fuji Fenix Elevator",
  },
  description:
    "Fuji Fenix Elevator is a leading provider of elevator and escalator solutions, combining advanced technology with precision engineering for residential, commercial, healthcare, and infrastructure projects.",
  keywords: [
    "Fuji Fenix Elevator",
    "Elevator Manufacturer",
    "Escalator Manufacturer",
    "Passenger Elevators",
    "Home Elevators",
    "High Speed Elevators",
    "Vertical Transportation",
    "Shanghai Elevator Factory",
    "B2B Elevator Manufacturer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fujifenix.com",
    siteName: "Fuji Fenix Elevator",
    title: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
    description:
      "Total solution for vertical transportation. From high-rise towers to transit hubs, we have solutions for all your needs.",
    images: [
      {
        url: '/hero-elevator.jpg',
        alt: 'Fuji Fenix hero image',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
    description:
      "Total solution for vertical transportation. Elevators and escalators engineered for every project.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Preload hero image to improve LCP */}
        <link rel="preload" as="image" href="/hero-elevator.jpg" />
        {/* Organization JSON-LD for richer search previews */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Fuji Fenix Elevator",
          "url": "https://fujifenix.com",
          "logo": "https://fujifenix.com/hero-elevator.jpg",
          "sameAs": ["https://www.linkedin.com/company/fujifenix"],
          "@id": "https://fujifenix.com#organization"
        }) }} />
        {/* Override removeChild BEFORE React mounts to catch Google Translate DOM mutations */}
        <Script id="google-translate-patch" strategy="beforeInteractive">{`
          (function() {
            var orig = Node.prototype.removeChild;
            Node.prototype.removeChild = function(child) {
              try {
                return orig.call(this, child);
              } catch(e) {
                return child;
              }
            };
          })();
        `}</Script>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0F172A] selection:bg-blue-600 selection:text-white overflow-x-hidden">
        <PageLoader />
        <AnimatedEngineeringBackground />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
