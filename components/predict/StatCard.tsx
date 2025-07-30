"use client";

import { Activity } from "lucide-react";
import { ReactNode } from "react";

type StatCardColor = "blue" | "emerald" | "purple";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  description: string;
  color: StatCardColor;
  delay: string;
}

export function StatCard({
  icon,
  value,
  label,
  description,
  color,
  delay,
}: StatCardProps) {
  const colorClasses = {
    blue: {
      bg: "from-blue-500/20 to-cyan-500/20",
      border: "hover:border-blue-500/30",
      shadow: "hover:shadow-blue-500/10",
      iconColor: "text-blue-400",
    },
    emerald: {
      bg: "from-emerald-500/20 to-teal-500/20",
      border: "hover:border-emerald-500/30",
      shadow: "hover:shadow-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    purple: {
      bg: "from-purple-500/20 to-pink-500/20",
      border: "hover:border-purple-500/30",
      shadow: "hover:shadow-purple-500/10",
      iconColor: "text-purple-400",
    },
  };

  return (
    <div
      className={`group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 ${colorClasses[color].border} transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClasses[color].shadow}`}
      style={{
        animation: "slideInUp 0.6s ease-out forwards",
        animationDelay: delay,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color].bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="text-slate-400 text-sm font-medium">{label}</div>
        </div>
      </div>
      <div className="flex items-center text-slate-300">
        <Activity className={`w-4 h-4 mr-2 ${colorClasses[color].iconColor}`} />
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
}
