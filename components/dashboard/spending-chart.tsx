import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SpendingChart() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-sky-100 rounded-lg flex items-center justify-center">
          <span className="text-slate-600">📈 Interactive spending chart will be rendered here</span>
        </div>
      </CardContent>
    </Card>
  )
}
