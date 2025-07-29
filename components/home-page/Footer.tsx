"use client";
import { Facebook, Github, Linkedin, TrendingUp } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16">
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
            <Link href="/terms" className="hover:text-white transition-colors">
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
  );
}
