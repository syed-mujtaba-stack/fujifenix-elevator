#!/usr/bin/env node
/**
 * Deletes ALL product + category documents from the Sanity dataset.
 * Images/assets are left untouched.
 *
 * Usage:
 *   node scripts/delete-all-docs.mjs            # actually deletes
 *   node scripts/delete-all-docs.mjs --dry-run  # only counts
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@sanity/client'

const envPath = join(process.cwd(), '.env.local')
const env = {}
for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-08-19',
  token: env.SANITY_TOKEN,
  useCdn: false,
})

const BATCH_SIZE = 100

async function fetchIds(type) {
  return client.fetch(`*[_type == $type]._id`, { type })
}

async function deleteInBatches(ids, label) {
  let deleted = 0
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE)
    const tx = batch.reduce(
      (t, id) => t.delete(id),
      client.transaction()
    )
    await tx.commit()
    deleted += batch.length
    console.log(`  ${label}: ${deleted}/${ids.length} deleted`)
  }
  return deleted
}

const products = await fetchIds('product')
const categories = await fetchIds('category')
console.log(`Found ${products.length} products, ${categories.length} categories`)
if (DRY_RUN) {
  console.log('Dry run — nothing deleted.')
  process.exit(0)
}
if (products.length === 0 && categories.length === 0) {
  console.log('Nothing to delete.')
  process.exit(0)
}

console.log('Deleting products...')
await deleteInBatches(products, 'products')

console.log('Deleting categories...')
await deleteInBatches(categories, 'categories')

const afterProducts = await client.fetch(`count(*[_type == "product"])`)
const afterCategories = await client.fetch(`count(*[_type == "category"])`)
console.log('\n──────────────────────────────────────────')
console.log(`Done. Remaining products: ${afterProducts}, categories: ${afterCategories}`)
