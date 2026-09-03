"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Bell,
  MousePointer,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

const mockPopups = [
  { 
    id: '1', 
    title: 'Summer Promotion 2024', 
    type: 'modal', 
    trigger: 'onLoad', 
    status: 'active', 
    priority: 1, 
    schedule: { start: '2024-06-01', end: '2024-08-31' }, 
    targeting: { paths: ['/'], devices: ['desktop', 'mobile'] },
    analytics: { impressions: 12500, clicks: 847, conversions: 23 },
  },
  { 
    id: '2', 
    title: 'Newsletter Signup', 
    type: 'slide-in', 
    trigger: 'onScroll', 
    triggerConfig: { scrollPercentage: 60 },
    status: 'active', 
    priority: 2, 
    schedule: { start: '2024-01-01', end: null }, 
    targeting: { paths: ['/products', '/about'], devices: ['desktop', 'mobile'] },
    analytics: { impressions: 8200, clicks: 421, conversions: 89 },
  },
  { 
    id: '3', 
    title: 'Exit Intent - Quote Request', 
    type: 'modal', 
    trigger: 'onExit', 
    status: 'draft', 
    priority: 3, 
    schedule: { start: '2024-02-01', end: '2024-12-31' }, 
    targeting: { paths: ['/products/*'], devices: ['desktop'] },
    analytics: { impressions: 0, clicks: 0, conversions: 0 },
  },
  { 
    id: '4', 
    title: 'Maintenance Notice Banner', 
    type: 'banner', 
    trigger: 'onLoad', 
    status: 'scheduled', 
    priority: 0, 
    schedule: { start: '2024-02-15', end: '2024-02-20' }, 
    targeting: { paths: ['/dashboard/*'], devices: ['desktop', 'mobile'] },
    analytics: { impressions: 0, clicks: 0, conversions: 0 },
  },
  { 
    id: '5', 
    title: 'Holiday Special Offer', 
    type: 'fullscreen', 
    trigger: 'timer', 
    triggerConfig: { delay: 30 },
    status: 'archived', 
    priority: 4, 
    schedule: { start: '2023-12-01', end: '2023-12-31' }, 
    targeting: { paths: ['/'], devices: ['desktop', 'mobile'] },
    analytics: { impressions: 45000, clicks: 2100, conversions: 156 },
  },
]

const statuses = ['All Status', 'active', 'draft', 'scheduled', 'archived']
const types = ['All Types', 'modal', 'banner', 'slide-in', 'fullscreen']
const triggers = ['All Triggers', 'onLoad', 'onScroll', 'onExit', 'onClick', 'timer']

const typeLabels: Record<string, string> = {
  modal: 'Modal',
  banner: 'Banner',
  'slide-in': 'Slide-in',
  fullscreen: 'Fullscreen',
}

export default function PopupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedType, setSelectedType] = useState("All Types")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)

  const filteredPopups = mockPopups
    .filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus === "All Status" || p.status === selectedStatus) &&
      (selectedType === "All Types" || p.type === selectedType)
    )

  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    draft: { variant: 'warning' as const, label: 'Draft' },
    scheduled: { variant: 'info' as const, label: 'Scheduled' },
    archived: { variant: 'neutral' as const, label: 'Archived' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Popups & Banners</h1>
            <p className="text-slate-500 mt-1">Manage website popups, banners, and promotional messages</p>
          </div>
          <Button onClick={() => window.location.href = '/dashboard/popups/new'}>
            <Plus className="w-4 h-4 mr-2" />
            Create Popup
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
                  placeholder="Search popups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus} className="w-40">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType} className="w-40">
                {types.map(t => <option key={t} value={t}>{typeLabels[t] || t}</option>)}
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popups Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card variant="elevated">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Popup</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Schedule</TableHead>
                    <TableHead className="hidden lg:table-cell">Analytics</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {filteredPopups.map((popup, index) => (
                      <motion.tr
                        key={popup.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TableCell className="font-mono text-slate-500">{popup.id}</TableCell>
                        <TableCell>
                          <div className="font-medium text-[#0f172a]">{popup.title}</div>
                          <div className="text-xs text-slate-500">Priority: {popup.priority}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="info" className="text-xs capitalize">{typeLabels[popup.type] || popup.type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500 capitalize">{popup.trigger.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[popup.status as keyof typeof statusConfig]?.variant || 'neutral'}>
                            {statusConfig[popup.status as keyof typeof statusConfig]?.label || popup.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-slate-500">
                          {popup.schedule.start} {popup.schedule.end ? `→ ${popup.schedule.end}` : ' (ongoing)'}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-slate-500">
                          <div className="flex gap-2 text-xs">
                            <span className="text-slate-400">{popup.analytics.impressions.toLocaleString()} views</span>
                            <span className="text-slate-400">{popup.analytics.clicks.toLocaleString()} clicks</span>
                            <span className="text-slate-400">{popup.analytics.conversions} conv.</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" onClick={() => window.location.href = `/dashboard/popups/${popup.id}`} aria-label="View">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => setEditingId(popup.id)} aria-label="Edit">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" aria-label="Delete" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
        <p className="text-sm text-slate-500">Showing {filteredPopups.length} of {mockPopups.length} popups</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={currentPage >= 3} onClick={() => setCurrentPage(p => p + 1)}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}