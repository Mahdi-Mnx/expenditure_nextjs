"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

// Mock prediction results - replace with actual API response
const mockResults = {
  prediction: 1200,
  confidence: 85,
  range: { min: 1050, max: 1350 },
  keyFactors: [
    { factor: "Large household size", impact: "high", description: "10 people significantly increases expenses" },
    { factor: "High food ratio", impact: "medium", description: "Food expenses are above regional average" },
    { factor: "Urban location", impact: "low", description: "Urban areas typically have higher costs" },
  ],
  recommendations: [
    "Consider bulk purchasing for food items",
    "Look into family meal planning strategies",
    "Explore group discounts for utilities",
  ],
}

export function ResultsCard() {
  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />💡 AI Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prediction Amount */}
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">${mockResults.prediction.toLocaleString()}</div>
            <div className="text-slate-300">± ${Math.abs(mockResults.prediction - mockResults.range.min)}</div>
            <div className="text-sm text-slate-400 mt-2">
              Range: ${mockResults.range.min} - ${mockResults.range.max}
            </div>
          </div>

          {/* Confidence Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Confidence Score</span>
              <span className="text-emerald-400 font-semibold">{mockResults.confidence}%</span>
            </div>
            <Progress value={mockResults.confidence} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Key Factors Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockResults.keyFactors.map((factor, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
              <div className="mt-1">
                {factor.impact === "high" && <AlertCircle className="h-5 w-5 text-red-400" />}
                {factor.impact === "medium" && <AlertCircle className="h-5 w-5 text-yellow-400" />}
                {factor.impact === "low" && <CheckCircle className="h-5 w-5 text-green-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{factor.factor}</span>
                  <Badge
                    variant={
                      factor.impact === "high" ? "destructive" : factor.impact === "medium" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {factor.impact} impact
                  </Badge>
                </div>
                <p className="text-slate-300 text-sm">{factor.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">💡 Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {mockResults.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
