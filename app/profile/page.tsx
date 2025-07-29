"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  User,
  Edit,
  Save,
  X,
  Camera,
  Clock,
  Target,
  LogOut,
  Check,
  ChevronRight,
  Key,
  Eye,
  EyeOff,
  Shield,
  Activity,
  Award,
  Settings,
  Crown,
  Calendar,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { UserProfile } from "@/types/types";
import { supabaseBrowser } from "@/utils/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
    imageUrl: "",
    totalPredictions: 0,
    avgAccuracy: 0,
    joinDate: new Date().toISOString(),
    lastSignIn: new Date().toISOString(),
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    setMounted(true);
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profileData, error } = await supabase
            .from("profiles")
            .select("full_name, phone, image_url, created_at")
            .eq("id", user.id)
            .single();

          if (error) throw error;

          setUserProfile({
            fullName: profileData?.full_name || "",
            email: user.email || "",
            phone: profileData?.phone || "",
            imageUrl: profileData?.image_url || "",
            totalPredictions: 24,
            avgAccuracy: 87,
            joinDate: profileData?.created_at || new Date().toISOString(),
            lastSignIn: user.last_sign_in_at || new Date().toISOString(),
          });

          setFormData({
            fullName: profileData?.full_name || "",
            phone: profileData?.phone || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatLastSignIn = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDaysActive = () => {
    const joinDate = new Date(userProfile.joinDate);
    const now = new Date();
    return Math.floor(
      (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      alert("Full name is required");
      return;
    }

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
        })
        .eq("id", userData.user.id);

      if (error) throw error;

      setUserProfile({
        ...userProfile,
        fullName: formData.fullName,
        phone: formData.phone,
      });

      setIsEditing(false);
    } catch (error: any) {
      console.error("Update error:", error);
      alert(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userProfile.fullName,
      phone: userProfile.phone,
    });
    setIsEditing(false);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;

      const fileName = `profile_${userData.user.id}_${Date.now()}`;
      const filePath = `profile_images/${fileName}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = await supabase.storage.from("images").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ image_url: publicUrl })
        .eq("id", userData.user.id);

      if (updateError) throw updateError;

      setUserProfile({ ...userProfile, imageUrl: publicUrl });
      return publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.message || "Failed to upload image");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadImage(file);
    }
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    return errors;
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    const passwordErrors = validatePassword(passwordData.newPassword);
    if (passwordErrors.length > 0) {
      alert(
        `Password Requirements Not Met:\n\n• ${passwordErrors.join("\n• ")}`
      );
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    if (passwordData.newPassword === passwordData.currentPassword) {
      alert("New password must be different from current password");
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userProfile.email,
        password: passwordData.currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (updateError) throw updateError;

      alert("Password updated successfully");
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Password change error:", error);
      alert(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-64 bg-slate-700/50 rounded-2xl" />
              <Skeleton className="h-6 w-96 bg-slate-800/50 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <Skeleton className="w-32 h-32 rounded-full mx-auto bg-slate-700/50" />
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-48 bg-slate-700/50 rounded-lg mx-auto" />
                        <Skeleton className="h-5 w-40 bg-slate-700/50 rounded mx-auto" />
                      </div>
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="p-4 bg-slate-700/30 rounded-xl"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Skeleton className="w-10 h-10 rounded-full bg-slate-600/50" />
                                <div className="space-y-2">
                                  <Skeleton className="h-5 w-12 bg-slate-600/50 rounded" />
                                  <Skeleton className="h-4 w-20 bg-slate-600/50 rounded" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-xl">
                  <CardHeader>
                    <Skeleton className="h-7 w-48 bg-slate-700/50 rounded-xl" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-20 bg-slate-700/50 rounded" />
                        <Skeleton className="h-12 w-full bg-slate-700/50 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-24 bg-slate-700/50 rounded" />
                        <Skeleton className="h-12 w-full bg-slate-700/50 rounded-xl" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-xl">
                  <CardHeader>
                    <Skeleton className="h-7 w-40 bg-slate-700/50 rounded-xl" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full bg-slate-700/30 rounded-xl" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
            [...Array(15)].map((_, i) => (
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

        <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
          {/* Enhanced Professional Header */}
          <div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            style={{ animation: "fadeInDown 0.8s ease-out" }}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent animate-gradient bg-300%">
                  Account Profile
                </h1>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                  <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/30">
                    Premium
                  </Badge>
                </div>
              </div>
              <p className="text-slate-400 text-lg font-light max-w-2xl">
                Manage your personal information, security settings, and account
                preferences with our advanced profile management system
              </p>
            </div>

            <div
              className="flex items-center gap-4"
              style={{ animation: "fadeInRight 0.8s ease-out 0.2s both" }}
            >
              {isEditing ? (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 h-12 font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-slate-600/50 text-slate-300 bg-slate-800/30 backdrop-blur-xl hover:bg-slate-700/50 hover:text-white h-12 px-6 transition-all duration-300 hover:scale-105"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 text-slate-300 hover:bg-emerald-600/20 hover:border-emerald-500/50 hover:text-emerald-300 h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
          >
            {/* Left Column - Enhanced Profile Card */}
            <div className="lg:col-span-1">
              <Card className="group bg-slate-800/30 backdrop-blur-xl border-slate-700/30 overflow-hidden hover:bg-slate-800/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <CardContent className="p-8">
                  {/* Enhanced Profile Image Section */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                      <Avatar className="relative w-36 h-36 border-4 border-gradient-to-r from-emerald-500/50 to-blue-500/50 shadow-2xl hover:scale-105 transition-transform duration-300">
                        <AvatarImage
                          className="object-cover"
                          src={
                            userProfile.imageUrl ||
                            `https://ui-avatars.com/api/?name=${
                              encodeURIComponent(userProfile.fullName) || ""
                            }&size=144&background=10b981&color=ffffff`
                          }
                        />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-3xl font-bold">
                          {userProfile.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <div className="absolute -bottom-2 -right-2">
                          <label
                            htmlFor="profile-image"
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/25"
                          >
                            <Camera className="h-6 w-6 text-white" />
                            <input
                              id="profile-image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-100 transition-colors">
                          {userProfile.fullName || "No name set"}
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium mb-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{userProfile.email}</span>
                        </div>
                        {userProfile.phone && (
                          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
                            <Phone className="h-4 w-4" />
                            <span>{userProfile.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-6 px-4 py-2 bg-slate-700/30 rounded-full backdrop-blur-sm">
                        <Clock className="h-4 w-4" />
                        <span>
                          Last active:{" "}
                          {formatLastSignIn(userProfile.lastSignIn)}
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 font-medium">
                          <Crown className="h-4 w-4 mr-2" />
                          Premium Member
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Quick Stats */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-emerald-400" />
                      Account Statistics
                    </h3>

                    {[
                      {
                        icon: Target,
                        label: "Total Predictions",
                        value: userProfile.totalPredictions,
                        gradient: "from-blue-500/20 to-blue-600/20",
                        iconColor: "text-blue-400",
                        bgGradient: "from-blue-500/5 to-blue-600/5",
                      },
                      {
                        icon: Award,
                        label: "Accuracy Rate",
                        value: `${userProfile.avgAccuracy}%`,
                        gradient: "from-emerald-500/20 to-emerald-600/20",
                        iconColor: "text-emerald-400",
                        bgGradient: "from-emerald-500/5 to-emerald-600/5",
                      },
                      {
                        icon: Calendar,
                        label: "Days Active",
                        value: calculateDaysActive(),
                        gradient: "from-purple-500/20 to-purple-600/20",
                        iconColor: "text-purple-400",
                        bgGradient: "from-purple-500/5 to-purple-600/5",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`group/stat relative p-5 bg-gradient-to-r ${stat.bgGradient} rounded-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "slideInRight 0.6s ease-out forwards",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300`}
                            >
                              <stat.icon
                                className={`h-6 w-6 ${stat.iconColor}`}
                              />
                            </div>
                            <div>
                              <p className="text-white font-bold text-xl group-hover/stat:text-emerald-100 transition-colors">
                                {stat.value}
                              </p>
                              <p className="text-slate-400 text-sm font-medium">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Enhanced Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Personal Information */}
              <Card className="group bg-slate-800/30 backdrop-blur-xl border-slate-700/30 hover:bg-slate-800/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white text-2xl flex items-center gap-3 group-hover:text-emerald-100 transition-colors">
                    <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl">
                      <User className="h-6 w-6 text-emerald-400" />
                    </div>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-semibold text-base flex items-center gap-2">
                        <User className="h-4 w-4 text-emerald-400" />
                        Full Name
                      </Label>
                      <Input
                        value={
                          isEditing ? formData.fullName : userProfile.fullName
                        }
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-slate-700/30 border-slate-600/50 text-white disabled:opacity-60 h-14 text-lg backdrop-blur-sm hover:border-slate-500/50 focus:border-emerald-500/50 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-semibold text-base flex items-center gap-2">
                        <Phone className="h-4 w-4 text-emerald-400" />
                        Phone Number
                      </Label>
                      <Input
                        value={isEditing ? formData.phone : userProfile.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-slate-700/30 border-slate-600/50 text-white disabled:opacity-60 h-14 text-lg backdrop-blur-sm hover:border-slate-500/50 focus:border-emerald-500/50 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-semibold text-base flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-400" />
                      Email Address
                    </Label>
                    <Input
                      value={userProfile.email}
                      disabled
                      className="bg-slate-700/20 border-slate-600/30 text-slate-400 h-14 text-lg backdrop-blur-sm"
                    />
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Email cannot be changed from this page for security
                      reasons
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Security Settings */}
              <Card className="group bg-slate-800/30 backdrop-blur-xl border-slate-700/30 hover:bg-slate-800/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white text-2xl flex items-center gap-3 group-hover:text-purple-100 transition-colors">
                    <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                      <Shield className="h-6 w-6 text-purple-400" />
                    </div>
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog
                    open={showChangePassword}
                    onOpenChange={setShowChangePassword}
                  >
                    <DialogTrigger asChild>
                      <div className="group/security flex items-center justify-between p-8 bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-2xl cursor-pointer hover:from-slate-700/30 hover:to-slate-600/30 transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center group-hover/security:scale-110 transition-transform duration-300">
                            <Key className="h-8 w-8 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-xl mb-2 group-hover/security:text-emerald-100 transition-colors">
                              Change Password
                            </p>
                            <p className="text-slate-400 text-base">
                              Update your account password for enhanced security
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-slate-400 group-hover/security:text-emerald-400 group-hover/security:translate-x-1 transition-all duration-300" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-lg">
                      <DialogHeader className="space-y-4">
                        <DialogTitle className="text-white text-2xl flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl">
                            <Key className="h-6 w-6 text-emerald-400" />
                          </div>
                          Change Password
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-base">
                          Enter your current password and choose a new secure
                          password to protect your account
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-8 mt-6">
                        {/* Current Password */}
                        <div className="space-y-3">
                          <Label
                            htmlFor="current-password"
                            className="text-slate-300 font-semibold text-base"
                          >
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              name="currentPassword"
                              type={showPassword.current ? "text" : "password"}
                              placeholder="Enter current password"
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="bg-slate-700/30 border-slate-600/50 text-white pr-14 h-14 text-lg backdrop-blur-sm hover:border-slate-500/50 focus:border-emerald-500/50 transition-all duration-300"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-white bg-transparent hover:bg-transparent"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  current: !showPassword.current,
                                })
                              }
                            >
                              {showPassword.current ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-3">
                          <Label
                            htmlFor="new-password"
                            className="text-slate-300 font-semibold text-base"
                          >
                            New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="new-password"
                              name="newPassword"
                              type={showPassword.new ? "text" : "password"}
                              placeholder="Enter new password"
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className="bg-slate-700/30 border-slate-600/50 text-white pr-14 h-14 text-lg backdrop-blur-sm hover:border-slate-500/50 focus:border-emerald-500/50 transition-all duration-300"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-white bg-transparent hover:bg-transparent"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  new: !showPassword.new,
                                })
                              }
                            >
                              {showPassword.new ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-3">
                          <Label
                            htmlFor="confirm-password"
                            className="text-slate-300 font-semibold text-base"
                          >
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirm-password"
                              name="confirmPassword"
                              type={showPassword.confirm ? "text" : "password"}
                              placeholder="Confirm new password"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className="bg-slate-700/30 border-slate-600/50 text-white pr-14 h-14 text-lg backdrop-blur-sm hover:border-slate-500/50 focus:border-emerald-500/50 transition-all duration-300"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-white bg-transparent hover:bg-transparent"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  confirm: !showPassword.confirm,
                                })
                              }
                            >
                              {showPassword.confirm ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Enhanced Password Requirements */}
                        <div className="bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
                          <p className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-emerald-400" />
                            Password Requirements:
                          </p>
                          <div className="space-y-3">
                            {[
                              {
                                check: passwordData.newPassword.length >= 8,
                                text: "At least 8 characters",
                              },
                              {
                                check: /[A-Z]/.test(passwordData.newPassword),
                                text: "One uppercase letter",
                              },
                              {
                                check: /[0-9]/.test(passwordData.newPassword),
                                text: "One number",
                              },
                            ].map((req, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    req.check
                                      ? "bg-emerald-500/20 border-emerald-500/50"
                                      : "bg-slate-600/20 border-slate-600/50"
                                  } border`}
                                >
                                  <Check
                                    className={`h-3 w-3 transition-all duration-300 ${
                                      req.check
                                        ? "text-emerald-400 scale-100"
                                        : "text-slate-600 scale-0"
                                    }`}
                                  />
                                </div>
                                <span
                                  className={`text-sm transition-colors duration-300 ${
                                    req.check
                                      ? "text-emerald-400"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {req.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={handleChangePassword}
                          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 h-14 text-lg font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                          disabled={loading}
                        >
                          {loading ? "Updating Password..." : "Update Password"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Enhanced Account Actions */}
              <Card className="group bg-slate-800/30 backdrop-blur-xl border-red-500/20 hover:bg-slate-800/40 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white text-2xl flex items-center gap-3 group-hover:text-red-100 transition-colors">
                    <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
                      <Settings className="h-6 w-6 text-red-400" />
                    </div>
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-white font-bold text-xl flex items-center gap-3">
                          <LogOut className="h-6 w-6 text-red-400" />
                          Sign Out
                        </h3>
                        <p className="text-slate-400 text-base">
                          Securely sign out of your account on this device
                        </p>
                      </div>
                      <Button
                        onClick={handleLogout}
                        className="bg-transparent border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 px-8 py-3 h-12 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
