"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown,
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Loader2,
  X,
} from "lucide-react"
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

const products = [
  { id: '1', title: 'Passenger Elevator Cabin', category: 'Elevators', status: 'active', order: 1, updated: '2024-01-15' },
  { id: '2', title: 'Home Elevators', category: 'Elevators', status: 'active', order: 2, updated: '2024-01-14' },
  { id: '3', title: 'High-Speed Elevators', category: 'Elevators', status: 'active', order: 3, updated: '2024-01-13' },
  { id: '4', title: 'Panoramic Elevators', category: 'Elevators', status: 'draft', order: 4, updated: '2024-01-12' },
  { id: '5', title: 'Hospital Bed Elevators', category: 'Elevators', status: 'active', order: 5, updated: '2024-01-11' },
  { id: '6', title: 'Freight Elevators', category: 'Elevators', status: 'active', order: 6, updated: '2024-01-10' },
  { id: '7', title: 'Car Elevators', category: 'Elevators', status: 'active', order: 7, updated: '2024-01-09' },
  { id: '8', title: 'Escalators', category: 'Escalators & Moving Walks', status: 'active', order: 1, updated: '2024-01-08' },
  { id: '9', title: 'Trolley Escalators', category: 'Escalators & Moving Walks', status: 'draft', order: 2, updated: '2024-01-07' },
  { id: '10', title: 'Moving Walks', category: 'Escalators & Moving Walks', status: 'active', order: 3, updated: '2024-01-06' },
  { id: '11', title: 'Marine Elevators', category: 'Specialized Elevator Solutions', status: 'active', order: 1, updated: '2024-01-05' },
  { id: '12', title: 'Circular Elevators', category: 'Specialized Elevator Solutions', status: 'draft', order: 2, updated: '2024-01-04' },
  { id: '13', title: 'Platform / Stair Lifts', category: 'Specialized Elevator Solutions', status: 'active', order: 3, updated: '2024-01-03' },
  { id: '14', title: 'Dumbwaiters', category: 'Specialized Elevator Solutions', status: 'active', order: 4, updated: '2024-01-02' },
  { id: '15', title: 'Customized Elevators', category: 'Specialized Elevator Solutions', status: 'active', order: 5, updated: '2024-01-01' },
  { id: '16', title: 'Auto Car Parking Systems', category: 'Transportation & Infrastructure', status: 'active', order: 1, updated: '2023-12-28' },
  { id: '17', title: 'Platform Screen Doors', category: 'Transportation & Infrastructure', status: 'draft', order: 2, updated: '2023-12-27' },
]

const categories = [
  'All Categories',
  'Elevators',
  'Escalators & Moving Walks',
  'Specialized Elevator Solutions',
  'Transportation & Infrastructure',
]

const statuses = ['All Status', 'active', 'draft', 'archived']

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [sortBy, setSortBy] = useState("order")
  const [sortOrder, setSortOrder] = useState("asc")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: "", category: "", status: "", order: 1 })
  const [isLoading, setIsLoading] = useState(false)

  const filteredProducts = products
    .filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All Categories" || p.category === selectedCategory) &&
      (selectedStatus === "All Status" || p.status === selectedStatus)
    )
    .sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a]
      const bVal = b[sortBy as keyof typeof b]
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  const handleEdit = (product: typeof products[0]) => {
    setEditingId(product.id)
    setEditForm({
      title: product.title,
      category: product.category,
      status: product.status,
      order: product.order,
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 500))
    // Update product in state
    const idx = products.findIndex(p => p.id === editingId)
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...editForm }
    }
    setEditingId(null)
    setIsLoading(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const idx = products.findIndex(p => p.id === id)
      if (idx !== -1) products.splice(idx, 1)
    }
  }

  const statusVariants: Record<string, { variant: BadgeProps['variant'] }> = {
    active: { variant: 'success' },
    draft: { variant: 'warning' },
    archived: { variant: 'neutral' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Products</h1>
            <p className="text-slate-500 mt-1">Manage all products across categories</p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/products/new'}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} className="w-48">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus} className="w-40">
                {statuses.map(st => <option key={st} value={st}>{st}</option>)}
              </Select>
              <Select value={sortBy} onValueChange={setSortBy} className="w-40">
                <option value="order">Order</option>
                <option value="title">Title</option>
                <option value="updated">Last Updated</option>
              </Select>
              <Button variant="ghost" size="icon" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? <ChevronDown className="w-4 h-4 rotate-180" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card variant="elevated">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-40">Order</TableHead>
                    <TableHead className="hidden lg:table-cell">Updated</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TableCell className="font-mono text-slate-500">{product.order}</TableCell>
                        <TableCell>
                          <div className="font-medium text-[#0f172a]">{product.title}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="info" className="text-xs">{product.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariants[product.status]?.variant || 'neutral'}>
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <input
                              type="number"
                              value={editForm.order}
                              onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) })}
                              className="w-20 px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]"
                            />
                          ) : (
                            <span className="font-mono text-slate-500">{product.order}</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-slate-500 text-sm">
                          {product.updated}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {editingId === product.id ? (
                              <>
                                <Button size="sm" variant="primary" onClick={handleSave} disabled={isLoading}>
                                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save</span>}
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(product)} aria-label="Edit">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => window.location.href = `/dashboard/products/${product.id}`} aria-label="View">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <div className="relative">
                                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); }} aria-label="More">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pagination */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Showing {filteredProducts.length} of {products.length} products</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </motion.div>
    </div>
  )
}