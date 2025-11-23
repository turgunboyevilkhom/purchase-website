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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-500/30">
            BIS
          </div>
          <h1 className="text-2xl font-bold text-white">
            Business Intelligence System
          </h1>
          <p className="text-slate-400">Tizimga kirish</p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
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
                <Label htmlFor="username" className="text-slate-300">
                  Login
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Foydalanuvchi nomi"
                  className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Parol
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolingizni kiriting"
                    className="border-slate-600 bg-slate-700/50 pr-10 text-white placeholder:text-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
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
          <CardFooter className="flex-col gap-2 border-t border-slate-700 pt-4">
            <div className="text-center text-sm text-slate-400">
              Demo hisob ma&apos;lumotlari:
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-slate-500">
                Login: <span className="text-blue-400">bobs</span>
              </span>
              <span className="text-slate-500">
                Parol: <span className="text-blue-400">bobs2025</span>
              </span>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          © 2025 Business Intelligence System. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  )
}
