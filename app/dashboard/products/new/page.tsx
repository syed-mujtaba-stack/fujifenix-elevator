"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { cn } from '@/lib/utils'

const categories = [
  { value: 'elevators', label: 'Elevators' },
  { value: 'escalators-moving-walks', label: 'Escalators & Moving Walks' },
  { value: 'specialized-elevator-solutions', label: 'Specialized Elevator Solutions' },
  { value: 'transportation-infrastructure', label: 'Transportation & Infrastructure' },
]

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
]

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    status: 'draft',
    order: 1,
    description: '',
    features: '',
    image: '',
    gallery: '',
    specifications: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (newErrors.title || newErrors.slug || newErrors.category) {
      setErrors(newErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    // In real app: await createProduct(formData)
    setIsLoading(false)
    window.location.href = '/dashboard/products'
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, title: value }))
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }))
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/products" className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Add New Product</h1>
            <p className="text-slate-500">Fill in the product details below</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Product Title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g., Passenger Elevator Cabin"
                  error={errors.title}
                  required
                />
                <Input
                  label="Slug (URL)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated from title"
                  error={errors.slug}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Category"
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                  options={categories}
                  error={errors.category}
                />
                <Select
                  label="Status"
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                  options={statuses}
                />
                <Input
                  label="Display Order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  min={1}
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Description */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Description & Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                rows={4}
              />
              <Textarea
                label="Key Features (one per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                rows={4}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Media */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Media & Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Main Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
              <Textarea
                label="Gallery Images (one URL per line)"
                value={formData.gallery}
                onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                placeholder="https://image1.jpg&#10;https://image2.jpg"
                rows={3}
              />
              <Textarea
                label="Technical Specifications (JSON or formatted text)"
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                placeholder='{"capacity": "1000kg", "speed": "2.5m/s", "floors": "20"}'
                rows={4}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Link href="/dashboard/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="ml-auto">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Create Product
          </Button>
        </motion.div>
      </form>
    </div>
  )
}