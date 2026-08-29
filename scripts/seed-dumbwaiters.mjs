#!/usr/bin/env node
/**
 * Seeds the Dumbwaiters product (Product #12 under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products:
 *   - Local static asset (public/Elevators/Dumb Waiter/dumb waiter1.png) as URL path.
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Dumbwaiters) — NOT merged with any other product.
 *
 * Content is taken verbatim from DUMB WAITER.docx:
 *   - Tagline, overview, available capacities (50/100/200 kg), applications,
 *     design characteristics, operation, configuration + image disclaimers, CTA.
 * No technical specifications are invented — the client document provides none
 * beyond the available capacities.
 *
 * Usage:
 *   node scripts/seed-dumbwaiters.mjs            # seed (idempotent)
 *   node scripts/seed-dumbwaiters.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Dumb%20Waiter'

const TAGLINE_HERO = 'Compact, Reliable & Efficient Vertical Transportation'
const TAGLINE_CLOSING = 'FUJI FENIX Dumbwaiter — Small Loads, Smart Vertical Transportation.'
const OVERVIEW =
  'The FUJI FENIX Dumbwaiter is a compact and reliable solution for the efficient transportation of food, documents, medicines, and small goods between floors. It is designed for restaurants, hotels, hospitals, offices, villas, and commercial buildings, providing smooth, safe, and convenient vertical movement of materials.'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'dumbwaiters',
  title: 'Dumbwaiters',
  slug: { _type: 'slug', current: 'dumbwaiters' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  // Hero tagline preserved at the top of the description, followed by the client overview.
  description: `${TAGLINE_HERO}\n\n${OVERVIEW}`,
  features: null,
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'dumbwaiter-main',
      src: `${BASE}/dumb%20waiter1.png`,
      alt: 'Fuji Fenix dumbwaiter',
    },
  ],
  // One section-based group for the Product Gallery image (drives the CTA).
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'product-gallery',
      title: 'Product Gallery',
      sectionImages: ['dumbwaiter-main'],
      sectionDescription: null,
      items: [],
    },
  ],
  technicalDrawings: [],
  designedFor: null,
  keyFeatures: null,
  applications: ['Food', 'Documents', 'Medicines', 'Small Goods'],
  capacities: ['50 kg', '100 kg', '200 kg'],
  design: ['Compact', 'Space-Saving', 'Reliable'],
  operation: 'Smooth & Efficient Vertical Transportation',
  tagline: TAGLINE_CLOSING,
  disclaimer:
    'Actual load capacity, speed, dimensions, configuration, and specifications may vary according to project requirements and selected design.',
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: null,
  order: 12,
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
    `*[_type == "product" && slug.current == "dumbwaiters"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Dumbwaiters" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Dumbwaiters" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
