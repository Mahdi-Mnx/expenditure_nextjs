"use client";
import {
  containerVariants,
  itemVariantss,
  pulseVariants,
  skeletonVariants,
  spinVariants,
} from "@/utils/animation";
import { motion } from "framer-motion";
import { Loader2, BarChart3 } from "lucide-react";

export function LoadingPredictionsScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </div>

      <motion.div
        className="relative z-10 p-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Loading header with icon */}
        <motion.div
          className="flex flex-col items-center justify-center mb-12"
          variants={itemVariantss}
        >
          <motion.div className="mb-6 relative" variants={itemVariantss}>
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl flex items-center justify-center border border-emerald-500/30"
              variants={pulseVariants}
              animate="animate"
            >
              <BarChart3 className="w-10 h-10 text-emerald-400" />
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-2"
              variants={spinVariants}
              animate="animate"
            >
              <Loader2 className="w-8 h-8 text-emerald-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-white mb-2 text-center"
            variants={itemVariantss}
          >
            Loading Predictions
          </motion.h2>

          <motion.p
            className="text-slate-400 text-center max-w-md"
            variants={itemVariantss}
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            Fetching your expenditure forecasts and analytics...
          </motion.p>
        </motion.div>

        {/* Animated header skeleton */}
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={itemVariantss}
        >
          <div>
            <motion.div
              className="h-8 w-48 bg-slate-700/50 rounded-2xl mb-2"
              variants={skeletonVariants}
              animate="animate"
            />
            <motion.div
              className="h-4 w-32 bg-slate-600/50 rounded-xl"
              variants={skeletonVariants}
              animate="animate"
              transition={{ delay: 0.2 }}
            />
          </div>
          <motion.div
            className="h-12 w-40 bg-slate-700/50 rounded-2xl"
            variants={skeletonVariants}
            animate="animate"
            transition={{ delay: 0.4 }}
          />
        </motion.div>

        {/* Stats skeleton cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={itemVariantss}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-12 h-12 bg-slate-700/50 rounded-2xl"
                  variants={skeletonVariants}
                  animate="animate"
                  transition={{ delay: i * 0.1 }}
                />
                <motion.div
                  className="h-4 w-20 bg-slate-600/50 rounded-xl"
                  variants={skeletonVariants}
                  animate="animate"
                  transition={{ delay: i * 0.1 + 0.2 }}
                />
              </div>
              <motion.div
                className="h-8 w-24 bg-slate-700/50 rounded-xl mb-2"
                variants={skeletonVariants}
                animate="animate"
                transition={{ delay: i * 0.1 + 0.4 }}
              />
              <motion.div
                className="h-4 w-16 bg-slate-600/50 rounded-xl"
                variants={skeletonVariants}
                animate="animate"
                transition={{ delay: i * 0.1 + 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Predictions skeleton cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={itemVariantss}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/30"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
            >
              <motion.div
                className="h-6 w-32 bg-slate-700/50 rounded-xl mb-4"
                variants={skeletonVariants}
                animate="animate"
                transition={{ delay: i * 0.1 }}
              />
              <motion.div
                className="h-8 w-24 bg-slate-600/50 rounded-xl mb-4"
                variants={skeletonVariants}
                animate="animate"
                transition={{ delay: i * 0.1 + 0.2 }}
              />
              <div className="space-y-2">
                <motion.div
                  className="h-4 w-full bg-slate-700/50 rounded-xl"
                  variants={skeletonVariants}
                  animate="animate"
                  transition={{ delay: i * 0.1 + 0.4 }}
                />
                <motion.div
                  className="h-4 w-3/4 bg-slate-700/50 rounded-xl"
                  variants={skeletonVariants}
                  animate="animate"
                  transition={{ delay: i * 0.1 + 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
