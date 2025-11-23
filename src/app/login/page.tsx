"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Lock, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials (demo: bobs / bobs2025)
    if (username === "bobs" && password === "bobs2025") {
      localStorage.setItem(
        "user",
        JSON.stringify({ username, name: "Admin User" })
      )
      router.push("/")
    } else {
      setError("Login yoki parol noto'g'ri")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#004B34] via-[#003D2B] to-[#002518] items-center justify-center p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#99C61E]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#99C61E]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#99C61E]/10 rounded-full blur-2xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-md text-center">
          {/* Logo */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#99C61E] to-[#7BA817] text-4xl font-bold text-[#004B34] shadow-2xl shadow-[#99C61E]/40 transform hover:scale-105 transition-transform">
            K
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            Kometa
          </h1>
          <p className="text-xl text-[#99C61E]/90 font-medium mb-8">
            Biznes boshqaruv tizimi
          </p>

          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="h-10 w-10 rounded-xl bg-[#99C61E]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-[#99C61E]" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Zamonaviy interfeys</h3>
                <p className="text-white/60 text-sm">Foydalanish oson va intuitiv dizayn</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="h-10 w-10 rounded-xl bg-[#99C61E]/20 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-[#99C61E]" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Xavfsiz tizim</h3>
                <p className="text-white/60 text-sm">Ma'lumotlaringiz to'liq himoyalangan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#99C61E] to-[#7BA817] text-2xl font-bold text-[#004B34] shadow-xl shadow-[#99C61E]/30">
              K
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Kometa</h1>
            <p className="text-slate-500 text-sm">Biznes boshqaruv tizimi</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
            <CardHeader className="space-y-2 pb-4 pt-8 px-8">
              <h2 className="text-2xl font-bold text-slate-900 text-center">
                Xush kelibsiz!
              </h2>
              <p className="text-slate-500 text-center text-sm">
                Tizimga kirish uchun ma'lumotlarni kiriting
              </p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5 px-8">
                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-center text-sm text-red-600 animate-scale-in">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-700 font-medium">
                    Login
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Foydalanuvchi nomi"
                      className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#99C61E] focus:ring-2 focus:ring-[#99C61E]/20 transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">
                    Parol
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Parolingizni kiriting"
                      className="h-12 pl-12 pr-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#99C61E] focus:ring-2 focus:ring-[#99C61E]/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#004B34] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#004B34] to-[#006644] text-white font-semibold hover:from-[#003D2B] hover:to-[#005535] shadow-lg shadow-[#004B34]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Kirish...
                    </>
                  ) : (
                    "Tizimga kirish"
                  )}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex-col gap-3 border-t border-slate-100 pt-6 pb-8 px-8 bg-slate-50/50">
              <div className="text-center text-sm text-slate-500">
                Demo hisob ma&apos;lumotlari:
              </div>
              <div className="flex gap-6 text-sm justify-center">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Login:</span>
                  <span className="font-semibold text-[#004B34]">bobs</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100">
                  <span className="text-slate-400">Parol:</span>
                  <span className="font-semibold text-[#004B34]">bobs2025</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-400">
            © 2025 Kometa. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </div>
  )
}
