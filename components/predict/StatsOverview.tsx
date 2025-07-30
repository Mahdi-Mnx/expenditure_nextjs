"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { DollarSign, Target, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { cardVariantsSO, containerVariantsSO } from "@/utils/animation";
import { StatCardColor } from "@/types/predict";

interface StatsOverviewProps {
  totalPredictions: number;
  avgPrediction: number;
  highestPrediction: number;
  formatCurrency: (amount: number) => string;
}

function AnimatedCounter({
  value,
  formatValue,
}: {
  value: number;
  formatValue?: (val: number) => string;
}) {
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

  return <span>{formatValue ? formatValue(displayValue) : displayValue}</span>;
}

export function StatsOverview({
  totalPredictions,
  avgPrediction,
  highestPrediction,
  formatCurrency,
}: StatsOverviewProps) {
  const stats = [
    {
      icon: <Target className="w-7 h-7 text-blue-400" />,
      value: totalPredictions,
      label: "Total Predictions",
      description: "Active models running",
      color: "blue",
    },
    {
      icon: <DollarSign className="w-7 h-7 text-emerald-400" />,
      value: avgPrediction,
      label: "Average Prediction",
      description: "Monthly average",
      color: "emerald",
      formatValue: formatCurrency,
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-purple-400" />,
      value: highestPrediction,
      label: "Highest Prediction",
      description: "Peak expenditure",
      color: "purple",
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
          <StatCard
            icon={stat.icon}
            value={
              <AnimatedCounter
                value={stat.value}
                formatValue={stat.formatValue}
              />
            }
            label={stat.label}
            description={stat.description}
            color={stat.color as StatCardColor}
            delay={`${index * 100}ms`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
