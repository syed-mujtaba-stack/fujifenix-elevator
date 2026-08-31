'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#0047BB] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#64748b]">Redirecting...</p>
      </div>
    </div>
  )
}
