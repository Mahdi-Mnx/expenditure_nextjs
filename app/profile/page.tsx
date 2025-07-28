//"use client";
//
//import { useState } from "react";
//import { Button } from "@/components/ui/button";
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
//import { Textarea } from "@/components/ui/textarea";
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import {
//  Dialog,
//  DialogContent,
//  DialogDescription,
//  DialogHeader,
//  DialogTitle,
//  DialogTrigger,
//} from "@/components/ui/dialog";
//import {
//  Select,
//  SelectContent,
//  SelectItem,
//  SelectTrigger,
//  SelectValue,
//} from "@/components/ui/select";
//import { DashboardLayout } from "@/components/dashboard-layout";
//import {
//  User,
//  Mail,
//  Phone,
//  MapPin,
//  Calendar,
//  Briefcase,
//  DollarSign,
//  Users,
//  Eye,
//  EyeOff,
//  Edit,
//  Save,
//  X,
//  Camera,
//  Clock,
//  Target,
//  UserCheck,
//  LogOut,
//  Check,
//  ChevronRight,
//  Key,
//} from "lucide-react";
//
//interface UserProfile {
//  fullName: string;
//  email: string;
//  phone: string;
//  address: string;
//  dateOfBirth: string;
//  occupation: string;
//  bio: string;
//  income: string;
//  householdSize: string;
//  imageUrl: string;
//  totalPredictions: number;
//  avgAccuracy: number;
//  joinDate: string;
//  lastSignIn: string;
//}
//
//export default function ProfilePage() {
//  const [loading, setLoading] = useState(false);
//  const [isEditing, setIsEditing] = useState(false);
//  const [showChangePassword, setShowChangePassword] = useState(false);
//  const [showPassword, setShowPassword] = useState({
//    current: false,
//    new: false,
//    confirm: false,
//  });
//
//  const [userProfile, setUserProfile] = useState<UserProfile>({
//    fullName: "John Doe",
//    email: "john.doe@example.com",
//    phone: "+1 (555) 123-4567",
//    address: "123 Main St, New York, NY 10001",
//    dateOfBirth: "1990-05-15",
//    occupation: "Software Engineer",
//    bio: "Passionate about financial planning and data-driven decision making.",
//    income: "75000-100000",
//    householdSize: "4",
//    imageUrl: "",
//    totalPredictions: 12,
//    avgAccuracy: 87,
//    joinDate: "2024-01-15",
//    lastSignIn: new Date().toISOString(),
//  });
//
//  const [passwordData, setPasswordData] = useState({
//    currentPassword: "",
//    newPassword: "",
//    confirmPassword: "",
//  });
//
//  const [preferences, setPreferences] = useState({
//    emailNotifications: true,
//    pushNotifications: false,
//    weeklyReports: true,
//    marketingEmails: false,
//    currency: "USD",
//    dateFormat: "MM/DD/YYYY",
//  });
//
//  const [privacy, setPrivacy] = useState({
//    profileVisibility: "private",
//    dataSharing: false,
//    analytics: true,
//  });
//
//  const formatLastSignIn = (dateString: string) => {
//    const date = new Date(dateString);
//    const now = new Date();
//    const diffInHours = Math.floor(
//      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
//    );
//
//    if (diffInHours < 1) return "Just now";
//    if (diffInHours < 24) return `${diffInHours} hours ago`;
//    if (diffInHours < 48) return "Yesterday";
//    return date.toLocaleDateString("en-US", {
//      month: "short",
//      day: "numeric",
//      year: "numeric",
//    });
//  };
//
//  const getDaysActive = () => {
//    const joinDate = new Date(userProfile.joinDate);
//    const now = new Date();
//    return Math.floor(
//      (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
//    );
//  };
//
//  const handleSave = () => {
//    setLoading(true);
//    // Simulate API call
//    setTimeout(() => {
//      setIsEditing(false);
//      setLoading(false);
//      console.log("Profile saved:", userProfile);
//    }, 1000);
//  };
//
//  const handleCancel = () => {
//    setIsEditing(false);
//    // Reset any unsaved changes if needed
//  };
//
//  const validatePassword = (password: string) => {
//    const errors = [];
//    if (password.length < 8) errors.push("At least 8 characters");
//    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
//    if (!/[0-9]/.test(password)) errors.push("One number");
//    if (/^\d+$/.test(password)) errors.push("Cannot contain only numbers");
//    if (!/[a-zA-Z]/.test(password)) errors.push("At least one letter");
//    return errors;
//  };
//
//  const handleChangePassword = () => {
//    if (
//      !passwordData.currentPassword ||
//      !passwordData.newPassword ||
//      !passwordData.confirmPassword
//    ) {
//      alert("Please fill in all fields");
//      return;
//    }
//
//    const passwordErrors = validatePassword(passwordData.newPassword);
//    if (passwordErrors.length > 0) {
//      alert(
//        `Password Requirements Not Met:\n\n• ${passwordErrors.join("\n• ")}`
//      );
//      return;
//    }
//
//    if (passwordData.newPassword !== passwordData.confirmPassword) {
//      alert("New passwords don't match");
//      return;
//    }
//
//    if (passwordData.newPassword === passwordData.currentPassword) {
//      alert("New password must be different from current password");
//      return;
//    }
//
//    setLoading(true);
//    // Simulate API call
//    setTimeout(() => {
//      setLoading(false);
//      setShowChangePassword(false);
//      setPasswordData({
//        currentPassword: "",
//        newPassword: "",
//        confirmPassword: "",
//      });
//      alert("Password updated successfully");
//    }, 1000);
//  };
//
//  const handleLogout = () => {
//    // Simulate logout
//    console.log("Logging out...");
//    // Redirect to login page
//    window.location.href = "/auth/login";
//  };
//
//  return (
//    <DashboardLayout>
//      <div className="max-w-4xl mx-auto space-y-6">
//        {/* Header */}
//        <div className="flex items-center justify-between">
//          <div>
//            <h1 className="text-3xl font-bold text-white">Profile</h1>
//            <p className="text-slate-400 mt-1">
//              Manage your account information and preferences
//            </p>
//          </div>
//          <div className="flex gap-2">
//            {isEditing ? (
//              <>
//                <Button
//                  onClick={handleSave}
//                  size="sm"
//                  className="bg-emerald-600 hover:bg-emerald-700"
//                  disabled={loading}
//                >
//                  <Save className="h-4 w-4 mr-2" />
//                  {loading ? "Saving..." : "Save"}
//                </Button>
//                <Button
//                  onClick={handleCancel}
//                  variant="outline"
//                  size="sm"
//                  className="border-slate-600 text-slate-300 bg-transparent"
//                >
//                  <X className="h-4 w-4 mr-2" />
//                  Cancel
//                </Button>
//              </>
//            ) : (
//              <Button
//                onClick={() => setIsEditing(true)}
//                variant="outline"
//                size="sm"
//                className="border-slate-600 text-slate-300 bg-transparent"
//              >
//                <Edit className="h-4 w-4 mr-2" />
//                Edit Profile
//              </Button>
//            )}
//          </div>
//        </div>
//
//        {/* Profile Image & Basic Info */}
//        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
//          <CardContent className="p-8">
//            <div className="flex flex-col items-center text-center mb-8">
//              <div className="relative mb-4">
//                <Avatar className="w-32 h-32 border-4 border-emerald-500">
//                  <AvatarImage
//                    src={
//                      userProfile.imageUrl ||
//                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                        userProfile.fullName
//                      )}&size=128`
//                    }
//                  />
//                  <AvatarFallback className="bg-emerald-400 text-slate-900 text-2xl">
//                    {userProfile.fullName
//                      .split(" ")
//                      .map((n) => n[0])
//                      .join("")}
//                  </AvatarFallback>
//                </Avatar>
//                {isEditing && (
//                  <Button
//                    size="sm"
//                    className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 p-0"
//                  >
//                    <Camera className="h-4 w-4" />
//                  </Button>
//                )}
//              </div>
//              <h2 className="text-2xl font-bold text-white mb-1">
//                {userProfile.fullName}
//              </h2>
//              <p className="text-emerald-400 text-base mb-2">
//                {userProfile.email}
//              </p>
//              <div className="flex items-center text-slate-500 text-sm">
//                <Clock className="h-4 w-4 mr-1.5" />
//                Last sign in: {formatLastSignIn(userProfile.lastSignIn)}
//              </div>
//            </div>
//
//            {/* Stats Cards */}
//            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//              <div className="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
//                <Calendar className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
//                <div className="text-xl font-bold text-white mb-1">
//                  {userProfile.totalPredictions}
//                </div>
//                <div className="text-xs text-slate-400">Predictions</div>
//              </div>
//              <div className="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
//                <Target className="h-5 w-5 text-blue-400 mx-auto mb-2" />
//                <div className="text-xl font-bold text-white mb-1">
//                  {userProfile.avgAccuracy}%
//                </div>
//                <div className="text-xs text-slate-400">Expense Accuracy</div>
//              </div>
//            </div>
//          </CardContent>
//        </Card>
//
//        {/* Contact Information */}
//        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
//          <CardHeader>
//            <CardTitle className="text-white">Contact Information</CardTitle>
//          </CardHeader>
//          <CardContent className="space-y-6">
//            <div className="grid md:grid-cols-2 gap-6">
//              <div className="space-y-2">
//                <Label
//                  htmlFor="fullName"
//                  className="text-slate-300 flex items-center gap-2"
//                >
//                  <User className="h-4 w-4" />
//                  Full Name
//                </Label>
//                <Input
//                  id="fullName"
//                  value={userProfile.fullName}
//                  onChange={(e) =>
//                    setUserProfile({ ...userProfile, fullName: e.target.value })
//                  }
//                  disabled={!isEditing}
//                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
//                />
//              </div>
//              <div className="space-y-2">
//                <Label
//                  htmlFor="phone"
//                  className="text-slate-300 flex items-center gap-2"
//                >
//                  <Phone className="h-4 w-4" />
//                  Phone Number
//                </Label>
//                <Input
//                  id="phone"
//                  value={userProfile.phone}
//                  onChange={(e) =>
//                    setUserProfile({ ...userProfile, phone: e.target.value })
//                  }
//                  disabled={!isEditing}
//                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
//                />
//              </div>
//              <div className="space-y-2 md:col-span-2">
//                <Label
//                  htmlFor="email"
//                  className="text-slate-300 flex items-center gap-2"
//                >
//                  <Mail className="h-4 w-4" />
//                  Email Address
//                </Label>
//                <Input
//                  id="email"
//                  type="email"
//                  value={userProfile.email}
//                  onChange={(e) =>
//                    setUserProfile({ ...userProfile, email: e.target.value })
//                  }
//                  disabled={!isEditing}
//                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
//                />
//              </div>
//            </div>
//          </CardContent>
//        </Card>
//
//        {/* Security Section */}
//        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
//          <CardHeader>
//            <CardTitle className="text-white">Security</CardTitle>
//          </CardHeader>
//          <CardContent>
//            <Dialog
//              open={showChangePassword}
//              onOpenChange={setShowChangePassword}
//            >
//              <DialogTrigger asChild>
//                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
//                  <div className="flex items-center gap-4">
//                    <div className="w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
//                      <Key className="h-5 w-5 text-emerald-400" />
//                    </div>
//                    <div>
//                      <p className="text-white font-semibold">
//                        Change Password
//                      </p>
//                      <p className="text-slate-400 text-sm">
//                        Update your account password
//                      </p>
//                    </div>
//                  </div>
//                  <ChevronRight className="h-5 w-5 text-slate-400" />
//                </div>
//              </DialogTrigger>
//              <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
//                <DialogHeader>
//                  <DialogTitle className="text-white">
//                    Change Password
//                  </DialogTitle>
//                  <DialogDescription className="text-slate-400">
//                    Enter your current password and choose a new one
//                  </DialogDescription>
//                </DialogHeader>
//                <div className="space-y-4">
//                  <div className="space-y-2">
//                    <Label className="text-slate-300">Current Password</Label>
//                    <div className="relative">
//                      <Input
//                        type={showPassword.current ? "text" : "password"}
//                        placeholder="Enter current password"
//                        value={passwordData.currentPassword}
//                        onChange={(e) =>
//                          setPasswordData({
//                            ...passwordData,
//                            currentPassword: e.target.value,
//                          })
//                        }
//                        className="bg-slate-700/50 border-slate-600 text-white pr-10"
//                      />
//                      <Button
//                        type="button"
//                        variant="ghost"
//                        size="sm"
//                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
//                        onClick={() =>
//                          setShowPassword({
//                            ...showPassword,
//                            current: !showPassword.current,
//                          })
//                        }
//                      >
//                        {showPassword.current ? (
//                          <EyeOff className="h-4 w-4" />
//                        ) : (
//                          <Eye className="h-4 w-4" />
//                        )}
//                      </Button>
//                    </div>
//                  </div>
//                  <div className="space-y-2">
//                    <Label className="text-slate-300">New Password</Label>
//                    <div className="relative">
//                      <Input
//                        type={showPassword.new ? "text" : "password"}
//                        placeholder="Enter new password"
//                        value={passwordData.newPassword}
//                        onChange={(e) =>
//                          setPasswordData({
//                            ...passwordData,
//                            newPassword: e.target.value,
//                          })
//                        }
//                        className="bg-slate-700/50 border-slate-600 text-white pr-10"
//                      />
//                      <Button
//                        type="button"
//                        variant="ghost"
//                        size="sm"
//                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
//                        onClick={() =>
//                          setShowPassword({
//                            ...showPassword,
//                            new: !showPassword.new,
//                          })
//                        }
//                      >
//                        {showPassword.new ? (
//                          <EyeOff className="h-4 w-4" />
//                        ) : (
//                          <Eye className="h-4 w-4" />
//                        )}
//                      </Button>
//                    </div>
//                  </div>
//                  <div className="space-y-2">
//                    <Label className="text-slate-300">
//                      Confirm New Password
//                    </Label>
//                    <div className="relative">
//                      <Input
//                        type={showPassword.confirm ? "text" : "password"}
//                        placeholder="Confirm new password"
//                        value={passwordData.confirmPassword}
//                        onChange={(e) =>
//                          setPasswordData({
//                            ...passwordData,
//                            confirmPassword: e.target.value,
//                          })
//                        }
//                        className="bg-slate-700/50 border-slate-600 text-white pr-10"
//                      />
//                      <Button
//                        type="button"
//                        variant="ghost"
//                        size="sm"
//                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
//                        onClick={() =>
//                          setShowPassword({
//                            ...showPassword,
//                            confirm: !showPassword.confirm,
//                          })
//                        }
//                      >
//                        {showPassword.confirm ? (
//                          <EyeOff className="h-4 w-4" />
//                        ) : (
//                          <Eye className="h-4 w-4" />
//                        )}
//                      </Button>
//                    </div>
//                  </div>
//
//                  {/* Password Requirements */}
//                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
//                    <p className="text-slate-300 text-sm font-medium mb-2">
//                      Password Requirements:
//                    </p>
//                    <div className="space-y-1">
//                      <div className="flex items-center gap-2">
//                        <Check
//                          className="h-3 w-3"
//                          color={
//                            passwordData.newPassword.length >= 8
//                              ? "#10b981"
//                              : "#ef4444"
//                          }
//                        />
//                        <span className="text-xs text-slate-400">
//                          At least 8 characters
//                        </span>
//                      </div>
//                      <div className="flex items-center gap-2">
//                        <Check
//                          className="h-3 w-3"
//                          color={
//                            /[A-Z]/.test(passwordData.newPassword)
//                              ? "#10b981"
//                              : "#ef4444"
//                          }
//                        />
//                        <span className="text-xs text-slate-400">
//                          One uppercase letter
//                        </span>
//                      </div>
//                      <div className="flex items-center gap-2">
//                        <Check
//                          className="h-3 w-3"
//                          color={
//                            /[0-9]/.test(passwordData.newPassword)
//                              ? "#10b981"
//                              : "#ef4444"
//                          }
//                        />
//                        <span className="text-xs text-slate-400">
//                          One number
//                        </span>
//                      </div>
//                    </div>
//                  </div>
//
//                  <Button
//                    onClick={handleChangePassword}
//                    className="w-full bg-emerald-600 hover:bg-emerald-700"
//                    disabled={loading}
//                  >
//                    {loading ? "Updating..." : "Update Password"}
//                  </Button>
//                </div>
//              </DialogContent>
//            </Dialog>
//          </CardContent>
//        </Card>
//
//        {/* Sign Out */}
//        <Card className="bg-slate-800/50 backdrop-blur-xl border-red-500/50">
//          <CardContent className="p-6">
//            <Button
//              onClick={handleLogout}
//              variant="outline"
//              className="w-full border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
//            >
//              <LogOut className="h-4 w-4 mr-2" />
//              Sign Out
//            </Button>
//          </CardContent>
//        </Card>
//      </div>
//    </DashboardLayout>
//  );
//}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Mail,
  Phone,
  Edit,
  Save,
  X,
  Camera,
  Clock,
  Target,
  Calendar,
  LogOut,
  Check,
  ChevronRight,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  imageUrl: string;
  totalPredictions: number;
  avgAccuracy: number;
  joinDate: string;
  lastSignIn: string;
}

export default function ProfilePage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
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
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        // Get the current user session
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Fetch profile data from profiles table
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
            totalPredictions: 0,
            avgAccuracy: 0,
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

      // Create a unique filename
      const fileName = `profile_${userData.user.id}_${Date.now()}`;
      const filePath = `profile_images/${fileName}`;

      // Upload the image to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) throw error;

      // Get the public URL of the uploaded image
      const {
        data: { publicUrl },
      } = await supabase.storage.from("images").getPublicUrl(filePath);

      // Update profile with new image URL
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
    if (/^\d+$/.test(password)) errors.push("Cannot contain only numbers");
    if (!/[a-zA-Z]/.test(password)) errors.push("At least one letter");
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
      // First verify the current password by signing in again
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userProfile.email,
        password: passwordData.currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      // If current password is correct, update to new password
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-slate-400 mt-1">
              Manage your account information
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 bg-transparent"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Image & Basic Info */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4">
                <Avatar className="w-32 h-32 border-4 border-emerald-500">
                  <AvatarImage
                    className="object-cover"
                    src={
                      userProfile.imageUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userProfile.fullName
                      )}&size=128`
                    }
                  />
                  <AvatarFallback className="bg-emerald-400 text-slate-900 text-2xl">
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
                      className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center cursor-pointer"
                    >
                      <Camera className="h-4 w-4 text-white" />
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
              <h2 className="text-2xl font-bold text-white mb-1">
                {loading ? "Loading..." : userProfile.fullName || "No name"}
              </h2>
              <p className="text-emerald-400 text-base mb-2">
                {userProfile.email}
              </p>
              <div className="flex items-center text-slate-500 text-sm">
                <Clock className="h-4 w-4 mr-1.5" />
                Last sign in: {formatLastSignIn(userProfile.lastSignIn)}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
                <Calendar className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white mb-1">
                  {userProfile.totalPredictions}
                </div>
                <div className="text-xs text-slate-400">Predictions</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
                <Target className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white mb-1">
                  {userProfile.avgAccuracy}%
                </div>
                <div className="text-xs text-slate-400">Expense Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-slate-300 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={isEditing ? formData.fullName : userProfile.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-300 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={isEditing ? formData.phone : userProfile.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="email"
                  className="text-slate-300 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  disabled
                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog
              open={showChangePassword}
              onOpenChange={setShowChangePassword}
            >
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
                      <Key className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Change Password
                      </p>
                      <p className="text-slate-400 text-sm">
                        Update your account password
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Change Password
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Enter your current password and choose a new one
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword.current ? "text" : "password"}
                        placeholder="Enter current password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="bg-slate-700/50 border-slate-600 text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            current: !showPassword.current,
                          })
                        }
                      >
                        {showPassword.current ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword.new ? "text" : "password"}
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="bg-slate-700/50 border-slate-600 text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            new: !showPassword.new,
                          })
                        }
                      >
                        {showPassword.new ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword.confirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="bg-slate-700/50 border-slate-600 text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            confirm: !showPassword.confirm,
                          })
                        }
                      >
                        {showPassword.confirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <p className="text-slate-300 text-sm font-medium mb-2">
                      Password Requirements:
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-3 w-3"
                          color={
                            passwordData.newPassword.length >= 8
                              ? "#10b981"
                              : "#ef4444"
                          }
                        />
                        <span className="text-xs text-slate-400">
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-3 w-3"
                          color={
                            /[A-Z]/.test(passwordData.newPassword)
                              ? "#10b981"
                              : "#ef4444"
                          }
                        />
                        <span className="text-xs text-slate-400">
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-3 w-3"
                          color={
                            /[0-9]/.test(passwordData.newPassword)
                              ? "#10b981"
                              : "#ef4444"
                          }
                        />
                        <span className="text-xs text-slate-400">
                          One number
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-red-500/50">
          <CardContent className="p-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
