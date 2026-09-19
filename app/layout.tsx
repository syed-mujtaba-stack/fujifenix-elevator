import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import PageTransition from "./components/PageTransition";
import PageLoader from "./components/PageLoader";
import AnimatedEngineeringBackground from "./components/AnimatedEngineeringBackground";

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
    "Fuji Fenix",
    "Elevator Manufacturer",
    "Escalator Manufacturer",
    "Passenger Elevators",
    "Home Elevators",
    "Villa Elevators",
    "High Speed Elevators",
    "Panoramic Elevators",
    "Sightseeing Elevators",
    "Observation Elevators",
    "Freight Elevators",
    "Cargo Lifts",
    "Goods Lifts",
    "Hospital Bed Elevators",
    "Medical Elevators",
    "Stretcher Elevators",
    "Car Elevators",
    "Automobile Lifts",
    "Vehicle Elevators",
    "Moving Walks",
    "Travelators",
    "Commercial Escalators",
    "Outdoor Escalators",
    "Marine Elevators",
    "Circular Elevators",
    "Dumbwaiters",
    "Food Lifts",
    "Platform Lifts",
    "Stair Lifts",
    "Wheelchair Lifts",
    "Auto Car Parking Systems",
    "Platform Screen Doors",
    "MRL Elevators",
    "Machine Room Less Elevators",
    "Traction Elevators",
    "Vertical Transportation",
    "Elevator Modernization",
    "Elevator Installation & Maintenance",
    "B2B Elevator Supplier",
    "Shanghai Elevator Factory",
    "China Elevator Exporter",
    "Global Elevator Manufacturer",
  ],
  verification: {
    google: "_lyP_5XzuopzWMBocBBwd_qswXf2k5XZ94DK9St3AuI",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fujifenix.com",
    siteName: "Fuji Fenix Elevator",
    title: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
    description:
      "Total solution for vertical transportation. From high-rise towers to transit hubs, we have solutions for all your needs.",
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
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans bg-white text-[#0F172A] selection:bg-[#0047BB] selection:text-white overflow-x-hidden"
        suppressHydrationWarning
      >
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

            function hideTranslateBanner() {
              var banners = document.querySelectorAll('iframe.goog-te-banner-frame, iframe[class*="goog-te-banner-frame"]');
              banners.forEach(function(banner) {
                banner.style.setProperty('display', 'none', 'important');
                banner.style.setProperty('visibility', 'hidden', 'important');
              });
              document.documentElement.style.setProperty('top', '0', 'important');
              if (document.body) document.body.style.setProperty('top', '0', 'important');
            }

            hideTranslateBanner();
            new MutationObserver(hideTranslateBanner).observe(document.documentElement, {
              childList: true,
              subtree: true
            });
          })();
        `}</Script>
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
