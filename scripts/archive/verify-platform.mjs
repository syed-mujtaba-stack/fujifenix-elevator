#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@sanity/client'
function loadEnvFile() {
  const p = join(process.cwd(), '.env.local')
  if (!existsSync(p)) return {}
  const o = {}
  for (const l of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) o[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return o
}
const env = loadEnvFile()
const c = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2026-08-19', token: env.SANITY_TOKEN, useCdn: false })
const d = await c.fetch(`*[_type=='product' && slug.current=='home-elevators'][0]{ 'gallery': gallery[]._key, 'platform': specGroups[_key=='platform'].sectionImages }`)
console.log('gallery keys:', d.gallery)
console.log('platform sectionImages:', d.platform)
