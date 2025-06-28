"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingCart, Home, Settings, TestTube, Plus, User, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Food", href: "/food", icon: ShoppingCart },
  { name: "Housing", href: "/housing", icon: Home },
  { name: "Test Lab", href: "/test", icon: TestTube },
  { name: "Advanced", href: "/advanced", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs transition-colors",
                  isActive ? "bg-emerald-400 text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-700",
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-slate-800 border-r border-slate-700">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <h1 className="text-xl font-bold text-white">Financial Predictor</h1>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive ? "bg-emerald-400 text-slate-900" : "text-slate-300 hover:text-white hover:bg-slate-700",
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="flex-shrink-0 p-4 border-t border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-slate-900" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">John Doe</div>
                  <div className="text-xs text-slate-400">john@example.com</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8 pb-20 lg:pb-8">{children}</main>
      </div>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 bg-emerald-400 hover:bg-emerald-500 text-slate-900 rounded-full w-14 h-14 shadow-lg z-40"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
