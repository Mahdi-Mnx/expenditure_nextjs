"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { RecentPredictions } from "@/components/dashboard/recent-predictions";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { getDashboardData } from "@/lib/dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { supabaseBrowser } from "@/utils/supabase";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = supabaseBrowser();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          toast.error("Please sign in to access the dashboard");
          router.push("/auth/login");
          return;
        }

        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 px-6 py-8 bg-slate-900 min-h-screen">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-slate-700 rounded" />
            <Skeleton className="h-4 w-80 bg-slate-800 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-24 w-full bg-slate-800 rounded-lg"
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <Skeleton className="h-64 lg:col-span-2 bg-slate-800 rounded-lg" />
            <Skeleton className="h-64 bg-slate-800 rounded-lg" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex justify-center items-center min-h-screen">
          <p className="text-slate-400">Failed to load dashboard data</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">
            Overview of your financial predictions and spending patterns
          </p>
        </div>

        <SummaryCards stats={data.summaryStats} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SpendingChart />
          </div>
          <RecentPredictions predictions={data.recentPredictions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
