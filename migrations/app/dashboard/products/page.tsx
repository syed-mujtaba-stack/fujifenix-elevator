'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  category: { title: string }
  description: string
  order: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/analytics?type=products')
      .then(r => r.json())
      .then(data => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setDeleting(id)
    try {
      await fetch(`/api/analytics?type=product&id=${id}`, { method: 'DELETE' })
      setProducts(products.filter(p => p._id !== id))
    } catch {
      alert('Failed to delete product')
    }
    setDeleting(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#0047BB] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Products</h1>
          <p className="text-sm text-[#64748b] mt-1">{products.length} total products</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white border border-[#e2e8f0] rounded-lg px-4 py-2.5 w-full sm:w-96">
        <Search size={16} className="text-[#94a3b8] mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#0f172a]">{product.title}</h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  {product.category?.title || 'Uncategorized'}
                </p>
              </div>
              <span className="text-xs text-[#94a3b8] bg-[#f8fafc] px-2 py-1 rounded">
                #{product.order || 0}
              </span>
            </div>

            <p className="text-sm text-[#64748b] line-clamp-2 mb-4">
              {product.description?.substring(0, 120) || 'No description'}
            </p>

            <div className="flex items-center gap-2">
              <a
                href={`/products/elevators/${product.slug?.current}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0047BB] bg-[#e8f0fe] rounded-lg hover:bg-[#d0e0fc] transition-colors"
              >
                <ExternalLink size={12} />
                View
              </a>
              <Link
                href={`/dashboard/products/${product._id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#64748b] bg-[#f8fafc] rounded-lg hover:bg-[#f1f5f9] transition-colors"
              >
                <Edit size={12} />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                disabled={deleting === product._id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#dc2626] bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                <Trash2 size={12} />
                {deleting === product._id ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-[#94a3b8]">No products found</p>
        </div>
      )}
    </div>
  )
}
