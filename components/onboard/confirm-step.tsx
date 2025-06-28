"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePrediction } from "@/contexts/prediction-context"
import { TrendingUp, Users, MapPin, DollarSign, Zap } from "lucide-react"

export function ConfirmStep() {
  const { state, dispatch } = usePrediction()

  // Generate mock prediction when component mounts
  useEffect(() => {
    const generatePrediction = () => {
      const { exp_food, exp_nfnd, exp_rent, hhsize } = state.inputs
      const baseAmount = exp_food + exp_nfnd + exp_rent
      const householdMultiplier = 1 + (hhsize - 1) * 0.15
      const prediction = Math.round(baseAmount * householdMultiplier * 1.2)

      dispatch({
        type: "SET_PREDICTION",
        payload: {
          amount: prediction,
          confidence: 87,
          factors: [
            `Household size: ${hhsize} people`,
            `Food spending: $${exp_food}`,
            `Total base expenses: $${baseAmount}`,
          ],
        },
      })
    }

    generatePrediction()
  }, [state.inputs, dispatch])

  const regionMap = { 1: "Rural", 2: "Urban", 3: "Suburban" }

  return (
    <div className="space-y-6">
      {/* Input Summary */}
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Your Input Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-slate-300 text-sm">Household Size</div>
                <div className="text-white font-semibold">{state.inputs.hhsize} people</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-slate-300 text-sm">Region</div>
                <div className="text-white font-semibold">
                  {regionMap[state.inputs.region_n as keyof typeof regionMap]}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-900/30 p-3 rounded">
              <div className="text-red-300 text-sm">Food</div>
              <div className="text-white font-bold">${state.inputs.exp_food}</div>
            </div>
            <div className="bg-red-900/30 p-3 rounded">
              <div className="text-red-300 text-sm">Non-Food</div>
              <div className="text-white font-bold">${state.inputs.exp_nfnd}</div>
            </div>
            <div className="bg-red-900/30 p-3 rounded">
              <div className="text-red-300 text-sm">Rent</div>
              <div className="text-white font-bold">${state.inputs.exp_rent}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span className="text-slate-300">Electricity:</span>
            <Badge variant={state.inputs.hh_electricity ? "default" : "secondary"}>
              {state.inputs.hh_electricity ? "Available" : "Not Available"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Prediction */}
      {state.predictions && (
        <Card className="bg-slate-800 border-emerald-500/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              AI Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                ${state.predictions.amount.toLocaleString()}
              </div>
              <div className="text-slate-300">Predicted Monthly Total</div>
              <div className="text-sm text-slate-400 mt-1">Confidence: {state.predictions.confidence}%</div>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Key Factors:</h4>
              <ul className="space-y-1">
                {state.predictions.factors.map((factor, index) => (
                  <li key={index} className="text-slate-300 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
