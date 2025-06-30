export interface PredictionInputs {
  // Basic Info
  hhsize: number;
  region_n: number;
  hh_water_type: number;
  hh_electricity: number;
  
  // Expenditures
  exp_food: number;
  exp_nfnd: number;
  exp_rent: number;
  
  // Economic Indicators
  pce: number;
  pcer: number;
  poor: number;
  foodsec7_07: number;
  remt9_11: number;
  
  // Livestock/Assets
  liv4_04: number;
  liv4_12: number;
  liv4_13: number;
  liv4_21: number;
  liv4_22: number;
  liv4_24: number;
  liv4_25: number;
  
  // Non-Farm Enterprises
  nfe16_13: number;
  nfe16_33: number;
  
  // Shocks
  shock10_03: number;
  shock10_04: number;
  shock10_07_21: number;
  shock10_07_23: number;
  
  // Consumption Quantities
  cr15_04quantity: number;
  cr15_05quantity: number;
  cr15_06: number;
  cr15_10: number;
}
