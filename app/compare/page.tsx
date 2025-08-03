"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PredictionSelector } from "@/components/predict/compare/prediction-selector";
import { ComparisonResults } from "@/components/predict/compare/comparison-results.";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp, Zap } from "lucide-react";
import { supabaseBrowser } from "@/utils/supabase";
import "./compare.css";
import { ComparisonResult, PredictionData } from "@/types/predict";

export default function ComparePage() {
  const router = useRouter();
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [selectedPrediction1, setSelectedPrediction1] =
    useState<PredictionData | null>(null);
  const [selectedPrediction2, setSelectedPrediction2] =
    useState<PredictionData | null>(null);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const supabase = supabaseBrowser();

  useEffect(() => {
    loadUserPredictions();
  }, []);

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

  const handleCompare = async () => {
    if (!selectedPrediction1 || !selectedPrediction2) return;

    setComparing(true);
    try {
      // Get the auth token
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(
        "https://expenditure-api-ez17.onrender.com/compare-predictions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add auth header
          },
          body: JSON.stringify({
            prediction1_id: selectedPrediction1.id,
            prediction2_id: selectedPrediction2.id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setComparisonResult(result);
    } catch (err: any) {
      console.error("Comparison error:", err);
      alert(err.message || "Failed to compare predictions");
    } finally {
      setComparing(false);
    }
  };

  const resetComparison = () => {
    setSelectedPrediction1(null);
    setSelectedPrediction2(null);
    setComparisonResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="compare-container">
          <div className="compare-header">
            <div className="compare-header-content">
              <div className="compare-header-text">
                <div className="compare-skeleton-title" />
                <div className="compare-skeleton-subtitle" />
              </div>
            </div>
          </div>
          <div className="compare-content">
            <div className="compare-loading">
              <div className="compare-loading-spinner" />
              <p className="compare-loading-text">
                Loading your predictions...
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="compare-container">
        {/* Header */}
        <div className="compare-header">
          <div className="compare-header-content">
            <div className="compare-header-left">
              <Button
                variant="ghost"
                className="compare-back-button"
                onClick={() => router.push("/predict")}
              >
                <ArrowLeft className="compare-back-icon" />
                Back to Predictions
              </Button>
            </div>
            <div className="compare-header-text">
              <h1 className="compare-title">
                <TrendingUp className="compare-title-icon" />
                Compare Predictions
              </h1>
              <p className="compare-subtitle">
                Select two predictions to analyze differences and gain insights
                into your expenditure patterns
              </p>
            </div>
          </div>
        </div>

        <div className="compare-content">
          {!comparisonResult ? (
            /* Selection Phase */
            <div className="compare-selection">
              {predictions.length < 2 ? (
                <Card className="compare-empty-card">
                  <div className="compare-empty-content">
                    <div className="compare-empty-icon">
                      <BarChart3 className="compare-empty-icon-svg" />
                    </div>
                    <h3 className="compare-empty-title">
                      Not Enough Predictions
                    </h3>
                    <p className="compare-empty-description">
                      You need at least 2 predictions to make a comparison.
                      Create more predictions to unlock this feature.
                    </p>
                    <Button
                      className="compare-empty-button"
                      onClick={() => router.push("/predict/new")}
                    >
                      <Zap className="compare-empty-button-icon" />
                      Create New Prediction
                    </Button>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Selection Cards */}
                  <div className="compare-selection-grid">
                    <div className="compare-selection-column">
                      <h3 className="compare-selection-title">
                        <span className="compare-selection-number">1</span>
                        First Prediction
                      </h3>
                      <PredictionSelector
                        predictions={predictions}
                        selectedPrediction={selectedPrediction1}
                        onSelect={setSelectedPrediction1}
                        excludeId={selectedPrediction2?.id}
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                        placeholder="Select first prediction to compare"
                      />
                    </div>

                    <div className="compare-vs-divider">
                      <div className="compare-vs-line" />
                      <div className="compare-vs-text">VS</div>
                      <div className="compare-vs-line" />
                    </div>

                    <div className="compare-selection-column">
                      <h3 className="compare-selection-title">
                        <span className="compare-selection-number">2</span>
                        Second Prediction
                      </h3>
                      <PredictionSelector
                        predictions={predictions}
                        selectedPrediction={selectedPrediction2}
                        onSelect={setSelectedPrediction2}
                        excludeId={selectedPrediction1?.id}
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                        placeholder="Select second prediction to compare"
                      />
                    </div>
                  </div>

                  {/* Compare Button */}
                  <div className="compare-action">
                    <Button
                      className="compare-button"
                      onClick={handleCompare}
                      disabled={
                        !selectedPrediction1 ||
                        !selectedPrediction2 ||
                        comparing
                      }
                    >
                      {comparing ? (
                        <>
                          <div className="compare-button-spinner" />
                          Analyzing Predictions...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="compare-button-icon" />
                          Compare Predictions
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Results Phase */
            <ComparisonResults
              result={comparisonResult}
              prediction1={selectedPrediction1!}
              prediction2={selectedPrediction2!}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              onReset={resetComparison}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
