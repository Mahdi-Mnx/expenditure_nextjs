"use client"

import { useRouter } from "next/navigation"
import { PredictionLayout } from "@/components/prediction-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { usePrediction } from "@/contexts/prediction-context"
import { Banknote, MilkIcon as Cow, Wheat, Fish, BirdIcon as Chicken } from "lucide-react"

export default function IncomeAssetsPage() {
  const { state, dispatch } = usePrediction()
  const router = useRouter()

  const updateInput = (field: string, value: number) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    })
  }

  const handleNext = () => {
    dispatch({ type: "COMPLETE_STEP", payload: 2 })
    router.push("/predict/financial-services")
  }

  const handlePrevious = () => {
    router.push("/predict/expenditures")
  }

  return (
    <PredictionLayout
      currentStep={2}
      title="Income & Assets"
      description="Tell us about your income sources and household assets"
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={true}
    >
      <div className="space-y-6">
        {/* Remittances & Income */}
        <Card className="bg-green-900/20 border border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              Income Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-green-300 font-medium">Monthly Remittances</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                <Input
                  type="number"
                  value={state.inputs.remt9_11}
                  onChange={(e) => updateInput("remt9_11", Number(e.target.value))}
                  className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-green-400"
                  placeholder="700"
                  min="0"
                />
              </div>
              <p className="text-xs text-slate-400">Money received from family members or friends abroad</p>
            </div>
          </CardContent>
        </Card>

        {/* Livestock Assets */}
        <Card className="bg-amber-900/20 border border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center gap-2">
              <Cow className="h-5 w-5" />
              Livestock & Agricultural Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Cow className="h-5 w-5 text-amber-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">Cattle (liv4_21)</Label>
                      <p className="text-xs text-slate-400">Number of cattle owned</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={state.inputs.liv4_21}
                    onChange={(e) => updateInput("liv4_21", Number(e.target.value))}
                    className="w-20 bg-slate-600 border-slate-500 text-white text-center"
                    min="0"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Chicken className="h-5 w-5 text-amber-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">Poultry (liv4_22)</Label>
                      <p className="text-xs text-slate-400">Number of chickens/birds</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={state.inputs.liv4_22}
                    onChange={(e) => updateInput("liv4_22", Number(e.target.value))}
                    className="w-20 bg-slate-600 border-slate-500 text-white text-center"
                    min="0"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Fish className="h-5 w-5 text-amber-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">Aquaculture (liv4_24)</Label>
                      <p className="text-xs text-slate-400">Fish farming activities</p>
                    </div>
                  </div>
                  <Switch
                    checked={state.inputs.liv4_24 === 1}
                    onCheckedChange={(checked) => updateInput("liv4_24", checked ? 1 : 0)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wheat className="h-5 w-5 text-amber-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">Other Livestock (liv4_25)</Label>
                      <p className="text-xs text-slate-400">Goats, sheep, pigs, etc.</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={state.inputs.liv4_25}
                    onChange={(e) => updateInput("liv4_25", Number(e.target.value))}
                    className="w-20 bg-slate-600 border-slate-500 text-white text-center"
                    min="0"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <Label className="text-slate-300 font-medium">Agricultural Equipment (liv4_04)</Label>
                    <p className="text-xs text-slate-400">Tractors, plows, etc.</p>
                  </div>
                  <Switch
                    checked={state.inputs.liv4_04 === 1}
                    onCheckedChange={(checked) => updateInput("liv4_04", checked ? 1 : 0)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <Label className="text-slate-300 font-medium">Land Ownership (liv4_12)</Label>
                    <p className="text-xs text-slate-400">Own agricultural land</p>
                  </div>
                  <Switch
                    checked={state.inputs.liv4_12 === 1}
                    onCheckedChange={(checked) => updateInput("liv4_12", checked ? 1 : 0)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PredictionLayout>
  )
}
