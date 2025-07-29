// components/dashboard/recent-predictions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { PredictionRecent } from "@/types/types";
import { useEffect, useState } from "react";

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
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (predictions.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-slate-400">
            No spending data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
            >
              <div>
                <div className="text-white font-medium">
                  {formatCurrency(prediction.predicted_exp)}
                </div>
                <div className="text-sm text-slate-400">
                  {formatDate(prediction.created_at)} •{" "}
                  {prediction.input_data.Number_of_Members} members
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {prediction.model_used}
                </Badge>
                <div className="text-xs text-emerald-400">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
