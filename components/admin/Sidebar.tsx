"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  SquarePen, 
  BarChart3, 
  Settings, 
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Shield,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from '@/components/ui/Button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Inquiries', href: '/dashboard/inquiries', icon: MessageSquare },
  { name: 'Popups', href: '/dashboard/popups', icon: SquarePen },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const adminNavigation = [
  { name: 'Admin Users', href: '/dashboard/settings/users', icon: Users, roles: ['superadmin'] },
]

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : (collapsed ? -72 : -280) }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed left-0 top-0 z-50 h-full bg-white border-r border-slate-200',
          'flex flex-col',
          'lg:translate-x-0 lg:static lg:z-auto',
          collapsed ? 'w-18' : 'w-72'
        )}
        role="navigation"
        aria-label="Admin navigation"
      >
        {/* Logo / Brand */}
        <div className={cn(
          'flex items-center justify-between h-16 px-4 border-b border-slate-200',
          'flex-shrink-0'
        )}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0047BB] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[#0f172a] text-lg">FUJI FENIX</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100',
              'transition-colors flex-shrink-0',
              collapsed && 'ml-auto'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                  'transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:ring-offset-2',
                  isActive
                    ? 'bg-blue-50 text-[#0047BB] font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0f172a]',
                  collapsed && 'justify-center'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-[#0047BB]')} aria-hidden="true" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Admin-only navigation */}
        {session?.user?.role === 'superadmin' && (
          <nav className="px-2 space-y-1 pb-4" aria-label="Admin navigation">
            {adminNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                    'transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:ring-offset-2',
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#0f172a]',
                    collapsed && 'justify-center'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-purple-700')} aria-hidden="true" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Bottom - User menu */}
        <div className={cn(
          'p-4 border-t border-slate-200 flex-shrink-0',
          collapsed && 'px-2'
        )}>
          {!collapsed && session?.user && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-[#0047BB] rounded-full flex items-center justify-center text-white font-medium">
                {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0f172a] truncate">{session.user.name || 'Admin'}</p>
                <p className="text-xs text-slate-400 truncate capitalize">{session.user.role}</p>
              </div>
            </div>
          )}

          {!collapsed ? (
            <div className="space-y-2 mt-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="mx-auto mt-4"
              onClick={() => signOut({ callbackUrl: '/login' })}
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5 text-slate-500" />
            </Button>
          )}
        </div>
      </motion.aside>
    </>
  )
}