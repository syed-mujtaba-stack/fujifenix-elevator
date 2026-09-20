#!/usr/bin/env node
/**
 * Re-import script: uploads every product image from public/<category>/
 * folders to Sanity assets and syncs the dataset:
 *   - existing products  -> image reference patched to the new asset
 *   - missing products   -> created (category auto-created as well)
 *
 * Mapping is driven by scripts/products-manifest.json (slug -> file/folder/
 * title/description/features). Category metadata mirrors import-sanity.mjs.
 *
 * Requirements:
 *  - SANITY_TOKEN env var OR .env.local SANITY_TOKEN OR `npx sanity login` session
 *  - NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage:
 *   node scripts/update-images-sanity.mjs            # full sync
 *   node scripts/update-images-sanity.mjs --dry-run  # verify mapping only
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { createClient } from '@sanity/client'

/* ------------------------------------------------------------------ */
/* Environment                                                         */
/* ------------------------------------------------------------------ */

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

function resolveToken() {
  if (process.env.SANITY_TOKEN) return process.env.SANITY_TOKEN
  const sessionCandidates = [
    join(homedir(), '.config', 'sanity', 'session.json'),
    join(homedir(), '.config', 'sanity', 'auth.json'),
    join(homedir(), '.config', 'sanity', 'config.json'),
    join(process.env.APPDATA || join(homedir(), 'AppData', 'Roaming'), 'sanity', 'session.json'),
  ]
  for (const c of sessionCandidates) {
    if (!existsSync(c)) continue
    try {
      const data = JSON.parse(readFileSync(c, 'utf8'))
      const token =
        data.authToken || data.token || data.session?.token || data.data?.token
      if (token) return token
    } catch {
      /* ignore */
    }
  }
  return null
}

const env = loadEnvFile()
const projectId = process.env.SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET
const token = resolveToken()

if (!projectId || !dataset) {
  console.error('✖ Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('✖ No Sanity token found. Set SANITY_TOKEN in .env.local or run `npx sanity login`.')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-19',
  token,
  useCdn: false,
})

/* ------------------------------------------------------------------ */
/* Category metadata (mirrors scripts/import-sanity.mjs)               */
/* ------------------------------------------------------------------ */

const CATEGORY_CONFIG = [
  {
    slug: 'passenger-elevator',
    title: 'Passenger Elevator',
    group: 'elevators',
    description:
      'High-performance passenger elevators engineered for residential, commercial, and public buildings — smooth, safe, and reliable everyday vertical travel.',
  },
  {
    slug: 'bed-elevator',
    title: 'Bed Elevator',
    group: 'elevators',
    description:
      'Purpose-built elevators for hospitals and care facilities, sized for stretchers and patient beds with smooth, precise movement.',
  },
  {
    slug: 'sightseeing-elevator',
    title: 'Sightseeing Elevator',
    group: 'elevators',
    description:
      'Panoramic glass elevators that turn vertical travel into a visual experience for hotels, malls, and landmark buildings.',
  },
  {
    slug: 'home-elevator',
    title: 'Home Elevator',
    group: 'elevators',
    description:
      'Compact, silent, and architecturally refined lifts for premium villas and private residences.',
  },
  {
    slug: 'freight-elevator',
    title: 'Freight Elevator',
    group: 'elevators',
    description:
      'Heavy-duty elevators built to move goods, materials, and machinery with durability and safety.',
  },
  {
    slug: 'car-elevator',
    title: 'Car Elevator',
    group: 'elevators',
    description:
      'Vertical vehicle transport systems for parking buildings, residences, and commercial projects.',
  },
  {
    slug: 'escalator',
    title: 'Escalator',
    group: 'elevators',
    description:
      'Escalators built for continuous high-traffic operation in airports, malls, and transit hubs.',
  },
  {
    slug: 'elevator-operation-panel',
    title: 'Elevator Operation Panel',
    group: 'components',
    description:
      'Modern operation panels and control fixtures combining intuitive use with premium finishes.',
  },
  {
    slug: 'elevator-ceiling',
    title: 'Elevator Ceiling',
    group: 'components',
    description:
      'Architectural cabin ceilings with integrated lighting, finishes, and design options.',
  },
  {
    slug: 'elevator-handrail',
    title: 'Elevator Handrail',
    group: 'components',
    description:
      'Elegant, durable handrails that complement cabin design while ensuring passenger safety.',
  },
  {
    slug: 'elevator-landing-door',
    title: 'Elevator Landing Door',
    group: 'components',
    description:
      'Landing doors and door systems engineered for safety, durability, and a flawless finish.',
  },
  {
    slug: 'elevator-floor',
    title: 'Elevator Floor',
    group: 'components',
    description:
      'Premium cabin flooring solutions tailored to match any interior design.',
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    group: 'components',
    description:
      'A complete range of elevator accessories and complementary components.',
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function uploadImage(filePath, filename, attempt = 1) {
  try {
    const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase()
    const asset = await client.assets.upload('image', readFileSync(filePath), {
      filename,
      contentType: CONTENT_TYPES[ext] || 'image/jpeg',
    })
    return asset._id
  } catch (err) {
    if (attempt < 3) {
      console.log(`    ↻ retry ${attempt}/2 for ${filename} (${err.message})`)
      await sleep(2000 * attempt)
      return uploadImage(filePath, filename, attempt + 1)
    }
    throw err
  }
}

async function ensureCategory(cfg, imageAssetId) {
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0] { _id }`,
    { slug: cfg.slug }
  )
  if (existing) return { id: existing._id, created: false }
  const doc = {
    _type: 'category',
    title: cfg.title,
    slug: { _type: 'slug', current: cfg.slug },
    group: cfg.group,
    description: cfg.description,
    ...(imageAssetId ? { image: { _type: 'image', asset: { _ref: imageAssetId } } } : {}),
    order: CATEGORY_CONFIG.findIndex((c) => c.slug === cfg.slug) + 1,
  }
  const created = await client.create(doc)
  return { id: created._id, created: true }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  console.log(`Sanity: ${projectId} / ${dataset}`)
  if (DRY_RUN) console.log('Mode: dry-run (no writes)\n')

  const manifest = JSON.parse(
    readFileSync(join(process.cwd(), 'scripts', 'products-manifest.json'), 'utf8')
  )
  console.log(`Manifest entries: ${manifest.length}`)

  // Existing Sanity state
  const [products, categories] = await Promise.all([
    client.fetch(`*[_type == "product"] { _id, "slug": slug.current }`),
    client.fetch(`*[_type == "category"] { _id, "slug": slug.current }`),
  ])
  const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p]))
  const categoryIdBySlug = Object.fromEntries(categories.map((c) => [c.slug, c._id]))
  console.log(`Products in Sanity: ${products.length}`)
  console.log(`Categories in Sanity: ${categories.length}\n`)

  let patchedProducts = 0
  let createdProducts = 0
  let createdCategories = 0
  let skippedNoFile = 0
  let failed = 0
  // first new asset per category -> refresh category cover at the end
  const categoryAssetBySlug = {}
  // running order counter per category for newly created products
  const nextOrderByCategory = {}

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i]
    const label = `${i + 1}/${manifest.length} ${entry.title}`
    const filePath = join(process.cwd(), 'public', entry.categorySlug, entry.file)

    if (!existsSync(filePath)) {
      console.log(`  ✖ ${label} — file not found: public/${entry.categorySlug}/${entry.file}`)
      skippedNoFile += 1
      continue
    }

    if (DRY_RUN) {
      const exists = productBySlug[entry.slug] ? '+' : 'NEW'
      console.log(`  ${exists} ${label}`)
      continue
    }

    try {
      const assetId = await uploadImage(filePath, entry.file)
      if (!categoryAssetBySlug[entry.categorySlug]) {
        categoryAssetBySlug[entry.categorySlug] = assetId
      }

      const product = productBySlug[entry.slug]
      if (product) {
        await client
          .patch(product._id)
          .set({ image: { _type: 'image', asset: { _ref: assetId } } })
          .commit()
        patchedProducts += 1
        console.log(`  ~ ${label}`)
      } else {
        let categoryId = categoryIdBySlug[entry.categorySlug]
        if (!categoryId) {
          const cfg = CATEGORY_CONFIG.find((c) => c.slug === entry.categorySlug)
          if (!cfg) throw new Error(`no category config for "${entry.categorySlug}"`)
          const res = await ensureCategory(cfg, assetId)
          categoryId = res.id
          categoryIdBySlug[entry.categorySlug] = categoryId
          if (res.created) {
            createdCategories += 1
            console.log(`  ★ new category: ${cfg.title}`)
          }
        }
        const order =
          (nextOrderByCategory[entry.categorySlug] ?? 0) + 1
        nextOrderByCategory[entry.categorySlug] = order
        await client.create({
          _type: 'product',
          title: entry.title,
          slug: { _type: 'slug', current: entry.slug },
          category: { _type: 'reference', _ref: categoryId },
          description: entry.description,
          features: entry.features,
          image: { _type: 'image', asset: { _ref: assetId } },
          order,
        })
        createdProducts += 1
        console.log(`  + ${label}`)
      }
    } catch (err) {
      failed += 1
      console.error(`  ✖ ${label} — ${err.message}`)
    }
  }

  // Refresh category cover images with the first high-res asset of each folder
  let categoriesPatched = 0
  if (!DRY_RUN && Object.keys(categoryAssetBySlug).length > 0) {
    console.log('\nCategory cover images:')
    for (const [slug, assetId] of Object.entries(categoryAssetBySlug)) {
      try {
        const catId = categoryIdBySlug[slug]
        if (!catId) continue
        await client
          .patch(catId)
          .set({ image: { _type: 'image', asset: { _ref: assetId } } })
          .commit()
        categoriesPatched += 1
        console.log(`  ~ ${slug}`)
      } catch (err) {
        console.error(`  ✖ ${slug} — ${err.message}`)
      }
    }
  }

  console.log('\n──────────────────────────────────────────')
  if (DRY_RUN) {
    const totalNew = manifest.filter(
      (e) =>
        existsSync(join(process.cwd(), 'public', e.categorySlug, e.file)) &&
        !productBySlug[e.slug]
    ).length
    console.log(`Dry-run complete. Products to patch: ${manifest.length - totalNew}, to create: ${totalNew}`)
  } else {
    console.log(`Products patched: ${patchedProducts}`)
    console.log(`Products created: ${createdProducts}`)
    console.log(`Categories created: ${createdCategories}`)
    console.log(`Category covers updated: ${categoriesPatched}`)
  }
  if (skippedNoFile) console.log(`Missing files: ${skippedNoFile}`)
  if (failed) console.log(`Failed: ${failed}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
