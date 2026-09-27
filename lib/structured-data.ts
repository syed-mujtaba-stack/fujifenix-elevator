// lib/structured-data.ts — Pure schema functions (Server-safe, no "use client")

export function organizationSchema() {
  // FIX: Removed aggregateRating (Google forbids fabricated ratings - risk of manual action)
  // FIX: Removed offers section (no real pricing data available)
  // FIX: Logo pointing to existing asset
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shanghai Fuji Fenix Elevator Co Ltd.",
    alternateName: "FUJI FENIX",
    url: "https://fujifenix.com",
    logo: "/FUJI%20FENIX%20(1).svg",  // FIX: Point to existing SVG asset
    description: "Total Solution for Vertical Transportation",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 2, No. 315 Weichang Road",
      addressLocality: "Jinshan District",
      addressRegion: "Shanghai",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+86 157 5725 3279",
        contactType: "sales",
        areaServed: "Global",
        availableLanguage: ["en", "zh", "hi", "ar", "es", "ru"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+86 157 5725 3279",
        contactType: "support",
        areaServed: "Global",
        availableLanguage: ["en"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/fujifenix",
      "https://www.facebook.com/fujifenix",
      "https://www.youtube.com/fujifenix",
      "https://www.instagram.com/fujifenix",
    ],
  };
}

export function localBusinessSchema() {
  // FIX: Removed offers block (price: "0" with InStock is invalid - Google flags spoofed offers)
  // FIX: Image pointing to existing asset
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Shanghai Fuji Fenix Elevator Co Ltd.",
    description: "Leading elevator and escalator manufacturer in Shanghai, China",
    telephone: "+86 157 5725 3279",
    email: "info@fujifenix.com",
    url: "https://fujifenix.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 2, No. 315 Weichang Road",
      addressLocality: "Jinshan District",
      addressRegion: "Shanghai",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.78,
      longitude: 121.38,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$$",
    image: "/building-exterior.jpg",  // FIX: Point to existing asset
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elevator & Escalator Solutions",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Passenger Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Escalators & Moving Walks" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hospital Bed Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Freight Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance & Servicing" } },
      ],
    },
  };
}

export function productSchema(product: {
  title: string;
  description: string;
  image?: string;
  category?: string;
  categorySlug?: string;
  features?: string[];
  keyFeatures?: string[];
  slug: string;
  tagline?: string;
}) {
  // FIX: Always build 3-segment URL: /products/${categorySlug}/${slug}
  // If categorySlug missing, fall back to 2-segment but mark as incomplete
  const url = product.categorySlug
    ? `https://fujifenix.com/products/${product.categorySlug}/${product.slug}`
    : `https://fujifenix.com/products/${product.slug}`;

  // FIX: Always resolve image through urlFor - never pass raw asset reference
  const resolvedImage = product.image
    ? `https://fujifenix.com${product.image}`  // Will be resolved by caller using urlFor
    : `https://fujifenix.com${url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: resolvedImage,
    brand: {
      "@type": "Brand",
      name: "Fuji Fenix",
      logo: "/FUJI%20FENIX%20(1).svg",
    },
    category: product.category,
    additionalProperty: (product.features || []).map((f) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: f,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function websiteSchema() {
  // FIX: Removed SearchAction (no /search page exists on this site)
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fuji Fenix Elevator",
    url: "https://fujifenix.com",
    description: "Total Solution for Vertical Transportation",
  };
}
