import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

/**
 * Server-side Sanity client with write token.
 * Never import this from a Client Component — it carries the privileged token.
 */
export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

/** Map a public admin type identifier into a Sanity document type. */
export const DOC_TYPE = (t: string): string => t