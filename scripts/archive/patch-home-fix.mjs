#!/usr/bin/env node
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

const UPDATED_SPECGROUPS = [
  {
    _type: 'specGroup',
    _key: 'home-elevators',
    title: 'Home Elevators',
    sectionImages: ['dual-tone-wood-steel','luxury-gold-handrail','panoramic-glass','round-panoramic','stainless-steel','wood-grain-panel'],
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
    sectionImages: ['luxury-gold-3','luxury-gold-2','luxury-gold-1'],
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
    sectionImages: ['aluminum-structure-1','aluminum-structure-2'],
    items: [
      { _type: 'spec', _key: 'as-type', label: 'Type', value: 'Machine-Room-Less (MRL)' },
      { _type: 'spec', _key: 'as-load', label: 'Load Capacity', value: '250–400 kg' },
      { _type: 'spec', _key: 'as-speed', label: 'Speed', value: '0.15–0.4m/sec' },
      { _type: 'spec', _key: 'as-structure', label: 'Structure', value: 'Aluminum' },
      { _type: 'spec', _key: 'as-standard-colors', label: 'Standard Colors', value: 'Black, White, Champagne Gold' },
      { _type: 'spec', _key: 'as-custom-colors', label: 'Custom Colors', value: 'Available upon request' },
    ],
  },
]

async function main() {
  const product = await client.fetch(`*[_type == "product" && slug.current == "home-elevators"][0] { _id }`)
  if (!product) { console.error('Not found'); return }
  await client.patch(product._id).set({ specGroups: UPDATED_SPECGROUPS }).commit()
  console.log('Done: Aluminum Speed → 0.15–0.4m/sec, Added luxury-gold-3')
}

main().catch(console.error)
