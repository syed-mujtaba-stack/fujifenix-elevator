'use client'

import { AuthProvider } from '@/components/auth/AuthProvider'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-[#f8fafc]">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="lg:ml-[260px] min-h-screen flex flex-col">
            <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
