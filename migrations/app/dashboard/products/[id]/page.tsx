'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  description: string
  tagline: string
  keyFeatures: string[]
  applications: string[]
  disclaimer: string
  imageDisclaimer: string
  configurationNote: string
}

export default function ProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [newApplication, setNewApplication] = useState('')

  useEffect(() => {
    fetch(`/api/analytics?type=product&id=${params.id}`)
      .then(r => r.json())
      .then(data => {
        setProduct(data.product)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [params.id])

  const handleSave = async () => {
    if (!product) return
    setSaving(true)
    try {
      await fetch(`/api/analytics?type=product&id=${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      alert('Product updated successfully')
    } catch {
      alert('Failed to update product')
    }
    setSaving(false)
  }

  const addFeature = () => {
    if (!newFeature.trim() || !product) return
    setProduct({
      ...product,
      keyFeatures: [...(product.keyFeatures || []), newFeature.trim()],
    })
    setNewFeature('')
  }

  const removeFeature = (index: number) => {
    if (!product) return
    setProduct({
      ...product,
      keyFeatures: product.keyFeatures.filter((_, i) => i !== index),
    })
  }

  const addApplication = () => {
    if (!newApplication.trim() || !product) return
    setProduct({
      ...product,
      applications: [...(product.applications || []), newApplication.trim()],
    })
    setNewApplication('')
  }

  const removeApplication = (index: number) => {
    if (!product) return
    setProduct({
      ...product,
      applications: product.applications.filter((_, i) => i !== index),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#0047BB] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-[#64748b]">Product not found</p>
        <Link href="/dashboard/products" className="text-[#0047BB] text-sm hover:underline mt-2 inline-block">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/products"
          className="p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Edit Product</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{product.title}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-[#0f172a]">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-1">Title</label>
          <input
            type="text"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-1">Tagline</label>
          <input
            type="text"
            value={product.tagline || ''}
            onChange={(e) => setProduct({ ...product, tagline: e.target.value })}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-1">Description</label>
          <textarea
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB] resize-none"
          />
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-[#0f172a]">Key Features</h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addFeature()}
            placeholder="Add a feature..."
            className="flex-1 px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB]"
          />
          <button
            onClick={addFeature}
            className="px-4 py-2 bg-[#0047BB] text-white text-sm rounded-lg hover:bg-[#003da0] transition-colors"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {(product.keyFeatures || []).map((feature, i) => (
            <div key={i} className="flex items-center justify-between bg-[#f8fafc] px-4 py-2 rounded-lg">
              <span className="text-sm text-[#0f172a]">{feature}</span>
              <button
                onClick={() => removeFeature(i)}
                className="text-[#dc2626] text-xs hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-[#0f172a]">Applications</h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={newApplication}
            onChange={(e) => setNewApplication(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addApplication()}
            placeholder="Add an application..."
            className="flex-1 px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB]"
          />
          <button
            onClick={addApplication}
            className="px-4 py-2 bg-[#0047BB] text-white text-sm rounded-lg hover:bg-[#003da0] transition-colors"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {(product.applications || []).map((app, i) => (
            <div key={i} className="flex items-center justify-between bg-[#f8fafc] px-4 py-2 rounded-lg">
              <span className="text-sm text-[#0f172a]">{app}</span>
              <button
                onClick={() => removeApplication(i)}
                className="text-[#dc2626] text-xs hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-[#0f172a]">Disclaimers</h2>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-1">Disclaimer</label>
          <textarea
            value={product.disclaimer || ''}
            onChange={(e) => setProduct({ ...product, disclaimer: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-1">Image Disclaimer</label>
          <textarea
            value={product.imageDisclaimer || ''}
            onChange={(e) => setProduct({ ...product, imageDisclaimer: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0f172a] mb-1">Configuration Note</label>
          <textarea
            value={product.configurationNote || ''}
            onChange={(e) => setProduct({ ...product, configurationNote: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB] resize-none"
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0047BB] text-white text-sm font-semibold rounded-lg hover:bg-[#003da0] transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
