"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { PredictionRecent } from "@/types/types";
import { useEffect, useState } from "react";
import { Users, Calendar, CheckCircle2 } from "lucide-react";

export function RecentPredictions({
  predictions,
}: {
  predictions: PredictionRecent[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (predictions.length > 0) {
      setLoading(false);
    } else {
      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [predictions]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>Recent Predictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <div className="absolute inset-0 rounded-full border-2 border-slate-700"></div>
              </div>
              <p className="text-slate-400 text-sm">Loading predictions...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (predictions.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>Recent Predictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-slate-500" />
              </div>
              <div className="text-slate-400">No predictions available</div>
              <div className="text-slate-500 text-sm">
                Start making predictions to see them here
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>Recent Predictions</span>
          </div>
          <Badge variant="outline" className="bg-slate-700/50 text-slate-300">
            {predictions.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-3">
          {predictions.map((prediction, index) => (
            <div
              key={prediction.id}
              className="group relative p-4 bg-gradient-to-r from-slate-700/30 to-slate-700/10 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {formatCurrency(prediction.predicted_exp)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex-col items-center space-x-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(prediction.created_at)}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>
                          {prediction.input_data.Number_of_Members} members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30"
                  >
                    {prediction.model_used}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
