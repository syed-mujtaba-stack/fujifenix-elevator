import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

const line = readFileSync('.env.local', 'utf8').split(/\r?\n/).find((l) => l.startsWith('SANITY_TOKEN='))
const token = line.split('=').slice(1).join('=').replace(/^["']|["']$/g, '').trim()
const c = createClient({ projectId: 'fpxhz2d3', dataset: 'production', apiVersion: '2026-08-19', token, useCdn: false })

const cats = await c.fetch(`*[_type == "category"]{_id, title, "slug": slug.current, group, "products": count(*[_type == "product" && category._ref == ^._id])} | order(order asc)`)
for (const x of cats) console.log(`${String(x.products).padStart(3)}  ${x.title} (${x.group})`)
const total = await c.fetch(`count(*[_type == "product"])`)
console.log('\nTotal products:', total)
