"use client";
import {
  buttonVariantsH,
  containerVariantsH,
  iconVariantsH,
  itemVariantsH,
} from "@/utils/animation";
import { motion } from "framer-motion";
import { BarChart3, Plus } from "lucide-react";

interface HeaderProps {
  totalPredictions: number;
  onAddNew: () => void;
}

export function Header({ totalPredictions, onAddNew }: HeaderProps) {
  return (
    <motion.div
      className="flex items-center justify-between mb-8"
      variants={containerVariantsH}
      initial="hidden"
      animate="visible"
    >
      <div>
        <motion.div
          className="flex items-center space-x-4 mb-2"
          variants={itemVariantsH}
        >
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <BarChart3 className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent"
            variants={itemVariantsH}
          >
            ML Predictions
          </motion.h1>
        </motion.div>
        <motion.p
          className="text-slate-400 text-lg ml-16"
          variants={itemVariantsH}
        >
          {totalPredictions} prediction{totalPredictions !== 1 ? "s" : ""}{" "}
          generated with advanced ML models
        </motion.p>
      </div>

      <motion.button
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-3"
        onClick={onAddNew}
        variants={buttonVariantsH}
        whileHover="hover"
        whileTap="tap"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div variants={iconVariantsH}>
          <Plus className="w-5 h-5" />
        </motion.div>
        <span>New Prediction</span>
      </motion.button>
    </motion.div>
  );
}
