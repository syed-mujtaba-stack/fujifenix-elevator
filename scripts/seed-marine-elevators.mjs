#!/usr/bin/env node
/**
 * Seeds the Marine Elevators product (Product #9 under the Elevators category).
 *
 * Uses the EXACT same architecture as the other seeded products:
 *   - Local static asset (public/Elevators/Marine Elevator/marine elevator1.jpg)
 *     stored as a URL path reference.
 *   - `image` is null; gallery[0] is used as the hero/card image.
 *   - A single top-level product (Marine Elevators) — NOT merged with any other product.
 *
 * Content is taken verbatim from MARINE ELEVATOR.docx. No technical values are
 * invented; the Hyundai Elevator landing-door wording is preserved as supplied.
 *
 * Usage:
 *   node scripts/seed-marine-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-marine-elevators.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Marine%20Elevator'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'marine-elevators',
  title: 'Marine Elevators',
  slug: { _type: 'slug', current: 'marine-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Marine Elevators from Fuji Fenix feature a traction machine driven by a squirrel cage induction motor, fire-tested landing doors, and an inverter (VVVF) drive with microprocessor control for marine applications.',
  features: [
    'Traction Machine — Squirrel cage induction motor with electromagnetic brake',
    'Fire-Tested Landing Doors — A-0 & A-60 divisions (SOLAS)',
    'Control — Inverter (VVVF) drive with microprocessor control',
    'Capacities — 360 to 1700 kg',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'marine-elevator-main',
      src: `${BASE}/marine%20elevator1.jpg`,
      alt: 'Fuji Fenix marine elevator',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'technical-specs',
      title: 'Technical Specifications',
      sectionImages: null,
      sectionDescription: null,
      items: [
        { _type: 'spec', _key: 'ts-speed', label: 'Speed (m/min.)', value: '30, 45, 60 & 96' },
        { _type: 'spec', _key: 'ts-capacity', label: 'Capacity (kg)', value: '360, 500, 800, 1000, 1200, 1500 & 1700' },
        { _type: 'spec', _key: 'ts-operation', label: 'Operation', value: 'Selective Collective Control (2BC)' },
        { _type: 'spec', _key: 'ts-door', label: 'Landing Door', value: 'Hinged Type: A-60 Class / Center Open Type: A-0 & A-60 Class' },
      ],
    },
  ],
  technicalDrawings: [],
  designedFor: null,
  disclaimer:
    'Actual load capacity, speed, dimensions, configuration, and specifications may vary according to project requirements and selected design.',
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  configurationNote: null,
  order: 9,
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
    `*[_type == "product" && slug.current == "marine-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Marine Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Marine Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
