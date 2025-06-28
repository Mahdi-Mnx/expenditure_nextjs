"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PredictionForm } from "./prediction-form"

interface PredictionModalProps {
  children: React.ReactNode
}

export function PredictionModal({ children }: PredictionModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Quick Prediction Calculator</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PredictionForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
