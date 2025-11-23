"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Package, Barcode, Tag, Layers, Scale, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddProductPage() {
  const router = useRouter()
  const [barcode, setBarcode] = useState("")
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [unit, setUnit] = useState("")
  const [minStock, setMinStock] = useState("")
  const [maxStock, setMaxStock] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    console.log({
      barcode,
      name,
      category,
      unit,
      minStock: Number(minStock),
      maxStock: Number(maxStock),
      description,
    })

    setShowSuccess(true)
    setTimeout(() => {
      router.push("/ombor")
    }, 1500)
  }

  const isFormValid = barcode && name && category && unit

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/ombor">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Yangi tovar qo'shish
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Tizimga yangi mahsulot qo'shing
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-green-800">Muvaffaqiyatli saqlandi!</p>
            <p className="text-sm text-green-600">Tovar omborga qo'shildi</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info Card */}
          <Card className="lg:col-span-2 border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-[#004B34]" />
                Asosiy ma'lumotlar
              </CardTitle>
              <CardDescription>
                Mahsulot haqida asosiy ma'lumotlarni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Barcode className="h-4 w-4 text-slate-400" />
                    Shtrix-kod
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="4600001234567"
                    className="h-11 transition-all focus:ring-2 focus:ring-[#99C61E]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Tag className="h-4 w-4 text-slate-400" />
                    Mahsulot nomi
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mahsulot nomini kiriting"
                    className="h-11 transition-all focus:ring-2 focus:ring-[#99C61E]/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Layers className="h-4 w-4 text-slate-400" />
                    Kategoriya
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ichimliklar">Ichimliklar</SelectItem>
                      <SelectItem value="oziq-ovqat">Oziq-ovqat</SelectItem>
                      <SelectItem value="gigiyena">Gigiyena</SelectItem>
                      <SelectItem value="maishiy-kimyo">Maishiy kimyo</SelectItem>
                      <SelectItem value="qandolatchilik">Qandolatchilik</SelectItem>
                      <SelectItem value="sut-mahsulotlari">Sut mahsulotlari</SelectItem>
                      <SelectItem value="go'sht">Go'sht va kolbasa</SelectItem>
                      <SelectItem value="boshqa">Boshqa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Scale className="h-4 w-4 text-slate-400" />
                    O'lchov birligi
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="O'lchov birligini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dona">Dona</SelectItem>
                      <SelectItem value="kg">Kilogramm (kg)</SelectItem>
                      <SelectItem value="gr">Gramm (gr)</SelectItem>
                      <SelectItem value="litr">Litr (L)</SelectItem>
                      <SelectItem value="ml">Millilitr (ml)</SelectItem>
                      <SelectItem value="quti">Quti</SelectItem>
                      <SelectItem value="pachka">Pachka</SelectItem>
                      <SelectItem value="metr">Metr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <ImageIcon className="h-4 w-4 text-slate-400" />
                  Tavsif
                </Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mahsulot haqida qo'shimcha ma'lumot (ixtiyoriy)"
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm placeholder:text-slate-400 focus:border-[#99C61E] focus:outline-none focus:ring-2 focus:ring-[#99C61E]/20 transition-all resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stock Settings Card */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-[#004B34]" />
                  Ombor sozlamalari
                </CardTitle>
                <CardDescription>
                  Minimal va maksimal zaxira miqdorini belgilang
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Minimal zaxira
                  </Label>
                  <Input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    placeholder="10"
                    min="0"
                    className="h-11"
                  />
                  <p className="text-xs text-slate-500">
                    Ushbu miqdordan kamaysa, ogohlantirish ko'rinadi
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Maksimal zaxira
                  </Label>
                  <Input
                    type="number"
                    value={maxStock}
                    onChange={(e) => setMaxStock(e.target.value)}
                    placeholder="100"
                    min="0"
                    className="h-11"
                  />
                  <p className="text-xs text-slate-500">
                    Ortiqcha zaxira ko'rsatkichi
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-slate-50 to-white">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full h-12 gap-2 bg-gradient-to-r from-[#004B34] to-[#006644] hover:from-[#003D2B] hover:to-[#005535] shadow-lg shadow-[#004B34]/20 text-base font-medium transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saqlanmoqda...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Saqlash
                      </>
                    )}
                  </Button>
                  <Link href="/ombor" className="block">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 text-base font-medium"
                    >
                      Bekor qilish
                    </Button>
                  </Link>
                </div>

                {!isFormValid && (
                  <p className="text-xs text-center text-slate-500 mt-4">
                    * belgilangan maydonlar to'ldirilishi shart
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
