import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentPredictions = [
  {
    date: "2024-01-15",
    amount: 1247,
    confidence: 87,
    status: "completed",
  },
  {
    date: "2024-01-10",
    amount: 1180,
    confidence: 92,
    status: "completed",
  },
  {
    date: "2024-01-05",
    amount: 1320,
    confidence: 78,
    status: "completed",
  },
]

export function RecentPredictions() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPredictions.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <div className="text-white font-medium">${prediction.amount.toLocaleString()}</div>
                <div className="text-sm text-slate-400">{prediction.date}</div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {prediction.confidence}% confidence
                </Badge>
                <div className="text-xs text-emerald-400">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
