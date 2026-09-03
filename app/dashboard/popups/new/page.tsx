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

const popupTypes = [
  { value: 'modal', label: 'Modal' },
  { value: 'banner', label: 'Banner' },
  { value: 'slide-in', label: 'Slide-in' },
  { value: 'fullscreen', label: 'Fullscreen' },
]

const triggers = [
  { value: 'onLoad', label: 'On Page Load' },
  { value: 'onScroll', label: 'On Scroll' },
  { value: 'onExit', label: 'On Exit Intent' },
  { value: 'onClick', label: 'On Click' },
  { value: 'timer', label: 'Timer' },
]

const statuses = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'archived', label: 'Archived' },
]

const devices = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'tablet', label: 'Tablet' },
]

export default function NewPopupPage() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'modal',
    trigger: 'onLoad',
    triggerConfig: { delay: 0, scrollPercentage: 50, selector: '' },
    content: {
      headline: '',
      subheadline: '',
      body: '',
      image: '',
      primaryCTA: { text: '', url: '', style: 'primary' },
      secondaryCTA: { text: '', url: '', style: 'secondary' },
    },
    targeting: {
      paths: ['/'],
      countries: [],
      devices: ['desktop', 'mobile'],
      userSegments: [],
      showOnce: true,
      frequencyCap: 30,
    },
    schedule: {
      startDate: '',
      endDate: '',
      timezone: 'Asia/Shanghai',
    },
    isActive: true,
    priority: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.trigger) newErrors.trigger = 'Trigger is required'
    if (Object.keys(newErrors).length > 0) {
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
    setIsLoading(false)
    window.location.href = '/dashboard/popups'
  }

  const handlePathsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const paths = e.target.value.split('\n').map(p => p.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, targeting: { ...prev.targeting, paths } }))
  }

  const handleDevicesChange = (device: string) => {
    setFormData(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        devices: prev.targeting.devices.includes(device)
          ? prev.targeting.devices.filter(d => d !== device)
          : [...prev.targeting.devices, device]
      }
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/popups" className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Create New Popup</h1>
            <p className="text-slate-500">Configure your popup or banner</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Popup Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Summer Promotion 2024"
                error={errors.title}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Popup Type"
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                  options={popupTypes}
                  error={errors.type}
                />
                <Select
                  label="Trigger"
                  value={formData.trigger}
                  onValueChange={(v) => setFormData({ ...formData, trigger: v })}
                  options={triggers}
                  error={errors.trigger}
                />
                <Select
                  label="Status"
                  value={formData.isActive ? 'active' : 'draft'}
                  onValueChange={(v) => setFormData({ ...formData, isActive: v === 'active' })}
                  options={statuses}
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Trigger Configuration */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Trigger Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Delay (seconds)"
                  type="number"
                  value={formData.triggerConfig.delay}
                  onChange={(e) => setFormData({ ...formData, triggerConfig: { ...formData.triggerConfig, delay: parseInt(e.target.value) || 0 } })}
                  min={0}
                />
                <Input
                  label="Scroll %"
                  type="number"
                  value={formData.triggerConfig.scrollPercentage}
                  onChange={(e) => setFormData({ ...formData, triggerConfig: { ...formData.triggerConfig, scrollPercentage: parseInt(e.target.value) || 50 } })}
                  min={0}
                  max={100}
                />
                <Input
                  label="Click Selector"
                  value={formData.triggerConfig.selector}
                  onChange={(e) => setFormData({ ...formData, triggerConfig: { ...formData.triggerConfig, selector: e.target.value } })}
                  placeholder=".btn-cta"
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Content */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Popup Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Headline"
                value={formData.content.headline}
                onChange={(e) => setFormData({ ...formData, content: { ...formData.content, headline: e.target.value } })}
                placeholder="Main headline"
              />
              <Input
                label="Subheadline"
                value={formData.content.subheadline}
                onChange={(e) => setFormData({ ...formData, content: { ...formData.content, subheadline: e.target.value } })}
                placeholder="Supporting text"
              />
              <Textarea
                label="Body Text"
                value={formData.content.body}
                onChange={(e) => setFormData({ ...formData, content: { ...formData.content, body: e.target.value } })}
                placeholder="Main content..."
                rows={4}
              />
              <Input
                label="Image URL"
                value={formData.content.image}
                onChange={(e) => setFormData({ ...formData, content: { ...formData.content, image: e.target.value } })}
                placeholder="https://..."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Primary CTA</label>
                  <div className="space-y-2">
                    <Input
                      label="Text"
                      value={formData.content.primaryCTA.text}
                      onChange={(e) => setFormData({ ...formData, content: { ...formData.content, primaryCTA: { ...formData.content.primaryCTA, text: e.target.value } } })}
                      placeholder="Get Started"
                    />
                    <Input
                      label="URL"
                      value={formData.content.primaryCTA.url}
                      onChange={(e) => setFormData({ ...formData, content: { ...formData.content, primaryCTA: { ...formData.content.primaryCTA, url: e.target.value } } })}
                      placeholder="/contact"
                    />
                    <Select
                      label="Style"
                      value={formData.content.primaryCTA.style}
                      onValueChange={(v) => setFormData({ ...formData, content: { ...formData.content, primaryCTA: { ...formData.content.primaryCTA, style: v } } })}
                      options={[
                        { value: 'primary', label: 'Primary' },
                        { value: 'secondary', label: 'Secondary' },
                        { value: 'ghost', label: 'Ghost' },
                      ]}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Secondary CTA</label>
                  <div className="space-y-2">
                    <Input
                      label="Text"
                      value={formData.content.secondaryCTA.text}
                      onChange={(e) => setFormData({ ...formData, content: { ...formData.content, secondaryCTA: { ...formData.content.secondaryCTA, text: e.target.value } } })}
                      placeholder="Learn More"
                    />
                    <Input
                      label="URL"
                      value={formData.content.secondaryCTA.url}
                      onChange={(e) => setFormData({ ...formData, content: { ...formData.content, secondaryCTA: { ...formData.content.secondaryCTA, url: e.target.value } } })}
                      placeholder="/about"
                    />
                    <Select
                      label="Style"
                      value={formData.content.secondaryCTA.style}
                      onValueChange={(v) => setFormData({ ...formData, content: { ...formData.content, secondaryCTA: { ...formData.content.secondaryCTA, style: v } } })}
                      options={[
                        { value: 'primary', label: 'Primary' },
                        { value: 'secondary', label: 'Secondary' },
                        { value: 'ghost', label: 'Ghost' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Targeting */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Targeting Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                label="URL Paths (one per line)"
                value={formData.targeting.paths.join('\n')}
                onChange={(e) => {
                  const paths = e.target.value.split('\n').map(p => p.trim()).filter(Boolean)
                  setFormData(prev => ({ ...prev, targeting: { ...prev.targeting, paths } }))
                }}
                placeholder="/\n/products\n/contact"
                rows={3}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Devices</label>
                  <div className="flex flex-wrap gap-2">
                    {devices.map(device => (
                      <label key={device.value} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
                        <input
                          type="checkbox"
                          value={device.value}
                          checked={formData.targeting.devices.includes(device.value)}
                          onChange={() => {
                            const devices = formData.targeting.devices.includes(device.value)
                              ? formData.targeting.devices.filter(d => d !== device.value)
                              : [...formData.targeting.devices, device.value]
                            setFormData(prev => ({
                              ...prev,
                              targeting: { ...prev.targeting, devices }
                            }))
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-[#0047BB] focus:ring-[#0047BB]"
                        />
                        <span className="text-sm text-slate-600 capitalize">{device.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Input
                  label="Frequency Cap (days)"
                  type="number"
                  value={formData.targeting.frequencyCap}
                  onChange={(e) => setFormData({ ...formData, targeting: { ...formData.targeting, frequencyCap: parseInt(e.target.value) || 30 } })}
                  min={1}
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Schedule */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Start Date"
                  type="datetime-local"
                  value={formData.schedule.startDate}
                  onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, startDate: e.target.value } })}
                />
                <Input
                  label="End Date (optional)"
                  type="datetime-local"
                  value={formData.schedule.endDate}
                  onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, endDate: e.target.value } })}
                />
                <Select
                  label="Timezone"
                  value={formData.schedule.timezone}
                  onValueChange={(v) => setFormData({ ...formData, schedule: { ...formData.schedule, timezone: v } })}
                  options={[
                    { value: 'Asia/Shanghai', label: 'Asia/Shanghai (UTC+8)' },
                    { value: 'UTC', label: 'UTC' },
                    { value: 'America/New_York', label: 'America/New_York (EST)' },
                    { value: 'Europe/London', label: 'Europe/London (GMT)' },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Settings */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Show Once Per Session</label>
                    <p className="text-xs text-slate-400">Don't show again if user closes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.targeting.showOnce}
                    onChange={(e) => setFormData(prev => ({ ...prev, targeting: { ...prev.targeting, showOnce: e.target.checked } }))}
                    className="w-5 h-5 rounded border-slate-300 text-[#0047BB] focus:ring-[#0047BB]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Active</label>
                  <p className="text-xs text-slate-400">Enable this popup</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 text-[#0047BB] focus:ring-[#0047BB]"
                />
              </div>
              <Input
                label="Priority"
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                min={0}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Link href="/dashboard/popups">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="ml-auto">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Create Popup'}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}