//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { supabaseBrowser } from "@/utils/supabase";
//import { useEffect, useState } from "react";
//import {
//  BarChart,
//  Bar,
//  XAxis,
//  YAxis,
//  CartesianGrid,
//  Tooltip,
//  Legend,
//  ResponsiveContainer,
//  AreaChart,
//  Area,
//} from "recharts";
//
//// Define the ChartData interface matching your actual data structure
//interface ChartData {
//  month: string;
//  food: number;
//  housing: number;
//  education: number;
//  water: number;
//  electricity: number;
//  savings: number;
//  communication: number;
//  total: number;
//}
//
//// Extend for internal use with count
//interface MonthlyData extends ChartData {
//  count: number;
//}
//
//export function SpendingChart() {
//  const [data, setData] = useState<ChartData[]>([]);
//  const [loading, setLoading] = useState(true);
//  const supabase = supabaseBrowser();
//
//  useEffect(() => {
//    const fetchData = async () => {
//      try {
//        const {
//          data: { user },
//        } = await supabase.auth.getUser();
//        if (!user) return;
//
//        // Get predictions from the last 6 months
//        const sixMonthsAgo = new Date();
//        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
//
//        const { data: predictions, error } = await supabase
//          .from("predictions")
//          .select("*")
//          .eq("user_id", user.id)
//          .gte("created_at", sixMonthsAgo.toISOString())
//          .order("created_at", { ascending: true });
//
//        if (error) throw error;
//
//        if (!predictions || predictions.length === 0) {
//          setData([]);
//          setLoading(false);
//          return;
//        }
//
//        // Initialize monthlyData with all required properties
//        const monthlyData: Record<string, MonthlyData> = {};
//
//        predictions.forEach((prediction) => {
//          const date = new Date(prediction.created_at);
//          const monthYear = `${date.toLocaleString("default", {
//            month: "short",
//          })} ${date.getFullYear()}`;
//
//          if (!monthlyData[monthYear]) {
//            monthlyData[monthYear] = {
//              month: monthYear,
//              food: 0,
//              housing: 0,
//              education: 0,
//              water: 0,
//              electricity: 0,
//              savings: 0,
//              communication: 0,
//              total: 0,
//              count: 0,
//            };
//          }
//
//          const input = prediction.input_data;
//          monthlyData[monthYear].food += input.exp_food || 0;
//          monthlyData[monthYear].housing += input.exp_rent || 0;
//          monthlyData[monthYear].education += input.exp_Education || 0;
//          monthlyData[monthYear].water += input.exp_Water || 0;
//          monthlyData[monthYear].electricity += input.exp_Electricity || 0;
//          monthlyData[monthYear].savings +=
//            input.Savings_or_Insurance_Payment || 0;
//          monthlyData[monthYear].communication += input.Communication_Exp || 0;
//          monthlyData[monthYear].total += prediction.predicted_exp || 0;
//          monthlyData[monthYear].count++;
//        });
//
//        // Convert to final ChartData format
//        const formattedData = Object.values(monthlyData).map((item) => ({
//          month: item.month,
//          food: Math.round(item.food / item.count) || 0,
//          housing: Math.round(item.housing / item.count) || 0,
//          education: Math.round(item.education / item.count) || 0,
//          water: Math.round(item.water / item.count) || 0,
//          electricity: Math.round(item.electricity / item.count) || 0,
//          savings: Math.round(item.savings / item.count) || 0,
//          communication: Math.round(item.communication / item.count) || 0,
//          total: Math.round(item.total / item.count) || 0,
//        }));
//
//        setData(formattedData);
//      } catch (error) {
//        console.error("Error fetching chart data:", error);
//      } finally {
//        setLoading(false);
//      }
//    };
//
//    fetchData();
//  }, [supabase]);
//
//  if (loading) {
//    return (
//      <Card className="bg-slate-800 border-slate-700">
//        <CardHeader>
//          <CardTitle className="text-white">Spending Trends</CardTitle>
//        </CardHeader>
//        <CardContent>
//          <div className="h-64 flex items-center justify-center">
//            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
//          </div>
//        </CardContent>
//      </Card>
//    );
//  }
//
//  if (data.length === 0) {
//    return (
//      <Card className="bg-slate-800 border-slate-700">
//        <CardHeader>
//          <CardTitle className="text-white">Spending Trends</CardTitle>
//        </CardHeader>
//        <CardContent>
//          <div className="h-64 flex items-center justify-center text-slate-400">
//            No spending data available
//          </div>
//        </CardContent>
//      </Card>
//    );
//  }
//
//  return (
//    <Card className="bg-slate-800 border-slate-700">
//      <CardHeader>
//        <CardTitle className="text-white">Spending Trends</CardTitle>
//      </CardHeader>
//      <CardContent className="">
//        <div className="h-64">
//          <h1 className="text-center mt-10 text-white font-bold text-xl">
//            Total Expenditure
//          </h1>
//          <ResponsiveContainer width="100%" height="100%">
//            <AreaChart
//              data={data}
//              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//            >
//              <defs>
//                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
//                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                </linearGradient>
//              </defs>
//              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//              <XAxis
//                dataKey="month"
//                tick={{ fill: "#9CA3AF" }}
//                axisLine={{ stroke: "#4B5563" }}
//              />
//              <YAxis
//                tick={{ fill: "#9CA3AF" }}
//                axisLine={{ stroke: "#4B5563" }}
//                tickFormatter={(value) => `$${value}`}
//              />
//              <Tooltip
//                contentStyle={{
//                  backgroundColor: "#1F2937",
//                  borderColor: "#374151",
//                  borderRadius: "0.5rem",
//                }}
//                formatter={(value) => [`$${value}`, "Total"]}
//              />
//              <Area
//                type="monotone"
//                dataKey="total"
//                stroke="#10b981"
//                fillOpacity={1}
//                fill="url(#colorTotal)"
//              />
//            </AreaChart>
//          </ResponsiveContainer>
//        </div>
//        <h1 className="text-center mt-10 text-white font-bold text-xl">
//          Expense Categories
//        </h1>
//        <div className="h-64 mt-6">
//          <ResponsiveContainer width="100%" height="100%">
//            <BarChart
//              data={data}
//              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//            >
//              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//              <XAxis
//                dataKey="month"
//                tick={{ fill: "#9CA3AF" }}
//                axisLine={{ stroke: "#4B5563" }}
//              />
//              <YAxis
//                tick={{ fill: "#9CA3AF" }}
//                axisLine={{ stroke: "#4B5563" }}
//                tickFormatter={(value) => `$${value}`}
//              />
//              <Tooltip
//                contentStyle={{
//                  backgroundColor: "#1F2937",
//                  borderColor: "#374151",
//                  borderRadius: "0.5rem",
//                }}
//              />
//              <Legend />
//              <Bar dataKey="food" fill="#3b82f6" name="Food" />
//              <Bar dataKey="housing" fill="#8b5cf6" name="Housing" />
//              <Bar dataKey="education" fill="#f59e0b" name="Education" />
//              <Bar dataKey="water" fill="#06b6d4" name="Water" />
//              <Bar dataKey="electricity" fill="#ef4444" name="Electricity" />
//              <Bar dataKey="savings" fill="#84cc16" name="Savings" />
//              <Bar
//                dataKey="communication"
//                fill="#f97316"
//                name="Communication"
//              />
//            </BarChart>
//          </ResponsiveContainer>
//        </div>
//      </CardContent>
//    </Card>
//  );
//}

// components/dashboard/spending-chart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionData } from "@/types/predict";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SpendingChartProps {
  prediction?: PredictionData | null;
}

const COLORS = [
  "#3b82f6", // Food - blue
  "#8b5cf6", // Housing - purple
  "#17becf", // Teal // Education - amber
  "#f7b6d2", // Water - cyan
  "#ef4444", // Electricity - red
  "#84cc16", // Savings - lime
  "#f97316", // Communication - orange
];

export function SpendingChart({ prediction }: SpendingChartProps) {
  if (!prediction) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-slate-400">
            Select a prediction to view details
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for the pie chart
  const pieData = [
    { name: "Food", value: prediction.input_data.exp_food },
    { name: "Housing", value: prediction.input_data.exp_rent },
    { name: "Education", value: prediction.input_data.exp_Education },
    { name: "Water", value: prediction.input_data.exp_Water },
    { name: "Electricity", value: prediction.input_data.exp_Electricity },
    {
      name: "Savings",
      value: prediction.input_data.Savings_or_Insurance_Payment,
    },
    { name: "Communication", value: prediction.input_data.Communication_Exp },
  ].filter((item) => item.value > 0); // Filter out categories with 0 values

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`$${value}`, "Amount"]} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  color: "#9CA3AF",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
