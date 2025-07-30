"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { supabaseBrowser } from "@/utils/supabase";
import { PredictionsList } from "@/components/predict/PredictionsList";
import { StatsOverview } from "@/components/predict/StatsOverview";
import { Header } from "@/components/predict/Header";
import { EmptyState } from "@/components/predict/EmptyState";
import { BackgroundElements } from "@/components/predict/BackgroundElements";
import { LoadingPredictionsScreen } from "@/components/predict/LoadingPredictionsScreen";
import type { PredictionData } from "@/types/predict";
import {
  backgroundVariants,
  itemVariants,
  loadingToContentVariants,
  pageEntranceVariants,
} from "@/utils/animation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function PredictScreen() {
  const router = useRouter();
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const supabase = supabaseBrowser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [predictionToDelete, setPredictionToDelete] = useState<string | null>(
    null
  );
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

  const handleDeleteClick = (id: string) => {
    setPredictionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeletePrediction = async () => {
    if (!predictionToDelete) return;

    try {
      const { error } = await supabase
        .from("predictions")
        .delete()
        .eq("id", predictionToDelete);
      if (error) throw error;
      setPredictions((prev) => prev.filter((p) => p.id !== predictionToDelete));
    } catch (err: any) {
      alert("Error deleting: " + err.message);
    } finally {
      setDeleteDialogOpen(false);
      setPredictionToDelete(null);
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

  if (!mounted) return <LoadingPredictionsScreen />;

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LoadingPredictionsScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
            variants={pageEntranceVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={backgroundVariants}>
              <BackgroundElements mounted={mounted} />
            </motion.div>

            <motion.div
              className="relative z-10 p-6 max-w-7xl mx-auto"
              variants={loadingToContentVariants}
            >
              <motion.div variants={itemVariants}>
                <Header
                  totalPredictions={totalPredictions}
                  onAddNew={handleAddNewPrediction}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <StatsOverview
                  totalPredictions={totalPredictions}
                  avgPrediction={avgPrediction}
                  highestPrediction={highestPrediction}
                  formatCurrency={formatCurrency}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {predictions.length === 0 ? (
                  <motion.div
                    key="empty"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 20,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <EmptyState onAddNew={handleAddNewPrediction} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="predictions"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 20,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <PredictionsList
                      predictions={predictions}
                      formatDate={formatDate}
                      formatCurrency={formatCurrency}
                      onEdit={handleEditPrediction}
                      onDelete={handleDeleteClick}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md border-0 bg-gradient-to-br from-emerald-400 to-emerald-600  ">
          <AlertDialogHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 via-red-50 to-orange-50 ring-8 ring-red-50/50">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Delete Prediction
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white leading-relaxed">
              This action cannot be undone. This will permanently remove this
              prediction from your account and all associated data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                className="w-full border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                onClick={handleDeletePrediction}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Prediction
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
