#!/usr/bin/env node
/**
 * Seeds the Freight Elevators product (next product under the Elevators category).
 *
 * Reuses the EXACT same architecture as the other elevator products:
 *   - Product images are LOCAL static assets (public/Elevators/...) stored as
 *     URL paths, not duplicated into Sanity assets.
 *   - `image` is null; gallery[0] is used as the hero/card image by the
 *     product detail + listing components.
 *   - The three client-specified types (General Traction Freight,
 *     MRL Freight, Hydraulic Freight) are modeled as three specGroups,
 *     NOT as separate top-level products.
 *   - Client disclaimer + image disclaimer are preserved via the dedicated
 *     `disclaimer` / `imageDisclaimer` fields (rendered conditionally).
 *
 * NOTE: the on-disk asset folder is named "Flight Elevators" (legacy spelling)
 * while the client-facing product name is "Freight Elevators". The local image
 * paths below point at the real folder; the Sanity title/slug use "Freight".
 *
 * Usage:
 *   node scripts/seed-freight-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-freight-elevators.mjs --dry-run # print docs only
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

// On-disk folder is "Flight Elevators" (legacy spelling); assets live there.
const BASE = '/Elevators/Flight%20Elevators'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'freight-elevators',
  title: 'Freight Elevators',
  slug: { _type: 'slug', current: 'freight-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Fuji Fenix Freight Elevators are engineered for reliable, heavy-duty vertical transport of goods and cargo across industrial, commercial, and warehouse environments. Available in General Traction, Machine-Room-Less (MRL), and Hydraulic configurations, they combine robust cabin construction with dependable performance for demanding duty cycles.',
  features: [
    'General Traction Freight',
    'Machine-Room-Less (MRL) Freight',
    'Hydraulic Freight',
    'Industrial & Cargo Use',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'freight-main',
      src: `${BASE}/flight%203.jpeg`,
      alt: 'Fuji Fenix freight elevator for heavy-duty cargo transport',
    },
    {
      _type: 'galleryImage',
      _key: 'freight-install',
      src: `${BASE}/flight%20elevator%20image%201.jpeg`,
      alt: 'Fuji Fenix freight elevator installed in an industrial setting',
    },
    {
      _type: 'galleryImage',
      _key: 'freight-cabin',
      src: `${BASE}/flight%20elevator%20image%202.jpeg`,
      alt: 'Fuji Fenix freight elevator cabin for goods handling',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'general-traction-freight',
      title: 'General Traction Freight Elevator',
      items: [
        { _type: 'spec', _key: 'gtf-load', label: 'Load Capacity', value: '1,000–10,000 kg' },
        { _type: 'spec', _key: 'gtf-speed', label: 'Speed', value: '0.50–1.00 m/s' },
      ],
    },
    {
      _type: 'specGroup',
      _key: 'mrl-freight',
      title: 'Machine-Room-Less (MRL) Freight Elevator',
      items: [
        { _type: 'spec', _key: 'mf-load', label: 'Load Capacity', value: '1,000–5,000 kg' },
        { _type: 'spec', _key: 'mf-speed', label: 'Speed', value: '0.50–1.00 m/s' },
      ],
    },
    {
      _type: 'specGroup',
      _key: 'hydraulic-freight',
      title: 'Hydraulic Freight Elevator',
      items: [
        { _type: 'spec', _key: 'hf-load', label: 'Load Capacity', value: '1,000–5,000 kg' },
        { _type: 'spec', _key: 'hf-speed', label: 'Speed', value: '0.33–0.40 m/s' },
      ],
    },
  ],
  technicalDrawings: [],
  disclaimer: 'The above specifications may vary according to project requirements.',
  imageDisclaimer: 'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  order: 5,
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
    `*[_type == "product" && slug.current == "freight-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Freight Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Freight Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
