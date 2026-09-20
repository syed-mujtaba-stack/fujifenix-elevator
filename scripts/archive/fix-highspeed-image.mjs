#!/usr/bin/env node
/**
 * Patch: fix High-Speed Aerodynamic Cabin image path (.jpg → .png) in Sanity.
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

async function main() {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == "high-speed-elevators"][0] {_id, gallery}`
  )
  if (!product) {
    console.error('Product not found')
    return
  }

  const gallery = product.gallery ?? []
  let patched = false
  const updated = gallery.map((img) => {
    if (img.src && img.src.includes('Aerodynamic%20Cabin%20Design).jpg')) {
      patched = true
      return { ...img, src: img.src.replace('.jpg', '.png') }
    }
    return img
  })

  if (!patched) {
    console.log('No .jpg Aerodynamic reference found — already correct or path differs')
    return
  }

  await client.patch(product._id).set({ gallery: updated }).commit()
  console.log(`Patched product ${product._id}: Aerodynamic .jpg → .png`)
}

main().catch((err) => { console.error(err); process.exit(1) })
