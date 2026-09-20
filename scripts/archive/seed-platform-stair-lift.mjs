#!/usr/bin/env node
/**
 * Seeds the Platform Stair Lift product (Product #11 under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products:
 *   - Local static assets (public/Elevators/Platform Stair Lift/...) as URL paths.
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Platform Stair Lift) — NOT merged with any other product.
 *
 * Content is taken verbatim from PLATFORM STAIR LIFT.docx:
 *   - Tagline, overview, 8 Key Features, 8 Applications, image disclaimer, CTA.
 * No technical specifications are invented — the client document provides none.
 *
 * Usage:
 *   node scripts/seed-platform-stair-lift.mjs            # seed (idempotent)
 *   node scripts/seed-platform-stair-lift.mjs --dry-run  # print docs only
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

const env = loadEnvFile()
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET
const token = env.SANITY_TOKEN

if (!projectId || !dataset) {
  console.error('✖ Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('✖ No SANITY_TOKEN found in .env.local')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-19',
  token,
  useCdn: false,
})

const BASE = '/Elevators/Platform%20Stair%20Lift'

const TAGLINE = 'Safe, Comfortable & Accessible Vertical Mobility'
const OVERVIEW =
  'FUJI FENIX Platform Stair Lifts provide a practical and reliable accessibility solution for people with reduced mobility, allowing wheelchair users to move safely between different levels along straight or inclined stairways. Designed for homes, commercial buildings, public facilities and institutional environments, the platform lift combines smooth operation, space-efficient design and essential safety features.'

const KEY_FEATURES = [
  'Suitable for wheelchair users and people with reduced mobility',
  'Straight and inclined stairway configurations',
  'Smooth and controlled operation',
  'Foldable platform for improved stairway access',
  'Safety barriers, sensors and emergency controls',
  'Compact design with minimal structural requirements',
  'Suitable for indoor and selected outdoor applications',
  'Easy-to-use controls and reliable operation',
]

const APPLICATIONS = [
  'Residential Buildings',
  'Villas',
  'Hotels',
  'Hospitals',
  'Schools',
  'Shopping Centers',
  'Public Buildings',
  'Commercial Facilities',
]

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'platform-stair-lift',
  title: 'Platform Stair Lift',
  slug: { _type: 'slug', current: 'platform-stair-lift' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  // Tagline is preserved at the top of the description, followed by the client overview.
  description: `${TAGLINE}\n\n${OVERVIEW}`,
  features: null,
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'psl-1',
      src: `${BASE}/platform%20stair1.png`,
      alt: 'Fuji Fenix platform stair lift installation',
    },
    {
      _type: 'galleryImage',
      _key: 'psl-2',
      src: `${BASE}/platform%20stair2.png`,
      alt: 'Fuji Fenix platform stair lift with folded platform',
    },
  ],
  // One section-based group for the Product Gallery (both actual images).
  // No technical specifications are provided, so no spec items are invented.
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'product-gallery',
      title: 'Product Gallery',
      sectionImages: ['psl-1', 'psl-2'],
      sectionDescription: null,
      items: [],
    },
  ],
  technicalDrawings: [],
  designedFor: null,
  keyFeatures: KEY_FEATURES,
  applications: APPLICATIONS,
  disclaimer: null,
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: null,
  order: 11,
}

async function main() {
  console.log(`Sanity: ${projectId} / ${dataset}`)
  if (DRY_RUN) {
    console.log('Mode: dry-run (no writes)')
    console.log(JSON.stringify({ PRODUCT_DOC }, null, 2))
    return
  }

  const existingCategory = await client.fetch(
    `*[_type == "category" && slug.current == "elevators"][0] { _id }`
  )
  let categoryId
  if (existingCategory) {
    categoryId = existingCategory._id
    console.log(`• Category "Elevators" already exists (${categoryId})`)
  } else {
    const created = await client.create({ _type: 'category', _id: 'elevators-category', title: 'Elevators', slug: { _type: 'slug', current: 'elevators' }, group: 'elevators', order: 1 })
    categoryId = created._id
    console.log(`+ Category "Elevators" created (${categoryId})`)
  }

  const existingProduct = await client.fetch(
    `*[_type == "product" && slug.current == "platform-stair-lift"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Platform Stair Lift" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Platform Stair Lift" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
