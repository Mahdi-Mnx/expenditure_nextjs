import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Target,
  AlertCircle,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";

interface SummaryStats {
  totalPredicted: number;
  avgPredicted: number;
  thisMonthPredicted: number;
}

export function SummaryCards({
  stats,
}: {
  stats: SummaryStats & { predictionCount?: number };
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const summaryData = [
    {
      title: "Total Predicted",
      //value: formatCurrency(stats.totalPredicted),
      value: `${stats.predictionCount || 0} `,
      change: "+12%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Total spending predictions",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "This Year",
      value: formatCurrency(stats.thisMonthPredicted),
      change: "+8%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Current Yearly predictions",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Average Prediction",
      value: formatCurrency(stats.avgPredicted),
      change: "On track",
      changeType: "neutral" as const,
      icon: Target,
      description: "Average Yearly spending",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Variance",
      value: formatCurrency(
        Math.abs(stats.totalPredicted - stats.avgPredicted * 3)
      ),
      change:
        stats.totalPredicted > stats.avgPredicted * 3
          ? "Over budget"
          : "Under budget",
      changeType:
        stats.totalPredicted > stats.avgPredicted * 3 ? "negative" : "positive",
      icon: AlertCircle,
      description: "Budget variance",
      gradient:
        stats.totalPredicted > stats.avgPredicted * 3
          ? "from-red-500 to-red-600"
          : "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => {
        const Icon = item.icon;
        const isPositive = item.changeType === "positive";
        const isNegative = item.changeType === "negative";

        return (
          <Card
            key={index}
            className="group bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/20"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {item.title}
                </CardTitle>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} shadow-lg`}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white group-hover:text-slate-100 transition-colors">
                {item.value}
              </div>
              <div className="flex items-center space-x-2">
                {isPositive && (
                  <ArrowUpIcon className="h-3 w-3 text-emerald-400" />
                )}
                {isNegative && (
                  <ArrowDownIcon className="h-3 w-3 text-red-400" />
                )}
                <span
                  className={`text-xs font-medium ${
                    isPositive
                      ? "text-emerald-400"
                      : isNegative
                      ? "text-red-400"
                      : "text-slate-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
