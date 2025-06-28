import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Upload, Download, Settings } from "lucide-react"

const actions = [
  {
    title: "New Prediction",
    description: "Calculate spending forecast",
    icon: Calculator,
    href: "/test",
  },
  {
    title: "Import Data",
    description: "Upload CSV file",
    icon: Upload,
    href: "/advanced",
  },
  {
    title: "Export Report",
    description: "Download predictions",
    icon: Download,
    href: "#",
  },
  {
    title: "Settings",
    description: "Manage preferences",
    icon: Settings,
    href: "/advanced",
  },
]

export function QuickActions() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
              asChild
            >
              <a href={action.href}>
                <Icon className="mr-3 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-slate-400">{action.description}</div>
                </div>
              </a>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
