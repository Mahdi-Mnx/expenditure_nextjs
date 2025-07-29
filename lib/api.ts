// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function predictExpenditure(inputData: Record<string, any>) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
