"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { usePrediction } from "@/contexts/prediction-context"
import { TrendingUp, Download, Share, RotateCcw, CheckCircle, AlertCircle, DollarSign } from "lucide-react"

export default function ResultsPage() {
  const { state, dispatch } = usePrediction()
  const router = useRouter()

  // Generate comprehensive prediction when component mounts
  useEffect(() => {
    const generatePrediction = () => {
      const {
        exp_food,
        exp_nfnd,
        exp_rent,
        pce,
        hhsize,
        region_n,
        remt9_11,
        shock10_04,
        poor,
        hh_electricity,
        hh_water_type,
      } = state.inputs

      // Complex prediction algorithm based on all inputs
      const baseAmount = exp_food + exp_nfnd + exp_rent
      const householdMultiplier = 1 + (hhsize - 1) * 0.12
      const regionMultiplier = region_n === 2 ? 1.15 : region_n === 3 ? 1.08 : 0.95
      const shockImpact = shock10_04 * 0.1
      const povertyAdjustment = poor ? 0.85 : 1.0
      const utilityBonus = (hh_electricity + hh_water_type) * 0.05
      const remittanceImpact = remt9_11 * 0.3

      const prediction = Math.round(
        (baseAmount * householdMultiplier * regionMultiplier * povertyAdjustment + remittanceImpact) *
          (1 + utilityBonus - shockImpact),
      )

      const confidence = Math.max(
        75,
        Math.min(95, 90 - shock10_04 * 5 + hh_electricity * 3 + hh_water_type * 2 - poor * 10),
      )

      dispatch({
        type: "SET_PREDICTION",
        payload: {
          amount: prediction,
          confidence,
          factors: [
            `Household size: ${hhsize} people (${householdMultiplier.toFixed(2)}x multiplier)`,
            `Region: ${region_n === 2 ? "Urban" : region_n === 3 ? "Suburban" : "Rural"} (${regionMultiplier.toFixed(2)}x)`,
            `Economic shocks: Level ${shock10_04} impact`,
            `Remittances: $${remt9_11} monthly boost`,
            `Utilities access: ${hh_electricity ? "Electricity" : "No electricity"}, ${hh_water_type === 1 ? "Piped water" : "Other water"}`,
          ],
          breakdown: {
            food: Math.round(prediction * 0.4),
            nonFood: Math.round(prediction * 0.25),
            housing: Math.round(prediction * 0.2),
            other: Math.round(prediction * 0.15),
          },
        },
      })
    }

    generatePrediction()
  }, [state.inputs, dispatch])

  const handleNewPrediction = () => {
    dispatch({ type: "RESET" })
    router.push("/predict/demographics")
  }

  const handleDownloadReport = () => {
    console.log("Downloading comprehensive report...")
    // TODO: Generate PDF report
  }

  const handleShare = () => {
    console.log("Sharing prediction results...")
    // TODO: Implement sharing functionality
  }

  if (!state.predictions) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Generating your comprehensive prediction...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Prediction Complete!</h1>
          </div>
          <p className="text-slate-400">
            Based on your comprehensive household data, here's your AI-powered financial forecast
          </p>
        </div>

        {/* Main Prediction Card */}
        <Card className="bg-slate-800 border-emerald-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />💡 AI Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400 mb-2">
                ${state.predictions.amount.toLocaleString()}
              </div>
              <div className="text-slate-300 text-lg">Predicted Monthly Total</div>
              <div className="text-sm text-slate-400 mt-2">Confidence Level: {state.predictions.confidence}%</div>
              <Progress value={state.predictions.confidence} className="mt-2 max-w-xs mx-auto" />
            </div>

            {/* Breakdown */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                <div className="text-2xl font-bold text-red-300">${state.predictions.breakdown.food}</div>
                <div className="text-sm text-slate-400">Food</div>
              </div>
              <div className="text-center p-4 bg-orange-900/30 border border-orange-500/30 rounded-lg">
                <div className="text-2xl font-bold text-orange-300">${state.predictions.breakdown.nonFood}</div>
                <div className="text-sm text-slate-400">Non-Food</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-300">${state.predictions.breakdown.housing}</div>
                <div className="text-sm text-slate-400">Housing</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-300">${state.predictions.breakdown.other}</div>
                <div className="text-sm text-slate-400">Other</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Factors */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Key Prediction Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {state.predictions.factors.map((factor, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{factor}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-400" />💡 Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {state.inputs.shock10_04 > 2 && (
                <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-red-300 font-medium">Economic Shock Mitigation</div>
                    <div className="text-slate-300 text-sm">
                      Consider building an emergency fund and diversifying income sources to reduce vulnerability to
                      economic shocks.
                    </div>
                  </div>
                </div>
              )}

              {state.inputs.hhsize > 8 && (
                <div className="flex items-start gap-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-blue-300 font-medium">Large Household Optimization</div>
                    <div className="text-slate-300 text-sm">
                      Bulk purchasing and shared resources can significantly reduce per-person costs for your large
                      household.
                    </div>
                  </div>
                </div>
              )}

              {state.inputs.remt9_11 > 500 && (
                <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-green-300 font-medium">Remittance Advantage</div>
                    <div className="text-slate-300 text-sm">
                      Your substantial remittance income provides financial stability. Consider investing a portion for
                      long-term growth.
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-emerald-300 font-medium">Budget Optimization</div>
                  <div className="text-slate-300 text-sm">
                    Track your spending against these predictions to identify areas for optimization and savings.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadReport}
            className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Share className="mr-2 h-4 w-4" />
            Share Results
          </Button>

          <Button
            onClick={handleNewPrediction}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            New Prediction
          </Button>
        </div>

        {/* Data Summary */}
        <Card className="bg-slate-700 border-slate-600 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Input Data Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-slate-400 mb-2">Demographics</div>
                <div className="space-y-1">
                  <div>Household: {state.inputs.hhsize} people</div>
                  <div>
                    Region: {state.inputs.region_n === 2 ? "Urban" : state.inputs.region_n === 3 ? "Suburban" : "Rural"}
                  </div>
                  <div>Poverty: {state.inputs.poor ? "Below line" : "Above line"}</div>
                </div>
              </div>
              <div>
                <div className="text-slate-400 mb-2">Expenditures</div>
                <div className="space-y-1">
                  <div>Food: ${state.inputs.exp_food}</div>
                  <div>Non-Food: ${state.inputs.exp_nfnd}</div>
                  <div>Rent: ${state.inputs.exp_rent}</div>
                  <div>PCE: ${state.inputs.pce}</div>
                </div>
              </div>
              <div>
                <div className="text-slate-400 mb-2">Other Factors</div>
                <div className="space-y-1">
                  <div>Remittances: ${state.inputs.remt9_11}</div>
                  <div>Shock Level: {state.inputs.shock10_04}</div>
                  <div>Electricity: {state.inputs.hh_electricity ? "Yes" : "No"}</div>
                  <div>Water: Type {state.inputs.hh_water_type}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
