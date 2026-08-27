#!/usr/bin/env node
/**
 * One-off patch: update Passenger Elevator Cabin specGroups to the two
 * client-provided configurations (General Traction — Machine Room, MRL),
 * each with Type / Load Capacity / Speed.
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

const slug = 'passenger-elevator-cabin'

const specGroups = [
  {
    _type: 'specGroup',
    _key: 'machine-room',
    title: 'General Traction — Machine Room',
    items: [
      { _type: 'spec', _key: 'mr-type', label: 'Type', value: 'General Traction — Machine Room' },
      { _type: 'spec', _key: 'mr-load', label: 'Load Capacity', value: '450KG–2000 KG' },
      { _type: 'spec', _key: 'mr-speed', label: 'Speed', value: '1.00m/sec-2.50m/sec' },
    ],
  },
  {
    _type: 'specGroup',
    _key: 'mrl',
    title: 'Machine-Room-Less (MRL)',
    items: [
      { _type: 'spec', _key: 'mrl-type', label: 'Type', value: 'Machine-Room-Less (MRL)' },
      { _type: 'spec', _key: 'mrl-load', label: 'Load Capacity', value: '450KG–2000 KG' },
      { _type: 'spec', _key: 'mrl-speed', label: 'Speed', value: '1.00m/sec-2.50m/sec' },
    ],
  },
]

const product = await client.fetch(
  `*[_type == "product" && slug.current == $slug][0] { _id }`,
  { slug }
)
if (!product) {
  console.error('✖ Passenger Elevator Cabin product not found')
  process.exit(1)
}

await client.patch(product._id).set({ specGroups }).commit()
console.log(`+ Updated specGroups for ${product._id}`)

await client.patch(product._id).set({ title: 'Passenger Elevator' }).commit()
console.log(`+ Updated title for ${product._id}`)

const features = [
  'General Traction — Machine Room',
  'Machine-Room-Less (MRL)',
  'Load Range 450–2000 KG',
  'Speed Range 1.00–2.50 m/sec',
  'Multiple Cabin Finish Options',
]

await client.patch(product._id).set({ features }).commit()
console.log(`+ Updated features for ${product._id}`)
