"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, User, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle, Flag, Archive, Reply } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'

const mockInquiry = {
  id: 'INQ-001',
  name: 'John Smith',
  email: 'john@acme.com',
  phone: '+1 555-0123',
  country: 'USA',
  city: 'New York',
  subject: 'Passenger Elevator Quote Request',
  message: 'We are looking for passenger elevators for a 20-story commercial building in downtown Manhattan. Need 4 elevators with 1600kg capacity, 2.5m/s speed. Please provide quotation including installation and maintenance for 5 years.',
  company: 'Acme Construction',
  projectType: 'Commercial Building',
  floors: '20',
  units: '4',
  source: 'contact',
  status: 'new',
  createdAt: '2024-01-15 10:30',
  updatedAt: '2024-01-15 10:30',
  assignedTo: null as string | null,
  replies: [
    { id: 1, message: 'Thank you for your inquiry. We will prepare a detailed quotation and send it within 2 business days.', sentBy: 'Mike Johnson', sentAt: '2024-01-15 11:00', isInternal: false },
    { id: 2, message: 'Client requested clarification on maintenance terms. Need to follow up.', sentBy: 'Mike Johnson', sentAt: '2024-01-15 14:30', isInternal: true },
  ]
}

const statuses = ['new', 'reading', 'replied', 'closed']

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

export default function InquiryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const inquiryId = params.id as string

  const [inquiry, setInquiry] = useState(mockInquiry)
  const [replyContent, setReplyContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 500))
    setInquiry(prev => ({ ...prev, status: newStatus as any, updatedAt: new Date().toLocaleString() }))
    setIsLoading(false)
    setMessage({ type: 'success', text: `Status updated to ${statusConfig[newStatus as keyof typeof statusConfig].label}` })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleReply = async () => {
    if (!replyContent.trim()) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const newReply = {
      id: inquiry.replies.length + 1,
      message: replyContent,
      sentBy: 'Current Admin',
      sentAt: new Date().toLocaleString(),
      isInternal: false,
    }
    setInquiry(prev => ({
      ...prev,
      replies: [...prev.replies, newReply],
      status: 'replied',
      updatedAt: new Date().toLocaleString(),
    }))
    setReplyContent("")
    setIsLoading(false)
    setMessage({ type: 'success', text: 'Reply sent successfully' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleAssign = async (userId: string) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 300))
    setInquiry(prev => ({ ...prev, assignedTo: userId, updatedAt: new Date().toLocaleString() }))
    setIsLoading(false)
    setMessage({ type: 'success', text: 'Assigned successfully' })
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Link
            href="/dashboard/inquiries"
            className="flex items-center gap-2 p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Inquiries</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0f172a]">{inquiry.subject}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={statusConfig[inquiry.status as keyof typeof statusConfig].variant}>
                {statusConfig[inquiry.status as keyof typeof statusConfig].label}
              </Badge>
              <Badge variant="info">{sourceLabels[inquiry.source] || inquiry.source}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={inquiry.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isLoading}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{statusConfig[s as keyof typeof statusConfig].label}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card variant="elevated">
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0f172a]">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                  <p className="text-[#0f172a]">{inquiry.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                  <a href={`mailto:${inquiry.email}`} className="text-[#0047BB] hover:underline">{inquiry.email}</a>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                  <a href={`tel:${inquiry.phone}`} className="text-[#0047BB] hover:underline">{inquiry.phone}</a>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Company</label>
                  <p className="text-[#0f172a]">{inquiry.company || '—'}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-lg font-semibold text-[#0f172a]">Subject</h3>
              <p className="text-[#0f172a] mt-1">{inquiry.subject}</p>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-lg font-semibold text-[#0f172a]">Message</h3>
              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 whitespace-pre-wrap mt-1">
                {inquiry.message}
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-lg font-semibold text-[#0f172a]">Location</h3>
              <p className="text-[#0f172a] flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                {inquiry.city}, {inquiry.country}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reply Section */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Send Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              label="Your Reply"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
              rows={4}
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0047BB] focus:ring-[#0047BB]" />
                <span>Internal note (not visible to customer)</span>
              </label>
            </div>
            <Button onClick={handleReply} disabled={isLoading || !replyContent.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Send Reply'}
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}