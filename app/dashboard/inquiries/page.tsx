"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Mail, 
  MessageSquare,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Reply,
  Archive,
  Flag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

const mockInquiries = [
  { id: 'INQ-001', name: 'John Smith', email: 'john@acme.com', phone: '+1 555-0123', subject: 'Passenger Elevator Quote Request', status: 'new', source: 'contact', createdAt: '2024-01-15 10:30', assignedTo: null },
  { id: 'INQ-002', name: 'Sarah Chen', email: 'sarah@buildcorp.com', phone: '+1 555-0124', subject: 'Home Elevator Installation Inquiry', status: 'reading', source: 'cta', createdAt: '2024-01-15 09:15', assignedTo: 'Mike Johnson' },
  { id: 'INQ-003', name: 'Robert Brown', email: 'robert@hospital.org', phone: '+1 555-0125', subject: 'Hospital Bed Elevator Requirements', status: 'replied', source: 'contact', createdAt: '2024-01-14 16:45', assignedTo: 'Sarah Wilson' },
  { id: 'INQ-004', name: 'Maria Garcia', email: 'maria@malldev.com', phone: '+1 555-0126', subject: 'Escalator Maintenance Contract', status: 'closed', source: 'popup', createdAt: '2024-01-14 11:20', assignedTo: 'Mike Johnson' },
  { id: 'INQ-005', name: 'David Kim', email: 'david@retailgroup.com', phone: '+1 555-0127', subject: 'Freight Elevator for Warehouse', status: 'new', source: 'cta', createdAt: '2024-01-14 08:00', assignedTo: null },
  { id: 'INQ-006', name: 'Lisa Wong', email: 'lisa@hotelgroup.com', phone: '+1 555-0128', subject: 'Panoramic Elevator for Luxury Hotel', status: 'reading', source: 'contact', createdAt: '2024-01-13 14:30', assignedTo: 'Sarah Wilson' },
  { id: 'INQ-007', name: 'James Wilson', email: 'james@parkingco.com', phone: '+1 555-0129', subject: 'Auto Parking System Quote', status: 'replied', source: 'contact', createdAt: '2024-01-13 10:00', assignedTo: 'Mike Johnson' },
  { id: 'INQ-008', name: 'Emily Davis', email: 'emily@transit.gov', phone: '+1 555-0130', subject: 'Platform Screen Doors Project', status: 'new', source: 'cta', createdAt: '2024-01-12 16:00', assignedTo: null },
]

const statuses = ['All Status', 'new', 'reading', 'replied', 'closed']
const sources = ['All Sources', 'contact', 'cta', 'popup']

const statusConfig = {
  new: { variant: 'info' as const, label: 'New' },
  reading: { variant: 'warning' as const, label: 'Reading' },
  replied: { variant: 'success' as const, label: 'Replied' },
  closed: { variant: 'neutral' as const, label: 'Closed' },
}

const sourceLabels: Record<string, string> = {
  contact: 'Contact Form',
  cta: 'Get a Quote',
  popup: 'Popup',
}

const handleStatusChange = (id: string, newStatus: string) => {
  const idx = mockInquiries.findIndex(i => i.id === id)
  if (idx !== -1) mockInquiries[idx].status = newStatus as any
}

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const filteredInquiries = mockInquiries
    .filter(i => 
      (i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
       i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
       i.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedStatus === "All Status" || i.status === selectedStatus) &&
      (selectedSource === "All Sources" || i.source === selectedSource)
    )

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Inquiries</h1>
            <p className="text-slate-500 mt-1">Manage customer inquiries and messages</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus} className="w-40">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              <Select value={selectedSource} onValueChange={setSelectedSource} className="w-40">
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card variant="elevated">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Subject</TableHead>
                    <TableHead className="hidden sm:table-cell">Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Assigned</TableHead>
                    <TableHead className="w-48">Created</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry, index) => (
                    <motion.tr
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={expandedId === inquiry.id ? 'bg-blue-50/50' : ''}
                    >
                      <TableCell>
                        <button
                          onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                          className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label={expandedId === inquiry.id ? 'Collapse' : 'Expand'}
                        >
                          {expandedId === inquiry.id ? <ChevronRight className="w-5 h-5 rotate-90" /> : <ChevronRight className="w-5 h-5" />}
                        </button>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-medium text-[#0f172a]">{inquiry.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-[#0f172a]">{inquiry.name}</p>
                          <p className="text-sm text-slate-500">{inquiry.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="text-sm text-[#0f172a] truncate max-w-xs">{inquiry.subject}</p>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="info" className="text-xs">{sourceLabels[inquiry.source] || inquiry.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig[inquiry.status as keyof typeof statusConfig].variant}>
                          {statusConfig[inquiry.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-slate-500">
                        {inquiry.assignedTo || <span className="text-slate-300">Unassigned</span>}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500 whitespace-nowrap">{inquiry.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => window.location.href = `/dashboard/inquiries/${inquiry.id}`}
                            className="p-1.5 rounded text-slate-400 hover:text-[#0047BB] hover:bg-slate-100 transition-colors"
                            aria-label="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setReplyingTo(inquiry.id); setReplyContent("") }}
                            className="p-1.5 rounded text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                            aria-label="Reply"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(inquiry.id, 'closed')}
                            className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}