#!/usr/bin/env node
/**
 * Import script: reads product images from public/<category>/ folders,
 * derives product names/descriptions/features, uploads images to Sanity
 * assets, and creates category + product documents in the Sanity dataset.
 *
 * Requirements:
 *  - Sanity CLI authenticated (`npx sanity login`) OR SANITY_TOKEN env var
 *  - NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage:
 *   node scripts/import-sanity.mjs            # run import
 *   node scripts/import-sanity.mjs --dry-run  # generate manifest only
 */

import { readdirSync, createReadStream, readFileSync, writeFileSync, existsSync } from 'node:fs'
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
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
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

const DRY_RUN = process.argv.includes('--dry-run')

if (!token) {
  if (DRY_RUN) {
    console.log('Note: no Sanity token found — dry-run mode generates the manifest without writing.')
  } else {
    console.error(
      '✖ No Sanity token found. Run `npx sanity login` first, or set SANITY_TOKEN in your environment.'
    )
    process.exit(1)
  }
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-19',
  token,
  useCdn: false,
})

/* ------------------------------------------------------------------ */
/* Category content                                                    */
/* ------------------------------------------------------------------ */

const CATEGORY_CONFIG = [
  {
    slug: 'passenger-elevator',
    title: 'Passenger Elevator',
    group: 'elevators',
    folder: 'passenger-elevator',
    description:
      'High-performance passenger elevators engineered for residential, commercial, and public buildings — smooth, safe, and reliable everyday vertical travel.',
    features: [
      'VVVF Drive Control',
      'Energy-Efficient Operation',
      'Smooth, Quiet Ride',
      'Custom Cabin Finishes',
      'International Safety Standards',
    ],
    template: (t) =>
      `${t} is a precision-engineered passenger elevator from Fuji Fenix, built for dependable everyday vertical travel in residential and commercial buildings. Advanced drive control, a durable cabin, and smart safety systems deliver a smooth, quiet, and energy-efficient ride that meets international standards.`,
  },
  {
    slug: 'bed-elevator',
    title: 'Bed Elevator',
    group: 'elevators',
    folder: 'bed-elevator',
    description:
      'Purpose-built elevators for hospitals and care facilities, sized for stretchers and patient beds with smooth, precise movement.',
    features: [
      'Hospital-Grade Design',
      'Stretcher & Bed Capacity',
      'Precision Floor Leveling',
      'Smooth, Controlled Movement',
      'Emergency Power Options',
    ],
    template: (t) =>
      `${t} is a purpose-built hospital elevator from Fuji Fenix, designed to move patients, stretchers, and hospital beds safely and smoothly between floors. A spacious reinforced cabin, precision floor leveling, and controlled acceleration ensure comfortable and secure patient transport in the most demanding healthcare environments.`,
  },
  {
    slug: 'sightseeing-elevator',
    title: 'Sightseeing Elevator',
    group: 'elevators',
    folder: 'sightseeing-elevator',
    description:
      'Panoramic glass elevators that turn vertical travel into a visual experience for hotels, malls, and landmark buildings.',
    features: [
      'Full-Glass Panoramic Cabin',
      'Expansive Panoramic Views',
      'Capsule, Round & Diamond Options',
      'Architectural Custom Finishes',
      'Smart Control Systems',
    ],
    template: (t) =>
      `${t} is a panoramic sightseeing elevator from Fuji Fenix that transforms vertical travel into an architectural experience. Its full-glass cabin offers expansive views while precision engineering delivers a smooth, safe, and unforgettable ride for hotels, shopping malls, and landmark buildings.`,
  },
  {
    slug: 'home-elevator',
    title: 'Home Elevator',
    group: 'elevators',
    folder: 'home-elevator',
    description:
      'Compact, silent, and architecturally refined lifts for premium villas and private residences.',
    features: [
      'Compact, Space-Saving Design',
      'Silent Operation',
      'MRL Gearless Drive',
      'Custom Cabin Interiors',
      'Multi-Level Safety Systems',
    ],
    template: (t) =>
      `${t} is a refined residential elevator from Fuji Fenix, engineered for premium villas and private residences. Its compact, silent design blends beautifully into any interior while delivering the comfort, safety, and reliability families expect from every journey between floors.`,
  },
  {
    slug: 'freight-elevator',
    title: 'Freight Elevator',
    group: 'elevators',
    folder: 'freight-elevator',
    description:
      'Heavy-duty elevators built to move goods, materials, and machinery with durability and safety.',
    features: [
      'Heavy-Duty Load Capacity',
      'Reinforced Cabin Structure',
      'Durable Door Systems',
      'High-Cycle Reliability',
      'Machine Room Options',
    ],
    template: (t) =>
      `${t} is a heavy-duty freight elevator from Fuji Fenix, built to move goods, materials, and machinery with strength and reliability. A reinforced cabin, high load capacity, and durable door systems keep operations efficient, safe, and dependable under continuous use.`,
  },
  {
    slug: 'car-elevator',
    title: 'Car Elevator',
    group: 'elevators',
    folder: 'car-elevator',
    description:
      'Vertical vehicle transport systems for parking buildings, residences, and commercial projects.',
    features: [
      'Vehicle-Sized Cabin',
      'High Load Capacity',
      'Multiple Door Configurations',
      'Precision Safety Braking',
      'Corrosion-Resistant Finish',
    ],
    template: (t) =>
      `${t} is a robust car elevator from Fuji Fenix, engineered to transport vehicles vertically within parking buildings, residences, and commercial projects. A spacious cabin, high load capacity, and precision control systems deliver safe and efficient vehicle movement.`,
  },
  {
    slug: 'escalator',
    title: 'Escalator',
    group: 'elevators',
    folder: 'escalator',
    description:
      'Escalators built for continuous high-traffic operation in airports, malls, and transit hubs.',
    features: [
      'Continuous High-Traffic Operation',
      'Energy-Efficient Drive',
      'Anti-Slip Steps',
      'Full Safety Sensors',
      'Weather-Resistant Construction',
    ],
    template: (t) =>
      `${t} is engineered by Fuji Fenix for continuous high-traffic operation in airports, shopping centers, and transit hubs. Anti-slip steps, full safety sensors, and an energy-efficient drive ensure smooth, safe, and dependable passenger flow around the clock.`,
  },
  {
    slug: 'elevator-operation-panel',
    title: 'Elevator Operation Panel',
    group: 'components',
    folder: 'elevator-operation-panel',
    description:
      'Modern operation panels and control fixtures combining intuitive use with premium finishes.',
    features: [
      'Modern, Intuitive Interface',
      'Backlit Floor Indicators',
      'Premium Metal Finishes',
      'Easy Installation',
      'Custom Configurations',
    ],
    template: (t) =>
      `${t} is a premium elevator operation panel from Fuji Fenix, combining intuitive controls with refined materials. Backlit indicators and a responsive interface make every journey effortless while matching the interior design of the elevator car.`,
  },
  {
    slug: 'elevator-ceiling',
    title: 'Elevator Ceiling',
    group: 'components',
    folder: 'elevator-ceiling',
    description:
      'Architectural cabin ceilings with integrated lighting, finishes, and design options.',
    features: [
      'Integrated LED Lighting',
      'Premium Materials',
      'Multiple Design Series',
      'Energy-Efficient Illumination',
      'Custom Finishes',
    ],
    template: (t) =>
      `${t} is an architectural elevator ceiling from Fuji Fenix, designed to elevate the cabin experience with integrated lighting and premium finishes. Clean lines and energy-efficient illumination create a bright, welcoming interior that complements any elevator design.`,
  },
  {
    slug: 'elevator-handrail',
    title: 'Elevator Handrail',
    group: 'components',
    folder: 'elevator-handrail',
    description:
      'Elegant, durable handrails that complement cabin design while ensuring passenger safety.',
    features: [
      'Polished Premium Materials',
      'Ergonomic, Secure Grip',
      'Corrosion-Resistant',
      'Custom Finishes',
      'Easy Installation',
    ],
    template: (t) =>
      `${t} is an elegant elevator handrail from Fuji Fenix, combining passenger safety with refined cabin design. Its durable, corrosion-resistant surface provides a secure, comfortable grip while complementing the interior finishes of the elevator.`,
  },
  {
    slug: 'elevator-landing-door',
    title: 'Elevator Landing Door',
    group: 'components',
    folder: 'elevator-landing-door',
    description:
      'Landing doors and door systems engineered for safety, durability, and a flawless finish.',
    features: [
      'Stainless Steel Construction',
      'Etched, Titanium & Rose Gold Finishes',
      'Smooth, Silent Operation',
      'Full Safety Sensors',
      'Durable, Long-Lasting Build',
    ],
    template: (t) =>
      `${t} is a premium elevator landing door from Fuji Fenix, engineered for safety, durability, and a flawless finish. Its stainless steel construction, smooth operation, and refined surface options make it a standout feature of any elevator installation.`,
  },
  {
    slug: 'elevator-floor',
    title: 'Elevator Floor',
    group: 'components',
    folder: 'elevator-floor',
    description: 'Premium cabin flooring solutions tailored to match any interior design.',
    features: [
      'Premium Flooring Materials',
      'Slip-Resistant Surface',
      'Scratch & Wear Resistant',
      'Easy to Clean',
      'Custom Patterns & Finishes',
    ],
    template: (t) =>
      `${t} is a premium elevator floor from Fuji Fenix, crafted to match the character of any interior. Its slip-resistant, scratch-resistant surface is both durable and easy to maintain, keeping the elevator cabin beautiful for years.`,
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    group: 'components',
    folder: 'accessories',
    description: 'A complete range of elevator accessories and complementary components.',
    features: [
      'Genuine Fuji Fenix Quality',
      'Precision Engineering',
      'Durable Materials',
      'Easy Installation',
      'Compatible with Fuji Fenix Systems',
    ],
    template: (t) =>
      `${t} is a genuine Fuji Fenix elevator accessory, engineered to enhance the comfort, safety, and style of every elevator installation. Precision-made and durable, it integrates seamlessly with the Fuji Fenix range.`,
  },
]

/* ------------------------------------------------------------------ */
/* Title derivation                                                    */
/* ------------------------------------------------------------------ */

// Exact fixes for filenames that are truncated or misspelled.
const TITLE_OVERRIDES = {
  'Modernisation building passenger eleva': 'Modernisation Building Passenger Elevator',
  'Round Shape Capsule Observation Elevato': 'Round Shape Capsule Observation Elevator',
  'Observation Elevator Car Decoration F-G0': 'Observation Elevator Car Decoration F-G001',
  'F-JM05 Class Door': 'F-JM05 Glass Door',
  'F-JM06 Class Door': 'F-JM06 Glass Door',
  'Machine room-less freight elevator': 'Machine Room-Less Freight Elevator',
  'Accessories1': 'Accessories 1',
  'Accessories2': 'Accessories 2',
  'Accessories3': 'Accessories 3',
  'Accessories4': 'Accessories 4',
  'Accessories5': 'Accessories 5',
  'Accessories17': 'Accessories 17',
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i

const ACRONYMS = new Set(['MRL', 'VVVF', 'LED', 'KG'])
const SMALL_WORDS = new Set(['for', 'and', 'the', 'of', 'in', 'with', 'to', 'a', 'an', 'at'])

function titleFromFile(fileName) {
  let base = fileName.replace(IMAGE_EXT, '').trim()
  if (TITLE_OVERRIDES[base]) return TITLE_OVERRIDES[base]

  return base
    .split(/\s+/)
    .map((w, i) => {
      // Model codes like f-k01, f-jm05, f-fl01
      if (/^[a-z]-[a-z0-9]+$/i.test(w)) return w.toUpperCase()
      // Capacity units: 260kg -> 260 KG
      const unitMatch = w.match(/^(\d+)([a-z]+)$/i)
      if (unitMatch) return `${unitMatch[1]} ${unitMatch[2].toUpperCase()}`
      // Preserve known acronyms
      if (ACRONYMS.has(w.toUpperCase())) return w.toUpperCase()
      // Lowercase small connecting words (except the first word)
      if (i > 0 && SMALL_WORDS.has(w.toLowerCase())) return w.toLowerCase()
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })
    .join(' ')
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function listImages(folder) {
  const dir = join(process.cwd(), 'public', folder)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function getExistingIds() {
  const categories = await client.fetch(`*[_type == "category"] { _id, "slug": slug.current }`)
  const products = await client.fetch(`*[_type == "product"] { _id, "slug": slug.current }`)
  return {
    categoryIdBySlug: Object.fromEntries(categories.map((c) => [c.slug, c._id])),
    productIdBySlug: Object.fromEntries(products.map((p) => [p.slug, p._id])),
  }
}

async function ensureCategory(cfg, imageAssetId) {
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0] { _id }`,
    { slug: cfg.slug }
  )
  if (existing) return existing._id
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
  return created._id
}

async function uploadImage(filePath, filename) {
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
    contentType: 'image/jpeg',
  })
  return asset._id
}

async function main() {
  console.log(`Sanity: ${projectId} / ${dataset}`)
  if (DRY_RUN) console.log('Mode: dry-run (no writes)')

  const { categoryIdBySlug, productIdBySlug } = DRY_RUN
    ? { categoryIdBySlug: {}, productIdBySlug: {} }
    : await getExistingIds()
  const manifest = []
  let created = 0
  let skipped = 0
  let uploaded = 0

  for (const cfg of CATEGORY_CONFIG) {
    const files = listImages(cfg.folder)
    if (files.length === 0) {
      console.log(`  • ${cfg.title}: no images found in public/${cfg.folder}`)
      continue
    }

    console.log(`\n${cfg.title} (${files.length} products)`)

    let categoryId = categoryIdBySlug[cfg.slug]
    let categoryImageAssetId = null

    for (const file of files) {
      const title = titleFromFile(file)
      const slug = slugify(title)
      const filePath = join(process.cwd(), 'public', cfg.folder, file)
      const description = cfg.template(title)
      const features = cfg.features

      manifest.push({
        category: cfg.title,
        categorySlug: cfg.slug,
        file,
        title,
        slug,
        description,
        features,
      })

      if (DRY_RUN) {
        console.log(`  • ${title}`)
        continue
      }

      const existingProductId = productIdBySlug[slug]
      if (existingProductId) {
        console.log(`  • ${title} — skipped (already exists)`)
        skipped += 1
        continue
      }

      try {
        const assetId = await uploadImage(filePath, file)
        uploaded += 1
        if (!categoryImageAssetId) categoryImageAssetId = assetId
        if (!categoryId) {
          categoryId = await ensureCategory(cfg, categoryImageAssetId)
          categoryIdBySlug[cfg.slug] = categoryId
        }
        await client.create({
          _type: 'product',
          title,
          slug: { _type: 'slug', current: slug },
          category: { _type: 'reference', _ref: categoryId },
          description,
          features,
          image: { _type: 'image', asset: { _ref: assetId } },
          order: files.indexOf(file) + 1,
        })
        created += 1
        console.log(`  + ${title}`)
      } catch (err) {
        console.error(`  ✖ ${title} — ${err.message}`)
      }
    }
  }

  const manifestPath = join(process.cwd(), 'scripts', 'products-manifest.json')
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')

  console.log('\n──────────────────────────────────────────')
  console.log(`Total products in manifest: ${manifest.length}`)
  if (!DRY_RUN) {
    console.log(`Created: ${created} | Skipped (existing): ${skipped} | Images uploaded: ${uploaded}`)
  }
  console.log(`Manifest written to scripts/products-manifest.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
