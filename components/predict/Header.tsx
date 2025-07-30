"use client";

import { BarChart3, Plus } from "lucide-react";

interface HeaderProps {
  totalPredictions: number;
  onAddNew: () => void;
}

export function Header({ totalPredictions, onAddNew }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 animate-fadeIn">
      <div>
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
            AI Predictions
          </h1>
        </div>
        <p className="text-slate-400 text-lg ml-16">
          {totalPredictions} prediction{totalPredictions !== 1 ? "s" : ""}{" "}
          generated with advanced AI models
        </p>
      </div>
      <button
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-3"
        onClick={onAddNew}
      >
        <Plus className="w-5 h-5" />
        <span>New Prediction</span>
      </button>
    </div>
  );
}
