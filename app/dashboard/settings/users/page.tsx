"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield,
  Mail,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Key,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@fujifenix.com', role: 'superadmin', status: 'active', lastLogin: '2024-01-15 10:30', twoFA: true, createdAt: '2023-06-15' },
  { id: '2', name: 'Mike Johnson', email: 'mike@fujifenix.com', role: 'admin', status: 'active', lastLogin: '2024-01-15 09:15', twoFA: true, createdAt: '2023-08-20' },
  { id: '3', name: 'Sarah Wilson', email: 'sarah@fujifenix.com', role: 'admin', status: 'active', lastLogin: '2024-01-14 16:45', twoFA: false, createdAt: '2023-09-10' },
  { id: '4', name: 'John Chen', email: 'john@fujifenix.com', role: 'editor', status: 'active', lastLogin: '2024-01-15 08:00', twoFA: true, createdAt: '2023-11-05' },
  { id: '5', name: 'Lisa Wong', email: 'lisa@fujifenix.com', role: 'editor', status: 'inactive', lastLogin: '2024-01-10 14:30', twoFA: false, createdAt: '2024-01-02' },
  { id: '6', name: 'Robert Brown', email: 'robert@fujifenix.com', role: 'editor', status: 'pending', lastLogin: 'Never', twoFA: false, createdAt: '2024-01-14' },
]

const roles = ['superadmin', 'admin', 'editor']
const statuses = ['All Status', 'active', 'inactive', 'pending']

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: '' })
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'editor', name: '' })
  const [isLoading, setIsLoading] = useState(false)

  const filteredUsers = mockUsers
    .filter(u => 
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       u.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole === "All Roles" || u.role === selectedRole) &&
      (selectedStatus === "All Status" || u.status === selectedStatus)
    )

  const roleConfig = {
    superadmin: { variant: 'danger' as const, label: 'Super Admin', color: 'bg-red-100 text-red-600' },
    admin: { variant: 'warning' as const, label: 'Admin', color: 'bg-orange-100 text-orange-600' },
    editor: { variant: 'info' as const, label: 'Editor', color: 'bg-blue-100 text-blue-600' },
  }

  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    inactive: { variant: 'neutral' as const, label: 'Inactive' },
    pending: { variant: 'warning' as const, label: 'Pending' },
  }

  const handleEdit = (user: typeof mockUsers[0]) => {
    setEditingId(user.id)
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status })
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const idx = mockUsers.findIndex(u => u.id === editingId)
    if (idx !== -1) {
      mockUsers[idx] = { ...mockUsers[idx], ...editForm }
    }
    setEditingId(null)
    setIsLoading(false)
  }

  const handleInvite = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const newUser = {
      id: String(mockUsers.length + 1),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'pending',
      lastLogin: 'Never',
      twoFA: false,
      createdAt: new Date().toISOString().split('T')[0],
    }
    mockUsers.push(newUser)
    setShowInviteModal(false)
    setInviteForm({ email: '', role: 'editor', name: '' })
    setIsLoading(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const idx = mockUsers.findIndex(u => u.id === id)
      if (idx !== -1) mockUsers.splice(idx, 1)
    }
  }

  const handleResetPassword = (email: string) => {
    alert(`Password reset email sent to ${email}`)
  }

  const handleToggle2FA = (id: string) => {
    const idx = mockUsers.findIndex(u => u.id === id)
    if (idx !== -1) {
      mockUsers[idx].twoFA = !mockUsers[idx].twoFA
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Admin Users</h1>
            <p className="text-slate-500 mt-1">Manage admin users and permissions</p>
          </div>
          <Button onClick={() => setShowInviteModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Invite User
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole} className="w-40">
                <option value="All Roles">All Roles</option>
                {roles.map(r => <option key={r} value={r}>{roleConfig[r as keyof typeof roleConfig].label}</option>)}
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus} className="w-40">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card variant="elevated">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Avatar</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">2FA</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TableCell>
                          <div className="w-10 h-10 bg-[#0047BB] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.name[0].toUpperCase()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-[#0f172a]">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={roleConfig[user.role as keyof typeof roleConfig].variant}>
                            {roleConfig[user.role as keyof typeof roleConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[user.status as keyof typeof statusConfig].variant}>
                            {statusConfig[user.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            {user.twoFA ? (
                              <Shield className="w-4 h-4 text-green-600" />
                            ) : (
                              <Shield className="w-4 h-4 text-slate-300" />
                            )}
                            <span className="text-sm">{user.twoFA ? 'Enabled' : 'Disabled'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-slate-500">
                          {user.lastLogin === 'Never' ? (
                            <span className="text-slate-400">Never</span>
                          ) : (
                            user.lastLogin
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {editingId === user.id ? (
                              <>
                                <Button size="sm" variant="primary" onClick={handleSave} disabled={isLoading}>
                                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                              </>
                            ) : (
                              <>
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(user)} aria-label="Edit">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => handleToggle2FA(user.id)} aria-label={user.twoFA ? 'Disable 2FA' : 'Enable 2FA'}>
                                  <Key className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => handleResetPassword(user.email)} aria-label="Reset password">
                                  <Mail className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(user.id)} aria-label="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
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

      {/* Invite User Modal */}
      <AnimatePresence mode="popLayout">
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0f172a]">Invite New User</h2>
                <button onClick={() => setShowInviteModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleInvite} className="space-y-4">
                <Input
                  label="Full Name"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
                <Select
                  label="Role"
                  value={inviteForm.role}
                  onValueChange={(v) => setInviteForm({ ...inviteForm, role: v })}
                  options={roles.map(r => ({ value: r, label: roleConfig[r as keyof typeof roleConfig].label }))}
                />
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <Button variant="outline" type="button" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Send Invitation'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}