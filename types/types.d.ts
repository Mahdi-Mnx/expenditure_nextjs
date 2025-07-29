export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  imageUrl: string;
  totalPredictions: number;
  avgAccuracy: number;
  joinDate: string;
  lastSignIn: string;
}

export interface PredictionRecent {
  id: string;
  predicted_exp: number;
  created_at: string;
  model_used: string;
  input_data: {
    Number_of_Members: number;
    Region: string;
  };
}

export interface ChartData {
  month: string;
  food: number;
  housing: number;
  transport: number;
  utilities: number;
  total: number;
}
