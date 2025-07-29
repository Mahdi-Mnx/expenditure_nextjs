"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Zap } from "lucide-react";

export function InteractiveDemo() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #34d399 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-400/20 text-blue-300 border-blue-400/30">
            🚀 Interactive Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See Your Data Come to Life
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience real-time predictions as you input your household data.
            Watch how each factor influences your financial forecast.
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Household Demographics
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Input your household size, region, and basic demographics to
                establish the foundation of your prediction.
              </p>
              <div className="flex justify-center gap-2">
                <Badge
                  variant="outline"
                  className="text-emerald-400 border-emerald-400/50"
                >
                  10 people
                </Badge>
                <Badge
                  variant="outline"
                  className="text-blue-400 border-blue-400/50"
                >
                  Urban
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Comprehensive Expenses
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Track food, housing, utilities, and 20+ other expense categories
                for complete financial visibility.
              </p>
              <div className="flex justify-center gap-2">
                <Badge
                  variant="outline"
                  className="text-red-400 border-red-400/50"
                >
                  $500 Food
                </Badge>
                <Badge
                  variant="outline"
                  className="text-orange-400 border-orange-400/50"
                >
                  $300 Other
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                AI-Powered Insights
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Get instant predictions with confidence scores, risk
                assessments, and personalized recommendations.
              </p>
              <div className="flex justify-center gap-2">
                <Badge
                  variant="outline"
                  className="text-emerald-400 border-emerald-400/50"
                >
                  87% Confidence
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-400 border-purple-400/50"
                >
                  $1,247
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
