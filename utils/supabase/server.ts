// utils/supabase/server.ts
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function createServerSupabase() {
  return createServerActionClient({ cookies });
}
