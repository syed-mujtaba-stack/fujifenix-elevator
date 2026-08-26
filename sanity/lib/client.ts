import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

/**
 * Fetch from Sanity without crashing SSR/build on network failures.
 * Falls back to the provided value when the CDN is unreachable
 * (transient DNS/connect outages). ISR revalidation self-heals later.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (err) {
    console.error('[sanity] fetch failed, using fallback:', err instanceof Error ? err.message : err)
    return fallback
  }
}
