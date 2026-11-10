import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import { adminProductsQuery } from '@/lib/admin-queries'
import ProductsPageClient from './ProductsPageClient'
import type { ProductRow } from './ProductsPageClient'

export default async function ProductsPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'products.read')) redirect('/dashboard')

  const [products, categories] = await Promise.all([
    adminClient.fetch<ProductRow[]>(adminProductsQuery),
    adminClient.fetch<Array<{ _id: string; title: string; slug: string | null }>>(adminCategoriesQueryForPage),
  ])

  return (
    <ProductsPageClient
      products={products}
      categories={categories}
      canWrite={hasPermission(role, 'products.write')}
    />
  )
}

const adminCategoriesQueryForPage = `*[_type == "category"] | order(order asc) { _id, title, "slug": slug.current }`