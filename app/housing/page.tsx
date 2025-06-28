import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Zap, Calculator, TrendingUp } from "lucide-react"

export default function HousingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Home className="h-8 w-8 text-emerald-400" />
            Housing & Utilities
          </h1>
          <p className="text-slate-400">Track rent, utilities, and housing affordability</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Rent Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$0</div>
                <div className="text-slate-300 text-sm">Monthly rent expense</div>
                <Badge variant="secondary" className="mt-2">
                  Rent-free household
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-400" />
                Electricity Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Status</span>
                <Badge className="bg-emerald-400 text-slate-900">Available</Badge>
              </div>
              <div className="text-slate-400 text-sm">
                Electricity access helps reduce overall household costs and improves quality of life predictions.
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-400" />
              Affordability Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="text-slate-300 text-sm">Recommended Rent</div>
                <div className="text-2xl font-bold text-emerald-400">$300-400</div>
                <div className="text-slate-400 text-xs">Based on 30% of predicted income</div>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="text-slate-300 text-sm">Current Rent</div>
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-emerald-400 text-xs">Well within budget</div>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="text-slate-300 text-sm">Savings Potential</div>
                <div className="text-2xl font-bold text-emerald-400">$300+</div>
                <div className="text-slate-400 text-xs">Available for other expenses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Housing Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2" />
                <div>
                  <div className="text-white font-medium">Large Household Advantage</div>
                  <div className="text-slate-300 text-sm">
                    With 10 people, shared housing costs can significantly reduce per-person expenses.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                <div>
                  <div className="text-white font-medium">Urban Location Benefits</div>
                  <div className="text-slate-300 text-sm">
                    Urban areas typically offer better access to utilities and services.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
