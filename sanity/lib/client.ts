import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Pages use ISR (revalidate=60); API origin is more consistent than the CDN edge.
})

/**
 * Retry a Sanity fetch a few times to absorb transient network blips
 * (DNS/connect resets) before giving up.
 */
async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseDelay = 300): Promise<T> {
  let lastErr: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, baseDelay * Math.pow(2, i)))
      }
    }
  }
  throw lastErr
}

/**
 * Fetch from Sanity without crashing SSR/build on network failures.
 * Retries transient failures, then falls back to the provided value when
 * Sanity is unreachable. ISR revalidation self-heals later.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  try {
    return await withRetry(() => client.fetch<T>(query, params))
  } catch (err) {
    console.error('[sanity] fetch failed, using fallback:', err instanceof Error ? err.message : err)
    return fallback
  }
}
