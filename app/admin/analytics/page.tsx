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
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout";

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
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                Across all regions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Annual Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$9,420</div>
              <p className="text-xs text-muted-foreground">Per household</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Banadir</div>
              <p className="text-xs text-muted-foreground">89 predictions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Top Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Food</div>
              <p className="text-xs text-muted-foreground">
                $4.2K avg annually
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Monthly Predictions Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Predictions</CardTitle>
              <CardDescription>Number of predictions per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="predictions"
                      fill="var(--color-predictions)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Average Amount Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Average Prediction Trend</CardTitle>
              <CardDescription>
                Monthly average predicted amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="avgAmount"
                      stroke="var(--color-avgAmount)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Top Regions Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Regions by Predictions</CardTitle>
              <CardDescription>
                Regions with most prediction requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="region" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="predictions"
                      fill="var(--color-predictions)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Expense Categories Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Average Annual Expenditure by Category</CardTitle>
              <CardDescription>
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
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Regional Spending Table */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Analysis</CardTitle>
            <CardDescription>Detailed breakdown by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Region</th>
                    <th className="text-left p-4">Total Predictions</th>
                    <th className="text-left p-4">Avg Spending</th>
                    <th className="text-left p-4">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((region, index) => (
                    <tr key={region.region} className="border-b">
                      <td className="p-4 font-medium">{region.region}</td>
                      <td className="p-4">{region.predictions}</td>
                      <td className="p-4">
                        ${region.avgSpending.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="text-green-600">
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
    </AdminDashboardLayout>
  );
}
