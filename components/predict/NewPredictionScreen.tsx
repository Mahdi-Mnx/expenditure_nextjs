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
  ChevronRight,
  ChevronLeft,
  Droplet,
  Beef,
  PiggyBank,
  Activity,
  BarChart2,
} from "lucide-react";
import { predictExpenditure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  FieldGroup,
  FormData,
  FormField,
  regionOptions,
  residenceTypeOptions,
} from "@/types/predict";
import { supabaseBrowser } from "@/utils/supabase";

const fieldGroups: FieldGroup[] = [
  {
    title: "Household Profile",
    icon: <Home size={20} className="text-emerald-500" />,
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
    icon: <BarChart2 size={20} className="text-yellow-500" />,
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
  const supabase = supabaseBrowser();

  const isEditMode = searchParams.get("mode") === "edit";
  const predictionId = searchParams.get("predictionId");

  useEffect(() => {
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
      const res = await predictExpenditure(form);
      const predictedExp = res.predicted_expenditure;

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Not authenticated");

      if (isEditMode && predictionId) {
        const { data, error } = await supabase
          .from("predictions")
          .update({
            input_data: form,
            predicted_exp: predictedExp,
            model_used: res.model || "RF",
            updated_at: new Date().toISOString(),
          })
          .eq("id", predictionId)
          .select();

        if (error) throw error;
      }

      setResult(predictedExp);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "number":
        return (
          <Card className="flex items-center justify-between bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center">
              {field.icon && (
                <div className="mr-3">
                  {React.cloneElement(field.icon as React.ReactElement<any>, {
                    className: "text-slate-500",
                  })}
                </div>
              )}
              <p className="text-white">{field.label}</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600"
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
              </Button>
              <p className="text-white mx-4 min-w-[30px] text-center">
                {form[field.key]}
              </p>
              <Button
                variant="outline"
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600"
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
              </Button>
            </div>
          </Card>
        );

      case "currency":
        return (
          <Card className="bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              {field.icon && (
                <div className="mr-3">
                  {React.cloneElement(field.icon as React.ReactElement<any>, {
                    className: "text-slate-500",
                  })}
                </div>
              )}
              <p className="text-white">{field.label}</p>
            </div>
            <div className="flex items-center border-b border-slate-700 pb-2">
              <span className="text-slate-400 mr-1">$</span>
              <Input
                className="flex-1 text-white text-lg bg-transparent border-none focus-visible:ring-0"
                value={form[field.key].toString()}
                onChange={(e) =>
                  handleChange(
                    field.key,
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                type="number"
                placeholder="0"
              />
            </div>
          </Card>
        );

      case "select":
        return (
          <Card className="bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              {field.icon && (
                <div className="mr-3">
                  {React.cloneElement(field.icon as React.ReactElement<any>, {
                    className: "text-slate-500",
                  })}
                </div>
              )}
              <p className="text-white text-sm font-medium">{field.label}</p>
            </div>
            <Select
              value={form[field.key] as string}
              onValueChange={(value) => handleChange(field.key, value)}
            >
              <SelectTrigger className="bg-slate-700 border-none text-white">
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {(field.options || []).map((option) => (
                  <SelectItem
                    key={option.value as string}
                    value={option.value as string}
                    className="hover:bg-slate-700"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 bg-slate-900 min-h-screen">
        {result ? (
          /* Result View */
          <div className="px-6 py-6 overflow-y-auto">
            <Card className="bg-slate-800 p-6 rounded-xl border border-emerald-500 mb-6">
              <div className="text-center mb-4">
                <h2 className="text-emerald-500 text-4xl font-bold">
                  ${result.toFixed(2)}
                </h2>
                <p className="text-slate-400 mt-2">
                  Predicted Monthly Expenditure
                </p>
              </div>

              <Card className="bg-slate-700 p-4 rounded-lg mb-4">
                <h3 className="text-white font-semibold mb-2">
                  Key Expenditures
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-slate-300">Food</p>
                    <p className="text-slate-400 font-bold">
                      ${form.Food_Expenditure}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-300">Non-Food</p>
                    <p className="text-slate-400 font-bold">
                      ${form.NonFood_Expenditure}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-300">Housing</p>
                    <p className="text-slate-400 font-bold">
                      ${form.Housing_Expenditure}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-300">Utilities</p>
                    <p className="text-slate-400 font-bold">
                      ${form.Utilities_Expenditure}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-300">Transport</p>
                    <p className="text-slate-400 font-bold">
                      ${form.Transport_Expenditure}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-700 p-4 rounded-lg mb-4">
                <h3 className="text-white font-semibold mb-2">
                  Household Profile
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-slate-300">Household Members</p>
                    <p className="text-slate-400 font-bold">
                      {form.Number_of_Members}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-300">Region</p>
                    <p className="text-slate-400 font-bold">{form.Region}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-300">Residence Type</p>
                    <p className="text-slate-400 font-bold">
                      {form.Residence_Type}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    setResult(null);
                    setCurrentStep(0);
                  }}
                >
                  <Zap size={18} className="mr-2" />
                  Edit Prediction
                </Button>

                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => router.push("/predict")}
                >
                  Save & Return
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Form View */
          <div className="flex-1">
            {/* Progress Steps */}
            <div className="px-6 py-4">
              <div className="flex justify-between mb-2">
                {fieldGroups.map((_, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto flex justify-center items-center ${
                        currentStep === index
                          ? "bg-emerald-500"
                          : "bg-slate-700"
                      }`}
                    >
                      {currentStep > index ? (
                        <Check size={16} className="text-white" />
                      ) : (
                        <span
                          className={`${
                            currentStep === index
                              ? "text-white font-bold"
                              : "text-slate-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-slate-700 rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${((currentStep + 1) / fieldGroups.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="px-6 mb-4 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex justify-center items-center mr-3">
                    <div className="text-emerald-500">
                      {fieldGroups[currentStep].icon}
                    </div>
                  </div>
                  <h2 className="text-white text-xl font-bold">
                    {fieldGroups[currentStep].title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {fieldGroups[currentStep].fields.map((field) => (
                    <div key={field.key}>{renderField(field)}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 flex justify-between bg-slate-900 border-t border-slate-800">
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={18} className="mr-2" />
                  Back
                </Button>
              ) : (
                <div className="flex-1" />
              )}
              <Button
                className={`flex items-center ${
                  currentStep === fieldGroups.length - 1
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={handleNext}
                disabled={loading}
              >
                <span className="font-bold mr-2">
                  {loading
                    ? "Processing..."
                    : currentStep === fieldGroups.length - 1
                    ? isEditMode
                      ? "Update Prediction"
                      : "Create Prediction"
                    : "Continue"}
                </span>
                {!loading &&
                  (currentStep === fieldGroups.length - 1 ? (
                    <Zap size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  ))}
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
