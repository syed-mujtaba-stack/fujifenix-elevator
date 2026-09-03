"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const mockProduct = {
  id: '1',
  title: 'Passenger Elevator Cabin',
  slug: 'passenger-elevator-cabin',
  category: 'elevators',
  status: 'active',
  order: 1,
  description: 'High-performance passenger elevator cabin with modern design and advanced safety features.',
  features: 'VVVF Drive Control\nEnergy-Efficient Operation\nSmooth, Quiet Ride\nCustom Cabin Finishes\nInternational Safety Standards',
  image: '/hero-elevator.jpg',
  gallery: '/Elevators/Passenger Elevator Cabin/img1.jpg\n/Elevators/Passenger Elevator Cabin/img2.jpg',
  specifications: '{"capacity": "1000kg", "speed": "2.5m/s", "floors": "20", "stops": "20"}',
}

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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  const [formData, setFormData] = useState({
    title: mockProduct.title,
    slug: mockProduct.slug,
    category: mockProduct.category,
    status: mockProduct.status,
    order: mockProduct.order,
    description: mockProduct.description,
    features: mockProduct.features,
    image: mockProduct.image,
    gallery: mockProduct.gallery,
    specifications: mockProduct.specifications,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(false)
    setIsEditing(false)
    setMessage({ type: 'success', text: 'Product updated successfully' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setIsLoading(true)
      await new Promise(r => setTimeout(r, 500))
      router.push('/dashboard/products')
    }
  }

  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    draft: { variant: 'warning' as const, label: 'Draft' },
    archived: { variant: 'neutral' as const, label: 'Archived' },
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Link 
            href="/dashboard/products" 
            className="flex items-center gap-2 p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Products</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0f172a]">{formData.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={statusConfig[formData.status as keyof typeof statusConfig]?.variant || 'neutral'}>
                {statusConfig[formData.status as keyof typeof statusConfig]?.label || formData.status}
              </Badge>
              <span className="text-sm text-slate-400">Order: {formData.order}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
            {isEditing && (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Changes'}
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-600 hover:text-red-700">
              <AlertCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Success/Error Message */}
      <AnimatePresence mode="popLayout">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'fixed top-20 right-6 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2',
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            )}
          >
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
        {/* Basic Info */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Basic Information</CardTitle>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Product Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={!isEditing}
                  error={errors.title}
                />
                <Input
                  label="Slug (URL)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  disabled={!isEditing}
                  error={errors.slug}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Category"
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                  disabled={!isEditing}
                  options={categories}
                  error={errors.category}
                />
                <Select
                  label="Status"
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                  disabled={!isEditing}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'draft', label: 'Draft' },
                    { value: 'archived', label: 'Archived' },
                  ]}
                />
                <Input
                  label="Display Order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  min={1}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Description */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Description & Features</CardTitle>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
              <Textarea
                label="Key Features (one per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Media */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Media & Specifications</CardTitle>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Main Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                disabled={!isEditing}
              />
              <Textarea
                label="Gallery Images (one URL per line)"
                value={formData.gallery}
                onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
              <Textarea
                label="Technical Specifications (JSON)"
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Actions */}
        {isEditing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSave} disabled={isLoading} className="ml-auto">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Changes'}
            </Button>
          </motion.div>
        )}
      </form>
    </div>
  )
}