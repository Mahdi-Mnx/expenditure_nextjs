// lib/api/dashboard.ts
import { supabaseBrowser } from "@/utils/supabase";

export async function getDashboardData() {
  const supabase = supabaseBrowser();

  // First check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("User not authenticated");

  try {
    // Get recent predictions (last 3)
    const { data: predictions, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;

    // Calculate summary stats
    const totalPredicted = predictions.reduce(
      (sum, p) => sum + p.predicted_exp,
      0
    );
    const avgPredicted = totalPredicted / predictions.length || 0;
    const thisMonthPredicted = predictions
      .filter(
        (p) => new Date(p.created_at).getMonth() === new Date().getMonth()
      )
      .reduce((sum, p) => sum + p.predicted_exp, 0);

    return {
      recentPredictions: predictions,
      summaryStats: {
        totalPredicted,
        avgPredicted,
        thisMonthPredicted,
        predictionCount: predictions.length,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
