'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

interface Popup {
  _id: string
  title: string
  type: string
  content: string
  active: boolean
  frequency: string
}

export default function PopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    type: 'timed',
    content: '',
    ctaText: '',
    ctaLink: '',
    active: true,
    frequency: 'every-visit',
    delay: 5,
  })

  useEffect(() => {
    fetch('/api/popups')
      .then(r => r.json())
      .then(data => setPopups(data.popups || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/popups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.popup) {
        setPopups([...popups, data.popup])
        setShowForm(false)
        setForm({ title: '', type: 'timed', content: '', ctaText: '', ctaLink: '', active: true, frequency: 'every-visit', delay: 5 })
      }
    } catch {
      alert('Failed to create popup')
    }
  }

  const toggleActive = async (popup: Popup) => {
    try {
      await fetch('/api/popups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: popup._id, active: !popup.active }),
      })
      setPopups(popups.map(p => p._id === popup._id ? { ...p, active: !p.active } : p))
    } catch {
      alert('Failed to update popup')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this popup?')) return
    try {
      await fetch(`/api/popups?id=${id}`, { method: 'DELETE' })
      setPopups(popups.filter(p => p._id !== id))
    } catch {
      alert('Failed to delete popup')
    }
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
          <h1 className="text-2xl font-bold text-[#0f172a]">Popups & Banners</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage website popups and announcement bars</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0047BB] text-white text-sm font-semibold rounded-lg hover:bg-[#003da0] transition-colors"
        >
          <Plus size={16} />
          New Popup
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 space-y-4 animate-fade-in">
          <h2 className="font-semibold text-[#0f172a]">Create Popup</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
                placeholder="Popup title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
              >
                <option value="timed">Timed</option>
                <option value="exit-intent">Exit Intent</option>
                <option value="scroll">Scroll Triggered</option>
                <option value="banner">Banner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 resize-none"
              placeholder="Popup content..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">CTA Text</label>
              <input
                type="text"
                value={form.ctaText}
                onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
                placeholder="Button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">CTA Link</label>
              <input
                type="text"
                value={form.ctaLink}
                onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
                placeholder="/contact"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-[#64748b] hover:bg-[#f1f5f9] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-[#0047BB] text-white text-sm font-semibold rounded-lg hover:bg-[#003da0] transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Popups List */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
        {popups.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-[#94a3b8]">No popups created yet</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f1f5f9]">
            {popups.map((popup) => (
              <div key={popup._id} className="flex items-center justify-between px-6 py-4 hover:bg-[#f8fafc] transition-colors">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleActive(popup)}>
                    {popup.active ? (
                      <ToggleRight size={28} className="text-[#16a34a]" />
                    ) : (
                      <ToggleLeft size={28} className="text-[#94a3b8]" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-sm font-medium text-[#0f172a]">{popup.title}</h3>
                    <p className="text-xs text-[#94a3b8] capitalize">{popup.type} · {popup.frequency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(popup._id)}
                    className="p-2 text-[#dc2626] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
