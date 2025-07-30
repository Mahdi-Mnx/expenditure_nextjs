"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PredictionCard } from "./prediction-card";
import type { PredictionData } from "@/types/predict";
import {
  cardVariantsPL,
  containerVariantsPL,
  gridVariantsPL,
  headerVariantsPL,
} from "@/utils/animation";

interface PredictionsListProps {
  predictions: PredictionData[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  onEdit: (prediction: PredictionData) => void;
  onDelete: (id: string) => void;
}

export function PredictionsList({
  predictions,
  formatDate,
  formatCurrency,
  onEdit,
  onDelete,
}: PredictionsListProps) {
  return (
    <motion.div
      variants={containerVariantsPL}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center justify-between mb-6"
        variants={headerVariantsPL}
      >
        <div>
          <motion.h3
            className="text-2xl font-bold text-white mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recent Predictions
          </motion.h3>
          <motion.p
            className="text-slate-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your ML-generated expenditure forecasts
          </motion.p>
        </div>
        <motion.div
          className="flex items-center space-x-2 text-slate-400"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span className="text-sm">Powered by Machine Learning</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={gridVariantsPL}
      >
        <AnimatePresence>
          {predictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              variants={cardVariantsPL}
              layout
              exit="exit"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PredictionCard
                prediction={prediction}
                onEdit={onEdit}
                onDelete={onDelete}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                animationDelay={`${index * 100}ms`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
