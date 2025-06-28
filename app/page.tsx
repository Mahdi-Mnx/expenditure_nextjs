import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  BarChart3,
  ArrowRight,
  Calculator,
  FileText,
  Users,
  DollarSign,
  Zap,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Beautiful Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/landing-background.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-emerald-900/80" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
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
              comprehensive AI-powered platform. Make smarter financial
              decisions based on 30+ data points and advanced machine learning.
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

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-slate-400/50 hover:border-white bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <Link href="/auth/login">
                  <FileText className="mr-3 h-6 w-6" />
                  View Sample Report
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

      {/* Interactive Demo Section */}
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
                  Track food, housing, utilities, and 20+ other expense
                  categories for complete financial visibility.
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

      {/* Features Section */}
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
              Our machine learning models analyze complex patterns across
              multiple data dimensions to provide unprecedented accuracy.
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
                  Advanced ML models analyze 30+ variables including
                  expenditures, assets, demographics, economic shocks, and
                  regional factors for precise predictions.
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
                  <Badge className="bg-green-400/20 text-green-300">
                    Rural
                  </Badge>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-400 to-blue-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Transform Your Financial Planning?
          </h2>
          <p className="text-xl text-slate-800 mb-10 max-w-3xl mx-auto font-medium">
            Join thousands of households making data-driven financial decisions
            with our comprehensive AI-powered platform. Start your journey to
            financial clarity today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-slate-800">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-medium">10,000+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">
                Household Financial Predictor
              </h3>
              <p className="text-slate-400 mb-6 max-w-md">
                Empowering households with comprehensive AI-driven financial
                insights and predictions for better spending decisions and
                financial planning.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400">
              © 2024 Household Financial Predictor. All rights reserved. Built
              with ❤️ for better financial futures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
