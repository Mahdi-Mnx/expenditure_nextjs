// types/predict.ts
export interface PredictionInput {
  exp_food: number;
  exp_rent: number;
  exp_Education: number;
  exp_Water: number;
  exp_Electricity: number;
  Savings_or_Insurance_Payment: number;
  Communication_Exp: number;
  hhsize: number;
  Area_Name: string;
  Region_Name: string;
}

export interface PredictionData {
  id: string;
  user_id: string;
  input_data: {
    hhsize: number;
    Region_Name: string;
    Area_Name: string;
    exp_food: number;
    exp_rent: number;
    exp_Education: number;
    exp_Water: number;
    exp_Electricity: number;
    Savings_or_Insurance_Payment: number;
    Communication_Exp: number;
  };
  predicted_exp: number;
  model_used: string;
  created_at: string;
}

export interface ComparisonResult {
  prediction1_total: number;
  prediction2_total: number;
  absolute_difference: number;
  percentage_difference: number;
  category_breakdown: {
    category: string;
    actual: number;
    predicted: number;
    difference: number;
    percentage_diff: number;
  }[];
  comparison_message: string;
  created_at_difference: string;
}

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  key: keyof PredictionInput;
  label: string;
  type: "number" | "currency" | "select";
  min?: number;
  max?: number;
  icon?: React.ReactElement;
  options?: FieldOption[];
  step?: number;
}

export interface FieldGroup {
  title: string;
  icon: React.ReactElement;
  description?: string;
  gradient?: string;
  fields: FormField[];
}

export type StatCardColor = "blue" | "emerald" | "purple";

export const residenceTypeOptions = [
  { label: "Urban", value: "Urban" },
  { label: "Rural", value: "Rural" }, // Fixed typo from "Rural" to match your original
  { label: "Nomadic", value: "Nomadic" },
];

export const regionOptions = [
  { label: "Awdal", value: "Awdal" },
  { label: "Bakool", value: "Bakool" },
  { label: "Banadir", value: "Banadir" },
  { label: "Bari", value: "Bari" },
  { label: "Bay", value: "Bay" },
  { label: "Galgaduud", value: "Galgaduud" },
  { label: "Gedo", value: "Gedo" },
  { label: "Hiraan", value: "Hiraan" },
  { label: "Lower Juba", value: "Lower Juba" },
  { label: "Lower Shabelle", value: "Lower Shabelle" },
  { label: "Waqooyi Galbeed", value: "Waqooyi Galbeed" },
  { label: "Middle Shabelle", value: "Middle Shabelle" },
  { label: "Mudug", value: "Mudug" },
  { label: "Nugaal", value: "Nugaal" },
  { label: "Sanaag", value: "Sanaag" },
  { label: "Sool", value: "Sool" },
  { label: "Togdheer", value: "Togdheer" },
];
