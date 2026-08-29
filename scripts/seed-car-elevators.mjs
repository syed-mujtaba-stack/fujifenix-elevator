#!/usr/bin/env node
/**
 * Seeds the Car Elevators product (Product #13 under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products.
 *   - Local static asset (public/Elevators/Car Elevator/car elevator1.png) as URL path.
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Car Elevators) — NOT merged with any other product.
 *
 * Car Elevators contains TWO types, modeled as separate specGroups so each type's
 * images and specifications stay grouped together (no combined global table):
 *   1. Car Elevator: General Rope Type
 *   2. Car Elevator: Hydraulic Type
 *
 * Content is taken verbatim from CAR ELEVATORS.docx. No technical values are
 * invented beyond the client-provided load capacities and speeds.
 *
 * Usage:
 *   node scripts/seed-car-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-car-elevators.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Car%20Elevator'

const TAGLINE_HERO = 'Safe, Reliable & Efficient Vehicle Transportation'
const TAGLINE_CLOSING = 'FUJI FENIX Car Elevator — Smart Vertical Mobility for Modern Parking Solutions.'
const OVERVIEW =
  'The FUJI FENIX Car Elevator is designed for the safe and efficient vertical transportation of vehicles between different levels of residential, commercial, and parking facilities. It is engineered for smooth operation, accurate landing, high reliability, and enhanced safety, providing a practical solution where conventional vehicle ramps are not suitable.'

const KEY_FEATURES = [
  'Smooth acceleration and deceleration for comfortable vehicle movement',
  'Accurate floor landing for safe and convenient access',
  'High reliability with intelligent control and monitoring',
  'Space-efficient design to maximize available building area',
  'Enhanced safety systems for reliable vehicle transportation',
  'Low-noise and efficient operation',
  'Suitable for commercial buildings, hotels, residential developments, showrooms, and parking facilities',
]

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'car-elevators',
  title: 'Car Elevators',
  slug: { _type: 'slug', current: 'car-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  // Hero tagline preserved at the top of the description, followed by the client overview.
  description: `${TAGLINE_HERO}\n\n${OVERVIEW}`,
  features: null,
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'car-main',
      src: `${BASE}/car%20elevator1.png`,
      alt: 'Fuji Fenix car elevator',
    },
  ],
  // Section-based groups keep each type's image(s) with its own specifications.
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'product-gallery',
      title: 'Product Gallery',
      sectionImages: ['car-main'],
      sectionDescription: null,
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'general-rope',
      title: 'Car Elevator: General Rope Type',
      sectionImages: null,
      sectionDescription: null,
      items: [
        { _type: 'spec', _key: 'gr-load', label: 'Load Capacity', value: '2000KG-3500KG' },
        { _type: 'spec', _key: 'gr-speed', label: 'Speed', value: '30 M/MIN-60M/MIN' },
      ],
    },
    {
      _type: 'specGroup',
      _key: 'hydraulic',
      title: 'Car Elevator: Hydraulic Type',
      sectionImages: null,
      sectionDescription: null,
      items: [
        { _type: 'spec', _key: 'hy-load', label: 'Load Capacity', value: '2000KG-3500KG' },
        { _type: 'spec', _key: 'hy-speed', label: 'Speed', value: '20 M/MIN-30M/MIN' },
      ],
    },
  ],
  technicalDrawings: [],
  designedFor: null,
  keyFeatures: KEY_FEATURES,
  applications: null,
  capacities: null,
  design: null,
  operation: null,
  tagline: TAGLINE_CLOSING,
  disclaimer:
    'Actual load capacity, speed, dimensions, configuration, and specifications may vary according to project requirements and selected design.',
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: null,
  order: 13,
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
    `*[_type == "product" && slug.current == "car-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Car Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Car Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
