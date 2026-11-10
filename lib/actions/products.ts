'use server'

import { revalidatePath } from 'next/cache'
import { adminClient } from '@/sanity/lib/server'
import { requirePermission, logAudit } from '@/lib/admin'

export interface ProductInput {
  title: string
  slug: string
  categoryId: string
  description?: string | null
  features?: string[]
  order?: number
  seoTitle?: string | null
  seoDescription?: string | null
  tagline?: string | null
  operation?: string | null
  disclaimer?: string | null
  imageDisclaimer?: string | null
  designedFor?: string[]
  keyFeatures?: string[]
  applications?: string[]
  capacities?: string[]
  design?: string[]
  configurationNote?: string | null
}

export async function createProduct(input: ProductInput) {
  const actor = await requirePermission('products.write')
  if (!input.title?.trim() || !input.slug?.trim() || !input.categoryId) {
    throw new Error('Title, slug and category are required')
  }
  const doc = await adminClient.create({
    _type: 'product',
    title: input.title.trim(),
    slug: { _type: 'slug', current: input.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
    category: { _ref: input.categoryId },
    description: input.description || undefined,
    features: input.features?.filter(Boolean) || undefined,
    order: input.order ?? 0,
    seoTitle: input.seoTitle || undefined,
    seoDescription: input.seoDescription || undefined,
    tagline: input.tagline || undefined,
    operation: input.operation || undefined,
    disclaimer: input.disclaimer || undefined,
    imageDisclaimer: input.imageDisclaimer || undefined,
    designedFor: input.designedFor?.filter(Boolean) || undefined,
    keyFeatures: input.keyFeatures?.filter(Boolean) || undefined,
    applications: input.applications?.filter(Boolean) || undefined,
    capacities: input.capacities?.filter(Boolean) || undefined,
    design: input.design?.filter(Boolean) || undefined,
    configurationNote: input.configurationNote || undefined,
  })
  await logAudit({
    action: 'create',
    entityType: 'product',
    entityId: doc._id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { title: input.title, slug: input.slug },
  })
  revalidatePath('/dashboard/products')
  revalidatePath('/products')
  revalidatePath('/sitemap-images.xml')
  return { ok: true, id: doc._id }
}

export async function updateProduct(id: string, input: ProductInput) {
  const actor = await requirePermission('products.write')
  if (!input.title?.trim() || !input.slug?.trim() || !input.categoryId) {
    throw new Error('Title, slug and category are required')
  }
  const target = await adminClient.fetch<{ _id: string } | null>(`*[_type == "product" && _id == $id][0] { _id }`, { id })
  if (!target) throw new Error('Product not found')
  await adminClient
    .patch(id)
    .set({
      title: input.title.trim(),
      slug: { _type: 'slug', current: input.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
      category: { _ref: input.categoryId },
      description: input.description ?? undefined,
      features: input.features?.filter(Boolean) ?? [],
      order: input.order ?? 0,
      seoTitle: input.seoTitle ?? undefined,
      seoDescription: input.seoDescription ?? undefined,
      tagline: input.tagline ?? undefined,
      operation: input.operation ?? undefined,
      disclaimer: input.disclaimer ?? undefined,
      imageDisclaimer: input.imageDisclaimer ?? undefined,
      designedFor: input.designedFor?.filter(Boolean) ?? [],
      keyFeatures: input.keyFeatures?.filter(Boolean) ?? [],
      applications: input.applications?.filter(Boolean) ?? [],
      capacities: input.capacities?.filter(Boolean) ?? [],
      design: input.design?.filter(Boolean) ?? [],
      configurationNote: input.configurationNote ?? undefined,
    })
    .commit()
  await logAudit({
    action: 'update',
    entityType: 'product',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { title: input.title },
  })
  revalidatePath('/dashboard/products')
  revalidatePath(`/products`)
  revalidatePath('/sitemap-images.xml')
  return { ok: true }
}

export async function deleteProduct(id: string) {
  const actor = await requirePermission('products.write')
  const target = await adminClient.fetch<{ _id: string; title: string } | null>(
    `*[_type == "product" && _id == $id][0] { _id, title }`,
    { id }
  )
  if (!target) throw new Error('Product not found')
  await adminClient.delete(id)
  await logAudit({
    action: 'delete',
    entityType: 'product',
    entityId: id,
    actorId: actor.userId,
    sessionId: actor.sessionId,
    metadata: { title: target.title },
  })
  revalidatePath('/dashboard/products')
  revalidatePath('/products')
  revalidatePath('/sitemap-images.xml')
  return { ok: true }
}