"use client"

import { useRouter } from "next/navigation"
import { PredictionLayout } from "@/components/prediction-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePrediction } from "@/contexts/prediction-context"
import { ShoppingCart, Home, DollarSign } from "lucide-react"

export default function ExpendituresPage() {
  const { state, dispatch } = usePrediction()
  const router = useRouter()

  const updateInput = (field: string, value: number) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    })
  }

  const handleNext = () => {
    dispatch({ type: "COMPLETE_STEP", payload: 1 })
    router.push("/predict/income-assets")
  }

  const handlePrevious = () => {
    router.push("/predict/demographics")
  }


  return (
    <PredictionLayout
      currentStep={1}
      title="Monthly Expenditures"
      description="Enter your household's monthly spending across different categories"
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={(state.inputs.exp_food ?? 0) > 0 || (state.inputs.exp_nfnd ?? 0) > 0}
    >
      <div className="space-y-6">
        {/* Core Expenditures */}
        <Card className="bg-red-900/20 border border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Core Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-red-300 font-medium">Food Expenditure</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    type="number"
                    value={state.inputs.exp_food ?? ""}
                    onChange={(e) => updateInput("exp_food", Number(e.target.value))}
                    className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-red-400"
                    placeholder="500"
                    min="0"
                  />
                </div>
                <p className="text-xs text-slate-400">Groceries, dining out, food delivery</p>
              </div>

              <div className="space-y-2">
                <Label className="text-red-300 font-medium">Non-Food Expenditure</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    type="number"
                    value={state.inputs.exp_nfnd ?? ""}
                    onChange={(e) => updateInput("exp_nfnd", Number(e.target.value))}
                    className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-red-400"
                    placeholder="300"
                    min="0"
                  />
                </div>
                <p className="text-xs text-slate-400">Clothing, personal care, entertainment, transport</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-red-300 font-medium flex items-center gap-2">
                <Home className="h-4 w-4" />
                Rent/Housing Expenditure
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                <Input
                  type="number"
                  value={state.inputs.exp_rent ?? ""}
                  onChange={(e) => updateInput("exp_rent", Number(e.target.value))}
                  className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-red-400"
                  placeholder="0"
                  min="0"
                />
              </div>
              <p className="text-xs text-slate-400">Monthly rent, mortgage payments, property taxes</p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Consumption Expenditure */}
        <Card className="bg-purple-900/20 border border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Personal Consumption Expenditure (PCE)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-300 font-medium">Total PCE</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    type="number"
                    value={state.inputs.pce ?? ""}
                    onChange={(e) => updateInput("pce", Number(e.target.value))}
                    className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-purple-400"
                    placeholder="800"
                    min="0"
                  />
                </div>
                <p className="text-xs text-slate-400">Total personal consumption expenditure</p>
              </div>

              <div className="space-y-2">
                <Label className="text-purple-300 font-medium">PCE Ratio (%)</Label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                  <Input
                    type="number"
                    value={state.inputs.pcer ?? ""}
                    onChange={(e) => updateInput("pcer", Number(e.target.value))}
                    className="pr-8 bg-slate-700 border-slate-600 text-white focus:border-purple-400"
                    placeholder="20"
                    min="0"
                    max="100"
                  />
                </div>
                <p className="text-xs text-slate-400">PCE as percentage of total income</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PredictionLayout>
  )
}
