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

const BASE = '/Elevators/Home%20Elevators'

const ALUMINUM_GALLERY = [
  { _key: 'aluminum-structure-1', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator1.jpg?v=3`, alt: 'Aluminum structure home elevator cabin' },
  { _key: 'aluminum-structure-2', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator2.png?v=3`, alt: 'Aluminum structure home elevator cabin interior' },
  { _key: 'aluminum-structure-3', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator3.png?v=3`, alt: 'Aluminum structure home elevator cabin, view 3' },
  { _key: 'aluminum-structure-4', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator4.jpg?v=3`, alt: 'Aluminum structure home elevator cabin, view 4' },
  { _key: 'aluminum-structure-5', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator5.jpg?v=3`, alt: 'Aluminum structure home elevator cabin, view 5' },
  { _key: 'aluminum-structure-6', src: `${BASE}/Aluminum%20Structure%20Home%20Elevator6.jpg?v=3`, alt: 'Aluminum structure home elevator cabin, view 6' },
]

async function main() {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == "home-elevators"][0] { _id, gallery }`
  )
  if (!product) { console.error('Not found'); return }

  const existing = product.gallery ?? []
  const kept = existing.filter((g) => !g._key.startsWith('aluminum-structure-'))
  const gallery = [...kept, ...ALUMINUM_GALLERY]

  await client.patch(product._id).set({ gallery }).commit()
  console.log('Done: Aluminum Structure gallery sources cache-busted with ?v=3')
}

main().catch(console.error)
