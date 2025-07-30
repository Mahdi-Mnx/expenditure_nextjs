"use client";

import { DashboardLayout } from "@/components/dashboard-layout";

export function LoadingPredictionsScreen() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-pulse">
            <div>
              <div className="h-8 w-48 bg-slate-700/50 rounded-2xl mb-2"></div>
              <div className="h-4 w-32 bg-slate-600/50 rounded-xl"></div>
            </div>
            <div className="h-12 w-40 bg-slate-700/50 rounded-2xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-3xl p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-2xl"></div>
                  <div className="h-4 w-20 bg-slate-600/50 rounded-xl"></div>
                </div>
                <div className="h-8 w-24 bg-slate-700/50 rounded-xl mb-2"></div>
                <div className="h-4 w-16 bg-slate-600/50 rounded-xl"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-3xl p-6 animate-pulse"
              >
                <div className="h-6 w-32 bg-slate-700/50 rounded-xl mb-4"></div>
                <div className="h-8 w-24 bg-slate-600/50 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-700/50 rounded-xl"></div>
                  <div className="h-4 w-3/4 bg-slate-700/50 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
