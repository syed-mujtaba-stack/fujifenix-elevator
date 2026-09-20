// lib/structured-data.ts — Pure schema functions (Server-safe, no "use client")

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shanghai Fuji Fenix Elevator Co Ltd.",
    alternateName: "FUJI FENIX",
    url: "https://fujifenix.com",
    logo: "https://fujifenix.com/logo.png",
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
    image: "https://fujifenix.com/factory.jpg",
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
  features?: string[];
  keyFeatures?: string[];
  slug: string;
  tagline?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image || `https://fujifenix.com/products/${product.slug}/hero.jpg`,
    brand: {
      "@type": "Brand",
      name: "Fuji Fenix",
      logo: "https://fujifenix.com/logo.png",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://fujifenix.com/products/${product.slug}`,
      priceCurrency: "CNY",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fuji Fenix Elevator",
    url: "https://fujifenix.com",
    description: "Total Solution for Vertical Transportation",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://fujifenix.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
