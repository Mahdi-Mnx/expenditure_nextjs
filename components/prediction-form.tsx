"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Settings } from "lucide-react"

interface PredictionInputs {
  exp_food: number
  exp_nfnd: number
  exp_rent: number
  hhsize: number
  region_n: number
  hh_electricity: number
}

export function PredictionForm() {
  const [inputs, setInputs] = useState<PredictionInputs>({
    exp_food: 500,
    exp_nfnd: 300,
    exp_rent: 0,
    hhsize: 10,
    region_n: 2,
    hh_electricity: 1,
  })

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof PredictionInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //   .from('predictions')
    //   .insert({
    //     user_id: user.id,
    //     inputs: inputs,
    //     created_at: new Date().toISOString()
    //   })

    console.log("Prediction inputs:", inputs)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Household Data Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Inputs */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exp_food" className="text-slate-300">
                Food Expenditure
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                <Input
                  id="exp_food"
                  type="number"
                  value={inputs.exp_food}
                  onChange={(e) => handleInputChange("exp_food", Number(e.target.value))}
                  className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exp_nfnd" className="text-slate-300">
                Non-Food Expenditure
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                <Input
                  id="exp_nfnd"
                  type="number"
                  value={inputs.exp_nfnd}
                  onChange={(e) => handleInputChange("exp_nfnd", Number(e.target.value))}
                  className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hhsize" className="text-slate-300">
                Household Size
              </Label>
              <Input
                id="hhsize"
                type="number"
                value={inputs.hhsize}
                onChange={(e) => handleInputChange("hhsize", Number(e.target.value))}
                className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="text-slate-300">
                Region
              </Label>
              <Select
                value={inputs.region_n.toString()}
                onValueChange={(value) => handleInputChange("region_n", Number(value))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="1">Rural (1)</SelectItem>
                  <SelectItem value="2">Urban (2)</SelectItem>
                  <SelectItem value="3">Suburban (3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Advanced Inputs Toggle */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
              <Settings className="mr-2 h-4 w-4" />
              Advanced Inputs
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exp_rent" className="text-slate-300">
                  Rent Expenditure
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    id="exp_rent"
                    type="number"
                    value={inputs.exp_rent}
                    onChange={(e) => handleInputChange("exp_rent", Number(e.target.value))}
                    className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Electricity Access</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    checked={inputs.hh_electricity === 1}
                    onCheckedChange={(checked) => handleInputChange("hh_electricity", checked ? 1 : 0)}
                  />
                  <span className="text-slate-300">{inputs.hh_electricity ? "🔌 Available" : "❌ Not Available"}</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold"
        >
          {isLoading ? "Calculating..." : "Generate Prediction"}
        </Button>
      </CardContent>
    </Card>
  )
}
