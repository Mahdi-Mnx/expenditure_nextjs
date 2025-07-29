"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Book,
  Shield,
  CreditCard,
  TrendingUp,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    description: "Learn the basics of using FinPredict",
    articles: [
      {
        title: "How to create your first prediction",
        content:
          "Step-by-step guide to making your first household expenditure prediction...",
      },
      {
        title: "Understanding your dashboard",
        content:
          "Navigate through your personalized dashboard and understand key metrics...",
      },
      {
        title: "Setting up your household profile",
        content:
          "Complete your household information for more accurate predictions...",
      },
    ],
  },
  {
    id: "predictions",
    title: "Making Predictions",
    icon: MessageCircle,
    description: "Everything about creating and managing predictions",
    articles: [
      {
        title: "How prediction algorithms work",
        content:
          "Learn about the machine learning models behind our predictions...",
      },
      {
        title: "Improving prediction accuracy",
        content:
          "Tips and best practices for getting the most accurate results...",
      },
      {
        title: "Understanding prediction results",
        content:
          "Interpret your prediction results and confidence intervals...",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Security",
    icon: Shield,
    description: "Manage your account and security settings",
    articles: [
      {
        title: "Updating your profile information",
        content: "How to edit your personal and household information...",
      },
      {
        title: "Password and security settings",
        content: "Keep your account secure with strong passwords and 2FA...",
      },
      {
        title: "Data privacy and protection",
        content: "Learn how we protect your personal and financial data...",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Subscriptions",
    icon: CreditCard,
    description: "Payment, billing, and subscription information",
    articles: [
      {
        title: "Subscription plans and pricing",
        content: "Compare our subscription tiers and choose the right plan...",
      },
      {
        title: "Managing your subscription",
        content: "How to upgrade, downgrade, or cancel your subscription...",
      },
      {
        title: "Billing and payment methods",
        content: "Update payment information and view billing history...",
      },
    ],
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([
    "getting-started",
  ]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      articles: category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.articles.length > 0 || searchQuery === "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-slate-900" />
          </div>
          <span className="text-2xl font-bold text-white">FinPredict</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of
            FinPredict
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-400 rounded-xl backdrop-blur-xl"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <CardTitle className="text-white">Contact Support</CardTitle>
              <CardDescription className="text-slate-300">
                Get help from our support team
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer">
            <CardHeader className="text-center">
              <Book className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">User Guide</CardTitle>
              <CardDescription className="text-slate-300">
                Complete guide to using FinPredict
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/70 transition-all cursor-pointer">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Security Center</CardTitle>
              <CardDescription className="text-slate-300">
                Learn about our security measures
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isOpen = openCategories.includes(category.id);

              return (
                <Card
                  key={category.id}
                  className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 overflow-hidden"
                >
                  <Collapsible
                    open={isOpen}
                    onOpenChange={() => toggleCategory(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="hover:bg-slate-700/50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Icon className="h-6 w-6 text-emerald-400" />
                            <div className="text-left">
                              <CardTitle className="text-lg text-white">
                                {category.title}
                              </CardTitle>
                              <CardDescription className="text-slate-300">
                                {category.description}
                              </CardDescription>
                            </div>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {category.articles.map((article, index) => (
                            <div
                              key={index}
                              className="border-l-4 border-emerald-400/50 pl-4 py-2"
                            >
                              <h4 className="font-semibold text-white mb-2">
                                {article.title}
                              </h4>
                              <p className="text-slate-300 text-sm">
                                {article.content}
                              </p>
                              <Button
                                variant="link"
                                className="p-0 h-auto text-emerald-400 text-sm hover:text-emerald-300"
                              >
                                Read more →
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 max-w-2xl mx-auto mt-16 text-center">
          <Card className=" bg-slate-800/50  bg-gradient-to-r from-emerald-400/10 to-blue-400/10 backdrop-blur-xl border-emerald-400/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Still need help?
              </h3>
              <p className="text-slate-300 mb-6">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold">
                    Contact Support
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800/50 bg-transparent"
                >
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10  bg-slate-950 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid  md:grid-cols-4 gap-96 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3  md:mb-0 ">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white">FinPredict</span>
              </div>
              <p className="text-slate-400 mb-6 mt-5 max-w-md">
                Empowering households with comprehensive AI-driven financial
                insights and predictions for better spending decisions and
                financial planning.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/sadaqelmi.abdulle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">
                    <Facebook />
                  </span>
                </a>
                <a
                  href="https://github.com/Mohamed-apdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">
                    <Github />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mahdi-abdulkadir-743a26322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">
                    <Linkedin />
                  </span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6 text-slate-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link href="/help" className="hover:text-white transition-colors">
                Support
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400">
              © 2025 Household Financial Predictor. All rights reserved. Built
              with ❤️ for better financial futures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
