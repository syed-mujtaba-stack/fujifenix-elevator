import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fujifenix.com";

export const revalidate = 3600;

// Lean queries that also return _updatedAt for accurate lastModified values
const productsForSitemap = `
  *[_type == "product"] {
    "slug": slug.current,
    "categorySlug": category->slug.current,
    "_updatedAt": _updatedAt
  }
`;

const categoriesForSitemap = `
  *[_type == "category"] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    client.fetch(productsForSitemap).catch(() => []),
    client.fetch(categoriesForSitemap).catch(() => []),
  ]);

  const lastMod = (date?: string | null) =>
    date ? new Date(date) : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: lastMod(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/cta`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map(
    (cat: { slug: string; _updatedAt?: string | null }) => ({
      url: `${BASE_URL}/products/${cat.slug}`,
      lastModified: lastMod(cat._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const productPages: MetadataRoute.Sitemap = (
    products || []
  ).map((p: { slug: string; categorySlug: string; _updatedAt?: string | null }) => ({
    url: `${BASE_URL}/products/${p.categorySlug}/${p.slug}`,
    lastModified: lastMod(p._updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}