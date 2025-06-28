"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Home,
  Car,
  ShoppingCart,
  Zap,
  Heart,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Target,
  Lightbulb,
  Download,
  Share2,
  BarChart3,
} from "lucide-react"

export default function SampleReportPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for the report
  const householdData = {
    size: 6,
    region: "Urban",
    income: "Middle Income",
    electricity: true,
    water: "Piped Water",
  }

  const predictions = {
    total: 1847,
    confidence: 92,
    categories: [
      { name: "Food & Beverages", amount: 542, percentage: 29, icon: ShoppingCart, color: "text-red-400" },
      { name: "Housing & Utilities", amount: 485, percentage: 26, icon: Home, color: "text-blue-400" },
      { name: "Transportation", amount: 312, percentage: 17, icon: Car, color: "text-green-400" },
      { name: "Healthcare", amount: 198, percentage: 11, icon: Heart, color: "text-pink-400" },
      { name: "Education", amount: 165, percentage: 9, icon: GraduationCap, color: "text-purple-400" },
      { name: "Other Expenses", amount: 145, percentage: 8, icon: Zap, color: "text-yellow-400" },
    ],
  }

  const keyFactors = [
    {
      factor: "Household Size (6 people)",
      impact: "High",
      description: "Larger families typically have higher food and utility costs",
    },
    {
      factor: "Urban Location",
      impact: "Medium",
      description: "Urban areas have higher housing costs but better access to services",
    },
    {
      factor: "Electricity Access",
      impact: "Low",
      description: "Reliable electricity reduces alternative energy costs",
    },
    {
      factor: "Middle Income Status",
      impact: "Medium",
      description: "Income level affects spending patterns across categories",
    },
  ]

  const recommendations = [
    {
      title: "Food Budget Optimization",
      description: "Consider bulk buying and meal planning to reduce food costs by 15-20%",
      potential: "$80-110/month",
      priority: "High",
    },
    {
      title: "Energy Efficiency",
      description: "Invest in energy-efficient appliances to reduce utility costs",
      potential: "$45-65/month",
      priority: "Medium",
    },
    {
      title: "Transportation Sharing",
      description: "Explore carpooling or public transport options for daily commutes",
      potential: "$60-85/month",
      priority: "Medium",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Sample Household Report</h1>
                <p className="text-slate-400">AI-powered expenditure prediction analysis</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Household Overview */}
        <Card className="mb-8 bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-slate-900" />
              </div>
              Household Profile
            </CardTitle>
            <CardDescription className="text-slate-400">Based on the demographic information provided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{householdData.size}</div>
                <div className="text-sm text-slate-400">People</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-300">{householdData.region}</div>
                <div className="text-sm text-slate-400">Location</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-300">{householdData.income}</div>
                <div className="text-sm text-slate-400">Income Level</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-emerald-400">✓ Available</div>
                <div className="text-sm text-slate-400">Electricity</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-cyan-400">{householdData.water}</div>
                <div className="text-sm text-slate-400">Water Source</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Prediction Results */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Total Prediction */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border border-emerald-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-emerald-300 flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-emerald-400">${predictions.total.toLocaleString()}</div>
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                  {predictions.confidence}% Confidence
                </Badge>
              </div>
              <div className="text-sm text-slate-400">Based on 30+ data points and machine learning analysis</div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Expenditure Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                        <span className="text-slate-300 font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${category.amount}</div>
                        <div className="text-xs text-slate-400">{category.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-2 bg-slate-700" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Factors Analysis */}
        <Card className="mb-8 bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              Key Factors Influencing Predictions
            </CardTitle>
            <CardDescription className="text-slate-400">
              Our AI model identified these factors as most significant for your household
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {keyFactors.map((factor, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      factor.impact === "High"
                        ? "bg-red-400"
                        : factor.impact === "Medium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-300">{factor.factor}</h4>
                      <Badge
                        className={`text-xs ${
                          factor.impact === "High"
                            ? "bg-red-400/20 text-red-300 border-red-400/30"
                            : factor.impact === "Medium"
                              ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/30"
                              : "bg-green-400/20 text-green-300 border-green-400/30"
                        }`}
                      >
                        {factor.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription className="text-slate-400">
              AI-generated suggestions to optimize your household spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-300">{rec.title}</h4>
                    <Badge
                      className={`${
                        rec.priority === "High"
                          ? "bg-red-400/20 text-red-300 border-red-400/30"
                          : "bg-yellow-400/20 text-yellow-300 border-yellow-400/30"
                      }`}
                    >
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-slate-400 mb-3">{rec.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Potential savings:</span>
                    <span className="font-semibold text-emerald-400">{rec.potential}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="mb-8 bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-green-300 mb-1">Low Risk</h4>
                <p className="text-sm text-slate-400">Stable income and reasonable expenses</p>
              </div>
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="font-semibold text-yellow-300 mb-1">Medium Risk</h4>
                <p className="text-sm text-slate-400">Monitor food and transportation costs</p>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-300 mb-1">Growth Potential</h4>
                <p className="text-sm text-slate-400">Opportunities for optimization identified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-emerald-600 border-0 text-center">
          <CardContent className="py-12">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Your Personalized Report?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              This is just a sample. Create your account to get detailed predictions based on your actual household
              data, with monthly updates and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/predict/demographics">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 bg-transparent"
                >
                  Start Prediction
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
