// types/predict.ts
export interface FormData {
  Number_of_Members: number;
  Region: string;
  Residence_Type: string;
  Food_Expenditure: number;
  NonFood_Expenditure: number;
  Housing_Expenditure: number;
  Utilities_Expenditure: number;
  Transport_Expenditure: number;
  Spent_on_Food_Drink_Outside: number;
  General_NonFood_Expenditure: number;
  Livestock_Byproducts_Value: number;
  Business_Revenue: number;
}

export interface PredictionData {
  id: string;
  user_id: string;
  input_data: {
    Region: string;
    Residence_Type: string;
    Business_Revenue: number;
    Food_Expenditure: number;
    Number_of_Members: number;
    Housing_Expenditure: number;
    NonFood_Expenditure: number;
    Transport_Expenditure: number;
    Utilities_Expenditure: number;
    Livestock_Byproducts_Value: number;
    General_NonFood_Expenditure: number;
    Spent_on_Food_Drink_Outside: number;
  };
  predicted_exp: number;
  model_used: string;
  created_at: string;
}

export const residenceTypeOptions = [
  { label: "Urban", value: "Urban" },
  { label: "Rural", value: "Rural" },
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

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  key: keyof FormData;
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
