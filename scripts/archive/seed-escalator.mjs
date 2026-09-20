#!/usr/bin/env node
/**
 * Seeds the Escalator product (Product #7 under the Elevators category).
 *
 * Usage:
 *   node scripts/seed-escalator.mjs            # seed (idempotent)
 *   node scripts/seed-escalator.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Escalators'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'escalator',
  title: 'Escalator',
  slug: { _type: 'slug', current: 'escalator' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Fuji Fenix Escalators are designed to provide smooth, safe, and efficient passenger movement across commercial, industrial, public, and transportation facilities. They are engineered for continuous operation and passenger comfort and can be configured to suit a wide range of architectural and project requirements.',
  features: [
    'High-efficiency drive system',
    'VVVF variable-speed control',
    'Automatic start/stop operation',
    'Energy-saving motor control',
    'Durable step and handrail systems',
    'Low-maintenance step-chain options',
    'Smooth and comfortable passenger movement',
    'Energy-efficient operation',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'escalator-mall',
      src: '/escalator.jpg',
      alt: 'Fuji Fenix escalator installed in a modern shopping mall',
    },
    {
      _type: 'galleryImage',
      _key: 'escalator-tunnel',
      src: `${BASE}/Escalator%201.png`,
      alt: 'Escalator with safe, comfortable, beautiful, and quiet operation',
    },
    {
      _type: 'galleryImage',
      _key: 'escalator-outdoor',
      src: `${BASE}/Escalator%202.png`,
      alt: 'Energy-saving outdoor escalator in a natural setting',
    },
    {
      _type: 'galleryImage',
      _key: 'escalator-lighting',
      src: `${BASE}/Escalator%203.png`,
      alt: 'Commercial escalator handrail lighting system with color options',
    },
    {
      _type: 'galleryImage',
      _key: 'escalator-features',
      src: `${BASE}/Escalator%204.png`,
      alt: 'Escalator lighting features including step, comb, and skirt panel lighting',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'escalator-specs',
      title: 'Escalator — Technical Specifications',
      items: [
        { _type: 'spec', _key: 'step-width', label: 'Step Width', value: '600 / 800 / 1000 mm' },
        { _type: 'spec', _key: 'passenger-capacity', label: 'Passenger Capacity', value: '4,500 / 6,750 / 9,000 persons/hour' },
        { _type: 'spec', _key: 'rated-speed', label: 'Rated Speed', value: '0.50 m/s' },
        { _type: 'spec', _key: 'inclination', label: 'Inclination', value: '30° / 35°' },
        { _type: 'spec', _key: 'max-rise', label: 'Maximum Rise', value: '16 m at 30° / 6 m at 35°' },
        { _type: 'spec', _key: 'power-supply', label: 'Power Supply', value: 'AC 3-Phase, 50/60 Hz' },
        { _type: 'spec', _key: 'lighting-supply', label: 'Lighting Supply', value: 'AC Single-Phase, 50/60 Hz' },
        { _type: 'spec', _key: 'environment', label: 'Environment', value: 'Indoor / Outdoor' },
      ],
    },
  ],
  technicalDrawings: [],
  designedFor: [
    'Shopping Malls',
    'Commercial Buildings',
    'Airports',
    'Metro & Railway Stations',
    'Hotels',
    'Public Facilities',
    'Transportation Hubs',
  ],
  disclaimer: 'Actual specifications, configurations, features, and available options may vary according to project requirements and selected product configuration.',
  imageDisclaimer: 'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: 'Configured according to project requirements, building layout, capacity, and applicable standards.',
  order: 7,
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
    `*[_type == "product" && slug.current == "escalator"][0] { _id }`
  )
  if (existingProduct) {
    await client.patch(existingProduct._id).set({ configurationNote: PRODUCT_DOC.configurationNote }).commit()
    console.log(`• Product "Escalator" updated (${existingProduct._id}) — configurationNote patched`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Escalator" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
