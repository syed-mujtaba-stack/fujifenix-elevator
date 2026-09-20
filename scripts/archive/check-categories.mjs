import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'fpxhz2d3',
  dataset: 'production',
  apiVersion: '2026-08-19',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function main() {
  const categories = await client.fetch('*[_type == "category"] { _id, title, "slug": slug.current }');
  console.log('Categories:', JSON.stringify(categories, null, 2));
  const products = await client.fetch('*[_type == "product"] { _id, title, "slug": slug.current, "category": category->slug.current, "categoryTitle": category->title }');
  console.log('Products:', JSON.stringify(products, null, 2));
}
main().catch(console.error);