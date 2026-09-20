#!/usr/bin/env node
/**
 * Seeds the Circular Elevators product (Product #10 under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products:
 *   - Local static asset (public/Elevators/Circular Elevator/circular elevator1.png)
 *     stored as a URL path reference.
 *   - `image` is null; gallery[0] is used as the hero image.
 *   - A single top-level product (Circular Elevators) — NOT merged with any other product.
 *
 * Per CIRCULAR ELEVATOR.docx the client provides NO technical specifications and
 * NO product description, so none are invented. The page is image-focused:
 *   - Product Gallery section (the single actual Circular Elevator image)
 *   - Image disclaimer (verbatim from the client document)
 *   - Request Technical Specification CTA (verbatim client CTA)
 *
 * Usage:
 *   node scripts/seed-circular-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-circular-elevators.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Circular%20Elevator'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'circular-elevators',
  title: 'Circular Elevators',
  slug: { _type: 'slug', current: 'circular-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  // No description: the client document does not provide one. Do not invent.
  description: null,
  // No features: none supplied by the client. Do not invent.
  features: null,
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'circular-main',
      src: `${BASE}/circular%20elevator1.png`,
      alt: 'Fuji Fenix circular elevator',
    },
  ],
  // One section-based group for the Product Gallery image. No technical
  // specifications are provided, so no spec items are invented.
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'product-gallery',
      title: 'Product Gallery',
      sectionImages: ['circular-main'],
      sectionDescription: null,
      items: [],
    },
  ],
  technicalDrawings: [],
  designedFor: null,
  disclaimer: null,
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: null,
  order: 10,
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
    `*[_type == "product" && slug.current == "circular-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Circular Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Circular Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
