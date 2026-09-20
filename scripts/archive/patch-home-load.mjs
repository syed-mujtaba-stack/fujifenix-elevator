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
    `*[_type == "product" && slug.current == "home-elevators"][0] {_id, specGroups}`
  )
  if (!product) { console.error('Not found'); return }

  const updated = product.specGroups.map(g => {
    if (g._key === 'aluminum-structure') {
      return {
        ...g,
        items: g.items.map(i =>
          i._key === 'as-load' ? { ...i, value: '250–400 kg' } : i
        )
      }
    }
    return g
  })

  await client.patch(product._id).set({ specGroups: updated }).commit()
  console.log('Patched: Aluminum Structure Load Capacity → 250–400 kg')
}

main().catch(console.error)
