"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { DollarSign, Target, TrendingUp, Activity } from "lucide-react";
import {
  cardVariantsSO,
  containerVariantsSO,
  colorClasses,
} from "@/utils/animation";
import { StatCardColor } from "@/types/predict";

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
  const AnimatedCounter = ({
    value,
    formatValue,
  }: {
    value: number;
    formatValue?: (val: number) => string;
  }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const display = useTransform(spring, (latest) => Math.round(latest));

    useEffect(() => {
      spring.set(value);
      const unsubscribe = display.on("change", (latest) => {
        setDisplayValue(latest);
      });
      return unsubscribe;
    }, [value, spring, display]);

    return (
      <span>{formatValue ? formatValue(displayValue) : displayValue}</span>
    );
  };

  const stats = [
    {
      icon: <Target className="w-7 h-7 text-blue-400" />,
      value: totalPredictions,
      label: "Total Predictions",
      description: "Active models running",
      color: "blue" as StatCardColor,
    },
    {
      icon: <DollarSign className="w-7 h-7 text-emerald-400" />,
      value: avgPrediction,
      label: "Average Prediction",
      description: "Yearly average",
      color: "emerald" as StatCardColor,
      formatValue: formatCurrency,
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-purple-400" />,
      value: highestPrediction,
      label: "Highest Prediction",
      description: "Peak expenditure",
      color: "purple" as StatCardColor,
      formatValue: formatCurrency,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      variants={containerVariantsSO}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div key={stat.label} variants={cardVariantsSO}>
          <div
            className={`group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 ${
              colorClasses[stat.color].border
            } transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              colorClasses[stat.color].shadow
            }`}
            style={{
              animation: "slideInUp 0.6s ease-out forwards",
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${
                  colorClasses[stat.color].bg
                } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    value={stat.value}
                    formatValue={stat.formatValue}
                  />
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
            <div className="flex items-center text-slate-300">
              <Activity
                className={`w-4 h-4 mr-2 ${colorClasses[stat.color].iconColor}`}
              />
              <span className="text-sm">{stat.description}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
