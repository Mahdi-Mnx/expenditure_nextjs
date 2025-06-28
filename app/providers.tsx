"use client";

import { useState, ReactNode } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { PredictionProvider } from "@/contexts/prediction-context";

export default function Providers({ children }: { children: ReactNode }) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    })
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <PredictionProvider>{children}</PredictionProvider>
    </SessionContextProvider>
  );
}
