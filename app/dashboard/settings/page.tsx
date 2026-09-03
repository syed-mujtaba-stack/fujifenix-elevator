"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Lock, 
  Shield, 
  Bell, 
  Globe, 
  Palette,
  Database,
  Loader2,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

const timezones = [
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (UTC+8)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York (EST/EDT)' },
  { value: 'Europe/London', label: 'Europe/London (GMT/BST)' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai (UTC+4)' },
  { value: 'Asia/Singapore', label: 'Asia/Singapore (UTC+8)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST/AEDT)' },
]

const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'ar', label: 'Arabic' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@fujifenix.com',
    phone: '+86 157 5725 3279',
    avatar: null,
  })

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [twoFA, setTwoFA] = useState<{
    enabled: boolean
    secret: string | null
    qrCode: string | null
  }>({
    enabled: false,
    secret: null,
    qrCode: null,
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newInquiry: true,
    inquiryReply: true,
    popupAlerts: true,
    systemAlerts: true,
    weeklyDigest: false,
  })

  const [preferences, setPreferences] = useState({
    timezone: 'Asia/Shanghai',
    language: 'en',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    theme: 'light',
  })

  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API', key: 'sk_live_••••••••••••••••', created: '2024-01-15', lastUsed: '2 hours ago', active: true },
    { id: '2', name: 'Development API', key: 'sk_test_••••••••••••••••', created: '2024-01-10', lastUsed: '3 days ago', active: true },
    { id: '3', name: 'Mobile App API', key: 'sk_test_••••••••••••••••', created: '2024-01-05', lastUsed: 'Never', active: false },
  ])

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Database },
  ]

  const handleSave = async (section: string) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(false)
    setMessage({ type: 'success', text: `${section} saved successfully` })
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences</p>
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

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex gap-6 -mb-px" aria-label="Settings sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-[#0047BB] text-[#0047BB]'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Profile Tab */}
      <AnimatePresence mode="popLayout">
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSave('Profile'); }} className="space-y-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-[#0047BB] rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                      {profile.name?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-[#0f172a]">{profile.name}</p>
                      <p className="text-slate-500">{profile.email}</p>
                      <Button variant="outline" size="sm" className="mt-3">Change Avatar</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Changes'}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <div className="space-y-6">
              {/* Change Password */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Current Password"
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    />
                  </div>
                  <Button onClick={() => handleSave('Password')} disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Update Password'}
                  </Button>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                    <div className="flex items-center gap-3">
                      {twoFA.enabled ? (
                        <Badge variant="success">Enabled</Badge>
                      ) : (
                        <Badge variant="neutral">Disabled</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">Add an extra layer of security to your account using an authenticator app.</p>
                  {!twoFA.enabled ? (
                    <div className="space-y-4">
                      <Button onClick={() => { setTwoFA({ ...twoFA, enabled: true, secret: 'JBSWY3DPEHPK3PXP', qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...' }) }}>
                        Enable 2FA
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">Scan QR code with your authenticator app</p>
                        <div className="w-48 h-48 mx-auto bg-slate-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-16 h-16 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500">Secret: <code className="font-mono bg-slate-100 px-2 py-1 rounded">{twoFA.secret}</code></p>
                      </div>
                      <Button variant="outline" onClick={() => setTwoFA({ enabled: false, secret: null, qrCode: null })}>
                        Disable 2FA
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Choose how you want to be notified about activity in your account.</p>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="w-5 h-5 rounded border-slate-300 text-[#0047BB] focus:ring-[#0047BB]"
                        />
                        <div>
                          <p className="font-medium text-[#0f172a] capitalize">{key.replace(/([A-Z])/g, ' $1').replace('Sms', 'SMS')}</p>
                          <p className="text-xs text-slate-400">
                            {key === 'email' && 'Receive email notifications'}
                            {key === 'push' && 'Receive push notifications'}
                            {key === 'newInquiry' && 'New inquiry submissions'}
                            {key === 'inquiryReply' && 'Replies to your inquiries'}
                            {key === 'popupAlerts' && 'Popup performance alerts'}
                            {key === 'systemAlerts' && 'System maintenance alerts'}
                            {key === 'weeklyDigest' && 'Weekly summary email'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={() => handleSave('Notifications')} disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Preferences'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSave('Preferences'); }} className="space-y-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Display & Localization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Select
                      label="Timezone"
                      value={preferences.timezone}
                      onValueChange={(v) => setPreferences({ ...preferences, timezone: v })}
                      options={timezones}
                    />
                    <Select
                      label="Language"
                      value={preferences.language}
                      onValueChange={(v) => setPreferences({ ...preferences, language: v })}
                      options={languages}
                    />
                    <Select
                      label="Date Format"
                      value={preferences.dateFormat}
                      onValueChange={(v) => setPreferences({ ...preferences, dateFormat: v })}
                      options={[
                        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      ]}
                    />
                    <Select
                      label="Time Format"
                      value={preferences.timeFormat}
                      onValueChange={(v) => setPreferences({ ...preferences, timeFormat: v })}
                      options={[
                        { value: '24h', label: '24 Hour' },
                        { value: '12h', label: '12 Hour' },
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Dark Mode</label>
                        <p className="text-xs text-slate-400">Use dark theme (system preference by default)</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.theme === 'dark'}
                        onChange={(e) => setPreferences({ ...preferences, theme: e.target.checked ? 'dark' : 'light' })}
                        className="w-5 h-5 rounded border-slate-300 text-[#0047BB] focus:ring-[#0047BB]"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Preferences'}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </motion.div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <div className="space-y-6">
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>API Keys</CardTitle>
                    <Button onClick={() => setMessage({ type: 'success', text: 'New API key created' })}>
                      <Plus className="w-4 h-4 mr-2" />
                      Generate New Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Key</TableHead>
                          <TableHead className="hidden md:table-cell">Created</TableHead>
                          <TableHead className="hidden md:table-cell">Last Used</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiKeys.map((key) => (
                          <TableRow key={key.id}>
                            <TableCell className="font-medium">{key.name}</TableCell>
                            <TableCell className="font-mono text-sm text-slate-500">{key.key}</TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-slate-500">{key.created}</TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-slate-500">{key.lastUsed}</TableCell>
                            <TableCell>
                              <Badge variant={key.active ? 'success' : 'neutral'}>{key.active ? 'Active' : 'Inactive'}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost" aria-label="Copy key">Copy</Button>
                                <Button size="icon" variant="ghost" aria-label={key.active ? 'Deactivate' : 'Activate'}>
                                  {key.active ? <Shield className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-600" aria-label="Delete">Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}