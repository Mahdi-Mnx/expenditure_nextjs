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

// In lib/api.ts
export async function updatePrediction(
  id: string,
  inputData: Record<string, any>
) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    console.log("Sending update:", JSON.stringify(inputData, null, 2));

    const response = await fetch(`${API_URL}/predictions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error response:", data);
      throw new Error(
        data.detail || `Update failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
}
