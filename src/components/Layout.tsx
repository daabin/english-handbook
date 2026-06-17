import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f5f1ec]">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 animate-fade-up bg-white">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-auto min-h-screen">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex items-center gap-3 bg-[#f5f1ec]/90 backdrop-blur-sm border-b border-[#ebe7e1] px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center bg-white border border-[#d3cec6] text-[#111111]"
            style={{ borderRadius: 8 }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M1 1h14M1 6h14M1 11h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-[14px] font-[500] text-[#111111]">English Handbook</span>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
