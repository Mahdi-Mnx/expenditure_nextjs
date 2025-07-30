"use client";

import { BarChart3, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="text-center py-20 animate-fadeIn">
      <div className="w-24 h-24 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <BarChart3 className="w-12 h-12 text-slate-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">No Predictions Yet</h2>
      <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
        Create your first household expenditure prediction using our advanced AI
        models to get started with financial insights.
      </p>
      <button
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-3 mx-auto"
        onClick={onAddNew}
      >
        <Plus className="w-5 h-5" />
        <span>Create Your First Prediction</span>
      </button>
    </div>
  );
}
