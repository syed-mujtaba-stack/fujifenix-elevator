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
  const product = await client.fetch(`*[_type == "product" && slug.current == "escalator"][0] { _id, description }`)
  if (!product) { console.error('Not found'); return }
  console.log('Current description:', product.description?.slice(0, 200))

  const updated = product.description?.replace(/\bElevators\b/g, 'ESCALATORS')
  if (updated !== product.description) {
    await client.patch(product._id).set({ description: updated }).commit()
    console.log('Patched: Elevators → ESCALATORS')
  } else {
    console.log('No change needed')
  }
}

main().catch(console.error)
