"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  ShoppingCart,
  Home,
  Settings,
  TestTube,
  Zap,
  LogOut,
} from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Prediction", href: "/predict/demographics", icon: Zap },
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
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<{
    full_name: string;
    email: string;
    image_url: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClientComponentClient();
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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs transition-colors",
                  isActive
                    ? "bg-emerald-400 text-slate-900"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-slate-800 border-r border-slate-700">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <h1 className="text-xl font-bold text-white">
              Financial Predictor
            </h1>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-emerald-400 text-slate-900"
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex-shrink-0 p-4 border-t border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center"
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  {profile?.image_url ? (
                    <Image
                      src={profile.image_url}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  ) : (
                    <span>{getInitials(profile?.full_name || "User")}</span>
                  )}
                </div>
                <div className="flex-col">
                  <div className="text-sm font-medium text-white">
                    {profile?.full_name || "Guest"}
                  </div>
                  <div className="text-xs text-slate-400">
                    {profile?.email || "no-email@example.com"}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-red-500 border border-red-500 hover:text-white hover:bg-red-500 transition-all font-medium rounded-md"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/auth/login");
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8 pb-20 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}
