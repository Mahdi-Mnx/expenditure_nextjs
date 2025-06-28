import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Upload, Download, Database } from "lucide-react"

export default function AdvancedPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Settings className="h-8 w-8 text-emerald-400" />
            Advanced Settings
          </h1>
          <p className="text-slate-400">Full model inputs, data import/export, and advanced configuration</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-400" />
                Full Model Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Credit Quantity (cr15_04quantity)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Shock Factor (shock10_03)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                  />
                </div>
              </div>
              <div className="text-sm text-slate-400">
                These advanced parameters fine-tune prediction accuracy for specific economic conditions.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Import CSV Data</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept=".csv"
                    className="bg-slate-700 border-slate-600 text-white file:bg-emerald-400 file:text-slate-900"
                  />
                  <Button className="bg-emerald-400 hover:bg-emerald-500 text-slate-900">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Export Predictions</Label>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Model Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Prediction Confidence Threshold</Label>
                <Input
                  type="number"
                  defaultValue="80"
                  min="0"
                  max="100"
                  className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Regional Adjustment Factor</Label>
                <Input
                  type="number"
                  defaultValue="1.0"
                  step="0.1"
                  className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Seasonal Multiplier</Label>
                <Input
                  type="number"
                  defaultValue="1.0"
                  step="0.1"
                  className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
