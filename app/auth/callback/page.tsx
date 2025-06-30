"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallback() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        localStorage.setItem("token", data.session.access_token);
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    });
  }, []);

  return <p className="text-center mt-10 text-slate-300">Finishing sign-in...</p>;
}
