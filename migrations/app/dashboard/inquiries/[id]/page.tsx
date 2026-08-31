'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Send, Mail, Phone, Building, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface Reply {
  message: string
  sentBy: 'admin' | 'user'
  timestamp: string
}

interface Inquiry {
  _id: string
  name: string
  email: string
  phone: string
  company: string
  country: string
  city: string
  subject: string
  message: string
  projectType: string
  floors: string
  units: string
  source: string
  status: string
  replies: Reply[]
  createdAt: string
}

export default function InquiryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetch(`/api/inquiries?id=${params.id}`)
      .then(r => r.json())
      .then(data => {
        setInquiry(data.inquiry)
        setLoading(false)
        // Mark as read
        if (data.inquiry?.status === 'new') {
          fetch(`/api/inquiries?id=${params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'read' }),
          })
        }
      })
      .catch(() => setLoading(false))
  }, [params.id])

  const handleReply = async () => {
    if (!reply.trim() || !inquiry) return
    setSending(true)
    try {
      const res = await fetch(`/api/inquiries/${inquiry._id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply }),
      })
      const data = await res.json()
      if (data.inquiry) {
        setInquiry(data.inquiry)
        setReply('')
      }
    } catch {
      alert('Failed to send reply')
    }
    setSending(false)
  }

  const updateStatus = async (status: string) => {
    if (!inquiry) return
    setUpdating(true)
    try {
      await fetch(`/api/inquiries?id=${inquiry._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setInquiry({ ...inquiry, status })
    } catch {
      alert('Failed to update status')
    }
    setUpdating(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#0047BB] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!inquiry) {
    return (
      <div className="text-center py-12">
        <p className="text-[#64748b]">Inquiry not found</p>
        <Link href="/dashboard/inquiries" className="text-[#0047BB] text-sm hover:underline mt-2 inline-block">
          Back to inquiries
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/inquiries"
          className="p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#0f172a]">Inquiry from {inquiry.name}</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{inquiry.email}</p>
        </div>
        <div className="flex gap-2">
          <select
            value={inquiry.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={updating}
            className="px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
          >
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-[#0f172a]">Contact Details</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-[#94a3b8]" />
              <span className="text-[#64748b]">{inquiry.email}</span>
            </div>
            {inquiry.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-[#94a3b8]" />
                <span className="text-[#64748b]">{inquiry.phone}</span>
              </div>
            )}
            {inquiry.company && (
              <div className="flex items-center gap-3 text-sm">
                <Building size={16} className="text-[#94a3b8]" />
                <span className="text-[#64748b]">{inquiry.company}</span>
              </div>
            )}
            {(inquiry.country || inquiry.city) && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-[#94a3b8]" />
                <span className="text-[#64748b]">{[inquiry.city, inquiry.country].filter(Boolean).join(', ')}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-[#94a3b8]" />
              <span className="text-[#64748b]">{new Date(inquiry.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f1f5f9] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#94a3b8]">Source</span>
              <span className="text-[#0f172a] capitalize">{inquiry.source || 'Unknown'}</span>
            </div>
            {inquiry.projectType && (
              <div className="flex justify-between text-sm">
                <span className="text-[#94a3b8]">Project Type</span>
                <span className="text-[#0f172a]">{inquiry.projectType}</span>
              </div>
            )}
            {inquiry.floors && (
              <div className="flex justify-between text-sm">
                <span className="text-[#94a3b8]">Floors</span>
                <span className="text-[#0f172a]">{inquiry.floors}</span>
              </div>
            )}
            {inquiry.units && (
              <div className="flex justify-between text-sm">
                <span className="text-[#94a3b8]">Units</span>
                <span className="text-[#0f172a]">{inquiry.units}</span>
              </div>
            )}
          </div>
        </div>

        {/* Message & Replies */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Message */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
            <h2 className="font-semibold text-[#0f172a] mb-2">Message</h2>
            {inquiry.subject && (
              <p className="text-sm font-medium text-[#0f172a] mb-2">Re: {inquiry.subject}</p>
            )}
            <p className="text-sm text-[#64748b] whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          {/* Replies */}
          {inquiry.replies && inquiry.replies.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-[#0f172a]">Replies ({inquiry.replies.length})</h2>
              {inquiry.replies.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 ${
                    r.sentBy === 'admin'
                      ? 'bg-[#e8f0fe] border border-[#bfdbfe] ml-8'
                      : 'bg-white border border-[#e2e8f0] mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#64748b] capitalize">{r.sentBy}</span>
                    <span className="text-xs text-[#94a3b8]">{new Date(r.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-[#0f172a] whitespace-pre-wrap">{r.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reply Form */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
            <h2 className="font-semibold text-[#0f172a] mb-3">Reply</h2>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="Type your reply..."
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB] resize-none mb-3"
            />
            <div className="flex justify-end">
              <button
                onClick={handleReply}
                disabled={sending || !reply.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0047BB] text-white text-sm font-semibold rounded-lg hover:bg-[#003da0] transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                {sending ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
