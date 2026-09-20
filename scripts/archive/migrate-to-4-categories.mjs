#!/usr/bin/env node
/**
 * Migration script: Creates 4 main categories and maps existing products to them.
 * 
 * 4 Main Categories:
 * 1. Elevators
 * 2. Escalators & Moving Walks
 * 3. Specialized Elevator Solutions
 * 4. Transportation & Infrastructure
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@sanity/client'

function loadEnvFile() {
  const envPath = join(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return {}
  const out = {}
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return out
}

function resolveToken() {
  if (process.env.SANITY_TOKEN) return process.env.SANITY_TOKEN
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  return null
}

const env = loadEnvFile()
const projectId = process.env.SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET
const token = resolveToken()

if (!projectId || !dataset) {
  console.error('✖ Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local')
  process.exit(1)
}

if (!token) {
  console.error('✖ No Sanity token found. Run `npx sanity login` first, or set SANITY_TOKEN in your environment.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-19',
  token,
  useCdn: false,
})

// Define the 4 main categories
const MAIN_CATEGORIES = [
  {
    title: 'Elevators',
    slug: 'elevators',
    description: 'Complete range of elevator systems for residential, commercial, and industrial applications. From passenger elevators to specialized freight and car elevators.',
    order: 1,
  },
  {
    title: 'Escalators & Moving Walks',
    slug: 'escalators-moving-walks',
    description: 'Modern escalators and moving walkways for shopping malls, airports, transit hubs, and commercial buildings. Engineered for high-traffic continuous operation.',
    order: 2,
  },
  {
    title: 'Specialized Elevator Solutions',
    slug: 'specialized-elevator-solutions',
    description: 'Customized and specialized elevator solutions including marine elevators, circular elevators, platform lifts, and dumbwaiters for unique architectural requirements.',
    order: 3,
  },
  {
    title: 'Transportation & Infrastructure',
    slug: 'transportation-infrastructure',
    description: 'Large-scale transportation infrastructure solutions including automated car parking systems and platform screen doors for metro and transit systems.',
    order: 4,
  },
]

// Map PRODUCT SLUGS to NEW main category slugs
const PRODUCT_CATEGORY_MAPPING = {
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
  'circular-elevators': 'specialized-elevator-solutions',
  'marine-elevators': 'specialized-elevator-solutions',
  'platform-stair-lift': 'specialized-elevator-solutions',
  'dumbwaiters': 'specialized-elevator-solutions',
  
  // Transportation & Infrastructure
  'auto-parking-system': 'transportation-infrastructure',
  'platform-screen-doors': 'transportation-infrastructure',
}

async function main() {
  console.log(`Sanity: ${projectId} / ${dataset}`)
  console.log('\n=== Creating 4 Main Categories ===\n')

  // Step 1: Create main categories
  const categoryIdBySlug = {}
  
  for (const cat of MAIN_CATEGORIES) {
    const existing = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0] { _id }`,
      { slug: cat.slug }
    )
    
    if (existing) {
      console.log(`Category "${cat.title}" already exists (${existing._id})`)
      categoryIdBySlug[cat.slug] = existing._id
      
      // Update with latest data
      await client.patch(existing._id).set({
        title: cat.title,
        description: cat.description,
        order: cat.order,
      }).commit()
    } else {
      const created = await client.create({
        _type: 'category',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        description: cat.description,
        order: cat.order,
      })
      console.log(`✓ Created category "${cat.title}" (${created._id})`)
      categoryIdBySlug[cat.slug] = created._id
    }
  }

  console.log('\n=== Mapping Products to Main Categories ===\n')

  // Step 2: Get all products and their current categories
  const products = await client.fetch(`
    *[_type == "product"] {
      _id,
      title,
      slug,
      "currentCategory": category->slug.current,
      "currentCategoryTitle": category->title
    } | order(order asc)
  `)

  console.log(`Found ${products.length} products to process\n`)

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const product of products) {
    const productSlug = product.slug.current
    const newCategorySlug = PRODUCT_CATEGORY_MAPPING[productSlug]
    
    if (!newCategorySlug) {
      console.log(`⚠ No mapping found for product "${product.title}" (slug: ${productSlug})`)
      errors++
      continue
    }

    const newCategoryId = categoryIdBySlug[newCategorySlug]
    if (!newCategoryId) {
      console.log(`⚠ New category not found: ${newCategorySlug}`)
      errors++
      continue
    }

    // Check if already mapped correctly
    const currentCategorySlug = product.currentCategory
    if (currentCategorySlug === newCategorySlug) {
      console.log(`  ○ "${product.title}" already in correct category (${newCategorySlug})`)
      skipped++
      continue
    }

    try {
      await client.patch(product._id).set({
        category: { _type: 'reference', _ref: newCategoryId },
      }).commit()
      
      console.log(`  ✓ "${product.title}" → ${currentCategorySlug} → ${newCategorySlug}`)
      updated++
    } catch (err) {
      console.log(`  ✖ "${product.title}" — ${err.message}`)
      errors++
    }
  }

  console.log('\n=== Migration Summary ===')
  console.log(`Categories created/updated: ${MAIN_CATEGORIES.length}`)
  console.log(`Products updated: ${updated}`)
  console.log(`Products skipped (already correct): ${skipped}`)
  console.log(`Errors: ${errors}`)
  console.log(`Total products: ${products.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})