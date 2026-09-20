import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'fpxhz2d3',
  dataset: 'production',
  apiVersion: '2026-08-19',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function main() {
  const product = await client.fetch(`*[_type == "product" && slug.current == "trolley-escalators"][0] {
    _id,
    title,
    slug,
    image,
    gallery,
    category
  }`);
  console.log(JSON.stringify(product, null, 2));
}
main().catch(console.error);