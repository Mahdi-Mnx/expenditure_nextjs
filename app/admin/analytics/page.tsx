"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BarChart3, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout";
import "../admin.css";

// Update mock data with Somali regions and new expense categories
const monthlyPredictions = [
  { month: "Jan", predictions: 45, avgAmount: 9200 },
  { month: "Feb", predictions: 52, avgAmount: 9800 },
  { month: "Mar", predictions: 38, avgAmount: 8900 },
  { month: "Apr", predictions: 61, avgAmount: 10200 },
  { month: "May", predictions: 55, avgAmount: 9500 },
  { month: "Jun", predictions: 67, avgAmount: 10100 },
];

const regionData = [
  { region: "Banadir", predictions: 89, avgSpending: 11500 },
  { region: "Waqooyi Galbeed", predictions: 76, avgSpending: 9800 },
  { region: "Bay", predictions: 65, avgSpending: 7800 },
  { region: "Lower Juba", predictions: 54, avgSpending: 9200 },
  { region: "Mudug", predictions: 43, avgSpending: 8500 },
  { region: "Awdal", predictions: 38, avgSpending: 8200 },
  { region: "Bakool", predictions: 32, avgSpending: 7500 },
];

const categoryData = [
  { category: "Food", amount: 4200, color: "#8884d8" },
  { category: "Rent", amount: 2800, color: "#82ca9d" },
  { category: "Education", amount: 720, color: "#ffc658" },
  { category: "Electricity", amount: 380, color: "#ff7300" },
  { category: "Savings/Insurance", amount: 420, color: "#00ff00" },
  { category: "Water", amount: 240, color: "#ff0000" },
  { category: "Communication", amount: 280, color: "#8dd1e1" },
];

const chartConfig = {
  predictions: {
    label: "Predictions",
    color: "hsl(var(--chart-1))",
  },
  avgAmount: {
    label: "Avg Amount",
    color: "hsl(var(--chart-2))",
  },
};

export default function AnalyticsPage() {
  return (
    <AdminDashboardLayout>
      <div className="admin-container">
        {/* Animated Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-header-text">
              <h1 className="admin-title">
                <BarChart3 className="admin-title-icon" />
                Analytics Dashboard
              </h1>
              <p className="admin-subtitle">
                Comprehensive insights and data visualization for prediction
                analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="admin-stats">
          <div className="admin-stat-card stat-card-1">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Total Predictions</div>
              <div className="admin-stat-icon-container stat-icon-blue">
                <BarChart3 className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">1,234</div>
            <div className="admin-stat-trend">
              <span>Across all regions</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-2">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Avg Annual Prediction</div>
              <div className="admin-stat-icon-container stat-icon-emerald">
                <DollarSign className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">$9,420</div>
            <div className="admin-stat-trend">
              <span>Per household</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-3">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Top Region</div>
              <div className="admin-stat-icon-container stat-icon-violet">
                <MapPin className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">Banadir</div>
            <div className="admin-stat-trend">
              <span>89 predictions</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-4">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Top Category</div>
              <div className="admin-stat-icon-container stat-icon-orange">
                <TrendingUp className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">Food</div>
            <div className="admin-stat-trend">
              <span>$4.2K avg annually</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Monthly Predictions Chart */}
            <Card className="admin-card">
              <CardHeader className="admin-card-header">
                <CardTitle className="admin-card-title flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Monthly Predictions
                </CardTitle>
                <CardDescription className="admin-card-description">
                  Number of predictions per month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyPredictions}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148, 163, 184, 0.2)"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="rgb(148, 163, 184)"
                        fontSize={12}
                      />
                      <YAxis stroke="rgb(148, 163, 184)" fontSize={12} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "rgba(30, 41, 59, 0.9)",
                          border: "1px solid rgba(51, 65, 85, 0.3)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Bar
                        dataKey="predictions"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Average Amount Trend */}
            <Card className="admin-card">
              <CardHeader className="admin-card-header">
                <CardTitle className="admin-card-title flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Average Prediction Trend
                </CardTitle>
                <CardDescription className="admin-card-description">
                  Monthly average predicted amounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPredictions}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148, 163, 184, 0.2)"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="rgb(148, 163, 184)"
                        fontSize={12}
                      />
                      <YAxis stroke="rgb(148, 163, 184)" fontSize={12} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "rgba(30, 41, 59, 0.9)",
                          border: "1px solid rgba(51, 65, 85, 0.3)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgAmount"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Top Regions Chart */}
            <Card className="admin-card">
              <CardHeader className="admin-card-header">
                <CardTitle className="admin-card-title flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  Top Regions by Predictions
                </CardTitle>
                <CardDescription className="admin-card-description">
                  Regions with most prediction requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData} layout="horizontal">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148, 163, 184, 0.2)"
                      />
                      <XAxis
                        type="number"
                        stroke="rgb(148, 163, 184)"
                        fontSize={12}
                      />
                      <YAxis
                        dataKey="region"
                        type="category"
                        width={100}
                        stroke="rgb(148, 163, 184)"
                        fontSize={12}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "rgba(30, 41, 59, 0.9)",
                          border: "1px solid rgba(51, 65, 85, 0.3)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Bar
                        dataKey="predictions"
                        fill="#8b5cf6"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Expense Categories Pie Chart */}
            <Card className="admin-card">
              <CardHeader className="admin-card-header">
                <CardTitle className="admin-card-title flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-orange-400" />
                  Average Annual Expenditure by Category
                </CardTitle>
                <CardDescription className="admin-card-description">
                  Breakdown of predicted spending categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percent }) =>
                          `${category} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "rgba(30, 41, 59, 0.9)",
                          border: "1px solid rgba(51, 65, 85, 0.3)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Regional Spending Table */}
          <Card className="admin-card mt-6">
            <CardHeader className="admin-card-header">
              <CardTitle className="admin-card-title flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Regional Analysis
              </CardTitle>
              <CardDescription className="admin-card-description">
                Detailed breakdown by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-700">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-gray-300 font-semibold">
                        Region
                      </th>
                      <th className="text-left p-4 text-gray-300 font-semibold">
                        Total Predictions
                      </th>
                      <th className="text-left p-4 text-gray-300 font-semibold">
                        Avg Spending
                      </th>
                      <th className="text-left p-4 text-gray-300 font-semibold">
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionData.map((region, index) => (
                      <tr
                        key={region.region}
                        className="border-b border-slate-700 hover:bg-slate-700/30 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="p-4 font-medium text-white">
                          {region.region}
                        </td>
                        <td className="p-4 text-gray-300">
                          {region.predictions}
                        </td>
                        <td className="p-4 text-gray-300">
                          ${region.avgSpending.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className="text-green-400 font-semibold">
                            +{(Math.random() * 20 + 5).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
