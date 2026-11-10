import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { adminClient } from '@/sanity/lib/server'
import { hasPermission, type AdminRole } from '@/lib/admin'
import ProductForm from '../ProductForm'

export default async function NewProductPage() {
  const session = await auth()
  const role = (session?.user?.role ?? 'viewer') as AdminRole
  if (!hasPermission(role, 'products.write')) redirect('/dashboard/products')

  const categories = await adminClient.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "category"] | order(order asc) { _id, title }`
  )

  return <ProductForm categories={categories} initial={null} />
}