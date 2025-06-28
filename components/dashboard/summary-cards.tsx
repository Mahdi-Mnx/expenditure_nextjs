import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Target, AlertCircle } from "lucide-react"

const summaryData = [
  {
    title: "Total Predicted",
    value: "$1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "This Month",
    value: "$1,180",
    change: "+8%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Budget Target",
    value: "$1,200",
    change: "On track",
    changeType: "neutral" as const,
    icon: Target,
  },
  {
    title: "Variance",
    value: "$47",
    change: "Over budget",
    changeType: "negative" as const,
    icon: AlertCircle,
  },
]

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{item.title}</CardTitle>
              <Icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <p
                className={`text-xs ${
                  item.changeType === "positive"
                    ? "text-emerald-400"
                    : item.changeType === "negative"
                      ? "text-red-400"
                      : "text-slate-400"
                }`}
              >
                {item.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
