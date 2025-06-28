"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { supabase } from "@/lib/supabaseclient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const signupSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "At least 6 characters"),
    confirm: z.string(),
    hhsize: z.number().min(1, "Required"),
    region_n: z.number().min(1).max(3, "Required"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type Form = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(signupSchema),
    defaultValues: { hhsize: 4, region_n: 2 },
  });

  const onSignup = async (data: Form) => {
    setErrorMsg(null);
    setLoading(true);

    // just like mobile:
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // save token locally
    localStorage.setItem("token", authData.session?.access_token ?? "");

    // redirect like mobile
    router.push("/auth/login");
  };

  const regions = [
    { value: 1, label: "Rural" },
    { value: 2, label: "Urban" },
    { value: 3, label: "Suburban" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="text-slate-400 hover:text-white mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl font-bold">
              Create Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSignup)} className="space-y-4">
              {step === 1 ? (
                <>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-red-400 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input type="password" {...register("password")} />
                    {errors.password && (
                      <p className="text-red-400 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input type="password" {...register("confirm")} />
                    {errors.confirm && (
                      <p className="text-red-400 text-sm">
                        {errors.confirm.message}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Household Size</Label>
                    <Input
                      type="number"
                      {...register("hhsize", { valueAsNumber: true })}
                    />
                    {errors.hhsize && (
                      <p className="text-red-400 text-sm">
                        {errors.hhsize.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Region</Label>
                    <Select
                      value={watch("region_n").toString()}
                      onValueChange={(val) => setValue("region_n", Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r.value} value={r.value.toString()}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.region_n && (
                      <p className="text-red-400 text-sm">
                        {errors.region_n.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {errorMsg && (
                <p className="text-red-400 text-center">{errorMsg}</p>
              )}

              <div className="flex gap-4">
                {step === 2 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={
                    step === 1 ? () => setStep(2) : handleSubmit(onSignup)
                  }
                  disabled={loading}
                  className="flex-1"
                >
                  {loading
                    ? "Working…"
                    : step === 1
                    ? "Continue"
                    : "Create Account"}
                </Button>
              </div>
            </form>

            <Separator />

            <p className="text-center text-slate-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-emerald-400">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
