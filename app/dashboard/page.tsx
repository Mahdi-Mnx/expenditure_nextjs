import { DashboardLayout } from "@/components/dashboard-layout"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentPredictions } from "@/components/dashboard/recent-predictions"
import { SpendingChart } from "@/components/dashboard/spending-chart"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Overview of your financial predictions and spending patterns</p>
        </div>

        <SummaryCards />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SpendingChart />
            <RecentPredictions />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
