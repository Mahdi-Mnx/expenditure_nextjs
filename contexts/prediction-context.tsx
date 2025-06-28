"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface PredictionInputs {
  // Expenditures
  exp_food: number
  exp_nfnd: number
  exp_rent: number
  pce: number
  pcer: number

  // Demographics & Household
  hhsize: number
  region_n: number
  poor: number

  // Credit & Financial
  cr15_04quantity: number
  cr15_05quantity: number
  cr15_06: number
  cr15_10: number

  // Utilities & Services
  hh_water_type: number
  hh_electricity: number
  foodsec7_07: number

  // Remittances & Income
  remt9_11: number

  // Livestock & Assets
  liv4_21: number
  liv4_22: number
  liv4_24: number
  liv4_25: number
  liv4_04: number
  liv4_12: number
  liv4_13: number

  // Non-Food Expenditures
  nfe16_33: number
  nfe16_13: number

  // Shocks & Events
  shock10_03: number
  shock10_04: number
  shock10_07_21: number
  shock10_07_23: number

  // Calculated fields (auto-generated)
  log_exp_food: number
  log_exp_nfnd: number
  log_exp_rent: number

  // User info
  name?: string
  email?: string
}

interface PredictionState {
  inputs: PredictionInputs
  currentStep: number
  completedSteps: number[]
  predictions: {
    amount: number
    confidence: number
    factors: string[]
    breakdown: {
      food: number
      nonFood: number
      housing: number
      other: number
    }
  } | null
}

type PredictionAction =
  | { type: "UPDATE_INPUTS"; payload: Partial<PredictionInputs> }
  | { type: "SET_STEP"; payload: number }
  | { type: "COMPLETE_STEP"; payload: number }
  | { type: "SET_PREDICTION"; payload: PredictionState["predictions"] }
  | { type: "RESET" }

const initialState: PredictionState = {
  inputs: {
    exp_food: 500,
    exp_nfnd: 300,
    exp_rent: 0,
    pce: 800,
    pcer: 20,
    poor: 0,
    cr15_04quantity: 0,
    cr15_05quantity: 0,
    cr15_06: 0,
    cr15_10: 0,
    hhsize: 10,
    region_n: 2,
    hh_water_type: 1,
    hh_electricity: 1,
    foodsec7_07: 0,
    remt9_11: 700,
    liv4_21: 0,
    liv4_22: 0,
    liv4_24: 0,
    liv4_25: 0,
    liv4_04: 0,
    liv4_12: 0,
    liv4_13: 0,
    nfe16_33: 0,
    nfe16_13: 0,
    shock10_03: 0,
    shock10_04: 0,
    shock10_07_21: 0,
    shock10_07_23: 0,
    log_exp_food: Math.log1p(500),
    log_exp_nfnd: Math.log1p(300),
    log_exp_rent: Math.log1p(0),
  },
  currentStep: 0,
  completedSteps: [],
  predictions: null,
}

function predictionReducer(state: PredictionState, action: PredictionAction): PredictionState {
  switch (action.type) {
    case "UPDATE_INPUTS":
      const updatedInputs = { ...state.inputs, ...action.payload }

      // Auto-calculate log values
      if (action.payload.exp_food !== undefined) {
        updatedInputs.log_exp_food = Math.log1p(action.payload.exp_food)
      }
      if (action.payload.exp_nfnd !== undefined) {
        updatedInputs.log_exp_nfnd = Math.log1p(action.payload.exp_nfnd)
      }
      if (action.payload.exp_rent !== undefined) {
        updatedInputs.log_exp_rent = Math.log1p(action.payload.exp_rent)
      }

      return {
        ...state,
        inputs: updatedInputs,
      }
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "COMPLETE_STEP":
      return {
        ...state,
        completedSteps: [...state.completedSteps.filter((s) => s !== action.payload), action.payload],
      }
    case "SET_PREDICTION":
      return {
        ...state,
        predictions: action.payload,
      }
    case "RESET":
      return initialState
    default:
      return state
  }
}

const PredictionContext = createContext<{
  state: PredictionState
  dispatch: React.Dispatch<PredictionAction>
} | null>(null)

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(predictionReducer, initialState)

  return <PredictionContext.Provider value={{ state, dispatch }}>{children}</PredictionContext.Provider>
}

export function usePrediction() {
  const context = useContext(PredictionContext)
  if (!context) {
    throw new Error("usePrediction must be used within a PredictionProvider")
  }
  return context
}
