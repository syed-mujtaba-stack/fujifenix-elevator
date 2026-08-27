#!/usr/bin/env node
/**
 * One-off patch: update the Aluminum Structure Home Elevator Load Capacity
 * to 250–400 kg in the Home Elevators product.
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

const slug = 'home-elevators'

const product = await client.fetch(
  `*[_type == "product" && slug.current == $slug][0] { _id }`,
  { slug }
)
if (!product) {
  console.error('✖ Home Elevators product not found')
  process.exit(1)
}

await client
  .patch(product._id)
  .set({
    'specGroups[_key=="aluminum-structure"].items[_key=="as-load"].value': '250–400 kg',
    'specGroups[_key=="aluminum-structure"].items[_key=="as-speed"].value': '0.15m/sec-0.4m/sec',
  })
  .commit()

console.log('+ Updated Aluminum Structure Load Capacity -> 250–400 kg')
console.log('+ Updated Aluminum Structure Speed -> 0.15m/sec-0.4m/sec')
