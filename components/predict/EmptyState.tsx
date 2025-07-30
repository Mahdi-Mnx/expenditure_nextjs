"use client";
import {
  buttonVariantsE,
  containerVariantsE,
  floatingIconVariantsE,
  itemVariantsE,
} from "@/utils/animation";
import { motion } from "framer-motion";
import { BarChart3, Plus, Target, TrendingUp } from "lucide-react";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <motion.div
      className="text-center py-20"
      variants={containerVariantsE}
      initial="hidden"
      animate="visible"
    >
      <div className="relative mb-8">
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-600/30"
          variants={itemVariantsE}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <BarChart3 className="w-16 h-16 text-slate-400" />
        </motion.div>

        {/* Floating icons */}
        <motion.div
          className="absolute -top-4 -right-4 p-3 bg-emerald-500/20 rounded-full border border-emerald-500/30"
          variants={floatingIconVariantsE}
          animate="animate"
        >
          <Target className="w-6 h-6 text-emerald-400" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 p-3 bg-blue-500/20 rounded-full border border-blue-500/30"
          variants={floatingIconVariantsE}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <TrendingUp className="w-6 h-6 text-blue-400" />
        </motion.div>
      </div>

      <motion.h2
        className="text-3xl font-bold text-white mb-4"
        variants={itemVariantsE}
      >
        No Predictions Yet
      </motion.h2>

      <motion.p
        className="text-slate-400 text-lg mb-8 max-w-md mx-auto leading-relaxed"
        variants={itemVariantsE}
      >
        Create your first household expenditure prediction using our advanced ML
        models to get started with financial insights.
      </motion.p>

      <motion.button
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-3 mx-auto"
        onClick={onAddNew}
        variants={buttonVariantsE}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Plus className="w-5 h-5" />
        </motion.div>
        <span>Create Your First Prediction</span>
      </motion.button>

      <motion.div
        className="mt-12 grid grid-cols-3 gap-8 opacity-30"
        variants={itemVariantsE}
      >
        {[
          { icon: TrendingUp, label: "Track Growth" },
          { icon: Target, label: "Set Goals" },
          { icon: BarChart3, label: "Analyze Data" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center gap-2"
            whileHover={{ scale: 1.1, opacity: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <item.icon className="w-8 h-8 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
