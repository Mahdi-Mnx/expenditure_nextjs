"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { usePrediction } from "@/contexts/prediction-context"
import { ShoppingCart, Home, Zap, ChevronDown, Settings } from "lucide-react"

export function ExpenditureStep() {
  const { state, dispatch } = usePrediction()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateInput = (field: string, value: number) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      {/* Core Expenditures */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Expenditures</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <Label className="text-red-300 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Food Expenses
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
              <Input
                type="number"
                value={state.inputs.exp_food}
                onChange={(e) => updateInput("exp_food", Number(e.target.value))}
                className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-red-400"
                placeholder="500"
              />
            </div>
            <p className="text-xs text-slate-400">Groceries, dining out, food delivery</p>
          </div>

          <div className="space-y-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <Label className="text-red-300 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Non-Food Expenses
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
              <Input
                type="number"
                value={state.inputs.exp_nfnd}
                onChange={(e) => updateInput("exp_nfnd", Number(e.target.value))}
                className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-red-400"
                placeholder="300"
              />
            </div>
            <p className="text-xs text-slate-400">Clothing, personal care, entertainment</p>
          </div>
        </div>

        <div className="space-y-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <Label className="text-red-300 flex items-center gap-2">
            <Home className="h-4 w-4" />
            Rent/Housing Expenses
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
            <Input
              type="number"
              value={state.inputs.exp_rent}
              onChange={(e) => updateInput("exp_rent", Number(e.target.value))}
              className="pl-8 bg-slate-700 border-slate-600 text-white focus:border-red-400"
              placeholder="0"
            />
          </div>
          <p className="text-xs text-slate-400">Monthly rent, mortgage, property taxes</p>
        </div>
      </div>

      {/* Utilities */}
      <div className="space-y-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h4 className="text-blue-300 font-medium">Utilities & Services</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-slate-300">Electricity Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={state.inputs.hh_electricity === 1}
              onCheckedChange={(checked) => updateInput("hh_electricity", checked ? 1 : 0)}
            />
            <span className="text-sm text-slate-400">
              {state.inputs.hh_electricity ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
            <Settings className="mr-2 h-4 w-4" />
            Advanced Options
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="p-4 bg-slate-700 rounded-lg">
            <p className="text-slate-300 text-sm mb-4">Advanced inputs for more precise predictions (optional)</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Credit Quantity</Label>
                <Input
                  type="number"
                  value={state.inputs.cr15_04quantity || 0}
                  onChange={(e) => updateInput("cr15_04quantity", Number(e.target.value))}
                  className="bg-slate-600 border-slate-500 text-white"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Shock Factor</Label>
                <Input
                  type="number"
                  value={state.inputs.shock10_03 || 0}
                  onChange={(e) => updateInput("shock10_03", Number(e.target.value))}
                  className="bg-slate-600 border-slate-500 text-white"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
