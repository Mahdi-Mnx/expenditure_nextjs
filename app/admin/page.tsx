"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  TrendingUp,
  Activity,
  DollarSign,
  MapPin,
  Calendar,
  BarChart3,
} from "lucide-react";

const mockPredictions: PredictionData[] = [
  {
    id: "1",
    user_id: "user_1",
    input_data: {
      hhsize: 5,
      Region_Name: "Banadir",
      Area_Name: "Urban",
      exp_food: 250,
      exp_rent: 180,
      exp_Education: 75,
      exp_Water: 25,
      exp_Electricity: 45,
      Savings_or_Insurance_Payment: 50,
      Communication_Exp: 30,
    },
    predicted_exp: 655,
    model_used: "RandomForest",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    user_id: "user_2",
    input_data: {
      hhsize: 3,
      Region_Name: "Waqooyi Galbeed",
      Area_Name: "Rural",
      exp_food: 180,
      exp_rent: 120,
      exp_Education: 40,
      exp_Water: 15,
      exp_Electricity: 25,
      Savings_or_Insurance_Payment: 30,
      Communication_Exp: 20,
    },
    predicted_exp: 430,
    model_used: "LinearRegression",
    created_at: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    user_id: "user_3",
    input_data: {
      hhsize: 7,
      Region_Name: "Bay",
      Area_Name: "Urban",
      exp_food: 320,
      exp_rent: 200,
      exp_Education: 90,
      exp_Water: 35,
      exp_Electricity: 55,
      Savings_or_Insurance_Payment: 70,
      Communication_Exp: 40,
    },
    predicted_exp: 810,
    model_used: "RandomForest",
    created_at: "2024-01-15T08:45:00Z",
  },
  {
    id: "4",
    user_id: "user_4",
    input_data: {
      hhsize: 4,
      Region_Name: "Lower Shabelle",
      Area_Name: "Rural",
      exp_food: 200,
      exp_rent: 100,
      exp_Education: 50,
      exp_Water: 20,
      exp_Electricity: 30,
      Savings_or_Insurance_Payment: 25,
      Communication_Exp: 15,
    },
    predicted_exp: 440,
    model_used: "GradientBoosting",
    created_at: "2024-01-15T07:20:00Z",
  },
  {
    id: "5",
    user_id: "user_5",
    input_data: {
      hhsize: 6,
      Region_Name: "Banadir",
      Area_Name: "Urban",
      exp_food: 280,
      exp_rent: 220,
      exp_Education: 80,
      exp_Water: 30,
      exp_Electricity: 50,
      Savings_or_Insurance_Payment: 60,
      Communication_Exp: 35,
    },
    predicted_exp: 755,
    model_used: "RandomForest",
    created_at: "2024-01-14T16:30:00Z",
  },
  {
    id: "6",
    user_id: "user_6",
    input_data: {
      hhsize: 2,
      Region_Name: "Mudug",
      Area_Name: "Urban",
      exp_food: 150,
      exp_rent: 90,
      exp_Education: 30,
      exp_Water: 12,
      exp_Electricity: 20,
      Savings_or_Insurance_Payment: 20,
      Communication_Exp: 18,
    },
    predicted_exp: 340,
    model_used: "LinearRegression",
    created_at: "2024-01-14T15:10:00Z",
  },
  {
    id: "7",
    user_id: "user_7",
    input_data: {
      hhsize: 8,
      Region_Name: "Gedo",
      Area_Name: "Rural",
      exp_food: 350,
      exp_rent: 150,
      exp_Education: 100,
      exp_Water: 40,
      exp_Electricity: 35,
      Savings_or_Insurance_Payment: 45,
      Communication_Exp: 25,
    },
    predicted_exp: 745,
    model_used: "RandomForest",
    created_at: "2024-01-14T14:25:00Z",
  },
  {
    id: "8",
    user_id: "user_8",
    input_data: {
      hhsize: 3,
      Region_Name: "Hiraan",
      Area_Name: "Urban",
      exp_food: 190,
      exp_rent: 130,
      exp_Education: 45,
      exp_Water: 18,
      exp_Electricity: 28,
      Savings_or_Insurance_Payment: 35,
      Communication_Exp: 22,
    },
    predicted_exp: 468,
    model_used: "GradientBoosting",
    created_at: "2024-01-14T13:40:00Z",
  },
];

const mockRegionStats = [
  { region: "Banadir", count: 342 },
  { region: "Waqooyi Galbeed", count: 287 },
  { region: "Bay", count: 234 },
  { region: "Lower Shabelle", count: 198 },
  { region: "Mudug", count: 176 },
  { region: "Gedo", count: 165 },
  { region: "Hiraan", count: 143 },
  { region: "Middle Shabelle", count: 128 },
];

const mockTotalUsers = 1247;
const mockTotalPredictions = 2856;

import "./admin.css";
import { PredictionData } from "@/types/predict";
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout";

export default function OverviewDashboard() {
  // Calculate average predicted expenditure
  const averageExpenditure = Math.round(
    mockPredictions.reduce((sum, pred) => sum + pred.predicted_exp, 0) /
      mockPredictions.length
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get user initials
  const getUserInitials = (email: string) => {
    const name = email.split("@")[0];
    return name
      .split(".")
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  return (
    <AdminDashboardLayout>
      <div className="admin-container">
        {/* Animated Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-header-text">
              <h1 className="admin-title">
                <BarChart3 className="admin-title-icon" />
                Dashboard Overview
              </h1>
              <p className="admin-subtitle">
                Welcome back! Here's what's happening with your prediction
                system.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="admin-stats">
          <div className="admin-stat-card stat-card-1">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Total Users</div>
              <div className="admin-stat-icon-container stat-icon-blue">
                <Users className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">
              {mockTotalUsers.toLocaleString()}
            </div>
            <div className="admin-stat-trend">
              <TrendingUp className="admin-stat-trend-icon" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-2">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Total Predictions</div>
              <div className="admin-stat-icon-container stat-icon-emerald">
                <TrendingUp className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">
              {mockTotalPredictions.toLocaleString()}
            </div>
            <div className="admin-stat-trend">
              <TrendingUp className="admin-stat-trend-icon" />
              <span>+8% from last month</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-3">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Avg. Predicted Expenditure</div>
              <div className="admin-stat-icon-container stat-icon-violet">
                <DollarSign className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">
              {formatCurrency(averageExpenditure)}
            </div>
            <div className="admin-stat-trend">
              <span>Across all predictions</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-4">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Active Regions</div>
              <div className="admin-stat-icon-container stat-icon-orange">
                <Activity className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">{mockRegionStats.length}</div>
            <div className="admin-stat-trend">
              <span>Regions with predictions</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Predictions */}
            <Card className="admin-card lg:col-span-2">
              <CardHeader className="admin-card-header">
                <CardTitle className="admin-card-title flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Recent Predictions
                </CardTitle>
                <CardDescription className="admin-card-description">
                  Latest prediction entries from users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPredictions.slice(0, 8).map((prediction, index) => (
                    <div
                      key={prediction.id}
                      className="admin-prediction-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {getUserInitials(prediction.user_id)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="admin-prediction-user">
                              User {prediction.user_id.replace("user_", "")}
                            </p>
                            <div className="flex items-center space-x-2 text-xs admin-prediction-details">
                              <MapPin className="h-3 w-3" />
                              <span>{prediction.input_data.Region_Name}</span>
                              <span>•</span>
                              <span>{prediction.input_data.Area_Name}</span>
                              <span>•</span>
                              <span>
                                {prediction.input_data.hhsize} members
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="admin-prediction-amount">
                            {formatCurrency(prediction.predicted_exp)}
                          </p>
                          <p className="text-xs admin-prediction-date">
                            {formatDate(prediction.created_at)}
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs bg-blue-500/20 text-blue-300 border-blue-500/30"
                          >
                            {prediction.model_used}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Regions */}
            <Card className="admin-card">
              <CardHeader className="admin-card-header">
                <CardTitle className="admin-card-title flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  Top Regions
                </CardTitle>
                <CardDescription className="admin-card-description">
                  Regions with most prediction activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRegionStats.map((region, index) => (
                    <div
                      key={region.region}
                      className="admin-region-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`admin-region-rank ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : index === 1
                              ? "bg-gradient-to-r from-gray-300 to-gray-500"
                              : index === 2
                              ? "bg-gradient-to-r from-orange-400 to-orange-600"
                              : "bg-gradient-to-r from-blue-400 to-blue-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="admin-region-name">
                          {region.region}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="admin-region-count">{region.count}</p>
                        <p className="text-xs text-gray-400">predictions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expenditure Categories */}
          <Card className="admin-card mt-6">
            <CardHeader className="admin-card-header">
              <CardTitle className="admin-card-title flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-400" />
                Average Expenditure by Category
              </CardTitle>
              <CardDescription className="admin-card-description">
                Average spending across different expense categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  {
                    label: "Food",
                    key: "exp_food",
                    color:
                      "bg-gradient-to-br from-red-500/20 to-red-600/20 text-red-300 border border-red-500/30",
                  },
                  {
                    label: "Rent",
                    key: "exp_rent",
                    color:
                      "bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/30",
                  },
                  {
                    label: "Education",
                    key: "exp_Education",
                    color:
                      "bg-gradient-to-br from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30",
                  },
                  {
                    label: "Water",
                    key: "exp_Water",
                    color:
                      "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 text-cyan-300 border border-cyan-500/30",
                  },
                  {
                    label: "Electricity",
                    key: "exp_Electricity",
                    color:
                      "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 text-yellow-300 border border-yellow-500/30",
                  },
                  {
                    label: "Savings/Insurance",
                    key: "Savings_or_Insurance_Payment",
                    color:
                      "bg-gradient-to-br from-purple-500/20 to-purple-600/20 text-purple-300 border border-purple-500/30",
                  },
                  {
                    label: "Communication",
                    key: "Communication_Exp",
                    color:
                      "bg-gradient-to-br from-pink-500/20 to-pink-600/20 text-pink-300 border border-pink-500/30",
                  },
                ].map((category, index) => {
                  const avgAmount = Math.round(
                    mockPredictions.reduce((sum, pred) => {
                      const value =
                        pred.input_data[
                          category.key as keyof typeof pred.input_data
                        ];
                      return sum + (typeof value === "number" ? value : 0);
                    }, 0) / mockPredictions.length
                  );
                  return (
                    <div
                      key={category.key}
                      className={`admin-category-card ${category.color}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <p className="admin-category-label text-xs font-medium mb-1">
                        {category.label}
                      </p>
                      <p className="admin-category-amount">
                        {formatCurrency(avgAmount)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
