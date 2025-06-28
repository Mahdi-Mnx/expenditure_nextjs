"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BasicInfoStep } from "@/components/onboard/basic-info-step"
import { ExpenditureStep } from "@/components/onboard/expenditure-step"
import { ConfirmStep } from "@/components/onboard/confirm-step"
import { usePrediction } from "@/contexts/prediction-context"
import { ArrowLeft, ArrowRight } from "lucide-react"

const steps = [
  { title: "Basic Info", description: "Tell us about your household" },
  { title: "Expenditures", description: "Add your spending details" },
  { title: "Confirm", description: "Review and get predictions" },
]

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { state, dispatch } = usePrediction()
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      dispatch({ type: "SET_STEP", payload: currentStep + 1 })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      dispatch({ type: "SET_STEP", payload: currentStep - 1 })
    }
  }

  const handleComplete = async () => {
    // TODO: Save to Supabase
    // const { data: { user } } = await supabase.auth.getUser()
    // await supabase.from('user_predictions').insert({
    //   user_id: user.id,
    //   inputs: state.inputs,
    //   prediction: state.predictions?.amount || 0
    // })

    console.log("Onboarding complete:", state)
    router.push("/dashboard")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />
      case 1:
        return <ExpenditureStep />
      case 2:
        return <ConfirmStep />
      default:
        return <BasicInfoStep />
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Financial Journey</h1>
          <p className="text-slate-400">Let's set up your personalized predictions in just 3 steps</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className="text-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-semibold ${
                    index <= currentStep ? "bg-emerald-400 text-slate-900" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>
                <div className={`text-sm ${index <= currentStep ? "text-emerald-400" : "text-slate-500"}`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              Step {currentStep + 1}: {steps[currentStep].title}
            </CardTitle>
            <p className="text-slate-400">{steps[currentStep].description}</p>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleComplete} className="bg-emerald-400 hover:bg-emerald-500 text-slate-900">
              Complete Setup
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-emerald-400 hover:bg-emerald-500 text-slate-900">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
