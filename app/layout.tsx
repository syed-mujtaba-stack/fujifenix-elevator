import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import PageTransition from "./components/PageTransition";
import PageLoader from "./components/PageLoader";
import { StructuredData } from "./components/StructuredData";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/structured-data";

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
    "Fuji Fenix Elevator", "Elevator Manufacturer", "Escalator Manufacturer",
    "Passenger Elevators", "Home Elevators", "High Speed Elevators",
    "Panoramic Elevators", "Hospital Bed Elevators", "Freight Elevators",
    "Escalators", "Moving Walks", "Platform Screen Doors",
    "MRL Elevators", "Elevator Modernization", "China Elevator Exporter",
    "Shanghai Elevator Factory", "Vertical Transportation",
    "Elevator Installation", "Elevator Maintenance", "Car Elevators",
    "Dumbwaiters", "Stair Lifts", "Auto Car Parking Systems",
    "Platform Lifts", "Circular Elevators", "Marine Elevators",
  ],
  verification: { google: "_lyP_5XzuopzWMBocBBwd_qswXf2k5XZ94DK9St3AuI" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fujifenix.com",
    siteName: "Fuji Fenix Elevator",
    title: "Fuji Fenix Elevator | Elevator & Escalator Solutions",
    description: "Total solution for vertical transportation.",
    images: ["/og-home.jpg"],
  },
  twitter: { card: "summary_large_image", site: "@fujifenix" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
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
        {/* Performance: Preconnect hints */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data — Global */}
        <StructuredData schema={organizationSchema()} />
        <StructuredData schema={localBusinessSchema()} />
        <StructuredData schema={websiteSchema()} />

        {/* Override removeChild BEFORE React mounts */}
        <Script id="google-translate-patch" strategy="beforeInteractive">{`
          (function() {
            var orig = Node.prototype.removeChild;
            Node.prototype.removeChild = function(child) {
              try { return orig.call(this, child); } catch(e) { return child; }
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
            new MutationObserver(hideTranslateBanner).observe(document.documentElement, { childList: true, subtree: true });
          })();
        `}</Script>
        <PageLoader />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingCTA />

        {/* Google Analytics 4 */}
        <GoogleAnalytics gaId="G-K8N55C390S" />
      </body>
    </html>
  );
}
