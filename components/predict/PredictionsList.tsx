"use client";

import { Sparkles } from "lucide-react";
import { PredictionCard } from "./prediction-card";
import { PredictionData } from "@/types/predict";

interface PredictionsListProps {
  predictions: PredictionData[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  onEdit: (prediction: PredictionData) => void;
  onDelete: (id: string) => void;
}

export function PredictionsList({
  predictions,
  formatDate,
  formatCurrency,
  onEdit,
  onDelete,
}: PredictionsListProps) {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">
            Recent Predictions
          </h3>
          <p className="text-slate-400">
            Your AI-generated expenditure forecasts
          </p>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Powered by Machine Learning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((prediction, index) => (
          <PredictionCard
            key={prediction.id}
            prediction={prediction}
            onEdit={onEdit}
            onDelete={onDelete}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            animationDelay={`${index * 100}ms`}
          />
        ))}
      </div>
    </div>
  );
}
