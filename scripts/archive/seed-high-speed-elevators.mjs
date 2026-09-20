#!/usr/bin/env node
/**
 * Seeds the High-Speed Elevators product (Product #3 under the Elevators category).
 * Reuses the SAME architecture as Passenger + Home Elevators:
 *   - Local static assets (public/Elevators/high-speed-elevator/...) stored as URL paths.
 *   - image: null; gallery[0] is the hero/card image.
 *
 * Usage:
 *   node scripts/seed-high-speed-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-high-speed-elevators.mjs --dry-run # print docs only
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

const BASE = '/Elevators/high-speed-elevator'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'high-speed-elevators',
  title: 'High-Speed Elevators',
  slug: { _type: 'slug', current: 'high-speed-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Fuji Fenix High-Speed Elevator combines advanced gearless traction technology, precision control, and optimized electromagnetic design to deliver smooth, efficient, quiet, and comfortable vertical transportation for high-rise buildings. Engineered with high-performance magnetic steel materials and an optimized drive system, the elevator provides reliable operation, accurate leveling, and excellent ride comfort. Its compact machine-room configuration also supports efficient use of building space, making it a practical solution where speed, performance, comfort, energy efficiency, and space optimization are essential.',
  features: [
    'Gearless Traction Technology',
    'Advanced Electromagnetic Design',
    'High-Performance Magnetic Steel',
    'High-Precision Control System',
    'High Energy Efficiency',
    'Low-Noise Operation',
    'Compact Machine-Room Configuration',
    'Smooth & Comfortable Ride',
    'Eco-Conscious Engineering',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'car',
      src: `${BASE}/High-Speed%20Elevator%20Car%20(Aerodynamic%20Cabin%20Design).png`,
      alt: 'Fuji Fenix high-speed elevator car with aerodynamic cabin design',
    },
    {
      _type: 'galleryImage',
      _key: 'gearless-machine',
      src: `${BASE}/Gearless%20Traction%20Machine%20for%20High-Speed%20Elevator.png`,
      alt: 'Gearless traction machine for high-speed elevator',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'general-traction',
      title: 'General Traction',
      items: [
        { _type: 'spec', _key: 'hs-type', label: 'Type', value: 'General Traction' },
        { _type: 'spec', _key: 'hs-load', label: 'Load Capacity', value: '1000KG–2000 KG' },
        { _type: 'spec', _key: 'hs-speed', label: 'Speed', value: '3.00m/sec-10.00m/sec' },
      ],
    },
  ],
  technicalDrawings: [],
  order: 3,
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
    `*[_type == "product" && slug.current == "high-speed-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "High-Speed Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "High-Speed Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
