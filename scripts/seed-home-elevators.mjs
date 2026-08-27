#!/usr/bin/env node
/**
 * Seeds the Home Elevators product (Product #2 under the Elevators category).
 *
 * Reuses the EXACT same architecture as the Passenger Elevator Cabin seed:
 *   - Product images/blueprints are LOCAL static assets (public/Elevators/...)
 *     stored as URL paths, not duplicated into Sanity assets.
 *   - `image` is null; gallery[0] is used as the hero/card image by the
 *     product detail + listing components.
 *   - The three client-specified types (General Traction / MRL,
 *     Platform Home Elevator, Aluminum Structure Home Elevator) are modeled
 *     as three specGroups — NOT as separate top-level products.
 *
 * Usage:
 *   node scripts/seed-home-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-home-elevators.mjs --dry-run # print docs only
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

const BASE = '/Elevators/Home%20Elevators'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'home-elevators',
  title: 'Home Elevators',
  slug: { _type: 'slug', current: 'home-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Fuji Fenix Home Elevators deliver quiet, space-efficient vertical mobility for private residences and villas. Available in General Traction / Machine-Room-Less (MRL) configurations, with dedicated Platform and Aluminum Structure variants, they pair refined cabin finishes with dependable residential performance. Actual product colors may vary slightly due to lighting, photography, material finish, and screen settings.',
  features: [
    'General Traction / Machine-Room-Less (MRL)',
    'Platform Home Elevator',
    'Aluminum Structure Home Elevator',
    'Residential & Villa Use',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'villa-wood-steel',
      src: `${BASE}/Villa%20Home%20Elevators%20(wood%20%26%20steel%20cabin).png`,
      alt: 'Fuji Fenix villa home elevator with wood and steel cabin finish',
    },
    {
      _type: 'galleryImage',
      _key: 'dual-tone-wood-steel',
      src: `${BASE}/Dual-Tone%20Wood%20%26%20Steel%20Home%20Elevator%20Cabin.png`,
      alt: 'Dual-tone wood and steel home elevator cabin interior',
    },
    {
      _type: 'galleryImage',
      _key: 'stainless-steel',
      src: `${BASE}/Stainless%20Steel%20Home%20Elevator%20Cabin.png`,
      alt: 'Stainless steel home elevator cabin interior',
    },
    {
      _type: 'galleryImage',
      _key: 'wood-grain-panel',
      src: `${BASE}/Wood-Grain%20Panel%20Home%20Elevator%20Cabin.png`,
      alt: 'Wood-grain panel home elevator cabin interior',
    },
    {
      _type: 'galleryImage',
      _key: 'luxury-gold-handrail',
      src: `${BASE}/Luxury%20Gold%20Stainless%20Steel%20Elevator%20Interior%20with%20Handrail.png`,
      alt: 'Luxury gold stainless steel home elevator interior with handrail',
    },
    {
      _type: 'galleryImage',
      _key: 'luxury-gold-1',
      src: `${BASE}/Luxury%20Passenger%20Elevator%20(gold).png`,
      alt: 'Gold-finish home elevator cabin interior',
    },
    {
      _type: 'galleryImage',
      _key: 'luxury-gold-2',
      src: `${BASE}/Luxury%20Passenger%20Elevator%20(gold)2.png`,
      alt: 'Gold-finish home elevator cabin interior, alternate view',
    },
    {
      _type: 'galleryImage',
      _key: 'panoramic-glass',
      src: `${BASE}/Panoramic%20Glass%20Observation%20Elevator.png`,
      alt: 'Panoramic glass home observation elevator',
    },
    {
      _type: 'galleryImage',
      _key: 'round-panoramic',
      src: `${BASE}/Round%20Panoramic%20Observation%20Elevator.jpg`,
      alt: 'Round panoramic glass home observation elevator',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'general-traction',
      title: 'General Traction / Machine-Room-Less (MRL)',
      items: [
        { _type: 'spec', _key: 'gt-load', label: 'Load Capacity', value: '250–400 kg' },
        { _type: 'spec', _key: 'gt-speed', label: 'Speed', value: '0.4 m/sec – 1.00 m/sec' },
      ],
    },
    {
      _type: 'specGroup',
      _key: 'platform',
      title: 'Platform Home Elevator',
      items: [
        { _type: 'spec', _key: 'pl-type', label: 'Type', value: 'Machine-Room-Less (MRL)' },
        { _type: 'spec', _key: 'pl-load', label: 'Load Capacity', value: '250–400 kg' },
        { _type: 'spec', _key: 'pl-speed', label: 'Speed', value: '0.15 m/sec' },
        { _type: 'spec', _key: 'pl-structure', label: 'Structure', value: 'Aluminum' },
      ],
    },
    {
      _type: 'specGroup',
      _key: 'aluminum-structure',
      title: 'Aluminum Structure Home Elevator',
      items: [
        { _type: 'spec', _key: 'as-type', label: 'Type', value: 'Machine-Room-Less (MRL)' },
        { _type: 'spec', _key: 'as-load', label: 'Load Capacity', value: '250–400 kg' },
        { _type: 'spec', _key: 'as-speed', label: 'Speed', value: '0.15m/sec-0.4m/sec' },
        { _type: 'spec', _key: 'as-structure', label: 'Structure', value: 'Aluminum' },
        { _type: 'spec', _key: 'as-standard-colors', label: 'Standard Colors', value: 'Black / White / Champagne Gold' },
        { _type: 'spec', _key: 'as-custom-colors', label: 'Custom Colors', value: 'Available upon request' },
      ],
    },
  ],
  technicalDrawings: [],
  order: 2,
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
    `*[_type == "product" && slug.current == "home-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Home Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Home Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
