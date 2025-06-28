"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"
import { SITE_CONTENT } from "@/lib/constants"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    hhsize: z.number().min(1, "Household size must be at least 1"),
    region_n: z.number().min(1).max(3, "Please select a valid region"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const isLogin = type === "login"

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: isLogin ? {} : { hhsize: 4, region_n: 2 },
  })

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    setIsLoading(true)

    if (isLogin) {
      console.log("Login attempt with:", data)
    } else {
      console.log("Signup attempt with:", data)
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    console.log(`${provider} login attempt`)
  }

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("google")}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("github")}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <div className="relative">
          <Separator className="bg-slate-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-slate-800 px-2 text-sm text-slate-400">or</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <Input
                id="name"
                {...register("name" as keyof (LoginFormData | SignupFormData))}
                className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
            />
            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword" as keyof SignupFormData)}
                className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
              />
              {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hhsize" className="text-slate-300">
                    Household Size
                  </Label>
                  <Input
                    id="hhsize"
                    type="number"
                    {...register("hhsize" as keyof SignupFormData, { valueAsNumber: true })}
                    className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                  />
                  {errors.hhsize && <p className="text-sm text-red-400">{errors.hhsize.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region" className="text-slate-300">
                    Region
                  </Label>
                  <Select
                    value={watch("region_n" as keyof SignupFormData)?.toString()}
                    onValueChange={(value) => setValue("region_n" as keyof SignupFormData, Number(value))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="1">Rural</SelectItem>
                      <SelectItem value="2">Urban</SelectItem>
                      <SelectItem value="3">Suburban</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.region_n && <p className="text-sm text-red-400">{errors.region_n.message}</p>}
                </div>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300">
                {SITE_CONTENT.auth.login.forgotPassword}
              </Link>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold"
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : isLogin
                ? SITE_CONTENT.auth.login.submitButton
                : SITE_CONTENT.auth.signup.submitButton}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {isLogin ? SITE_CONTENT.auth.login.switchText : SITE_CONTENT.auth.signup.switchText}{" "}
            <Link href={isLogin ? "/signup" : "/login"} className="text-emerald-400 hover:text-emerald-300 font-medium">
              {isLogin ? SITE_CONTENT.auth.login.switchLink : SITE_CONTENT.auth.signup.switchLink}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
