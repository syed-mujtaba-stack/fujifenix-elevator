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
  const product = await client.fetch(
    `*[_type == "product" && slug.current == "home-elevators"][0] { _id }`
  )
  if (!product) {
    console.error('Product not found')
    return
  }

  await client.patch(product._id).set({
    description: 'Fuji Fenix Home Elevators deliver quiet, space-efficient vertical mobility for private residences and villas. Available in General Traction / Machine-Room-Less (MRL) configurations, with dedicated Platform and Aluminum Structure variants, they pair refined cabin finishes with dependable residential performance. Actual product colors may vary slightly due to lighting, photography, material finish, and screen settings.',
    features: [
      'General Traction / Machine-Room-Less (MRL)',
      'Platform Home Elevator',
      'Aluminum Structure Home Elevator',
      'Residential & Villa Use',
    ],
  }).commit()

  console.log('Patched: description + features updated')
}

main().catch(console.error)
