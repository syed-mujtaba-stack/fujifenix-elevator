import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'fpxhz2d3',
  dataset: 'production',
  apiVersion: '2026-08-19',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function main() {
  // Fix the gallery paths - they need the subfolder "Trolly Escalators"
  const product = await client.fetch(`*[_type == "product" && slug.current == "trolley-escalators"][0] {
    _id,
    gallery
  }`);
  
  if (!product) {
    console.log('Product not found');
    return;
  }
  
  console.log('Current gallery:', JSON.stringify(product.gallery, null, 2));
  
  // Fix paths - add "Trolly%20Escalators/" prefix
  const fixedGallery = product.gallery.map((img) => ({
    ...img,
    src: img.src.replace('/Elevators/Trolly%20Escalators/', '/Elevators/Trolly%20Escalators/Trolly%20Escalators/')
  }));
  
  console.log('Fixed gallery:', JSON.stringify(fixedGallery, null, 2));
  
  await client.patch(product._id).set({
    gallery: fixedGallery
  }).commit();
  
  console.log('✓ Gallery paths updated');
}
main().catch(console.error);