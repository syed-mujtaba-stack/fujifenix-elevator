import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allProductsQuery, categoriesQuery } from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fujifenix.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    client.fetch(allProductsQuery).catch(() => []),
    client.fetch(categoriesQuery).catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/cta`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map(
    (cat: any) => ({
      url: `${BASE_URL}/products/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const productPages: MetadataRoute.Sitemap = (products || []).map(
    (p: any) => ({
      url: `${BASE_URL}/products/${p.categorySlug}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })
  );

  return [...staticPages, ...categoryPages, ...productPages];
}
