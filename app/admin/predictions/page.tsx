"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Download,
  Filter,
  Shield,
  AlertTriangle,
  Eye,
  Database,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout";
import "../admin.css";
export type Prediction = {
  id: number;
  user_id: string;
  masked_email: string;
  region_name: string;
  area: string;
  hhsize: number;
  created_at: string;
  input_data: {
    exp_food: number;
    exp_rent: number;
    exp_Education: number;
    exp_Water: number;
    exp_Electricity: number;
    Savings_or_Insurance_Payment: number;
    Communication_Expense: number;
  };
  predicted_annual_expenditure: number;
  expense_categories: {
    exp_food: number;
    exp_rent: number;
    exp_Education: number;
    exp_Water: number;
    exp_Electricity: number;
    Savings_or_Insurance_Payment: number;
    Communication_Expense: number;
  };
};

// Mock data with privacy-protected information
const mockPredictions: Prediction[] = [
  {
    id: 1,
    user_id: "user***23",
    masked_email: "ahm***@gmail.com",
    region_name: "Banadir",
    area: "Urban",
    hhsize: 4,
    created_at: "2024-01-15T10:30:00Z",
    input_data: {
      exp_food: 450,
      exp_rent: 300,
      exp_Education: 80,
      exp_Water: 25,
      exp_Electricity: 40,
      Savings_or_Insurance_Payment: 50,
      Communication_Expense: 30,
    },
    predicted_annual_expenditure: 11700,
    expense_categories: {
      exp_food: 5400,
      exp_rent: 3600,
      exp_Education: 960,
      exp_Water: 300,
      exp_Electricity: 480,
      Savings_or_Insurance_Payment: 600,
      Communication_Expense: 360,
    },
  },
  {
    id: 2,
    user_id: "user***56",
    masked_email: "fat***@yahoo.com",
    region_name: "Waqooyi Galbeed",
    area: "Urban",
    hhsize: 3,
    created_at: "2024-01-14T15:45:00Z",
    input_data: {
      exp_food: 380,
      exp_rent: 250,
      exp_Education: 60,
      exp_Water: 20,
      exp_Electricity: 35,
      Savings_or_Insurance_Payment: 40,
      Communication_Expense: 25,
    },
    predicted_annual_expenditure: 9720,
    expense_categories: {
      exp_food: 4560,
      exp_rent: 3000,
      exp_Education: 720,
      exp_Water: 240,
      exp_Electricity: 420,
      Savings_or_Insurance_Payment: 480,
      Communication_Expense: 300,
    },
  },
  {
    id: 3,
    user_id: "user***89",
    masked_email: "oma***@hotmail.com",
    region_name: "Bay",
    area: "Rural",
    hhsize: 6,
    created_at: "2024-01-13T09:20:00Z",
    input_data: {
      exp_food: 320,
      exp_rent: 180,
      exp_Education: 45,
      exp_Water: 15,
      exp_Electricity: 25,
      Savings_or_Insurance_Payment: 30,
      Communication_Expense: 20,
    },
    predicted_annual_expenditure: 7620,
    expense_categories: {
      exp_food: 3840,
      exp_rent: 2160,
      exp_Education: 540,
      exp_Water: 180,
      exp_Electricity: 300,
      Savings_or_Insurance_Payment: 360,
      Communication_Expense: 240,
    },
  },
  {
    id: 4,
    user_id: "user***12",
    masked_email: "ami***@gmail.com",
    region_name: "Lower Juba",
    area: "Semi-Urban",
    hhsize: 5,
    created_at: "2024-01-12T14:10:00Z",
    input_data: {
      exp_food: 400,
      exp_rent: 220,
      exp_Education: 70,
      exp_Water: 18,
      exp_Electricity: 30,
      Savings_or_Insurance_Payment: 35,
      Communication_Expense: 22,
    },
    predicted_annual_expenditure: 9540,
    expense_categories: {
      exp_food: 4800,
      exp_rent: 2640,
      exp_Education: 840,
      exp_Water: 216,
      exp_Electricity: 360,
      Savings_or_Insurance_Payment: 420,
      Communication_Expense: 264,
    },
  },
  {
    id: 5,
    user_id: "user***45",
    masked_email: "ibr***@outlook.com",
    region_name: "Mudug",
    area: "Rural",
    hhsize: 7,
    created_at: "2024-01-11T11:30:00Z",
    input_data: {
      exp_food: 350,
      exp_rent: 200,
      exp_Education: 55,
      exp_Water: 22,
      exp_Electricity: 28,
      Savings_or_Insurance_Payment: 25,
      Communication_Expense: 18,
    },
    predicted_annual_expenditure: 8376,
    expense_categories: {
      exp_food: 4200,
      exp_rent: 2400,
      exp_Education: 660,
      exp_Water: 264,
      exp_Electricity: 336,
      Savings_or_Insurance_Payment: 300,
      Communication_Expense: 216,
    },
  },
  {
    id: 6,
    user_id: "user***78",
    masked_email: "kha***@gmail.com",
    region_name: "Awdal",
    area: "Rural",
    hhsize: 4,
    created_at: "2024-01-10T16:20:00Z",
    input_data: {
      exp_food: 300,
      exp_rent: 150,
      exp_Education: 40,
      exp_Water: 12,
      exp_Electricity: 20,
      Savings_or_Insurance_Payment: 20,
      Communication_Expense: 15,
    },
    predicted_annual_expenditure: 6684,
    expense_categories: {
      exp_food: 3600,
      exp_rent: 1800,
      exp_Education: 480,
      exp_Water: 144,
      exp_Electricity: 240,
      Savings_or_Insurance_Payment: 240,
      Communication_Expense: 180,
    },
  },
  {
    id: 7,
    user_id: "user***91",
    masked_email: "has***@yahoo.com",
    region_name: "Bakool",
    area: "Rural",
    hhsize: 5,
    created_at: "2024-01-09T08:45:00Z",
    input_data: {
      exp_food: 280,
      exp_rent: 140,
      exp_Education: 35,
      exp_Water: 10,
      exp_Electricity: 18,
      Savings_or_Insurance_Payment: 15,
      Communication_Expense: 12,
    },
    predicted_annual_expenditure: 6120,
    expense_categories: {
      exp_food: 3360,
      exp_rent: 1680,
      exp_Education: 420,
      exp_Water: 120,
      exp_Electricity: 216,
      Savings_or_Insurance_Payment: 180,
      Communication_Expense: 144,
    },
  },
  {
    id: 8,
    user_id: "user***34",
    masked_email: "sah***@hotmail.com",
    region_name: "Gedo",
    area: "Semi-Urban",
    hhsize: 3,
    created_at: "2024-01-08T13:15:00Z",
    input_data: {
      exp_food: 330,
      exp_rent: 170,
      exp_Education: 50,
      exp_Water: 16,
      exp_Electricity: 22,
      Savings_or_Insurance_Payment: 28,
      Communication_Expense: 18,
    },
    predicted_annual_expenditure: 7608,
    expense_categories: {
      exp_food: 3960,
      exp_rent: 2040,
      exp_Education: 600,
      exp_Water: 192,
      exp_Electricity: 264,
      Savings_or_Insurance_Payment: 336,
      Communication_Expense: 216,
    },
  },
  {
    id: 9,
    user_id: "user***67",
    masked_email: "mar***@gmail.com",
    region_name: "Hiraan",
    area: "Rural",
    hhsize: 6,
    created_at: "2024-01-07T10:00:00Z",
    input_data: {
      exp_food: 310,
      exp_rent: 160,
      exp_Education: 42,
      exp_Water: 14,
      exp_Electricity: 24,
      Savings_or_Insurance_Payment: 22,
      Communication_Expense: 16,
    },
    predicted_annual_expenditure: 7056,
    expense_categories: {
      exp_food: 3720,
      exp_rent: 1920,
      exp_Education: 504,
      exp_Water: 168,
      exp_Electricity: 288,
      Savings_or_Insurance_Payment: 264,
      Communication_Expense: 192,
    },
  },
  {
    id: 10,
    user_id: "user***90",
    masked_email: "zai***@outlook.com",
    region_name: "Lower Shabelle",
    area: "Semi-Urban",
    hhsize: 4,
    created_at: "2024-01-06T14:30:00Z",
    input_data: {
      exp_food: 360,
      exp_rent: 190,
      exp_Education: 48,
      exp_Water: 17,
      exp_Electricity: 26,
      Savings_or_Insurance_Payment: 32,
      Communication_Expense: 19,
    },
    predicted_annual_expenditure: 8304,
    expense_categories: {
      exp_food: 4320,
      exp_rent: 2280,
      exp_Education: 576,
      exp_Water: 204,
      exp_Electricity: 312,
      Savings_or_Insurance_Payment: 384,
      Communication_Expense: 228,
    },
  },
];

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [filteredPredictions, setFilteredPredictions] = useState<Prediction[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState({
    userId: "",
    region: "",
    dateFrom: "",
    dateTo: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [selectedPrediction, setSelectedPrediction] =
    useState<Prediction | null>(null);

  useEffect(() => {
    // Simulate loading and set mock data
    setLoading(true);
    setTimeout(() => {
      setPredictions(mockPredictions);
      setFilteredPredictions(mockPredictions);
      setPagination((prev) => ({
        ...prev,
        total: mockPredictions.length,
        totalPages: Math.ceil(mockPredictions.length / prev.limit),
      }));
      setLoading(false);
    }, 500); // Simulate network delay
  }, []);

  useEffect(() => {
    // Apply filters to mock data
    const filtered = predictions.filter((prediction) => {
      const matchesUserId =
        !filters.userId ||
        prediction.user_id.toLowerCase().includes(filters.userId.toLowerCase());
      const matchesRegion =
        !filters.region ||
        prediction.region_name
          .toLowerCase()
          .includes(filters.region.toLowerCase());
      let matchesDate = true;
      if (filters.dateFrom || filters.dateTo) {
        const predictionDate = new Date(prediction.created_at);
        if (filters.dateFrom) {
          matchesDate =
            matchesDate && predictionDate >= new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
          matchesDate =
            matchesDate && predictionDate <= new Date(filters.dateTo);
        }
      }
      return matchesUserId && matchesRegion && matchesDate;
    });
    setFilteredPredictions(filtered);
    setPagination((prev) => ({
      ...prev,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.limit),
      page: 1, // Reset to first page when filters change
    }));
  }, [filters, predictions]);

  // Get paginated results
  const paginatedPredictions = filteredPredictions.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  // Calculate stats
  const totalPredictions = filteredPredictions.length;
  const avgPrediction = Math.round(
    filteredPredictions.reduce(
      (sum, pred) => sum + pred.predicted_annual_expenditure,
      0
    ) / totalPredictions || 0
  );
  const uniqueRegions = new Set(
    filteredPredictions.map((pred) => pred.region_name)
  ).size;
  const avgHouseholdSize = Math.round(
    filteredPredictions.reduce((sum, pred) => sum + pred.hhsize, 0) /
      totalPredictions || 0
  );

  const exportToCSV = () => {
    setExporting(true);
    // Simulate export delay
    setTimeout(() => {
      const headers = [
        "ID",
        "Masked User ID",
        "Masked Email",
        "Region",
        "Area",
        "Household Size",
        "Date",
        "Predicted Annual Expenditure",
        "Food Expense",
        "Rent Expense",
        "Education Expense",
        "Water Expense",
        "Electricity Expense",
        "Savings/Insurance",
        "Communication Expense",
      ];
      const csvData = filteredPredictions.map((prediction) => [
        prediction.id,
        prediction.user_id,
        prediction.masked_email,
        prediction.region_name,
        prediction.area,
        prediction.hhsize,
        new Date(prediction.created_at).toLocaleDateString(),
        prediction.predicted_annual_expenditure,
        prediction.input_data.exp_food,
        prediction.input_data.exp_rent,
        prediction.input_data.exp_Education,
        prediction.input_data.exp_Water,
        prediction.input_data.exp_Electricity,
        prediction.input_data.Savings_or_Insurance_Payment,
        prediction.input_data.Communication_Expense,
      ]);
      const csvContent = [headers, ...csvData]
        .map((row) => row.join(","))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `predictions_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      setExporting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="admin-container">
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="admin-container">
        {/* Animated Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-header-text">
              <h1 className="admin-title">
                <Database className="admin-title-icon" />
                Prediction Records
              </h1>
              <p className="admin-subtitle">
                Privacy-protected prediction data for administrative analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="admin-stats">
          <div className="admin-stat-card stat-card-1">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Total Records</div>
              <div className="admin-stat-icon-container stat-icon-blue">
                <Database className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">{totalPredictions}</div>
            <div className="admin-stat-trend">
              <span>Filtered results</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-2">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Avg Prediction</div>
              <div className="admin-stat-icon-container stat-icon-emerald">
                <TrendingUp className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">
              ${avgPrediction.toLocaleString()}
            </div>
            <div className="admin-stat-trend">
              <span>Annual expenditure</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-3">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Unique Regions</div>
              <div className="admin-stat-icon-container stat-icon-violet">
                <BarChart3 className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">{uniqueRegions}</div>
            <div className="admin-stat-trend">
              <span>Geographic coverage</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-4">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Avg Household</div>
              <div className="admin-stat-icon-container stat-icon-orange">
                <Users className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">{avgHouseholdSize}</div>
            <div className="admin-stat-trend">
              <span>Members per household</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Privacy Notice */}
          <Alert className="mb-6 bg-blue-500/10 border-blue-500/30 text-blue-300">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy Protected:</strong> User information is masked for
              privacy. Only essential data for analysis is displayed. All access
              is logged for audit purposes.
            </AlertDescription>
          </Alert>

          {/* Filters Section */}
          <Card className="admin-card mb-6">
            <CardHeader className="admin-card-header">
              <CardTitle className="admin-card-title flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-400" />
                Filters
              </CardTitle>
              <CardDescription className="admin-card-description">
                Filter prediction records by various criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-gray-300">
                    User ID (Partial)
                  </Label>
                  <Input
                    id="userId"
                    placeholder="Enter partial user ID"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    value={filters.userId}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        userId: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-gray-300">
                    Region
                  </Label>
                  <Input
                    id="region"
                    placeholder="Enter region"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    value={filters.region}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        region: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFrom" className="text-gray-300">
                    Date From
                  </Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    className="bg-slate-700/50 border-slate-600 text-white"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateFrom: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo" className="text-gray-300">
                    Date To
                  </Label>
                  <Input
                    id="dateTo"
                    type="date"
                    className="bg-slate-700/50 border-slate-600 text-white"
                    value={filters.dateTo}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateTo: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                  onClick={() =>
                    setFilters({
                      userId: "",
                      region: "",
                      dateFrom: "",
                      dateTo: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="ml-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      disabled={filteredPredictions.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV ({filteredPredictions.length} records)
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-white">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Confirm Data Export
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        You are about to export {filteredPredictions.length}{" "}
                        prediction records. This action will be logged for audit
                        purposes.
                        <br />
                        <br />
                        <strong>Privacy Notice:</strong> All exported data will
                        have user information masked to protect privacy.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={exportToCSV}
                        disabled={exporting}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      >
                        {exporting ? "Exporting..." : "Confirm Export"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="admin-card">
            <CardHeader className="admin-card-header">
              <CardTitle className="admin-card-title flex items-center gap-2">
                <Database className="h-5 w-5 text-green-400" />
                Prediction Records ({pagination.total})
              </CardTitle>
              <CardDescription className="admin-card-description">
                Privacy-protected prediction data for administrative analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-gray-300">ID</TableHead>
                      <TableHead className="text-gray-300">
                        User (Masked)
                      </TableHead>
                      <TableHead className="text-gray-300">Region</TableHead>
                      <TableHead className="text-gray-300">Area</TableHead>
                      <TableHead className="text-gray-300">HH Size</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">
                        Predicted Amount
                      </TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPredictions.length === 0 ? (
                      <TableRow className="border-slate-700">
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-400"
                        >
                          No predictions found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedPredictions.map((prediction, index) => (
                        <TableRow
                          key={prediction.id}
                          className="border-slate-700 hover:bg-slate-700/30 transition-all duration-300"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <TableCell className="font-medium text-white">
                            {prediction.id}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-xs text-white">
                                {prediction.user_id}
                              </div>
                              <div className="text-xs text-gray-400">
                                {prediction.masked_email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {prediction.region_name}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                prediction.area === "Urban"
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : prediction.area === "Rural"
                                  ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                                  : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                              }
                            >
                              {prediction.area}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">
                            {prediction.hhsize}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(
                              prediction.created_at
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-medium text-white">
                            $
                            {prediction.predicted_annual_expenditure.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                                  onClick={() =>
                                    setSelectedPrediction(prediction)
                                  }
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white">
                                <DialogHeader>
                                  <DialogTitle className="text-white">
                                    Prediction Details (ID:{" "}
                                    {selectedPrediction?.id})
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-400">
                                    Detailed view of prediction data with
                                    privacy protection
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedPrediction && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium text-gray-300">
                                          User ID (Masked)
                                        </Label>
                                        <p className="text-sm text-white">
                                          {selectedPrediction.user_id}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium text-gray-300">
                                          Email (Masked)
                                        </Label>
                                        <p className="text-sm text-white">
                                          {selectedPrediction.masked_email}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium text-gray-300">
                                          Region
                                        </Label>
                                        <p className="text-sm text-white">
                                          {selectedPrediction.region_name}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium text-gray-300">
                                          Area
                                        </Label>
                                        <p className="text-sm text-white">
                                          {selectedPrediction.area}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium text-gray-300">
                                          Household Size
                                        </Label>
                                        <p className="text-sm text-white">
                                          {selectedPrediction.hhsize}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium text-gray-300">
                                          Date
                                        </Label>
                                        <p className="text-sm text-white">
                                          {new Date(
                                            selectedPrediction.created_at
                                          ).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-300">
                                        Monthly Input Data
                                      </Label>
                                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                        <div className="text-white">
                                          Food: $
                                          {
                                            selectedPrediction.input_data
                                              .exp_food
                                          }
                                        </div>
                                        <div className="text-white">
                                          Rent: $
                                          {
                                            selectedPrediction.input_data
                                              .exp_rent
                                          }
                                        </div>
                                        <div className="text-white">
                                          Education: $
                                          {
                                            selectedPrediction.input_data
                                              .exp_Education
                                          }
                                        </div>
                                        <div className="text-white">
                                          Water: $
                                          {
                                            selectedPrediction.input_data
                                              .exp_Water
                                          }
                                        </div>
                                        <div className="text-white">
                                          Electricity: $
                                          {
                                            selectedPrediction.input_data
                                              .exp_Electricity
                                          }
                                        </div>
                                        <div className="text-white">
                                          Savings/Insurance: $
                                          {
                                            selectedPrediction.input_data
                                              .Savings_or_Insurance_Payment
                                          }
                                        </div>
                                        <div className="text-white">
                                          Communication: $
                                          {
                                            selectedPrediction.input_data
                                              .Communication_Expense
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-300">
                                        Predicted Annual Expenditure
                                      </Label>
                                      <p className="text-lg font-bold text-green-400">
                                        $
                                        {selectedPrediction.predicted_annual_expenditure.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-400">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} results
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                      disabled={pagination.page === 1}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }))
                      }
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                      disabled={pagination.page === pagination.totalPages}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }))
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
