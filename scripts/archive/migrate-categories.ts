import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// Define the 4 main categories with their slugs and order
const categories = [
  {
    _type: 'category',
    title: 'Elevators',
    slug: { _type: 'slug', current: 'elevators' },
    description: 'Complete range of elevator systems for residential, commercial, and industrial applications. From passenger elevators to specialized freight and car elevators.',
    order: 1,
  },
  {
    _type: 'category',
    title: 'Escalators & Moving Walks',
    slug: { _type: 'slug', current: 'escalators-moving-walks' },
    description: 'Modern escalators and moving walkways for shopping malls, airports, transit hubs, and commercial buildings. Engineered for high-traffic continuous operation.',
    order: 2,
  },
  {
    _type: 'category',
    title: 'Specialized Elevator Solutions',
    slug: { _type: 'slug', current: 'specialized-elevator-solutions' },
    description: 'Customized and specialized elevator solutions including marine elevators, circular elevators, platform lifts, and dumbwaiters for unique architectural requirements.',
    order: 3,
  },
  {
    _type: 'category',
    title: 'Transportation & Infrastructure',
    slug: { _type: 'slug', current: 'transportation-infrastructure' },
    description: 'Large-scale transportation infrastructure solutions including automated car parking systems and platform screen doors for metro and transit systems.',
    order: 4,
  },
]

// Product to category mapping based on the required hierarchy
const productCategoryMapping: Record<string, string> = {
  // Elevators
  'passenger-elevator-cabin': 'elevators',
  'home-elevators': 'elevators',
  'high-speed-elevators': 'elevators',
  'panoramic-observation-elevators': 'elevators',
  'hospital-bed-elevators': 'elevators',
  'freight-elevators': 'elevators',
  'car-elevators': 'elevators',
  // Escalators & Moving Walks
  'escalator': 'escalators-moving-walks',
  'trolley-escalators': 'escalators-moving-walks',
  'moving-walks': 'escalators-moving-walks',
  // Specialized Elevator Solutions
  'customized-elevators': 'specialized-elevator-solutions',
  'marine-elevators': 'specialized-elevator-solutions',
  'circular-elevators': 'specialized-elevator-solutions',
  'platform-stair-lift': 'specialized-elevator-solutions',
  'dumbwaiters': 'specialized-elevator-solutions',
  // Transportation & Infrastructure
  'auto-parking-system': 'transportation-infrastructure',
  'platform-screen-doors': 'transportation-infrastructure',
}

async function migrateCategoriesAndProducts() {
  console.log('Starting Sanity migration...')

  // Step 1: Create or update categories
  const categoryIds: Record<string, string> = {}

  for (const cat of categories) {
    // Check if category already exists
    const existing = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0] { _id }`,
      { slug: cat.slug.current }
    )

    if (existing) {
      console.log(`Category "${cat.title}" already exists (${existing._id})`)
      categoryIds[cat.slug.current] = existing._id
      // Update the category with latest data
      await client.patch(existing._id).set({
        title: cat.title,
        description: cat.description,
        order: cat.order,
      }).commit()
    } else {
      const created = await client.create(cat)
      console.log(`Created category "${cat.title}" (${created._id})`)
      categoryIds[cat.slug.current] = created._id
    }
  }

  // Step 2: Update products to reference correct categories
  console.log('\nUpdating product category references...')

  for (const [productSlug, categorySlug] of Object.entries(productCategoryMapping)) {
    const categoryId = categoryIds[categorySlug]
    if (!categoryId) {
      console.error(`Category not found for slug: ${categorySlug}`)
      continue
    }

    // Find the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { _id, title, category }`,
      { slug: productSlug }
    )

    if (!product) {
      console.log(`Product not found: ${productSlug}`)
      continue
    }

    // Check if already assigned to correct category
    const currentCategoryRef = product.category?._ref
    if (currentCategoryRef === categoryId) {
      console.log(`Product "${product.title}" already in correct category`)
      continue
    }

    // Update product category reference
    await client.patch(product._id).set({
      category: { _type: 'reference', _ref: categoryId },
    }).commit()

    console.log(`Updated "${product.title}" -> ${categorySlug}`)
  }

  console.log('\nMigration completed successfully!')
}

// Run the migration
migrateCategoriesAndProducts().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})