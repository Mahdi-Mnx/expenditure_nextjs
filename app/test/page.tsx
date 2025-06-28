"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { usePrediction } from "@/contexts/prediction-context"
import { TestTube, Save, RotateCcw } from "lucide-react"

const testFeatures = [
  { key: "exp_food", label: "Food Expenses", min: 0, max: 2000, step: 50, color: "red" },
  { key: "exp_nfnd", label: "Non-Food Expenses", min: 0, max: 1500, step: 25, color: "red" },
  { key: "exp_rent", label: "Rent/Housing", min: 0, max: 3000, step: 100, color: "red" },
  { key: "hhsize", label: "Household Size", min: 1, max: 15, step: 1, color: "blue" },
  { key: "region_n", label: "Region", min: 1, max: 3, step: 1, color: "blue" },
  { key: "hh_electricity", label: "Electricity", min: 0, max: 1, step: 1, color: "blue" },
]

export default function TestPage() {
  const { state, dispatch } = usePrediction()
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["exp_food", "hhsize"])
  const [testInputs, setTestInputs] = useState(state.inputs)
  const [prediction, setPrediction] = useState<number | null>(null)

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const handleInputChange = (key: string, value: number) => {
    setTestInputs((prev) => ({ ...prev, [key]: value }))

    // Real-time prediction calculation
    const newPrediction = calculatePrediction({ ...testInputs, [key]: value })
    setPrediction(newPrediction)
  }

  const calculatePrediction = (inputs: typeof testInputs) => {
    const { exp_food, exp_nfnd, exp_rent, hhsize } = inputs
    const baseAmount = exp_food + exp_nfnd + exp_rent
    const householdMultiplier = 1 + (hhsize - 1) * 0.15
    return Math.round(baseAmount * householdMultiplier * 1.2)
  }

  const handleSaveScenario = () => {
    dispatch({ type: "UPDATE_INPUTS", payload: testInputs })
    dispatch({
      type: "SET_PREDICTION",
      payload: {
        amount: prediction || 0,
        confidence: 85,
        factors: [`Test scenario with ${selectedFeatures.length} features`],
      },
    })
  }

  const handleReset = () => {
    setTestInputs(state.inputs)
    setPrediction(calculatePrediction(state.inputs))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <TestTube className="h-8 w-8 text-emerald-400" />
            Prediction Test Lab
          </h1>
          <p className="text-slate-400">Experiment with different values to see how they affect predictions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Step 1: Feature Selection */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Step 1: Select Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {testFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.key}
                    checked={selectedFeatures.includes(feature.key)}
                    onCheckedChange={() => handleFeatureToggle(feature.key)}
                  />
                  <Label htmlFor={feature.key} className="text-slate-300 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        feature.color === "red" ? "border-red-500 text-red-400" : "border-blue-500 text-blue-400"
                      }`}
                    >
                      {feature.color === "red" ? "EXP" : "DEM"}
                    </Badge>
                    {feature.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Step 2: Adjust Values */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Step 2: Adjust Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {testFeatures
                .filter((feature) => selectedFeatures.includes(feature.key))
                .map((feature) => (
                  <div key={feature.key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-slate-300">{feature.label}</Label>
                      <span className="text-emerald-400 font-semibold">
                        {feature.key.includes("exp_") ? "$" : ""}
                        {testInputs[feature.key as keyof typeof testInputs]}
                        {feature.key === "region_n" && testInputs.region_n === 1 && " (Rural)"}
                        {feature.key === "region_n" && testInputs.region_n === 2 && " (Urban)"}
                        {feature.key === "region_n" && testInputs.region_n === 3 && " (Suburban)"}
                        {feature.key === "hh_electricity" && (testInputs.hh_electricity ? " (Yes)" : " (No)")}
                      </span>
                    </div>
                    <Slider
                      value={[testInputs[feature.key as keyof typeof testInputs]]}
                      onValueChange={(value) => handleInputChange(feature.key, value[0])}
                      min={feature.min}
                      max={feature.max}
                      step={feature.step}
                      className="w-full"
                    />
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Step 3: Real-time Results */}
          <Card className="bg-slate-800 border-emerald-500/50">
            <CardHeader>
              <CardTitle className="text-white">Step 3: Live Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">${prediction?.toLocaleString() || "0"}</div>
                <div className="text-slate-300">Predicted Monthly Total</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">Active Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFeatures.map((feature) => {
                    const featureData = testFeatures.find((f) => f.key === feature)
                    return (
                      <Badge
                        key={feature}
                        variant="outline"
                        className={`text-xs ${
                          featureData?.color === "red" ? "border-red-500 text-red-400" : "border-blue-500 text-blue-400"
                        }`}
                      >
                        {featureData?.label}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveScenario}
                  className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-slate-900"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Scenario
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-slate-600 text-slate-300">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
