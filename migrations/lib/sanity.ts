import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-08-19',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch(query, params ?? {})
}

export async function sanityCreate(doc: Record<string, unknown>) {
  return sanityClient.create(doc)
}

export async function sanityPatch(id: string, set: Record<string, unknown>) {
  return sanityClient.patch(id).set(set).commit()
}

export async function sanityDelete(id: string) {
  return sanityClient.delete(id)
}
