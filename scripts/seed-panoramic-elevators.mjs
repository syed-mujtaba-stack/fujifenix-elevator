#!/usr/bin/env node
/**
 * Seeds the Panoramic / Observation Elevators product (Product #4 under Elevators).
 * Reuses the SAME architecture as Passenger / Home / High-Speed products.
 * Local static assets in public/Elevators/Panoramic Elevator/ stored as URL paths.
 *
 * NOTE: folder filenames use an EN-DASH (–, U+2013) separator, encoded as %E2%80%93,
 *       and one filename contains "&" encoded as %26.
 *
 * Usage:
 *   node scripts/seed-panoramic-elevators.mjs
 *   node scripts/seed-panoramic-elevators.mjs --dry-run
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

const BASE = '/Elevators/Panoramic Elevator'
const IMG = (name) => `${BASE}/${name}`

const PRODUCT_DOC = {
  _type: 'product',
  _id: 'panoramic-observation-elevators',
  title: 'Panoramic / Observation Elevators',
  slug: { _type: 'slug', current: 'panoramic-observation-elevators' },
  category: { _type: 'reference', _ref: 'elevators-category' },
  description:
    'Fuji Fenix Panoramic Elevator combines modern elevator technology with elegant glass design, creating a bright, open, and visually appealing passenger experience. Suitable for residential, commercial, hospitality, and public buildings. Designed to complement contemporary architecture with flexible configurations, premium finishes, and customizable design options.',
  features: [
    '1-Side',
    '2-Side',
    '3-Side',
    'Semi-Circular',
    'General Traction / MRL',
    'Glass Cabin Design',
  ],
  image: null,
  gallery: [
    {
      _type: 'galleryImage',
      _key: 'pano-glass',
      src: IMG('panoramic%20glass%20elevator.jpg'),
      alt: 'Fuji Fenix panoramic glass elevator',
    },
    {
      _type: 'galleryImage',
      _key: 'pano-minimalist',
      src: IMG('Panoramic%20Elevator%20%E2%80%93%20Minimalist%20Steel%20%26%20Glass%20Design.png'),
      alt: 'Panoramic elevator with minimalist steel and glass design',
    },
    {
      _type: 'galleryImage',
      _key: 'pano-ring-led',
      src: IMG('Panoramic%20Elevator%20%E2%80%93%20Ring%20LED%20Ceiling%20Design.png'),
      alt: 'Panoramic elevator with ring LED ceiling design',
    },
    {
      _type: 'galleryImage',
      _key: 'pano-steel-frame',
      src: IMG('Panoramic%20Elevator%20%E2%80%93%20Steel%20Frame%20with%20Glass%20Panel%20Cabin.png'),
      alt: 'Panoramic elevator with steel frame and glass panel cabin',
    },
    {
      _type: 'galleryImage',
      _key: 'pano-round-curved',
      src: IMG('Round%20Panoramic%20Elevator%20%E2%80%93%20Curved%20Glass%20Design.png'),
      alt: 'Round panoramic elevator with curved glass design',
    },
    {
      _type: 'galleryImage',
      _key: 'pano-round-silver',
      src: IMG('Round%20Panoramic%20Elevator%20%E2%80%93%20Silver%20Curved%20Casing.png'),
      alt: 'Round panoramic elevator with silver curved casing',
    },
    {
      _type: 'galleryImage',
      _key: 'pano-aluminum',
      src: IMG('Aluminum%20Structure%20Elevator.png'),
      alt: 'Aluminum structure elevator',
    },
  ],
  specGroups: [
    {
      _type: 'specGroup',
      _key: 'general-traction-mrl',
      title: 'General Traction / Machine-Room-Less (MRL)',
      items: [
        { _type: 'spec', _key: 'pano-type', label: 'Type', value: 'General Traction/Machine-Room-Less (MRL)' },
        { _type: 'spec', _key: 'pano-load', label: 'Load Capacity', value: '630KG–1600 KG' },
        { _type: 'spec', _key: 'pano-speed', label: 'Speed', value: '1.00m/sec-1.75m/sec' },
      ],
    },
  ],
  technicalDrawings: [],
  order: 4,
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
    `*[_type == "product" && slug.current == "panoramic-observation-elevators"][0] { _id }`
  )
  if (existingProduct) {
    console.log(`• Product "Panoramic / Observation Elevators" already exists (${existingProduct._id}) — skipped`)
    return
  }

  const product = await client.create({
    ...PRODUCT_DOC,
    category: { _type: 'reference', _ref: categoryId },
  })
  console.log(`+ Product "Panoramic / Observation Elevators" created (${product._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
