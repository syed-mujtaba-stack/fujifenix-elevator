#!/usr/bin/env node
/**
 * Seeds the Moving Walks product (Product #8 under the Elevators category).
 *
 * Uses the EXACT same architecture as the Escalator seed:
 *   - Local static assets (public/Elevators/Moving Walk/...) stored as URL paths.
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Moving Walks) — NOT merged with Escalator.
 *
 * Usage:
 *   node scripts/seed-moving-walks.mjs            # seed (idempotent)
 *   node scripts/seed-moving-walks.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Moving%20Walk'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'moving-walks',
  title: 'Moving Walks',
  slug: { _type: 'slug', current: 'moving-walks' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Advanced Technology. Smooth Start. Quiet Operation. FUJI FENIX Moving Walks provide safe, smooth, and reliable horizontal transportation for shopping malls, airports, commercial buildings, and public facilities. They are designed for efficient passenger flow and comfortably accommodate passengers with shopping carts and trolleys.',
  features: [
    'Smooth & Quiet Operation — Stable and low-noise performance.',
    'Reliable Construction — Durable components for long service life.',
    'Energy-Efficient Drive — Optional VVVF control for optimized energy consumption.',
    'Advanced Safety Control — Continuous monitoring for safe operation.',
    'Premium Finish — Durable stainless-steel decks, skirts, and panels.',
    'Passenger Comfort — Smooth start and controlled movement.',
    'Indoor & Outdoor Applications — Designed for a wide range of architectural environments.',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'moving-walk-1',
      src: `${BASE}/Moving%20Walk1.png`,
      alt: 'Fuji Fenix moving walk installed in a commercial environment',
    },
    {
      _type: 'galleryImage',
      _key: 'moving-walk-2',
      src: `${BASE}/Moving%20Walk2.png`,
      alt: 'Fuji Fenix moving walk with stainless-steel deck and balustrade',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'moving-walks-specs',
      title: 'Moving Walks — Technical Specifications',
      items: [
        { _type: 'spec', _key: 'standard', label: 'Standard', value: 'Standard' },
        { _type: 'spec', _key: 'step-width', label: 'Step Width', value: '800 / 1000 / 1200 / 1400 mm' },
        { _type: 'spec', _key: 'capacity', label: 'Capacity', value: '4,500 / 6,750 / 9,000 persons/hour' },
        { _type: 'spec', _key: 'speed', label: 'Speed', value: '0.5 m/s' },
        { _type: 'spec', _key: 'inclination', label: 'Inclination Angle', value: '0°–6° / 10° / 11° / 12°' },
        { _type: 'spec', _key: 'power-supply', label: 'Power Supply', value: 'AC 3-Phase, 50 / 60 Hz' },
        { _type: 'spec', _key: 'lighting-supply', label: 'Lighting Supply', value: 'AC Single-Phase, 50 / 60 Hz' },
      ],
    },
  ],
  technicalDrawings: [],
  designedFor: [
    'Shopping Malls',
    'Airports',
    'Commercial Buildings',
    'Public Facilities',
  ],
  imageDisclaimer: 'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: 'Configured according to project requirements, building layout, capacity, and applicable standards.',
  order: 8,
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
    `*[_type == "product" && slug.current == "moving-walks"][0] { _id }`
  )
  if (existingProduct) {
    await client.patch(existingProduct._id).set({ configurationNote: PRODUCT_DOC.configurationNote }).commit()
    console.log(`• Product "Moving Walks" updated (${existingProduct._id}) — configurationNote patched`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Moving Walks" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
