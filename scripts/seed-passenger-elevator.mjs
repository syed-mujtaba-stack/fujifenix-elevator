#!/usr/bin/env node
/**
 * Seeds the new catalog:
 *   Category: Elevators
 *   Product:  Passenger Elevator Cabin (gallery, specifications, technical drawings)
 *
 * Product images/blueprints are LOCAL static assets (public/Elevators/...) —
 * stored as URL paths, not duplicated into Sanity assets.
 *
 * Usage:
 *   node scripts/seed-passenger-elevator.mjs            # seed (idempotent)
 *   node scripts/seed-passenger-elevator.mjs --dry-run  # print docs only
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

const BASE = '/Elevators/Passenger%20Elevator%20Cabin'

const CATEGORY_DOC = {
  _type: 'category',
  title: 'Elevators',
  slug: { _type: 'slug', current: 'elevators' },
  group: 'elevators',
  description:
    'Complete elevator systems engineered by Fuji Fenix for residential, commercial, and infrastructure projects.',
  order: 1,
}

const PRODUCT_DOC = {
  _type: 'product',
  title: 'Passenger Elevator Cabin',
  slug: { _type: 'slug', current: 'passenger-elevator-cabin' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'The Fuji Fenix Passenger Elevator Cabin combines precision engineering with refined interior finishes. Available in General Traction (Machine Room) and Machine-Room-Less (MRL) configurations, with etched stainless steel, mirror, and premium golden cabin finish options for residential, commercial, and public buildings.',
  features: [
    'General Traction — Machine Room Type',
    'Machine-Room-Less (MRL) Type',
    'Load Range 450–2000 KG',
    'Speed Range 1.00–1.75 M/sec',
    'Multiple Cabin Finish Options',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'pattern-etched',
      src: `${BASE}/Passenger%20Elevator%20Cabin%20(Pattern%20Etched%20Stainless%20Steel%20%26%20Center%20Mirror%20Finish).png`,
      alt: 'Passenger elevator cabin with pattern etched stainless steel panels and center mirror finish',
    },
    {
      _type: 'galleryImage',
      _key: 'mirror-strip',
      src: `${BASE}/Passenger%20Elevator%20Cabin%20(Mirror%20Strip%20%26%20Matte,%20Etched%20Stainless%20Steel%20Finish).png`,
      alt: 'Passenger elevator cabin with mirror strip and matte etched stainless steel finish',
    },
    {
      _type: 'galleryImage',
      _key: 'vertical-striped',
      src: `${BASE}/Passenger%20Elevator%20Cabin%20(Vertical%20Striped,%20Etched%20Stainless%20Steel%20Cabin).png`,
      alt: 'Passenger elevator cabin with vertical striped etched stainless steel walls and warm LED ceiling',
    },
    {
      _type: 'galleryImage',
      _key: 'hero',
      src: `${BASE}/Passenger%20Elevator%20Cabin.png`,
      alt: 'Fuji Fenix passenger elevator cabin with brushed stainless steel walls, dual LED ceiling panels, and marble floor',
    },
    {
      _type: 'galleryImage',
      _key: 'grid-ceiling',
      src: `${BASE}/Passenger%20Elevator%20Cabin%20(Mirror%20%26%20Stainless%20Steel%20Finish%20with%20Grid%20Ceiling).png`,
      alt: 'Passenger elevator cabin with mirror and stainless steel finish and grid LED ceiling',
    },
    {
      _type: 'galleryImage',
      _key: 'luxury-golden',
      src: `${BASE}/Luxury%20Golden%20Passenger%20Elevator%20Cabin%20(Golden%20Mirror%20Etched%20Stainless%20Steel).png`,
      alt: 'Luxury golden passenger elevator cabin with golden mirror etched stainless steel finish and ornate ceiling',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'machine-room',
      title: 'General Traction — Machine Room Type',
      items: [
        { _type: 'spec', _key: 'mr-load', label: 'Load', value: '450–2000 KG' },
        { _type: 'spec', _key: 'mr-speed', label: 'Speed', value: '1.00–1.75 M/sec' },
      ],
    },
    {
      _type: 'specGroup',
      _key: 'mrl',
      title: 'Machine-Room-Less (MRL) Type',
      items: [
        { _type: 'spec', _key: 'mrl-load', label: 'Load', value: '450–2000 KG' },
        { _type: 'spec', _key: 'mrl-speed', label: 'Speed', value: '1.00–1.75 M/sec' },
      ],
    },
  ],
  technicalDrawings: [
    {
      _type: 'drawing',
      _key: 'machine-room',
      title: 'Machine Room Type',
      drawingGroup: 'machine-room',
      src: `${BASE}/blueprints/Machine%20Room%20Type.png`,
    },
    {
      _type: 'drawing',
      _key: 'mrl',
      title: 'Machine-Room-Less (MRL) Type',
      drawingGroup: 'mrl',
      src: `${BASE}/blueprints/Machine-Room-Less%20(MRL)%20Type.png`,
    },
    {
      _type: 'drawing',
      _key: 'hall-door',
      title: "Hall Door & Concrete Structure",
      drawingGroup: 'general',
      src: `${BASE}/blueprints/Hall%20door%20and%20con'c%20structure%20open.png`,
    },
  ],
  order: 1,
}

async function main() {
  console.log(`Sanity: ${projectId} / ${dataset}`)
  if (DRY_RUN) {
    console.log('Mode: dry-run (no writes)')
    console.log(JSON.stringify({ CATEGORY_DOC, PRODUCT_DOC }, null, 2))
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
    const created = await client.create({ ...CATEGORY_DOC, _id: 'elevators-category' })
    categoryId = created._id
    console.log(`+ Category "Elevators" created (${categoryId})`)
  }

  const existingProduct = await client.fetch(
    `*[_type == "product" && slug.current == "passenger-elevator-cabin"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Passenger Elevator Cabin" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Passenger Elevator Cabin" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
