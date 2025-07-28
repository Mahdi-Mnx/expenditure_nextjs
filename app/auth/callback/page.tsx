"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Database,
  Shield,
} from "lucide-react";

export default function AuthCallback() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    {
      icon: Shield,
      label: "Verifying authentication",
      description: "Checking your credentials...",
    },
    {
      icon: User,
      label: "Setting up profile",
      description: "Creating your user profile...",
    },
    {
      icon: Database,
      label: "Syncing data",
      description: "Preparing your dashboard...",
    },
    {
      icon: CheckCircle,
      label: "Complete",
      description: "Welcome to your dashboard!",
    },
  ];

  useEffect(() => {
    const syncUserProfile = async () => {
      try {
        setCurrentStep(0);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (!session) {
          setStatus("error");
          setErrorMessage("No active session found");
          setTimeout(() => router.push("/auth/login"), 2000);
          return;
        }

        setCurrentStep(1);
        await new Promise((resolve) => setTimeout(resolve, 600));

        const user = session.user;
        const { id, email, user_metadata } = user;
        const fullName =
          user_metadata?.full_name || user_metadata?.name || null;
        const avatarUrl = user_metadata?.avatar_url || null;

        // Check if profile exists
        const { data: existingProfile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !existingProfile) {
          // Insert new profile
          await supabase.from("profiles").insert({
            id,
            email,
            full_name: fullName,
            image_url: avatarUrl,
          });
        } else {
          // Update profile with latest avatar
          await supabase
            .from("profiles")
            .update({
              full_name: fullName,
              image_url: avatarUrl,
            })
            .eq("id", id);
        }

        setCurrentStep(2);
        await new Promise((resolve) => setTimeout(resolve, 600));

        localStorage.setItem("token", session.access_token);

        setCurrentStep(3);
        setStatus("success");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("/dashboard");
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setErrorMessage(
          error.message || "Something went wrong during authentication"
        );
        setTimeout(() => router.push("/auth/login"), 3000);
      }
    };

    syncUserProfile();
  }, [supabase, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {status === "loading" && (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              )}
              {status === "success" && (
                <CheckCircle className="w-8 h-8 text-white" />
              )}
              {status === "error" && (
                <AlertCircle className="w-8 h-8 text-white" />
              )}
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              {status === "loading" && "Setting up your account..."}
              {status === "success" && "Welcome aboard!"}
              {status === "error" && "Authentication failed"}
            </h1>

            <p className="text-slate-400">
              {status === "loading" &&
                "Please wait while we prepare everything for you"}
              {status === "success" && "Redirecting to your dashboard..."}
              {status === "error" && errorMessage}
            </p>
          </div>

          {/* Progress Steps */}
          {status === "loading" && (
            <div className="space-y-4 mb-6">
              {steps.slice(0, -1).map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-blue-500 text-white animate-pulse"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`font-medium transition-colors duration-300 ${
                          isCompleted || isActive
                            ? "text-white"
                            : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          isActive ? "text-blue-400" : "text-slate-500"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {isCompleted && (
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <p className="text-emerald-400 font-medium mb-2">
                Authentication successful!
              </p>
              <p className="text-slate-400 text-sm">
                Taking you to your dashboard...
              </p>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-red-400 font-medium mb-2">
                Something went wrong
              </p>
              <p className="text-slate-400 text-sm mb-4">{errorMessage}</p>
              <p className="text-slate-500 text-xs">
                Redirecting to login page...
              </p>
            </div>
          )}

          {/* Loading Progress Bar */}
          {status === "loading" && (
            <div className="mt-6">
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-center text-slate-500 text-xs mt-2">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Powered by{" "}
            <span className="text-emerald-400 font-medium">
              Household Financial Predictor
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
