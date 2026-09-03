"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils'
import { 
  Bell, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search, 
  User, 
  Settings, 
  LogOut,
  Shield,
  Download,
  Upload,
  MessageSquare,
  Package,
  SquarePen,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function TopBar({ onMenuClick, isSidebarOpen }: { onMenuClick: () => void; isSidebarOpen: boolean }) {
  const { data: session } = useSession()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Mock notifications
  const notifications = [
    { id: 1, type: 'inquiry', title: 'New inquiry received', message: 'John Smith - Passenger Elevator quote request', time: '2 min ago', unread: true },
    { id: 2, type: 'product', title: 'Product updated', message: 'Passenger Elevator Cabin specifications updated', time: '15 min ago', unread: true },
    { id: 3, type: 'popup', title: 'Popup scheduled', message: 'Summer promotion popup will go live tomorrow', time: '1 hour ago', unread: false },
    { id: 4, type: 'system', title: 'System backup completed', message: 'Daily backup completed successfully', time: '3 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery("")
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Search */}
          <div className="relative hidden sm:block" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search products, inquiries, popups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 sm:w-80 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => { setNotificationsOpen(!notificationsOpen); setUserMenuOpen(false); }}
              className={cn(
                'relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors',
                notificationsOpen && 'bg-slate-100 text-[#0047BB]'
              )}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence mode="popLayout">
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                    <h3 className="font-semibold text-[#0f172a]">Notifications</h3>
                    <Button variant="ghost" size="sm" className="p-1">Mark all read</Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors',
                          notification.unread && 'bg-blue-50/50'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                            notification.type === 'inquiry' && 'bg-blue-100 text-blue-600',
                            notification.type === 'product' && 'bg-green-100 text-green-600',
                            notification.type === 'popup' && 'bg-purple-100 text-purple-600',
                            notification.type === 'system' && 'bg-slate-100 text-slate-600',
                          )}>
                            {notification.type === 'inquiry' && <MessageSquare className="w-4 h-4" />}
                            {notification.type === 'product' && <Package className="w-4 h-4" />}
                            {notification.type === 'popup' && <SquarePen className="w-4 h-4" />}
                            {notification.type === 'system' && <Shield className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn('text-sm font-medium', notification.unread && 'font-semibold')} 
                               style={{ color: notification.unread ? '#0f172a' : '#334155' }}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-slate-500 truncate mt-0.5">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <span className="w-2 h-2 bg-[#0047BB] rounded-full mt-2 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="px-4 py-8 text-center text-slate-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-200">
                    <Link
                      href="/dashboard/notifications"
                      className="block text-center text-sm text-[#0047BB] hover:text-[#003A94] font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => { setUserMenuOpen(!userMenuOpen); setNotificationsOpen(false); }}
              className={cn(
                'flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors',
                userMenuOpen && 'bg-slate-100'
              )}
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              <div className="w-8 h-8 bg-[#0047BB] rounded-full flex items-center justify-center text-white font-medium">
                {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <span className="hidden md:block text-sm font-medium text-[#0f172a]">
                {session?.user?.name || 'Admin'}
              </span>
            </button>

            <AnimatePresence mode="popLayout">
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-sm font-medium text-[#0f172a]">{session?.user?.name || 'Admin'}</p>
                    <p className="text-xs text-slate-400 capitalize">{session?.user?.role}</p>
                  </div>
                  <nav className="py-2">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#0f172a] transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#0f172a] transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}