#!/usr/bin/env node
/**
 * Seeds the Hospital Bed Elevators product (next product under the Elevators category).
 *
 * Reuses the EXACT same architecture as the other elevator products:
 *   - Product images are LOCAL static assets (public/Elevators/...) stored as
 *     URL paths, not duplicated into Sanity assets.
 *   - `image` is null; gallery[0] is used as the hero/card image by the
 *     product detail + listing components.
 *   - The client-specified type (General Traction / Machine-Room-Less (MRL))
 *     is modeled as a single specGroup.
 *   - `designedFor`, `configurationNote`, and `imageDisclaimer` carry the
 *     client-provided Designed-For list, configuration note, and image
 *     disclaimer (rendered conditionally; other products are unaffected).
 *
 * NOTE: the on-disk asset folder is named "Hospital bad elevator" (legacy
 * typo for "bed") while the client-facing product name is
 * "Hospital Bed Elevators". The local image path below points at the real
 * folder; the Sanity title/slug use "Hospital Bed".
 *
 * Asset analysis: only ONE image exists in the folder (hospital.png, a
 * landscape product photo ~822x687). No blueprints / technical drawings and
 * no additional gallery images were found — so technicalDrawings is empty
 * and the product gallery falls back to the single hero image only.
 *
 * Usage:
 *   node scripts/seed-hospital-bed-elevators.mjs            # seed (idempotent)
 *   node scripts/seed-hospital-bed-elevators.mjs --dry-run # print docs only
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

// On-disk folder is "Hospital bad elevator" (legacy typo); assets live there.
const BASE = '/Elevators/Hospital%20bad%20elevator'

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'hospital-bed-elevators',
  title: 'Hospital Bed Elevators',
  slug: { _type: 'slug', current: 'hospital-bed-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Fuji Fenix Hospital Bed Elevator is designed for the safe, smooth, and efficient vertical transportation of patients, hospital beds, medical equipment, and healthcare staff. With spacious cabins, reliable operation, and flexible configurations, it is suitable for hospitals, clinics, medical centers, and healthcare facilities.',
  features: [
    'General Traction / MRL',
    'Hospitals & Clinics',
    'Medical Centers',
    'Healthcare Facilities',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'hospital-main',
      src: `${BASE}/hospital.png`,
      alt: 'Fuji Fenix hospital bed elevator with spacious cabin for patients and medical equipment',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'general-traction-mrl',
      title: 'General Traction / Machine-Room-Less (MRL)',
      items: [
        { _type: 'spec', _key: 'hb-type', label: 'Type', value: 'General Traction / Machine-Room-Less (MRL)' },
        { _type: 'spec', _key: 'hb-load', label: 'Load Capacity', value: '1600 KG – 2000 KG' },
        { _type: 'spec', _key: 'hb-speed', label: 'Speed', value: '1.00 m/sec – 2.00 m/sec' },
      ],
    },
  ],
  technicalDrawings: [],
  disclaimer: null,
  imageDisclaimer:
    'Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.',
  designedFor: ['Patients', 'Hospital Beds', 'Medical Equipment', 'Healthcare Staff'],
  configurationNote:
    'Configured according to project requirements, building layout, capacity, and applicable standards.',
  order: 6,
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
    `*[_type == "product" && slug.current == "hospital-bed-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Hospital Bed Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Hospital Bed Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
