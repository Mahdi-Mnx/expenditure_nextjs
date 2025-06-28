"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePrediction } from "@/contexts/prediction-context"
import { Users, MapPin } from "lucide-react"

export function BasicInfoStep() {
  const { state, dispatch } = usePrediction()

  const updateInput = (field: string, value: number | string) => {
    dispatch({
      type: "UPDATE_INPUTS",
      payload: { [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-slate-300 flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />
            Household Size
          </Label>
          <Input
            type="number"
            value={state.inputs.hhsize}
            onChange={(e) => updateInput("hhsize", Number(e.target.value))}
            className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
            placeholder="Number of people in your household"
          />
          <p className="text-sm text-slate-400">Include all family members living in your home</p>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-300 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-400" />
            Region Type
          </Label>
          <Select
            value={state.inputs.region_n.toString()}
            onValueChange={(value) => updateInput("region_n", Number(value))}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="1">Rural - Countryside, small towns</SelectItem>
              <SelectItem value="2">Urban - City centers, metropolitan areas</SelectItem>
              <SelectItem value="3">Suburban - Residential areas near cities</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-slate-400">This helps us provide region-specific predictions</p>
        </div>
      </div>

      <div className="bg-slate-700 p-4 rounded-lg">
        <h3 className="text-white font-medium mb-2">Why we need this information</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Household size affects total spending patterns</li>
          <li>• Regional differences impact cost of living</li>
          <li>• Helps our AI provide more accurate predictions</li>
        </ul>
      </div>
    </div>
  )
}
