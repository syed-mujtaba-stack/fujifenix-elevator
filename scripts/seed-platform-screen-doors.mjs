#!/usr/bin/env node
/**
 * Seeds the Platform Screen Doors product (under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products:
 *   - Local static asset (public/Elevators/Platform screen Doors/PLATFORM SCREEN DOORS.png)
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Platform Screen Doors) — NOT merged with any other product.
 *
 * Content is taken verbatim from PLATFORM SCREEN DOORS.docx. No technical
 * specifications are invented; the client document does not provide them.
 *
 * Usage:
 *   node scripts/seed-platform-screen-doors.mjs            # seed (idempotent)
 *   node scripts/seed-platform-screen-doors.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Platform%20screen%20Doors'

const TAGLINE_HERO = 'Safer Platforms. Smarter Transportation.'
const TAGLINE_CLOSING = 'FUJI FENIX Platform Screen Doors — Safer Platforms. Smarter Transportation.'
const OVERVIEW =
  'FUJI FENIX Platform Screen Door (PSD) systems are designed to enhance passenger safety, operational reliability, and platform comfort in subway, metro, and light rail systems.\n\nPSD systems are installed between the platform and track area, creating a secure barrier using fixed screen panels and automatically operated sliding doors. The doors synchronize with train doors through the signaling/control system, opening and closing when the train reaches the designated stopping position.\n\nFUJI FENIX PSD systems help reduce train-induced wind, dust, debris, and noise while improving platform environmental control and energy efficiency.'

const KEY_FEATURES = [
  'Enhanced passenger safety',
  'Automatic synchronization with train doors',
  'Reduced platform-to-track access',
  'Reduced wind, dust, debris, and noise',
  'Improved heating and cooling efficiency',
  'Reliable and precise door operation',
  'Suitable for metro, subway, and light rail applications',
]

const APPLICATIONS = [
  'Metro Stations',
  'Subway Systems',
  'Light Rail Transit',
  'Urban Rail Networks',
]

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'platform-screen-doors',
  title: 'Platform Screen Doors',
  slug: { _type: 'slug', current: 'platform-screen-doors' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description: `${TAGLINE_HERO}\n\n${OVERVIEW}`,
  features: null,
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'psd-main',
      src: `${BASE}/PLATFORM%20SCREEN%20DOORS.png`,
      alt: 'Fuji Fenix Platform Screen Doors at metro station',
    },
  ],
  specGroups: [],
  technicalDrawings: [],
  designedFor: null,
  keyFeatures: KEY_FEATURES,
  applications: APPLICATIONS,
  capacities: null,
  design: null,
  operation: null,
  tagline: TAGLINE_CLOSING,
  disclaimer: null,
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote:
    'Configuration, and specifications may vary according to project requirements and selected design.',
  order: 15,
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
    `*[_type == "product" && slug.current == "platform-screen-doors"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Platform Screen Doors" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Platform Screen Doors" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
