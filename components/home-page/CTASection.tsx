"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Star, Users } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
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
          Join thousands of households making data-driven financial decisions.
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
  );
}
