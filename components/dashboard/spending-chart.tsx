import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types/types";
import { supabaseBrowser } from "@/utils/supabase";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface MonthlyData extends ChartData {
  count: number;
}

export function SpendingChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = supabaseBrowser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // Get predictions from the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const { data: predictions, error } = await supabase
          .from("predictions")
          .select("*")
          .eq("user_id", user.id)
          .gte("created_at", sixMonthsAgo.toISOString())
          .order("created_at", { ascending: true });

        if (error) throw error;

        // Group by month using MonthlyData interface (which includes count)
        const monthlyData: Record<string, MonthlyData> = {};

        predictions.forEach((prediction) => {
          const date = new Date(prediction.created_at);
          const monthYear = `${date.toLocaleString("default", {
            month: "short",
          })} ${date.getFullYear()}`;

          if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = {
              month: monthYear,
              food: 0,
              housing: 0,
              transport: 0,
              utilities: 0,
              total: 0,
              count: 0, // Now properly typed
            };
          }

          const input = prediction.input_data;
          monthlyData[monthYear].food += input.Food_Expenditure;
          monthlyData[monthYear].housing += input.Housing_Expenditure;
          monthlyData[monthYear].transport += input.Transport_Expenditure;
          monthlyData[monthYear].utilities += input.Utilities_Expenditure;
          monthlyData[monthYear].total += prediction.predicted_exp;
          monthlyData[monthYear].count++;
        });

        // Convert to final ChartData format (without count)
        const formattedData = Object.values(monthlyData).map((item) => ({
          month: item.month,
          food: Math.round(item.food / item.count),
          housing: Math.round(item.housing / item.count),
          transport: Math.round(item.transport / item.count),
          utilities: Math.round(item.utilities / item.count),
          total: Math.round(item.total / item.count),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Spending Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Spending Trends</CardTitle>
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
        <CardTitle className="text-white">Spending Trends</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="h-64">
          <h1 className="text-center mt-10 text-white font-bold text-xl">
            AreaChart
          </h1>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#4B5563" }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#4B5563" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  borderRadius: "0.5rem",
                }}
                formatter={(value) => [`$${value}`, "Total"]}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <h1 className="text-center mt-10 text-white font-bold text-xl">
          BarChart
        </h1>
        {/* Additional chart for category breakdown */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#4B5563" }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#4B5563" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar dataKey="food" fill="#3b82f6" name="Food" />
              <Bar dataKey="housing" fill="#8b5cf6" name="Housing" />
              <Bar dataKey="transport" fill="#f59e0b" name="Transport" />
              <Bar dataKey="utilities" fill="#10b981" name="Utilities" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
