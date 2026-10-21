// lib/structured-data.ts — Pure schema functions (Server-safe, no "use client")

const BASE_URL = "https://fujifenix.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Shanghai Fuji Fenix Elevator Co Ltd.",
    alternateName: ["FUJI FENIX", "Fuji Fenix Elevator"],
    url: BASE_URL,
    logo: `${BASE_URL}/FUJI%20FENIX%20(1).svg`,
    image: `${BASE_URL}/building-exterior.jpg`,
    description: "Total Solution for Vertical Transportation — High-performance passenger elevators, panoramic lifts, freight elevators, and escalators.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 2, No. 315 Weichang Road",
      addressLocality: "Jinshan District",
      addressRegion: "Shanghai",
      postalCode: "201500",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.78,
      longitude: 121.38,
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
        contactType: "customer service",
        areaServed: "Global",
        availableLanguage: ["en", "zh"],
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
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Shanghai Fuji Fenix Elevator Co Ltd.",
    alternateName: "Fuji Fenix Elevator",
    description: "Leading manufacturer and global exporter of elevators, escalators, and moving walks in Shanghai, China.",
    telephone: "+86 157 5725 3279",
    email: "info@fujifenix.com",
    url: BASE_URL,
    logo: `${BASE_URL}/FUJI%20FENIX%20(1).svg`,
    image: `${BASE_URL}/building-exterior.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 2, No. 315 Weichang Road",
      addressLocality: "Jinshan District",
      addressRegion: "Shanghai",
      postalCode: "201500",
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
        opens: "08:30",
        closes: "18:00",
      },
    ],
    priceRange: "$$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vertical Transportation Systems",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Passenger Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panoramic & Observation Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Villa & Home Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hospital Bed Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Freight & Goods Elevators" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Escalators & Moving Walks" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elevator Modernization & Preventive Maintenance" } },
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
  const url = product.categorySlug
    ? `${BASE_URL}/products/${product.categorySlug}/${product.slug}`
    : `${BASE_URL}/products/${product.slug}`;

  let resolvedImage = `${BASE_URL}/hero-elevator.jpg`;
  if (product.image) {
    if (product.image.startsWith("http://") || product.image.startsWith("https://")) {
      resolvedImage = product.image;
    } else if (product.image.startsWith("/")) {
      resolvedImage = `${BASE_URL}${product.image}`;
    } else {
      resolvedImage = `${BASE_URL}/${product.image}`;
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `${product.title} by Fuji Fenix Elevator. Precision engineered elevator and escalator system.`,
    image: resolvedImage,
    url: url,
    brand: {
      "@type": "Brand",
      name: "Fuji Fenix",
      logo: `${BASE_URL}/FUJI%20FENIX%20(1).svg`,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Shanghai Fuji Fenix Elevator Co Ltd.",
      url: BASE_URL,
    },
    category: product.category || "Elevators",
    additionalProperty: (product.features || []).map((f) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: f,
    })),
  };
}

export function itemListSchema(items: { name: string; url: string; description?: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
      description: item.description,
      image: item.image ? (item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image.startsWith("/") ? "" : "/"}${item.image}`) : undefined,
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
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Fuji Fenix Elevator",
    url: BASE_URL,
    description: "Total Solution for Vertical Transportation — Manufacturing, installation, modernization, and maintenance.",
    publisher: {
      "@type": "Organization",
      name: "Shanghai Fuji Fenix Elevator Co Ltd.",
      url: BASE_URL,
      logo: `${BASE_URL}/FUJI%20FENIX%20(1).svg`,
    },
  };
}
