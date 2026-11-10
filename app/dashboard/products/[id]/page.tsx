import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminProductDetailQuery } from '@/lib/admin-queries'
import ProductForm, { type ProductFormData } from '../ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'products.write')) redirect('/dashboard/products')

  const [rawProduct, categories] = await Promise.all([
    adminClient.fetch<any>(adminProductDetailQuery, { id }),
    adminClient.fetch<Array<{ _id: string; title: string }>>(
      `*[_type == "category"] | order(order asc) { _id, title }`
    ),
  ])

  if (!rawProduct) notFound()

  const initial: ProductFormData = {
    _id: rawProduct._id,
    title: rawProduct.title ?? '',
    slug: rawProduct.slug ?? null,
    categoryId: rawProduct.categoryId ?? null,
    order: rawProduct.order ?? 0,
    description: rawProduct.description ?? null,
    operation: rawProduct.operation ?? null,
    tagline: rawProduct.tagline ?? null,
    features: (rawProduct.features ?? []).map((f: any) => typeof f === 'string' ? f : String(f)).filter(Boolean),
    designedFor: (rawProduct.designedFor ?? []).map((f: any) => typeof f === 'string' ? f : String(f)),
    keyFeatures: (rawProduct.keyFeatures ?? []).map((f: any) => typeof f === 'string' ? f : String(f)),
    applications: (rawProduct.applications ?? []).map((f: any) => typeof f === 'string' ? f : String(f)),
    capacities: (rawProduct.capacities ?? []).map((f: any) => typeof f === 'string' ? f : String(f)),
    design: (rawProduct.design ?? []).map((f: any) => typeof f === 'string' ? f : String(f)),
    configurationNote: rawProduct.configurationNote ?? null,
    disclaimer: rawProduct.disclaimer ?? null,
    imageDisclaimer: rawProduct.imageDisclaimer ?? null,
    seoTitle: rawProduct.seoTitle ?? null,
    seoDescription: rawProduct.seoDescription ?? null,
  }

  return <ProductForm categories={categories} initial={initial} />
}