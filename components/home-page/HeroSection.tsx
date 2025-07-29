"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/landing-background.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-emerald-900/80" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-6 bg-emerald-400/20 text-emerald-300 border-emerald-400/30 px-4 py-2 text-sm">
            ✨ AI-Powered Financial Intelligence
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Predict Your
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Financial Future
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Transform your household data into actionable insights with our
            comprehensive AI-powered platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-900 font-semibold px-10 py-6 text-lg rounded-full shadow-2xl shadow-emerald-400/25 transition-all duration-300 hover:scale-105"
            >
              <Link href="/auth/login">
                <Calculator className="mr-3 h-6 w-6" />
                Start Your Prediction
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">30+</div>
              <div className="text-slate-400 text-sm">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">95%</div>
              <div className="text-slate-400 text-sm">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10K+</div>
              <div className="text-slate-400 text-sm">Households</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">4.9</div>
              <div className="text-slate-400 text-sm flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
