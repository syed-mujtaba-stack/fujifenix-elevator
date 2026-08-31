'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { User, Shield, Bell } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Settings</h1>
        <p className="text-sm text-[#64748b] mt-1">Manage your admin account</p>
      </div>

      {/* Profile */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User size={20} className="text-[#0047BB]" />
          <h2 className="font-semibold text-[#0f172a]">Profile</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#0047BB] flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-medium text-[#0f172a]">{user?.name || 'Admin'}</p>
              <p className="text-sm text-[#64748b]">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Name</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={20} className="text-[#0047BB]" />
          <h2 className="font-semibold text-[#0f172a]">Security</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
              placeholder="Enter current password"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
                placeholder="New password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-[#0047BB] text-white text-sm font-semibold rounded-lg hover:bg-[#003da0] transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={20} className="text-[#0047BB]" />
          <h2 className="font-semibold text-[#0f172a]">Notifications</h2>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Email notifications for new inquiries', checked: true },
            { label: 'Email notifications for form submissions', checked: true },
            { label: 'Browser notifications', checked: false },
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="w-4 h-4 rounded border-[#e2e8f0] text-[#0047BB] focus:ring-[#0047BB]/20"
              />
              <span className="text-sm text-[#0f172a]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
