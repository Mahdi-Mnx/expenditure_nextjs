import { AuthForm } from "@/components/auth-form"
import { SITE_CONTENT } from "@/lib/constants"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{SITE_CONTENT.auth.signup.title}</h1>
          <p className="text-slate-400">{SITE_CONTENT.auth.signup.subtitle}</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}
