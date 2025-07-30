"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { PredictionCard } from "@/components/predict/prediction-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout } from "@/components/dashboard-layout";
import { supabaseBrowser } from "@/utils/supabase";

interface PredictionData {
  id: string;
  user_id: string;
  input_data: {
    Region: string;
    Residence_Type: string;
    Business_Revenue: number;
    Food_Expenditure: number;
    Number_of_Members: number;
    Housing_Expenditure: number;
    NonFood_Expenditure: number;
    Transport_Expenditure: number;
    Utilities_Expenditure: number;
    Livestock_Byproducts_Value: number;
    General_NonFood_Expenditure: number;
    Spent_on_Food_Drink_Outside: number;
  };
  predicted_exp: number;
  model_used: string;
  created_at: string;
}

export default function PredictScreen() {
  const router = useRouter();
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = supabaseBrowser();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const loadUserPredictions = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPredictions(data || []);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Could not load predictions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserPredictions();
  }, []);

  const handleDeletePrediction = async (id: string) => {
    if (confirm("Are you sure you want to delete this prediction?")) {
      try {
        const { error } = await supabase
          .from("predictions")
          .delete()
          .eq("id", id);

        if (error) throw error;

        setPredictions((prev) => prev.filter((p) => p.id !== id));
      } catch (err: any) {
        alert("Error deleting: " + err.message);
      }
    }
  };

  const handleEditPrediction = (prediction: PredictionData) => {
    router.push(
      `/predict/new?mode=edit&predictionId=${
        prediction.id
      }&predictionData=${encodeURIComponent(JSON.stringify(prediction))}`
    );
  };

  const handleAddNewPrediction = () => {
    router.push("/predict/new");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-4 p-6 bg-slate-900 min-h-screen">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-slate-800 rounded-xl p-4 space-y-3">
              <Skeleton className="h-4 w-1/3 bg-slate-700 rounded" />
              <Skeleton className="h-6 w-2/3 bg-slate-600 rounded" />
              <Skeleton className="h-4 w-1/4 bg-slate-700 rounded" />
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 bg-slate-900 min-h-screen">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-2xl font-bold">Predictions</h1>
              <p className="text-slate-400 mt-1">
                {predictions.length} prediction
                {predictions.length !== 1 ? "s" : ""} saved
              </p>
            </div>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center"
              onClick={handleAddNewPrediction}
            >
              <Plus size={18} className="mr-2" />
              New
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="px-6 py-4">
          <div className="flex gap-4">
            <Card className="flex-1 bg-slate-800 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <DollarSign size={16} className="text-emerald-500 mr-2" />
                <span className="text-slate-400 text-sm">Avg Prediction</span>
              </div>
              <p className="text-white text-lg font-bold">
                {formatCurrency(
                  predictions.reduce((sum, p) => sum + p.predicted_exp, 0) /
                    predictions.length || 0
                )}
              </p>
            </Card>

            <Card className="flex-1 bg-slate-800 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <TrendingUp size={16} className="text-blue-500 mr-2" />
                <span className="text-slate-400 text-sm">Highest</span>
              </div>
              <p className="text-white text-lg font-bold">
                {formatCurrency(
                  Math.max(...predictions.map((p) => p.predicted_exp), 0)
                )}
              </p>
            </Card>
          </div>
        </div>

        {/* Predictions List */}
        <div className="px-6 pb-6 overflow-y-auto">
          {predictions.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="bg-slate-800 w-20 h-20 rounded-full flex justify-center items-center mb-4">
                <BarChart3 size={32} className="text-slate-500" />
              </div>
              <h2 className="text-slate-300 text-lg font-bold mb-2">
                No Predictions Yet
              </h2>
              <p className="text-slate-400 text-center mb-6 px-8">
                Create your first household expenditure prediction to get
                started
              </p>
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center"
                onClick={handleAddNewPrediction}
              >
                <Plus size={18} className="mr-2" />
                Create Prediction
              </Button>
            </div>
          ) : (
            <div className="pb-6 space-y-4">
              {predictions.map((prediction) => (
                <PredictionCard
                  key={prediction.id}
                  prediction={prediction}
                  onEdit={handleEditPrediction}
                  onDelete={handleDeletePrediction}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
