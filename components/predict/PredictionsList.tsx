"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BarChart3,
  Clock,
  MapPin,
  Home,
  Users,
  TrendingUp,
  Edit3,
  Trash2,
  DollarSign,
} from "lucide-react";
import {
  cardVariantsPL,
  containerVariantsPL,
  gridVariantsPL,
  headerVariantsPL,
} from "@/utils/animation";
import type { PredictionData } from "@/types/predict";

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
          {predictions.map((prediction, index) => {
            const totalInputs =
              prediction.input_data.exp_food +
              prediction.input_data.exp_rent +
              prediction.input_data.exp_Education +
              prediction.input_data.exp_Water +
              prediction.input_data.exp_Electricity;

            const variance = (
              (prediction.predicted_exp / totalInputs - 1) *
              100
            ).toFixed(1);

            return (
              <motion.div
                key={prediction.id}
                variants={cardVariantsPL}
                layout
                exit="exit"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-emerald-500/30 transition-all duration-300 ease-in hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10"
                  style={{
                    animation: "slideInUp 0.6s ease-out forwards",
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Prediction #{prediction.id.slice(-4)}
                        </div>
                        <div className="text-slate-400 text-xs flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(prediction.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(prediction)}
                        className="w-8 h-8 bg-slate-700/50 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:scale-110"
                      >
                        <Edit3 className="w-4 h-4 text-slate-400 hover:text-blue-400" />
                      </button>
                      <button
                        onClick={() => onDelete(prediction.id)}
                        className="w-8 h-8 bg-slate-700/50 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Prediction Amount */}
                  <div className="mb-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                      {formatCurrency(prediction.predicted_exp)}
                    </div>
                    <div className="text-slate-400 text-sm">
                      Monthly expenditure forecast
                    </div>
                  </div>

                  {/* Household Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-slate-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Members</span>
                      </div>
                      <span className="text-white font-medium">
                        {prediction.input_data.hhsize}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-slate-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Region</span>
                      </div>
                      <span className="text-white font-medium">
                        {prediction.input_data.Region_Name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-slate-400">
                        <Home className="w-4 h-4 mr-2" />
                        <span>Type</span>
                      </div>
                      <span className="text-white font-medium">
                        {prediction.input_data.Area_Name}
                      </span>
                    </div>
                  </div>

                  {/* Expenditure Breakdown */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">
                      Expenditure Breakdown
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Food</span>
                        <span className="text-white">
                          {formatCurrency(prediction.input_data.exp_food)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rent</span>
                        <span className="text-white">
                          {formatCurrency(prediction.input_data.exp_rent)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Education</span>
                        <span className="text-white">
                          {formatCurrency(prediction.input_data.exp_Education)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Water</span>
                        <span className="text-white">
                          {formatCurrency(prediction.input_data.exp_Water)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Electricity</span>
                        <span className="text-white">
                          {formatCurrency(
                            prediction.input_data.exp_Electricity
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Savings/Insurance
                        </span>
                        <span className="text-white">
                          {formatCurrency(
                            prediction.input_data.Savings_or_Insurance_Payment
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Communication</span>
                        <span className="text-white">
                          {formatCurrency(
                            prediction.input_data.Communication_Exp
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Model Info */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-400 text-xs">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        <span>Model: {prediction.model_used || "ML"}</span>
                      </div>
                      <div className="flex items-center text-emerald-400 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span>{variance}% variance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
