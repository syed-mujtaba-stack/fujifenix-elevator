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

async function main() {
  const product = await client.fetch(`*[_type == "product" && slug.current == "home-elevators"][0] { _id, gallery }`)
  if (!product) { console.error('Not found'); return }

  const newImage = {
    _type: 'imageItem',
    _key: 'luxury-gold-3',
    src: '/Elevators/Home Elevators/Luxury Passenger Elevator (gold)3.png',
    alt: 'Luxury Passenger Elevator gold 3',
  }

  await client
    .patch(product._id)
    .setIfMissing({ gallery: [] })
    .append('gallery', [newImage])
    .commit()

  console.log('Added luxury-gold-3 to gallery')
}

main().catch(console.error)
