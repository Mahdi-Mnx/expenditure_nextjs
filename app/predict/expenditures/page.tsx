"use client"

import { useRouter } from "next/navigation"
import { PredictionLayout } from "@/components/prediction-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePrediction } from "@/contexts/prediction-context"
import { ShoppingCart, Home, DollarSign, TrendingUp } from "lucide-react"

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

  const totalExpenditure = state.inputs.exp_food + state.inputs.exp_nfnd + state.inputs.exp_rent

  return (
    <PredictionLayout
      currentStep={1}
      title="Monthly Expenditures"
      description="Enter your household's monthly spending across different categories"
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={state.inputs.exp_food > 0 || state.inputs.exp_nfnd > 0}
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
                    value={state.inputs.exp_food}
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
                    value={state.inputs.exp_nfnd}
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
                  value={state.inputs.exp_rent}
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
                    value={state.inputs.pce}
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
                    value={state.inputs.pcer}
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

        {/* Expenditure Summary */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Expenditure Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-600 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400">${totalExpenditure}</div>
                  <div className="text-sm text-slate-300">Total Core Expenses</div>
                </div>
                <div className="text-center p-3 bg-slate-600 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">${state.inputs.pce}</div>
                  <div className="text-sm text-slate-300">Total PCE</div>
                </div>
                <div className="text-center p-3 bg-slate-600 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    ${Math.round(state.inputs.pce / state.inputs.hhsize)}
                  </div>
                  <div className="text-sm text-slate-300">Per Person</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Food ({((state.inputs.exp_food / totalExpenditure) * 100).toFixed(0)}%)
                  </span>
                  <span className="text-white">${state.inputs.exp_food}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{ width: `${(state.inputs.exp_food / totalExpenditure) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Non-Food ({((state.inputs.exp_nfnd / totalExpenditure) * 100).toFixed(0)}%)
                  </span>
                  <span className="text-white">${state.inputs.exp_nfnd}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{ width: `${(state.inputs.exp_nfnd / totalExpenditure) * 100}%` }}
                  />
                </div>
              </div>

              {state.inputs.exp_rent > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">
                      Housing ({((state.inputs.exp_rent / totalExpenditure) * 100).toFixed(0)}%)
                    </span>
                    <span className="text-white">${state.inputs.exp_rent}</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full"
                      style={{ width: `${(state.inputs.exp_rent / totalExpenditure) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PredictionLayout>
  )
}
