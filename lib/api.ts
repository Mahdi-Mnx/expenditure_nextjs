import { PredictionInputs } from "@/types/predict";

// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function predictExpenditure(inputData: any) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
   // Create complete payload with defaults for missing fields
  const completePayload: PredictionInputs = {
    // Basic Info (with defaults)
    hhsize: inputData.hhsize || 1,
    region_n: inputData.region_n || 1,
    hh_water_type: inputData.hh_water_type || 1,
    hh_electricity: inputData.hh_electricity || 0,
    
    // Expenditures (with defaults)
    exp_food: inputData.exp_food || 0,
    exp_nfnd: inputData.exp_nfnd || 0,
    exp_rent: inputData.exp_rent || 0,
    
    // Economic Indicators (default to 0)
    pce: 0,
    pcer: 0,
    poor: 0,
    foodsec7_07: 0,
    remt9_11: 0,
    
    // Livestock/Assets (default to 0)
    liv4_04: 0,
    liv4_12: 0,
    liv4_13: 0,
    liv4_21: 0,
    liv4_22: 0,
    liv4_24: 0,
    liv4_25: 0,
    
    // Non-Farm Enterprises (default to 0)
    nfe16_13: 0,
    nfe16_33: 0,
    
    // Shocks (default to 0)
    shock10_03: 0,
    shock10_04: 0,
    shock10_07_21: 0,
    shock10_07_23: 0,
    
    // Consumption Quantities (default to 0)
    cr15_04quantity: 0,
    cr15_05quantity: 0,
    cr15_06: 0,
    cr15_10: 0
  };

  // Ensure all values are numbers
  const numericPayload = Object.fromEntries(
    Object.entries(completePayload).map(([key, value]) => [key, Number(value)])
  ) as unknown as PredictionInputs;
  
  if (!token) throw new Error('No token found');

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...inputData,
      log_exp_food: Math.log1p(inputData.exp_food),
      log_exp_nfnd: Math.log1p(inputData.exp_nfnd),
      log_exp_rent: Math.log1p(inputData.exp_rent),
    }),
  });

  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Prediction failed');
    } else {
      const text = await response.text();
      throw new Error(`Server error: ${text}`);
    }
  }

  return await response.json();
}