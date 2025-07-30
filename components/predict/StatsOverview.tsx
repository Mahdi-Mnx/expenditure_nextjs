"use client";

import { DollarSign, Target, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsOverviewProps {
  totalPredictions: number;
  avgPrediction: number;
  highestPrediction: number;
  formatCurrency: (amount: number) => string;
}

export function StatsOverview({
  totalPredictions,
  avgPrediction,
  highestPrediction,
  formatCurrency,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={<Target className="w-7 h-7 text-blue-400" />}
        value={totalPredictions}
        label="Total Predictions"
        description="Active models running"
        color="blue"
        delay="0ms"
      />
      <StatCard
        icon={<DollarSign className="w-7 h-7 text-emerald-400" />}
        value={formatCurrency(avgPrediction)}
        label="Average Prediction"
        description="Monthly average"
        color="emerald"
        delay="100ms"
      />
      <StatCard
        icon={<TrendingUp className="w-7 h-7 text-purple-400" />}
        value={formatCurrency(highestPrediction)}
        label="Highest Prediction"
        description="Peak expenditure"
        color="purple"
        delay="200ms"
      />
    </div>
  );
}
