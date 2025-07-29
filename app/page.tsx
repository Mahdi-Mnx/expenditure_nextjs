"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingOverlay from "@/components/loading-overlay";
import { HeroSection } from "@/components/home-page/HeroSection";
import { InteractiveDemo } from "@/components/home-page/InteractiveDemo";
import { FeaturesSection } from "@/components/home-page/FeaturesSection";
import { CTASection } from "@/components/home-page/CTASection";
import { Footer } from "@/components/home-page/Footer";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowPage(true), 800);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingOverlay isVisible={isLoading} />;

  return (
    <>
      {!showPage && <LoadingOverlay isVisible={isLoading} />}
      {showPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="min-h-screen bg-slate-900">
            <HeroSection />
            <InteractiveDemo />
            <FeaturesSection />
            <CTASection />
            <Footer />
          </div>
        </motion.div>
      )}
    </>
  );
}
