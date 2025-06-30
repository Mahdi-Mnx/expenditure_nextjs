"use client"

import { PredictionInputs } from "@/types/predict";
import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Water type options (same as Expo app)
export const waterTypeOptions = [
  { label: "Piped water into dwelling", value: 1 },
  { label: "Tubewell/borehole", value: 2 },
  { label: "Tanker-truck", value: 3 },
  { label: "Protected dug well", value: 4 },
  { label: "Piped water to yard/plot", value: 5 },
  { label: "Rainwater collection", value: 6 },
  { label: "Natural surface water (river, dam, lake)", value: 7 },
  { label: "Public tap/standpipe", value: 8 },
  { label: "Unprotected dug well", value: 9 },
  { label: "Cart with small tank/drum", value: 10 },
  { label: "Protected spring", value: 11 },
  { label: "Surface water (pond, stream, canal)", value: 12 },
  { label: "Water catchment", value: 13 },
  { label: "From neighbours", value: 14 },
  { label: "Unprotected spring", value: 15 },
  { label: "Bottled water", value: 16 },
  { label: "Other (specify)", value: 17 }
];

// Region options (same as Expo app)
export const regionOptions = [
  { label: "Waqooyi Galbeed", value: 1 },
  { label: "Banadir", value: 2 },
  { label: "Togdheer", value: 3 },
  { label: "Mudug", value: 4 },
  { label: "Galgaduud", value: 5 },
  { label: "Middle Shabelle", value: 6 },
  { label: "Gedo", value: 7 },
  { label: "Lower Shabelle", value: 8 },
  { label: "Hiraan", value: 9 },
  { label: "Bay", value: 10 },
  { label: "Nugaal", value: 11 },
  { label: "Bari", value: 12 },
  { label: "Lower Juba", value: 13 },
  { label: "Bakool", value: 14 },
  { label: "Sool", value: 15 },
  { label: "Sanaag", value: 16 },
  { label: "Awdal", value: 17 }
];


interface PredictionState {
  inputs: Partial<PredictionInputs>;
  currentStep: number;
  completedSteps: number[];
  predictions?: {
    amount: number;
    confidence: number;
    factors: string[];
    breakdown: {
      food: number;
      nonFood: number;
      housing: number;
      other: number;
    };
  };
}

type PredictionAction =
  | { type: "UPDATE_INPUTS"; payload: Partial<PredictionInputs> }
  | { type: "SET_STEP"; payload: number }
  | { type: "COMPLETE_STEP"; payload: number }
  | { type: "SET_PREDICTION"; payload: PredictionState["predictions"] }
  | { type: "RESET" }

const initialState: PredictionState = {
  inputs: {},
  currentStep: 0,
  completedSteps: [],
  predictions: undefined,
}

function predictionReducer(state: PredictionState, action: PredictionAction): PredictionState {
  switch (action.type) {
    case "UPDATE_INPUTS":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ...action.payload
        },
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