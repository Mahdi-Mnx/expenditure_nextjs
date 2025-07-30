// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.SUPABASE_URL;

export async function predictExpenditure(inputData: Record<string, any>) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(inputData),
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Prediction failed");
    } else {
      const text = await response.text();
      throw new Error(`Server error: ${text}`);
    }
  }

  return await response.json();
}

export async function updatePrediction(id: string, data: any) {
  const response = await fetch(
    `https://gfbgdcznzcegvutlncuv.supabase.co/rest/v1/predictions?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    }
  );

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Prediction failed");
    } else {
      const text = await response.text();
      throw new Error(`Server error: ${text}`);
    }
  }

  return await response.json();
}
