"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Zap,
  Home,
  Users,
  MapPin,
  TrendingUp,
  ShoppingCart,
  Package,
  Check,
  ChevronLeft,
  Droplet,
  Beef,
  PiggyBank,
  Activity,
  BarChart2,
  Sparkles,
  Target,
  Calculator,
  ArrowRight,
  Edit3,
  Save,
} from "lucide-react";
import { predictExpenditure, updatePrediction } from "@/lib/api";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  type FieldGroup,
  type FormData,
  type FormField,
  regionOptions,
  residenceTypeOptions,
} from "@/types/predict";
import { supabaseBrowser } from "@/utils/supabase";
import "./NewPredictionScreen.css";

const fieldGroups: FieldGroup[] = [
  {
    title: "Household Profile",
    icon: <Home size={20} className="text-emerald-500" />,
    description: "Tell us about your household composition",
    gradient: "from-emerald-500 to-teal-600",
    fields: [
      {
        key: "Number_of_Members",
        label: "Number of Household Members",
        type: "number",
        min: 1,
        max: 20,
        icon: <Users size={16} />,
      },
      {
        key: "Region",
        label: "Region",
        type: "select",
        options: regionOptions,
        icon: <MapPin size={16} />,
      },
      {
        key: "Residence_Type",
        label: "Residence Type",
        type: "select",
        options: residenceTypeOptions,
        icon: <Home size={16} />,
      },
    ],
  },
  {
    title: "Monthly Expenditures",
    icon: <TrendingUp size={20} className="text-blue-500" />,
    description: "Enter your regular monthly expenses",
    gradient: "from-blue-500 to-cyan-600",
    fields: [
      {
        key: "Food_Expenditure",
        label: "Food Expenditure",
        type: "currency",
        icon: <ShoppingCart size={16} />,
      },
      {
        key: "NonFood_Expenditure",
        label: "Non-Food Expenditure",
        type: "currency",
        icon: <Package size={16} />,
      },
      {
        key: "Housing_Expenditure",
        label: "Housing Expenditure",
        type: "currency",
        icon: <Home size={16} />,
      },
      {
        key: "Utilities_Expenditure",
        label: "Utilities Expenditure",
        type: "currency",
        icon: <Droplet size={16} />,
      },
      {
        key: "Transport_Expenditure",
        label: "Transport Expenditure",
        type: "currency",
        icon: <Activity size={16} />,
      },
    ],
  },
  {
    title: "Additional Economic Data",
    icon: <BarChart2 size={20} className="text-purple-500" />,
    description: "Additional income and expenditure details",
    gradient: "from-purple-500 to-pink-600",
    fields: [
      {
        key: "Spent_on_Food_Drink_Outside",
        label: "Spent on Food/Drink Outside",
        type: "currency",
        icon: <ShoppingCart size={16} />,
      },
      {
        key: "General_NonFood_Expenditure",
        label: "General Non-Food Expenditure",
        type: "currency",
        icon: <Package size={16} />,
      },
      {
        key: "Livestock_Byproducts_Value",
        label: "Livestock Byproducts Value",
        type: "currency",
        icon: <Beef size={16} />,
      },
      {
        key: "Business_Revenue",
        label: "Business Revenue",
        type: "currency",
        icon: <PiggyBank size={16} />,
      },
    ],
  },
];

const defaultValues: FormData = {
  Number_of_Members: 1,
  Region: "Banadir",
  Residence_Type: "Urban",
  Food_Expenditure: 0,
  NonFood_Expenditure: 0,
  Housing_Expenditure: 0,
  Utilities_Expenditure: 0,
  Transport_Expenditure: 0,
  Spent_on_Food_Drink_Outside: 0,
  General_NonFood_Expenditure: 0,
  Livestock_Byproducts_Value: 0,
  Business_Revenue: 0,
};

export default function NewPredictionScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>(defaultValues);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = supabaseBrowser();
  const isEditMode = searchParams.get("mode") === "edit";
  const predictionId = searchParams.get("predictionId");

  useEffect(() => {
    setMounted(true);
    if (isEditMode && searchParams.get("predictionData")) {
      try {
        const predictionData = JSON.parse(
          decodeURIComponent(searchParams.get("predictionData") || "")
        );
        setForm(predictionData.input_data);
        setResult(predictionData.predicted_exp);
      } catch (error) {
        console.error("Error parsing prediction data:", error);
      }
    }
  }, [isEditMode, searchParams]);

  const handleChange = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < fieldGroups.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let res;
      if (isEditMode && predictionId) {
        res = await updatePrediction(predictionId, {
          input_data: form,
          updated_at: new Date().toISOString(),
        });
        router.push("/predict");
        return;
      }
      res = await predictExpenditure(form);
      setResult(res.predicted_expenditure || res.predicted_exp);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FormField, index: number) => {
    const animationDelay = `${index * 100}ms`;

    switch (field.type) {
      case "number":
        return (
          <div
            className="group transform transition-all duration-500 hover:scale-[1.02]"
            style={{
              animationDelay,
              animation: "slideInUp 0.6s ease-out forwards",
            }}
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(field.icon as React.ReactElement<any>, {
                      className: "text-emerald-400 w-5 h-5",
                    })}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {field.label}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Select the number of members
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500/50 transition-all duration-200 flex items-center justify-center text-white hover:text-emerald-400 hover:scale-110"
                    onClick={() =>
                      handleChange(
                        field.key,
                        Math.max(
                          field.min || 0,
                          (form[field.key] as number) - (field.step || 1)
                        )
                      )
                    }
                  >
                    -
                  </button>
                  <div className="w-16 h-12 bg-slate-700/30 rounded-xl flex items-center justify-center border border-slate-600/50">
                    <span className="text-white text-xl font-bold">
                      {form[field.key]}
                    </span>
                  </div>
                  <button
                    className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500/50 transition-all duration-200 flex items-center justify-center text-white hover:text-emerald-400 hover:scale-110"
                    onClick={() =>
                      handleChange(
                        field.key,
                        Math.min(
                          field.max || 100,
                          (form[field.key] as number) + (field.step || 1)
                        )
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "currency":
        return (
          <div
            className="group transform transition-all duration-500 hover:scale-[1.02]"
            style={{
              animationDelay,
              animation: "slideInUp 0.6s ease-out forwards",
            }}
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(field.icon as React.ReactElement<any>, {
                    className: "text-blue-400 w-5 h-5",
                  })}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {field.label}
                  </p>
                  <p className="text-slate-400 text-sm">
                    Enter monthly amount in USD
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl font-bold">
                  $
                </div>
                <input
                  className="w-full h-14 bg-slate-700/30 border border-slate-600/50 rounded-xl pl-10 pr-4 text-white text-xl font-semibold placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  value={form[field.key].toString()}
                  onChange={(e) =>
                    handleChange(
                      field.key,
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  type="number"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        );

      case "select":
        return (
          <div
            className="group transform transition-all duration-500 hover:scale-[1.02]"
            style={{
              animationDelay,
              animation: "slideInUp 0.6s ease-out forwards",
            }}
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(field.icon as React.ReactElement<any>, {
                    className: "text-purple-400 w-5 h-5",
                  })}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {field.label}
                  </p>
                  <p className="text-slate-400 text-sm">
                    Choose from available options
                  </p>
                </div>
              </div>
              <select
                className="w-full h-14 bg-slate-700/30 border border-slate-600/50 rounded-xl px-4 text-white text-lg font-medium focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                value={form[field.key] as string}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                {(field.options || []).map((option) => (
                  <option
                    key={option.value as string}
                    value={option.value as string}
                    className="bg-slate-800"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {result ? (
          /* Result View */
          <div className="relative z-10 p-6 max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fadeIn">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent mb-2">
                Prediction Complete!
              </h1>
              <p className="text-slate-400 text-lg">
                Your ML-powered expenditure forecast is ready
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 mb-8 shadow-2xl shadow-emerald-500/10 animate-slideInUp">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 animate-pulse">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  ${result.toFixed(2)}
                </h2>
                <p className="text-slate-300 text-xl font-medium">
                  Predicted Monthly Expenditure
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
                  <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400 mr-3" />
                    Key Expenditures
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Food",
                        value: form.Food_Expenditure,
                        icon: ShoppingCart,
                      },
                      {
                        label: "Non-Food",
                        value: form.NonFood_Expenditure,
                        icon: Package,
                      },
                      {
                        label: "Housing",
                        value: form.Housing_Expenditure,
                        icon: Home,
                      },
                      {
                        label: "Utilities",
                        value: form.Utilities_Expenditure,
                        icon: Droplet,
                      },
                      {
                        label: "Transport",
                        value: form.Transport_Expenditure,
                        icon: Activity,
                      },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-colors duration-200"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "slideInLeft 0.5s ease-out forwards",
                        }}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 text-slate-400 mr-3" />
                          <span className="text-slate-300 font-medium">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-white font-bold">
                          ${item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
                  <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                    <Users className="w-6 h-6 text-blue-400 mr-3" />
                    Household Profile
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Household Members",
                        value: form.Number_of_Members,
                        icon: Users,
                      },
                      { label: "Region", value: form.Region, icon: MapPin },
                      {
                        label: "Residence Type",
                        value: form.Residence_Type,
                        icon: Home,
                      },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-colors duration-200"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "slideInRight 0.5s ease-out forwards",
                        }}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 text-slate-400 mr-3" />
                          <span className="text-slate-300 font-medium">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-white font-bold">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center"
                  onClick={() => {
                    setResult(null);
                    setCurrentStep(0);
                  }}
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  Edit Prediction
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center"
                  onClick={() => router.push("/predict")}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save & Return
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form View */
          <div className="relative z-10">
            {/* Header */}
            <div className="p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent mb-2">
                ML Expenditure Prediction
              </h1>
              <p className="text-slate-400 text-lg">
                Get accurate predictions powered by machine learning
              </p>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between mb-4">
                  {fieldGroups.map((group, index) => (
                    <div key={index} className="text-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-2xl mx-auto flex justify-center items-center transition-all duration-500 ${
                          currentStep === index
                            ? `bg-gradient-to-br ${group.gradient} shadow-lg scale-110`
                            : currentStep > index
                            ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg"
                            : "bg-slate-700/50 border border-slate-600"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {currentStep > index ? (
                          <Check size={20} className="text-white" />
                        ) : (
                          <span className="text-white font-bold text-lg">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mt-2 font-medium transition-colors duration-300 ${
                          currentStep >= index ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {group.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${
                        ((currentStep + 1) / fieldGroups.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="px-6 mb-6 max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="text-center mb-8 animate-slideInUp">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${fieldGroups[currentStep].gradient}/20 flex justify-center items-center mx-auto mb-4`}
                  >
                    <div
                      className={`bg-gradient-to-br ${fieldGroups[currentStep].gradient} bg-clip-text text-transparent`}
                    >
                      {fieldGroups[currentStep].icon}
                    </div>
                  </div>
                  <h2 className="text-white text-3xl font-bold mb-2">
                    {fieldGroups[currentStep].title}
                  </h2>
                  <p className="text-slate-400 text-lg">
                    {fieldGroups[currentStep].description}
                  </p>
                </div>
                <div className="space-y-6">
                  {fieldGroups[currentStep].fields.map((field, index) => (
                    <div key={field.key}>{renderField(field, index)}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-6 bg-slate-800/30 backdrop-blur-xl border-t border-slate-700/50">
              <div className="max-w-4xl mx-auto flex justify-between items-center">
                {currentStep > 0 ? (
                  <button
                    className="flex items-center px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border border-slate-600/50 hover:border-slate-500"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={20} className="mr-2" />
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  className={`flex items-center px-8 py-4 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                    currentStep === fieldGroups.length - 1
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/25"
                      : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 hover:shadow-blue-500/25"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleNext}
                  disabled={loading}
                >
                  <span className="mr-2">
                    {loading
                      ? "Processing..."
                      : currentStep === fieldGroups.length - 1
                      ? isEditMode
                        ? "Update Prediction"
                        : "Generate Prediction"
                      : "Continue"}
                  </span>
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : currentStep === fieldGroups.length - 1 ? (
                    <Zap size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
