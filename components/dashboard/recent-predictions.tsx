// components/dashboard/recent-predictions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { PredictionData } from "@/types/predict";
import { Users, Calendar, CheckCircle2 } from "lucide-react";

interface RecentPredictionsProps {
  predictions: PredictionData[];
  selectedPrediction: PredictionData | null;
  onSelect: (prediction: PredictionData) => void;
}

export function RecentPredictions({
  predictions,
  selectedPrediction,
  onSelect,
}: RecentPredictionsProps) {
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
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className={`group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                selectedPrediction?.id === prediction.id
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30"
                  : "bg-gradient-to-r from-slate-700/30 to-slate-700/10 border-slate-600/30 hover:border-slate-500/50"
              }`}
              onClick={() => onSelect(prediction)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div
                    className={`text-xl font-bold transition-colors ${
                      selectedPrediction?.id === prediction.id
                        ? "text-blue-300"
                        : "text-white group-hover:text-emerald-400"
                    }`}
                  >
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
                        <span>{prediction.input_data.hhsize} members</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge
                    variant="outline"
                    className={`${
                      selectedPrediction?.id === prediction.id
                        ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border-blue-400/50"
                        : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30"
                    }`}
                  >
                    {prediction.model_used}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
