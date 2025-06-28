import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, TrendingUp, PieChart } from "lucide-react"

const foodCategories = [
  { name: "Groceries", amount: 320, percentage: 64, color: "bg-emerald-400" },
  { name: "Dining Out", amount: 120, percentage: 24, color: "bg-blue-400" },
  { name: "Food Delivery", amount: 60, percentage: 12, color: "bg-yellow-400" },
]

export default function FoodPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-emerald-400" />
            Food Expenses
          </h1>
          <p className="text-slate-400">Detailed analysis of your food spending patterns</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Monthly Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400 mb-2">$500</div>
              <div className="text-slate-300 text-sm">Current month spending</div>
              <div className="text-emerald-400 text-sm mt-1">+8% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Average per Person</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">$125</div>
              <div className="text-slate-300 text-sm">Based on 4 household members</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Budget Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400 mb-2">83%</div>
              <div className="text-slate-300 text-sm">Of monthly budget used</div>
              <Progress value={83} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-emerald-400" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {foodCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">{category.name}</span>
                  <span className="text-white font-semibold">${category.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className={`${category.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-sm">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
