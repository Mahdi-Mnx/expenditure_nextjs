"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { supabaseBrowser } from "@/utils/supabase";
import { PredictionsList } from "@/components/predict/PredictionsList";
import { StatsOverview } from "@/components/predict/StatsOverview";
import { Header } from "@/components/predict/Header";
import { EmptyState } from "@/components/predict/EmptyState";
import { BackgroundElements } from "@/components/predict/BackgroundElements";
import { LoadingPredictionsScreen } from "@/components/predict/LoadingPredictionsScreen";
import { LoadingScreen } from "@/components/predict/LoadingScreen";
import { PredictionData } from "@/types/predict";

export default function PredictScreen() {
  const router = useRouter();
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const supabase = supabaseBrowser();

  useEffect(() => {
    setMounted(true);
    loadUserPredictions();
  }, []);

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

  // Calculate statistics
  const avgPrediction =
    predictions.reduce((sum, p) => sum + p.predicted_exp, 0) /
      predictions.length || 0;
  const highestPrediction = Math.max(
    ...predictions.map((p) => p.predicted_exp),
    0
  );
  const totalPredictions = predictions.length;

  if (!mounted) return <LoadingScreen />;
  if (loading) return <LoadingPredictionsScreen />;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <BackgroundElements mounted={mounted} />

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          <Header
            totalPredictions={totalPredictions}
            onAddNew={handleAddNewPrediction}
          />

          <StatsOverview
            totalPredictions={totalPredictions}
            avgPrediction={avgPrediction}
            highestPrediction={highestPrediction}
            formatCurrency={formatCurrency}
          />

          {predictions.length === 0 ? (
            <EmptyState onAddNew={handleAddNewPrediction} />
          ) : (
            <PredictionsList
              predictions={predictions}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              onEdit={handleEditPrediction}
              onDelete={handleDeletePrediction}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
