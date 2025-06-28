"use client"

import { useRouter } from "next/navigation"
import { PredictionLayout } from "@/components/prediction-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { usePrediction } from "@/contexts/prediction-context"
import { AlertTriangle, Cloud, Zap } from "lucide-react"

export default function ShocksEventsPage() {
  const { state, dispatch } = usePrediction()
  const router = useRouter()

  const updateInput = (field: string, value: number) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    })
  }

  const handleNext = () => {
    dispatch({ type: "COMPLETE_STEP", payload: 4 })
    router.push("/predict/results")
  }

  const handlePrevious = () => {
    router.push("/predict/financial-services")
  }

  return (
    <PredictionLayout
      currentStep={4}
      title="Economic Shocks & Events"
      description="Information about economic shocks and unexpected events affecting your household"
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={true}
    >
      <div className="space-y-6">
        {/* Economic Shocks */}
        <Card className="bg-red-900/20 border border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Economic Shocks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-red-300 font-medium">Primary Shock Type (shock10_03)</Label>
                <Input
                  type="number"
                  value={state.inputs.shock10_03}
                  onChange={(e) => updateInput("shock10_03", Number(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white focus:border-red-400"
                  placeholder="0"
                  min="0"
                  max="10"
                />
                <p className="text-xs text-slate-400">
                  Type of economic shock (0=none, 1=drought, 2=flood, 3=job loss, etc.)
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-red-300 font-medium">Shock Severity (shock10_04)</Label>
                <Input
                  type="number"
                  value={state.inputs.shock10_04}
                  onChange={(e) => updateInput("shock10_04", Number(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white focus:border-red-400"
                  placeholder="0"
                  min="0"
                  max="5"
                />
                <p className="text-xs text-slate-400">Severity level (0=none, 1=mild, 5=severe)</p>
              </div>
            </div>

            {(state.inputs.shock10_03 > 0 || state.inputs.shock10_04 > 0) && (
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-red-300 font-medium">Economic Shock Detected</span>
                </div>
                <p className="text-sm text-slate-300">
                  Economic shocks can significantly impact household spending patterns. This information helps provide
                  more accurate predictions.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Specific Shock Categories */}
        <Card className="bg-yellow-900/20 border border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Specific Shock Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <Label className="text-yellow-300 font-medium">Weather/Climate Shock (shock10_07_21)</Label>
                  <p className="text-xs text-slate-400">Drought, flood, extreme weather events</p>
                </div>
                <Switch
                  checked={state.inputs.shock10_07_21 === 1}
                  onCheckedChange={(checked) => updateInput("shock10_07_21", checked ? 1 : 0)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <Label className="text-yellow-300 font-medium">Economic Shock (shock10_07_23)</Label>
                  <p className="text-xs text-slate-400">Job loss, business failure, market crash</p>
                </div>
                <Switch
                  checked={state.inputs.shock10_07_23 === 1}
                  onCheckedChange={(checked) => updateInput("shock10_07_23", checked ? 1 : 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Livestock */}
        <Card className="bg-green-900/20 border border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300">Additional Livestock Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <Label className="text-green-300 font-medium">Livestock Production (liv4_13)</Label>
                <p className="text-xs text-slate-400">Active livestock production/breeding</p>
              </div>
              <Switch
                checked={state.inputs.liv4_13 === 1}
                onCheckedChange={(checked) => updateInput("liv4_13", checked ? 1 : 0)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shock Impact Summary */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              Risk Assessment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Primary Shock Level:</span>
                  <span className="text-white ml-2 font-medium">
                    {state.inputs.shock10_03 === 0 ? "None" : `Type ${state.inputs.shock10_03}`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Shock Severity:</span>
                  <span className="text-white ml-2 font-medium">
                    {state.inputs.shock10_04 === 0 ? "None" : `Level ${state.inputs.shock10_04}/5`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Weather Risk:</span>
                  <span className="text-white ml-2 font-medium">
                    {state.inputs.shock10_07_21 ? "Exposed" : "Protected"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Economic Risk:</span>
                  <span className="text-white ml-2 font-medium">
                    {state.inputs.shock10_07_23 ? "Exposed" : "Protected"}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-600 rounded-lg">
                <h4 className="text-white font-medium mb-2">Risk Profile</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-500 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        state.inputs.shock10_04 <= 1
                          ? "bg-green-400"
                          : state.inputs.shock10_04 <= 3
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                      style={{ width: `${Math.max(20, (state.inputs.shock10_04 / 5) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-300">
                    {state.inputs.shock10_04 <= 1
                      ? "Low Risk"
                      : state.inputs.shock10_04 <= 3
                        ? "Medium Risk"
                        : "High Risk"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PredictionLayout>
  )
}
