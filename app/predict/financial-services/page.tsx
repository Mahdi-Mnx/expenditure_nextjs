"use client"

import { useRouter } from "next/navigation"
import { PredictionLayout } from "@/components/prediction-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { usePrediction } from "@/contexts/prediction-context"
import { CreditCard, AlertTriangle, Utensils } from "lucide-react"

export default function FinancialServicesPage() {
  const { state, dispatch } = usePrediction()
  const router = useRouter()

  const updateInput = (field: string, value: number) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    })
  }

  const handleNext = () => {
    dispatch({ type: "COMPLETE_STEP", payload: 3 })
    router.push("/predict/shocks-events")
  }

  const handlePrevious = () => {
    router.push("/predict/income-assets")
  }

  return (
    <PredictionLayout
      currentStep={3}
      title="Financial Services & Security"
      description="Information about credit access, food security, and financial services"
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={true}
    >
      <div className="space-y-6">
        {/* Credit & Financial Services */}
        <Card className="bg-indigo-900/20 border border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-300 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credit & Financial Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-indigo-300 font-medium">Credit Quantity 1 (cr15_04quantity)</Label>
                <Input
                  type="number"
                  value={state.inputs.cr15_04quantity}
                  onChange={(e) => updateInput("cr15_04quantity", Number(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white focus:border-indigo-400"
                  placeholder="0"
                  min="0"
                />
                <p className="text-xs text-slate-400">Amount of first credit line/loan</p>
              </div>

              <div className="space-y-2">
                <Label className="text-indigo-300 font-medium">Credit Quantity 2 (cr15_05quantity)</Label>
                <Input
                  type="number"
                  value={state.inputs.cr15_05quantity}
                  onChange={(e) => updateInput("cr15_05quantity", Number(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white focus:border-indigo-400"
                  placeholder="0"
                  min="0"
                />
                <p className="text-xs text-slate-400">Amount of second credit line/loan</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <Label className="text-indigo-300 font-medium">Credit Access 1 (cr15_06)</Label>
                  <p className="text-xs text-slate-400">Access to formal credit services</p>
                </div>
                <Switch
                  checked={state.inputs.cr15_06 === 1}
                  onCheckedChange={(checked) => updateInput("cr15_06", checked ? 1 : 0)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <Label className="text-indigo-300 font-medium">Credit Access 2 (cr15_10)</Label>
                  <p className="text-xs text-slate-400">Access to informal credit services</p>
                </div>
                <Switch
                  checked={state.inputs.cr15_10 === 1}
                  onCheckedChange={(checked) => updateInput("cr15_10", checked ? 1 : 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Food Security */}
        <Card className="bg-orange-900/20 border border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Food Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <Label className="text-orange-300 font-medium">Food Security Status (foodsec7_07)</Label>
                <p className="text-sm text-slate-400">
                  Has your household experienced food insecurity in the past 12 months?
                </p>
              </div>
              <Switch
                checked={state.inputs.foodsec7_07 === 1}
                onCheckedChange={(checked) => updateInput("foodsec7_07", checked ? 1 : 0)}
              />
            </div>

            {state.inputs.foodsec7_07 === 1 && (
              <div className="p-4 bg-orange-900/30 border border-orange-500/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300 font-medium">Food Insecurity Detected</span>
                </div>
                <p className="text-sm text-slate-300">
                  This information helps us provide more accurate predictions and recommendations for your household's
                  financial planning.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Non-Food Expenditures Detail */}
        <Card className="bg-teal-900/20 border border-teal-500/30">
          <CardHeader>
            <CardTitle className="text-teal-300">Non-Food Expenditure Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-teal-300 font-medium">Category 1 (nfe16_33)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    type="number"
                    value={state.inputs.nfe16_33}
                    onChange={(e) => updateInput("nfe16_33", Number(e.target.value))}
                    className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-teal-400"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-slate-400">Specific non-food expenditure category</p>
              </div>

              <div className="space-y-2">
                <Label className="text-teal-300 font-medium">Category 2 (nfe16_13)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    type="number"
                    value={state.inputs.nfe16_13}
                    onChange={(e) => updateInput("nfe16_13", Number(e.target.value))}
                    className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-teal-400"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-slate-400">Additional non-food expenditure category</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PredictionLayout>
  )
}
