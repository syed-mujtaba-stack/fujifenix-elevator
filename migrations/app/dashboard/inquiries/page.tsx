'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Eye, MessageSquare } from 'lucide-react'

interface Inquiry {
  _id: string
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  source: string
  status: string
  createdAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/inquiries')
      .then(r => r.json())
      .then(data => setInquiries(data.inquiries || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = inquiries.filter(i => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      (i.subject || '').toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || i.status === filter
    return matchesSearch && matchesFilter
  })

  const statusCounts = {
    all: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    read: inquiries.filter(i => i.status === 'read').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
    archived: inquiries.filter(i => i.status === 'archived').length,
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
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Inquiries</h1>
        <p className="text-sm text-[#64748b] mt-1">Manage customer inquiries and responses</p>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'new', 'read', 'replied', 'archived'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-[#0047BB] text-white'
                : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">({statusCounts[status]})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center bg-white border border-[#e2e8f0] rounded-lg px-4 py-2.5 w-full sm:w-96">
        <Search size={16} className="text-[#94a3b8] mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or subject..."
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden md:table-cell">Subject</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden lg:table-cell">Source</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filtered.map((inquiry) => (
                <tr key={inquiry._id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#f1f5f9] flex items-center justify-center text-sm font-bold text-[#64748b] shrink-0">
                        {inquiry.name?.charAt(0) || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#0f172a] truncate">{inquiry.name}</p>
                        <p className="text-xs text-[#94a3b8] truncate">{inquiry.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-[#64748b] truncate max-w-[200px]">{inquiry.subject || 'No subject'}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs bg-[#f8fafc] text-[#64748b] px-2 py-1 rounded capitalize">
                      {inquiry.source || 'unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium capitalize ${
                        inquiry.status === 'new'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : inquiry.status === 'replied'
                          ? 'bg-[#dcfce7] text-[#166534]'
                          : inquiry.status === 'archived'
                          ? 'bg-[#f1f5f9] text-[#64748b]'
                          : 'bg-[#e0e7ff] text-[#3730a3]'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-xs text-[#94a3b8]">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/inquiries/${inquiry._id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0047BB] bg-[#e8f0fe] rounded-lg hover:bg-[#d0e0fc] transition-colors"
                    >
                      <Eye size={12} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={32} className="mx-auto text-[#94a3b8] mb-3" />
            <p className="text-sm text-[#94a3b8]">No inquiries found</p>
          </div>
        )}
      </div>
    </div>
  )
}
