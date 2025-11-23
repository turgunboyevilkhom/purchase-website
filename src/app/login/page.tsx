"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#004B34] via-[#003D2B] to-[#002E20] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#99C61E] to-[#7BA817] text-3xl font-bold text-[#004B34] shadow-xl shadow-[#99C61E]/30">
            K
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Kometa
          </h1>
          <p className="text-[#99C61E]/80 mt-1">Biznes boshqaruv tizimi</p>
        </div>

        {/* Login Card */}
        <Card className="border-[#99C61E]/20 bg-[#003D2B]/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <h2 className="text-center text-xl font-semibold text-white">
              Xush kelibsiz!
            </h2>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/80">
                  Login
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Foydalanuvchi nomi"
                  className="border-[#99C61E]/30 bg-[#002E20] text-white placeholder:text-white/40 focus:border-[#99C61E] focus:ring-[#99C61E]/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Parol
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolingizni kiriting"
                    className="border-[#99C61E]/30 bg-[#002E20] pr-10 text-white placeholder:text-white/40 focus:border-[#99C61E] focus:ring-[#99C61E]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#99C61E]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34] font-semibold hover:from-[#AAD72F] hover:to-[#8BB918] shadow-lg shadow-[#99C61E]/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kirish...
                  </>
                ) : (
                  "Tizimga kirish"
                )}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex-col gap-2 border-t border-[#99C61E]/20 pt-4">
            <div className="text-center text-sm text-white/60">
              Demo hisob ma&apos;lumotlari:
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-white/50">
                Login: <span className="text-[#99C61E]">bobs</span>
              </span>
              <span className="text-white/50">
                Parol: <span className="text-[#99C61E]">bobs2025</span>
              </span>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-white/40">
          © 2025 Kometa. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  )
}
