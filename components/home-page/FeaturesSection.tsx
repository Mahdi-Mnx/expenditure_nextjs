"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, BarChart3 } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-900 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-400/20 text-purple-300 border-purple-400/30">
            🎯 Advanced Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our machine learning models analyze complex patterns across multiple
            data dimensions to provide unprecedented accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:shadow-2xl hover:shadow-emerald-400/10 transition-all duration-500">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-400/25">
                <TrendingUp className="h-10 w-10 text-slate-900" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Multi-Factor Analysis
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Advanced ML models analyze 30+ variables including expenditures,
                assets, demographics, economic shocks, and regional factors for
                precise predictions.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge className="bg-emerald-400/20 text-emerald-300">
                  Expenditures
                </Badge>
                <Badge className="bg-blue-400/20 text-blue-300">
                  Demographics
                </Badge>
                <Badge className="bg-purple-400/20 text-purple-300">
                  Assets
                </Badge>
                <Badge className="bg-yellow-400/20 text-yellow-300">
                  Shocks
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:shadow-2xl hover:shadow-blue-400/10 transition-all duration-500">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-400/25">
                <Shield className="h-10 w-10 text-slate-900" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Regional Intelligence
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Location-aware predictions that factor in regional economic
                conditions, cost of living variations, and local market
                dynamics.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge className="bg-green-400/20 text-green-300">Rural</Badge>
                <Badge className="bg-blue-400/20 text-blue-300">Urban</Badge>
                <Badge className="bg-purple-400/20 text-purple-300">
                  Suburban
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:shadow-2xl hover:shadow-purple-400/10 transition-all duration-500">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-400/25">
                <BarChart3 className="h-10 w-10 text-slate-900" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Risk Assessment
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Comprehensive risk analysis considering economic shocks, food
                security, credit access, and vulnerability factors.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge className="bg-red-400/20 text-red-300">
                  Economic Shocks
                </Badge>
                <Badge className="bg-orange-400/20 text-orange-300">
                  Food Security
                </Badge>
                <Badge className="bg-yellow-400/20 text-yellow-300">
                  Credit Risk
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
