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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Activity, TrendingUp, Zap } from "lucide-react";
import { PredictionData } from "@/types/predict";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedPrediction, setSelectedPrediction] =
    useState<PredictionData | null>(null);
  const supabase = supabaseBrowser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
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

        // Set the first prediction as selected by default
        if (dashboardData?.recentPredictions?.length > 0) {
          setSelectedPrediction(dashboardData.recentPredictions[0]);
        }
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
            {/* Header Skeleton with enhanced styling */}
            <div className="mb-12 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-80 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-2xl animate-pulse" />
                  <Skeleton className="h-6 w-96 bg-slate-800/50 rounded-xl animate-pulse delay-100" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-3 w-3 bg-emerald-500 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <Skeleton className="h-5 w-12 bg-slate-700/50 rounded-full" />
                </div>
              </div>
            </div>

            {/* Enhanced Summary Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(4)].map((_, i) => (
                <Card
                  key={i}
                  className="group bg-slate-800/30 border-slate-700/30 backdrop-blur-xl hover:bg-slate-800/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
                  style={{
                    animationDelay: `${i * 150}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-28 bg-slate-700/40 rounded-lg" />
                      <div className="relative">
                        <Skeleton className="h-8 w-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl animate-pulse"></div>
                      </div>
                    </div>
                    <Skeleton className="h-10 w-24 bg-slate-700/40 rounded-lg" />
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-3 w-3 bg-emerald-500/30 rounded-full" />
                      <Skeleton className="h-3 w-20 bg-slate-700/40 rounded" />
                    </div>
                  </div>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              ))}
            </div>

            {/* Enhanced Charts Skeleton */}
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 bg-slate-800/30 border-slate-700/30 backdrop-blur-xl group hover:bg-slate-800/40 transition-all duration-500">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl">
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Skeleton className="h-7 w-40 bg-slate-700/40 rounded-xl" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-16 bg-slate-700/40 rounded-full" />
                      <Skeleton className="h-8 w-20 bg-slate-700/40 rounded-full" />
                    </div>
                  </div>
                  <div className="relative">
                    <Skeleton className="h-80 w-full bg-gradient-to-br from-slate-700/20 to-slate-600/20 rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-xl group hover:bg-slate-800/40 transition-all duration-500">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-xl">
                        <Activity className="h-5 w-5 text-violet-400" />
                      </div>
                      <Skeleton className="h-7 w-44 bg-slate-700/40 rounded-xl" />
                    </div>
                    <Skeleton className="h-6 w-16 bg-slate-700/40 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-2xl backdrop-blur-sm"
                        style={{
                          animationDelay: `${i * 200}ms`,
                          animation: "slideInRight 0.6s ease-out forwards",
                        }}
                      >
                        <div className="space-y-3">
                          <Skeleton className="h-6 w-20 bg-slate-600/40 rounded-lg" />
                          <Skeleton className="h-4 w-32 bg-slate-600/40 rounded" />
                        </div>
                        <div className="space-y-3 text-right">
                          <Skeleton className="h-5 w-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg" />
                          <Skeleton className="h-3 w-20 bg-emerald-500/20 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 flex items-center justify-center relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <Card className="relative z-10 bg-slate-800/30 border-slate-700/30 backdrop-blur-xl p-12 text-center max-w-md mx-4 hover:bg-slate-800/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-red-400 animate-pulse" />
              </div>
              <div>
                <div className="text-slate-300 text-xl font-semibold mb-2">
                  Failed to load dashboard data
                </div>
                <div className="text-slate-500 text-sm">
                  Please try refreshing the page
                </div>
              </div>
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="border-red-500/30 text-red-400 bg-red-500/10"
                >
                  Connection Error
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"></div>

          {/* Floating particles */}
          {mounted &&
            [...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
          {/* Enhanced Header Section */}
          <div className="mb-12">
            <div
              className="flex items-center justify-between mb-6"
              style={{ animation: "fadeInDown 0.8s ease-out" }}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent animate-gradient bg-300% leading-tight">
                    Dashboard
                  </h1>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                    <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/30 animate-pulse">
                      Pro
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-400 text-lg font-light">
                  Overview of your financial predictions and spending patterns
                </p>
              </div>

              <div
                className="flex items-center space-x-4"
                style={{ animation: "fadeInRight 0.8s ease-out 0.2s both" }}
              >
                <div className="text-right">
                  <div className="text-sm text-slate-200">Last updated</div>
                  <div className="text-xs text-slate-400">Just now</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Summary Cards */}
          <div
            className="mb-12"
            style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
          >
            <SummaryCards stats={data.summaryStats} />
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="lg:col-span-1">
              <SpendingChart prediction={selectedPrediction} />
            </div>
            <div>
              <RecentPredictions
                predictions={data.recentPredictions}
                selectedPrediction={selectedPrediction}
                onSelect={setSelectedPrediction}
              />
            </div>
          </div>

          {/* Additional floating elements for visual interest */}
          <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce"></div>
        </div>
      </div>
    </DashboardLayout>
  );
}
