#!/usr/bin/env node
/**
 * Patch: Update Home Elevators product in Sanity with new section structure.
 * Adds sectionImage, sectionDescription to specGroups and updates spec values.
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
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-08-19',
  token: env.SANITY_TOKEN,
  useCdn: false,
})

const BASE = '/Elevators/Home%20Elevators'

const UPDATED_SPECGROUPS = [
  {
    _type: 'specGroup',
    _key: 'home-elevators',
    title: 'Home Elevators',
    sectionImages: [
      'dual-tone-wood-steel',
      'luxury-gold-handrail',
      'panoramic-glass',
      'round-panoramic',
      'stainless-steel',
      'wood-grain-panel',
    ],
    sectionDescription: 'Fuji Fenix Home Elevators deliver quiet, space-efficient vertical mobility for private residences and villas.',
    items: [
      { _type: 'spec', _key: 'he-type', label: 'Type', value: 'General Traction / Machine-Room-Less (MRL)' },
      { _type: 'spec', _key: 'he-load', label: 'Load Capacity', value: '250–400 kg' },
      { _type: 'spec', _key: 'he-speed', label: 'Speed', value: '0.4m/sec-1.00m/sec' },
    ],
  },
  {
    _type: 'specGroup',
    _key: 'platform',
    title: 'Platform Home Elevator',
    sectionImages: [
      'luxury-gold-1',
      'luxury-gold-2',
    ],
    sectionDescription: 'A compact platform-style home elevator with premium finish options.',
    items: [
      { _type: 'spec', _key: 'pl-type', label: 'Type', value: 'Machine-Room-Less (MRL)' },
      { _type: 'spec', _key: 'pl-load', label: 'Load Capacity', value: '250–400 kg' },
      { _type: 'spec', _key: 'pl-speed', label: 'Speed', value: '0.15m/sec.' },
      { _type: 'spec', _key: 'pl-structure', label: 'Structure', value: 'Aluminum' },
    ],
  },
  {
    _type: 'specGroup',
    _key: 'aluminum-structure',
    title: 'Aluminum Structure Home Elevator',
    sectionImages: [
      'aluminum-structure-1',
      'aluminum-structure-2',
    ],
    sectionDescription: 'Premium aluminum structure home elevator with customizable color options.',
    items: [
      { _type: 'spec', _key: 'as-type', label: 'Type', value: 'Machine-Room-Less (MRL)' },
      { _type: 'spec', _key: 'as-load', label: 'Load Capacity', value: '250–450 kg' },
      { _type: 'spec', _key: 'as-speed', label: 'Speed', value: '0.15–1.00 m/s' },
      { _type: 'spec', _key: 'as-structure', label: 'Structure', value: 'Aluminum' },
      { _type: 'spec', _key: 'as-standard-colors', label: 'Standard Colors', value: 'Black, White, Champagne Gold' },
      { _type: 'spec', _key: 'as-custom-colors', label: 'Custom Colors', value: 'Available upon request' },
    ],
  },
]

async function main() {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == "home-elevators"][0] { _id }`
  )
  if (!product) {
    console.error('Product "Home Elevators" not found')
    return
  }

  await client.patch(product._id).set({
    specGroups: UPDATED_SPECGROUPS,
    gallery: [
      { _type: 'galleryImage', _key: 'villa-wood-steel', src: `${BASE}/Villa%20Home%20Elevators%20(wood%20%26%20steel%20cabin).png`, alt: 'Fuji Fenix villa home elevator with wood and steel cabin finish' },
      { _type: 'galleryImage', _key: 'dual-tone-wood-steel', src: `${BASE}/Dual-Tone%20Wood%20%26%20Steel%20Home%20Elevator%20Cabin.png`, alt: 'Dual-tone wood and steel home elevator cabin interior' },
      { _type: 'galleryImage', _key: 'stainless-steel', src: `${BASE}/Stainless%20Steel%20Home%20Elevator%20Cabin.png`, alt: 'Stainless steel home elevator cabin interior' },
      { _type: 'galleryImage', _key: 'wood-grain-panel', src: `${BASE}/Wood-Grain%20Panel%20Home%20Elevator%20Cabin.png`, alt: 'Wood-grain panel home elevator cabin interior' },
      { _type: 'galleryImage', _key: 'luxury-gold-handrail', src: `${BASE}/Luxury%20Gold%20Stainless%20Steel%20Elevator%20Interior%20with%20Handrail.png`, alt: 'Luxury gold stainless steel home elevator interior with handrail' },
      { _type: 'galleryImage', _key: 'luxury-gold-1', src: `${BASE}/Luxury%20Passenger%20Elevator%20(gold).png`, alt: 'Gold-finish home elevator cabin interior' },
      { _type: 'galleryImage', _key: 'luxury-gold-2', src: `${BASE}/Luxury%20Passenger%20Elevator%20(gold)2.png`, alt: 'Gold-finish home elevator cabin interior, alternate view' },
      { _type: 'galleryImage', _key: 'panoramic-glass', src: `${BASE}/Panoramic%20Glass%20Observation%20Elevator.png`, alt: 'Panoramic glass home observation elevator' },
      { _type: 'galleryImage', _key: 'round-panoramic', src: `${BASE}/Round%20Panoramic%20Observation%20Elevator.jpg`, alt: 'Round panoramic glass home observation elevator' },
      { _type: 'galleryImage', _key: 'aluminum-structure-1', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator1.png`, alt: 'Aluminum structure home elevator cabin' },
      { _type: 'galleryImage', _key: 'aluminum-structure-2', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator2.png`, alt: 'Aluminum structure home elevator cabin interior' },
    ],
    description: 'Fuji Fenix Home Elevators deliver quiet, space-efficient vertical mobility for private residences and villas. Available in General Traction / Machine-Room-Less (MRL) configurations, with dedicated Platform and Aluminum Structure variants, they pair refined cabin finishes with dependable residential performance. Actual product colors may vary slightly due to lighting, photography, material finish, and screen settings.',
    features: [
      'General Traction / Machine-Room-Less (MRL)',
      'Platform Home Elevator',
      'Aluminum Structure Home Elevator',
      'Residential & Villa Use',
    ],
    disclaimer: 'Actual product colors may vary slightly due to lighting, photography, material finish, and screen settings.',
  }).commit()

  console.log(`Patched product ${product._id}: updated specGroups, description, features, disclaimer`)
}

main().catch((err) => { console.error(err); process.exit(1) })
