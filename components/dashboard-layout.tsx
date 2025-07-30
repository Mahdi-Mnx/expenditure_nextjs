"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Zap,
  LogOut,
  User2Icon,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/utils/supabase";
import Image from "next/image";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Prediction",
    href: "/predict",
    icon: Zap,
    description: "ML Predictions",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User2Icon,
    description: "Account Settings",
    gradient: "from-purple-500 to-purple-600",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    const initials = words
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
    return initials || "U";
  };

  const pathname = usePathname();
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [profile, setProfile] = useState<{
    full_name: string;
    email: string;
    image_url: string;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchProfile = async () => {
      const supabase = supabaseBrowser();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, email, image_url")
          .eq("id", user.id)
          .single();
        if (!error) {
          setProfile(data);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl "></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl "></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        {/* Floating particles */}
        {mounted &&
          [...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full "
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-slate-700/50 p-2 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
              FinPredict
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-500/50 cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => router.push("/profile")}
            >
              {profile?.image_url ? (
                <Image
                  src={profile.image_url || ""}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-sm font-bold w-full h-full flex items-center justify-center">
                  {getInitials(profile?.full_name || "User")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full pt-20">
              {/* Mobile Navigation Items */}
              <div className="flex-1 px-4 py-6">
                <nav className="space-y-3 ">
                  {navigation.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center px-4 py-4 text-base font-medium rounded-2xl transition-all duration-300 hover:scale-105",
                          isActive
                            ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                            : "text-slate-300 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50"
                        )}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "slideInLeft 0.5s ease-out forwards",
                        }}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-xl mr-4 transition-all duration-300",
                            isActive
                              ? `bg-gradient-to-br ${item.gradient}/20`
                              : "bg-slate-700/50 group-hover:bg-slate-600/50"
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <ChevronRight className="h-5 w-5 text-emerald-400" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Profile Section */}
              <div className="p-4 border-t border-slate-700/50">
                <div
                  className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-2xl cursor-pointer hover:bg-slate-700/50 transition-all duration-300 mb-4"
                  onClick={() => {
                    router.push("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/50">
                    {profile?.image_url ? (
                      <Image
                        src={profile.image_url || "/placeholder.svg"}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold w-full h-full flex items-center justify-center">
                        {getInitials(profile?.full_name || "User")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold truncate">
                      {profile?.full_name || "Guest User"}
                    </div>
                    <div className="text-slate-400 text-sm truncate">
                      {profile?.email || "no-email@example.com"}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-md text-xs font-medium">
                    Pro
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full bg-transparent border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-semibold py-3 rounded-xl flex items-center justify-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col z-30">
        <div className="flex flex-col flex-grow bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-r border-slate-700/30">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-8 border-b border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                  FinPredict
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Prediction Platform
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-6 py-2">
            <nav className="space-y-3">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-4 text-base font-medium rounded-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInLeft 0.6s ease-out forwards",
                    }}
                  >
                    {/* Background glow effect */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl",
                        `${item.gradient}/5`
                      )}
                    />
                    <div
                      className={cn(
                        "relative p-3 rounded-xl mr-4 transition-all duration-300 group-hover:scale-110",
                        isActive
                          ? `bg-gradient-to-br ${item.gradient}/20 shadow-lg`
                          : "bg-slate-700/50 group-hover:bg-slate-600/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6 transition-colors duration-300",
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-white"
                        )}
                      />
                    </div>
                    <div className="relative flex-1">
                      <div className="font-semibold text-lg">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="relative">
                        <ChevronRight className="h-5 w-5 text-emerald-400 animate-pulse" />
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm animate-ping" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-t border-slate-700/30">
            <div
              className="group flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-600/30 via-cyan-600/30 to-teal-500/30 rounded-2xl cursor-pointer hover:from-emerald-600/40 hover:to-teal-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-4 border border-teal-400/20 hover:border-emerald-400/40"
              onClick={() => router.push("/profile")}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-emerald-500/50 group-hover:border-emerald-400/70 transition-all duration-300">
                  {profile?.image_url ? (
                    <Image
                      src={profile.image_url || "/placeholder.svg"}
                      alt="Profile"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold text-lg w-full h-full flex items-center justify-center">
                      {getInitials(profile?.full_name || "User")}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-lg group-hover:text-emerald-100 transition-colors truncate">
                  {profile?.full_name || "Guest User"}
                </div>
                <div className="text-white text-sm group-hover:text-white transition-colors truncate">
                  {profile?.email || "no-email@example.com"}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-emerald-300">• Online</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <button
              onClick={handleSignOut}
              className="w-full bg-transparent border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-semibold py-3 h-12 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-80">
        <main className="relative z-10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-inner-lg min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
