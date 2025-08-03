"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Users,
  Search,
  RefreshCw,
  Plus,
  Eye,
  Trash2,
  Crown,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react";
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout";
import "../admin.css";
interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  last_sign_in_at: string;
  status: "active" | "pending";
  role: "user" | "admin";
  predictions_count: number;
  is_verified: boolean;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  adminUsers: number;
  userUsers: number;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    adminUsers: 0,
    userUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<
    "full_name" | "email" | "created_at" | "last_sign_in_at"
  >("created_at");

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    const maskedName = name.length > 3 ? `${name.substring(0, 3)}***` : "***";
    return `${maskedName}@${domain}`;
  };

  const maskPhone = (phone?: string) => {
    if (!phone) return "Not provided";
    return `${phone.substring(0, phone.length - 4)}****`;
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter, roleFilter, sortBy]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Simulate loading users data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock data - replace with actual API calls
      const mockUsers: User[] = [
        {
          id: "user_1",
          full_name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          avatar_url: "https://i.pravatar.cc/150?img=1",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 25,
          created_at: "2023-01-15T12:34:56.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 3
          ).toISOString(), // 3 hours ago
        },
        {
          id: "user_2",
          full_name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1 (555) 234-5678",
          avatar_url: "https://i.pravatar.cc/150?img=2",
          status: "pending",
          role: "user",
          is_verified: false,
          predictions_count: 8,
          created_at: "2023-02-20T08:12:34.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 24
          ).toISOString(), // 1 day ago
        },
        {
          id: "user_3",
          full_name: "Alice Johnson",
          email: "alice.johnson@example.com",
          phone: "+1 (555) 345-6789",
          avatar_url: "https://i.pravatar.cc/150?img=3",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 42,
          created_at: "2023-03-01T15:45:00.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 2
          ).toISOString(), // 2 hours ago
        },
        {
          id: "user_4",
          full_name: "Bob Williams",
          email: "bob.williams@example.com",
          phone: "+1 (555) 456-7890",
          avatar_url: "https://i.pravatar.cc/150?img=4",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 12,
          created_at: "2023-03-10T10:20:30.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 48
          ).toISOString(), // 2 days ago
        },
        {
          id: "user_5",
          full_name: "Charlie Brown",
          email: "charlie.brown@example.com",
          phone: "+1 (555) 567-8901",
          avatar_url: "https://i.pravatar.cc/150?img=5",
          status: "pending",
          role: "user",
          is_verified: false,
          predictions_count: 18,
          created_at: "2023-04-05T18:00:00.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 72
          ).toISOString(), // 3 days ago
        },
        {
          id: "user_6",
          full_name: "Diana Miller",
          email: "diana.miller@example.com",
          phone: "+1 (555) 678-9012",
          avatar_url: "https://i.pravatar.cc/150?img=6",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 31,
          created_at: "2023-04-15T09:15:45.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 5
          ).toISOString(), // 5 hours ago
        },
        {
          id: "user_7",
          full_name: "Ethan Davis",
          email: "ethan.davis@example.com",
          phone: "+1 (555) 789-0123",
          avatar_url: "https://i.pravatar.cc/150?img=7",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 7,
          created_at: "2023-05-01T14:50:20.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 1
          ).toISOString(), // 1 hour ago
        },
        {
          id: "user_8",
          full_name: "Fiona Wilson",
          email: "fiona.wilson@example.com",
          phone: "+1 (555) 890-1234",
          avatar_url: "https://i.pravatar.cc/150?img=8",
          status: "pending",
          role: "user",
          is_verified: false,
          predictions_count: 22,
          created_at: "2023-05-10T11:25:00.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 7
          ).toISOString(), // 1 week ago
        },
        {
          id: "user_9",
          full_name: "George Taylor",
          email: "george.taylor@example.com",
          phone: "+1 (555) 901-2345",
          avatar_url: "https://i.pravatar.cc/150?img=9",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 36,
          created_at: "2023-06-01T16:05:30.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 12
          ).toISOString(), // 12 hours ago
        },
        {
          id: "user_10",
          full_name: "Hannah Moore",
          email: "hannah.moore@example.com",
          phone: "+1 (555) 012-3456",
          avatar_url: "https://i.pravatar.cc/150?img=10",
          status: "active",
          role: "user",
          is_verified: true,
          predictions_count: 10,
          created_at: "2023-06-15T13:40:00.000Z",
          last_sign_in_at: new Date(
            Date.now() - 1000 * 60 * 60 * 6
          ).toISOString(), // 6 hours ago
        },
      ];

      setUsers(mockUsers);

      // Calculate stats
      const totalUsers = mockUsers.length;
      const activeUsers = mockUsers.filter((u) => u.status === "active").length;
      const newUsersToday = mockUsers.filter(
        (u) =>
          new Date(u.created_at).toDateString() === new Date().toDateString()
      ).length;
      const adminUsers = mockUsers.filter((u) => u.role === "admin").length;
      const userUsers = mockUsers.filter((u) => u.role === "user").length;

      setStats({
        totalUsers,
        activeUsers,
        newUsersToday,
        adminUsers,
        userUsers,
      });
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }
    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }
    // Sort
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      switch (sortBy) {
        case "full_name":
          aValue = a.full_name.toLowerCase();
          bValue = b.full_name.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
      }
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    setFilteredUsers(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "pending":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "user":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const handleUserAction = async (action: string, userId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (action === "delete") {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
                <Users className="admin-title-icon" />
                User Management
              </h1>
              <p className="admin-subtitle">
                Manage and monitor all user accounts
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
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
            <div className="admin-stat-value">{stats.totalUsers}</div>
            <div className="admin-stat-trend">
              <TrendingUp className="admin-stat-trend-icon" />
              <span>+{stats.newUsersToday} today</span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-2">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Active Users</div>
              <div className="admin-stat-icon-container stat-icon-emerald">
                <Activity className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">{stats.activeUsers}</div>
            <div className="admin-stat-trend">
              <CheckCircle className="admin-stat-trend-icon" />
              <span>
                {Math.round((stats.activeUsers / stats.totalUsers) * 100)}%
                active
              </span>
            </div>
          </div>

          <div className="admin-stat-card stat-card-3">
            <div className="admin-stat-header">
              <div className="admin-stat-label">Admin Users</div>
              <div className="admin-stat-icon-container stat-icon-violet">
                <Crown className="admin-stat-icon" />
              </div>
            </div>
            <div className="admin-stat-value">{stats.adminUsers}</div>
            <div className="admin-stat-trend">
              <span>{stats.userUsers} regular users</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Filters and Search */}
          <Card className="admin-card mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by name, email..."
                    className="pl-9 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={loadUsers}
                    className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="admin-card">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Role</TableHead>
                    <TableHead className="text-gray-300">Predictions</TableHead>
                    <TableHead className="text-gray-300">Created</TableHead>
                    <TableHead className="text-right text-gray-300">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentPageUsers().map((user, index) => (
                    <TableRow
                      key={user.id}
                      className="border-slate-700 hover:bg-slate-700/30 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar className="border-2 border-blue-500/30">
                            <AvatarImage
                              src={user.avatar_url || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {user.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-white flex items-center gap-2">
                            {user.full_name}
                            {user.is_verified && (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-300">
                        {maskEmail(user.email)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        {user.predictions_count}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white hover:bg-slate-600/50"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-700">
              <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 p-0 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                >
                  Last
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Edit User</DialogTitle>
              <DialogDescription className="text-gray-400">
                Update user information and settings
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                  <TabsTrigger value="profile" className="text-white">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="text-white">
                    Activity
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="full_name"
                        className="text-right text-gray-300"
                      >
                        Full Name
                      </Label>
                      <div className="col-span-3 text-white">
                        {selectedUser.full_name}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="email"
                        className="text-right text-gray-300"
                      >
                        Email
                      </Label>
                      <div className="col-span-3 text-white">
                        {maskEmail(selectedUser.email)}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="phone"
                        className="text-right text-gray-300"
                      >
                        Phone
                      </Label>
                      <div className="col-span-3 text-white">
                        {maskPhone(selectedUser.phone)}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="role"
                        className="text-right text-gray-300"
                      >
                        Role
                      </Label>
                      <div className="col-span-3 text-white">
                        {selectedUser.role}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="activity">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">
                          Total Predictions
                        </Label>
                        <div className="text-lg font-semibold text-white">
                          {selectedUser.predictions_count}
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Last Sign In</Label>
                        <div className="text-lg font-semibold text-white">
                          {formatDate(selectedUser.last_sign_in_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create User Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Create New User</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new user to the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="new_full_name"
                  className="text-right text-gray-300"
                >
                  Full Name
                </Label>
                <Input
                  id="new_full_name"
                  placeholder="Enter full name"
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new_email" className="text-right text-gray-300">
                  Email
                </Label>
                <Input
                  id="new_email"
                  type="email"
                  placeholder="Enter email address"
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new_role" className="text-right text-gray-300">
                  Role
                </Label>
                <Select defaultValue="user">
                  <SelectTrigger className="col-span-3 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsCreateDialogOpen(false)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Delete User</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="flex items-center gap-4 py-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
                <div>
                  <p className="font-medium text-white">
                    You are about to permanently delete{" "}
                    <strong>{selectedUser.full_name}</strong> (
                    {selectedUser.email}
                    ).
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    This will remove all their data, predictions, and cannot be
                    recovered.
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleUserAction("delete", selectedUser?.id || "");
                  setIsDeleteDialogOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
