#!/usr/bin/env node
/**
 * Seeds the Auto-Parking System product (under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products:
 *   - Local static asset (public/Elevators/Auto Car Parking/Auto Car.jpeg) as URL path.
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Auto-Parking System) — NOT merged with any other product.
 *
 * Auto-Parking System contains SIX types, modeled as separate specGroups so each
 * type's description stays grouped together:
 *   1. Tower Type
 *   2. Cart Type
 *   3. Rotary Type
 *   4. Integrated Parking System
 *   5. Robot Type
 *   6. Puzzle Type
 *
 * Content is taken verbatim from AUTO CAR PARKING SYSTEM.docx. No technical
 * specifications are invented; the client document does not provide them.
 *
 * Usage:
 *   node scripts/seed-auto-parking.mjs            # seed (idempotent)
 *   node scripts/seed-auto-parking.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Auto%20Car%20Parking'

const TAGLINE_HERO = 'Advanced Automated Parking Solutions for Maximum Space, Safety & Efficiency'
const TAGLINE_CLOSING = 'FUJI FENIX — Intelligent Parking Solutions for Modern Buildings.'
const OVERVIEW =
  'FUJI FENIX Auto-Parking Systems provide intelligent vehicle storage and retrieval solutions designed to maximize parking capacity while reducing land requirements, vehicle movement, and operating time.\n\nThe systems are suitable for residential, commercial, hotel, office, and high-density urban developments.'

const KEY_FEATURES = [
  'Space Optimization',
  'Fast Vehicle Retrieval',
  'Enhanced Safety',
  'Improved Security',
  'Reduced Vehicle Movement',
  'Lower Emissions',
  'Efficient Land Utilization',
]

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'auto-parking-system',
  title: 'Auto-Parking System',
  slug: { _type: 'slug', current: 'auto-parking-system' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description: `${TAGLINE_HERO}\n\n${OVERVIEW}`,
  features: null,
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'ap-main',
      src: `${BASE}/Auto%20Car.jpeg`,
      alt: 'Fuji Fenix Auto-Parking System',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'types-overview',
      title: 'Types of Auto-Parking Systems',
      sectionImages: ['ap-main'],
      sectionDescription: null,
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'tower-type',
      title: 'Tower Type',
      sectionImages: null,
      sectionDescription:
        'Vertical automated parking systems designed to maximize parking capacity in limited land areas.',
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'cart-type',
      title: 'Cart Type',
      sectionImages: null,
      sectionDescription:
        'Automated cart-based systems that efficiently transfer and store vehicles within multi-level parking structures.',
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'rotary-type',
      title: 'Rotary Type',
      sectionImages: null,
      sectionDescription:
        'Rotating platform systems that provide compact and efficient vehicle parking where space is limited.',
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'integrated-type',
      title: 'Integrated Parking System',
      sectionImages: null,
      sectionDescription:
        'Fully integrated automated solutions combining multiple parking technologies for optimized capacity and site-specific requirements.',
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'robot-type',
      title: 'Robot Type',
      sectionImages: null,
      sectionDescription:
        'Advanced robotic parking systems that automatically transport and position vehicles without conventional driving within the parking area.',
      items: [],
    },
    {
      _type: 'specGroup',
      _key: 'puzzle-type',
      title: 'Puzzle Type',
      sectionImages: null,
      sectionDescription:
        'Flexible multi-level parking systems that move platforms vertically and horizontally to maximize available parking spaces.',
      items: [],
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
  order: 14,
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
    `*[_type == "product" && slug.current == "auto-parking-system"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Auto-Parking System" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Auto-Parking System" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
