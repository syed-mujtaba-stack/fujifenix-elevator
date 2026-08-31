'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { Bell, Search, Menu } from 'lucide-react'
import { useState } from 'react'

interface TopBarProps {
  onMenuToggle?: () => void
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center bg-[#f8fafc] rounded-lg px-4 py-2 w-80">
          <Search size={16} className="text-[#94a3b8] mr-2" />
          <input
            type="text"
            placeholder="Search products, inquiries..."
            className="bg-transparent text-sm outline-none w-full text-[#0f172a]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors"
          >
            <Bell size={20} className="text-[#64748b]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-[#e2e8f0] rounded-xl shadow-lg overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-[#e2e8f0]">
                <p className="text-sm font-semibold text-[#0f172a]">Notifications</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-[#f8fafc] border-b border-[#f1f5f9]">
                  <p className="text-sm text-[#0f172a]">New inquiry from John Doe</p>
                  <p className="text-xs text-[#94a3b8] mt-1">2 minutes ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-[#e2e8f0]">
                <button className="text-xs text-[#0047BB] font-medium hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0047BB] flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#0f172a]">{user?.name || 'Admin'}</p>
            <p className="text-xs text-[#94a3b8]">{user?.role || 'admin'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
