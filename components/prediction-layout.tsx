"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DashboardLayout } from "./dashboard-layout"

const steps = [
  { title: "Demographics", description: "Household composition" },
  { title: "Expenditures", description: "Monthly spending" },
  { title: "Income & Assets", description: "Income sources & assets" },
  { title: "Financial Services", description: "Credit & food security" },
  { title: "Shocks & Events", description: "Economic impacts" },
  { title: "Results", description: "AI predictions" },
]

interface PredictionLayoutProps {
  children: React.ReactNode
  currentStep: number
  title: string
  description: string
  onNext: () => void
  onPrevious: () => void
  canGoNext?: boolean
}

export function PredictionLayout({
  children,
  currentStep,
  title,
  description,
  onNext,
  onPrevious,
  canGoNext = true,
}: PredictionLayoutProps) {
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4 ">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <div className="text-sm text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <p className="text-slate-400 mb-6">{description}</p>

          {/* Step Indicators */}
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-semibold ${
                    index <= currentStep ? "bg-emerald-400 text-slate-900" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>
                <div className={`text-xs ${index <= currentStep ? "text-emerald-400" : "text-slate-500"}`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="mb-8">{children}</div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious} className="border-slate-600 text-black hover:bg-slate-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 disabled:opacity-50"
          >
            {currentStep === steps.length - 2 ? "Generate Prediction" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}
