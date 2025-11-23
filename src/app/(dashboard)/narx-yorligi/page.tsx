"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Printer, X, QrCode } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import jsPDF from "jspdf"
import JsBarcode from "jsbarcode"

// Mock products data with barcode
const allProducts = [
  {
    id: 1,
    name: "ВАФЛИ СЛАДОНЕЖ С ШОКОЛАДНЫМИ",
    barcode: "6221734577878",
    price: 175000,
    unit: "So'm",
    store: "Pos market",
  },
  {
    id: 2,
    name: "Coca-Cola 1L",
    barcode: "4600492001234",
    price: 12000,
    unit: "So'm",
    store: "Kometa",
  },
  {
    id: 3,
    name: "Fanta 0.5L",
    barcode: "4600492001241",
    price: 8500,
    unit: "So'm",
    store: "Kometa",
  },
  {
    id: 4,
    name: "Sprite 1.5L",
    barcode: "4600492001258",
    price: 15000,
    unit: "So'm",
    store: "Kometa",
  },
  {
    id: 5,
    name: "Nestle Shokolad",
    barcode: "7613034626844",
    price: 25000,
    unit: "So'm",
    store: "Kometa",
  },
  {
    id: 6,
    name: "Colgate 100ml",
    barcode: "6920354814471",
    price: 18000,
    unit: "So'm",
    store: "Kometa",
  },
  {
    id: 7,
    name: "Lipton Choy 100g",
    barcode: "8722700055556",
    price: 32000,
    unit: "So'm",
    store: "Kometa",
  },
  {
    id: 8,
    name: "Ariel 450g",
    barcode: "8001841459721",
    price: 45000,
    unit: "So'm",
    store: "Kometa",
  },
]

type TagSize = "60x40" | "60x30" | "40x30" | "30x20"

interface TagSizeConfig {
  width: number
  height: number
  label: string
}

const tagSizes: Record<TagSize, TagSizeConfig> = {
  "60x40": { width: 60, height: 40, label: "60×40 мм" },
  "60x30": { width: 60, height: 30, label: "60×30 мм" },
  "40x30": { width: 40, height: 30, label: "40×30 мм" },
  "30x20": { width: 30, height: 20, label: "30×20 мм" },
}

export default function PriceTagPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<typeof allProducts>([])
  const [selectedSize, setSelectedSize] = useState<TagSize>("60x40")
  const [storeName, setStoreName] = useState("Kometa")
  const [templateStyle, setTemplateStyle] = useState<"classic" | "modern" | "minimal" | "elegant">("modern")
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({})

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleProductSelect = (product: typeof allProducts[0]) => {
    const exists = selectedProducts.find((p) => p.id === product.id)
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))
    } else {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const formatPrice = (price: number) => {
    const formatted = formatCurrency(price)
    const parts = formatted.split(/\s/)
    return parts
  }

  // Generate barcode for each selected product
  useEffect(() => {
    selectedProducts.forEach((product) => {
      const canvas = canvasRefs.current[product.id]
      if (canvas) {
        try {
          JsBarcode(canvas, product.barcode, {
            format: "EAN13",
            width: 3,
            height: 60,
            displayValue: true,
            fontSize: 14,
            margin: 10,
            background: "#ffffff",
            lineColor: "#000000",
          })
        } catch (error) {
          console.error("Error generating barcode:", error)
        }
      }
    })
  }, [selectedProducts, selectedSize])

  const handlePrint = () => {
    const size = tagSizes[selectedSize]
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [size.width, size.height],
    })

    selectedProducts.forEach((product, index) => {
      if (index > 0) {
        pdf.addPage([size.width, size.height])
      }

      const canvas = canvasRefs.current[product.id]
      const date = new Date().toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })

      if (templateStyle === "modern") {
        // Modern Template - Clean and professional
        pdf.setFillColor(0, 75, 52) // #004B34
        pdf.rect(0, 0, size.width, 6, "F")

        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(8)
        pdf.setTextColor(255, 255, 255)
        pdf.text(storeName.toUpperCase(), size.width / 2, 4, { align: "center" })

        // Product name
        pdf.setFontSize(selectedSize === "30x20" ? 7 : selectedSize === "40x30" ? 8 : 9)
        pdf.setTextColor(0, 0, 0)
        pdf.setFont("helvetica", "bold")
        const productNameLines = pdf.splitTextToSize(product.name, size.width - 4)
        const nameLinesCount = Math.min(productNameLines.length, 2)
        pdf.text(productNameLines.slice(0, nameLinesCount), size.width / 2, 9, { align: "center" })

        // Barcode with improved scanning area
        if (canvas) {
          const barcodeY = selectedSize === "30x20" ? 11 : selectedSize === "40x30" ? 13 : 14
          const barcodeHeight = selectedSize === "30x20" ? 6 : selectedSize === "40x30" ? 10 : 13
          const barcodeWidth = size.width - 3

          // White background for better contrast
          pdf.setFillColor(255, 255, 255)
          pdf.rect(1.5, barcodeY - 1, barcodeWidth, barcodeHeight + 2, "F")

          const imgData = canvas.toDataURL("image/png")
          pdf.addImage(imgData, "PNG", 1.5, barcodeY, barcodeWidth, barcodeHeight)
        }

        // Price
        const priceY = selectedSize === "30x20" ? size.height - 5 : selectedSize === "40x30" ? size.height - 6 : size.height - 7
        pdf.setFillColor(153, 198, 30) // #99C61E
        pdf.rect(0, priceY - 2, size.width, selectedSize === "30x20" ? 4 : 5, "F")

        pdf.setFontSize(selectedSize === "30x20" ? 12 : selectedSize === "40x30" ? 16 : 20)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(255, 255, 255)
        const priceText = `${formatCurrency(product.price)} So'm`
        pdf.text(priceText, size.width / 2, priceY + 1.5, { align: "center" })

        // Date
        pdf.setFontSize(5)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(100, 100, 100)
        pdf.text(date, size.width / 2, size.height - 0.5, { align: "center" })

      } else if (templateStyle === "classic") {
        // Classic Template - Traditional design with borders
        pdf.setDrawColor(0, 75, 52)
        pdf.setLineWidth(0.5)
        pdf.rect(1, 1, size.width - 2, size.height - 2)

        pdf.setFillColor(0, 75, 52)
        pdf.roundedRect(2, 2, size.width - 4, 5, 0.5, 0.5, "F")

        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(7)
        pdf.setTextColor(255, 255, 255)
        pdf.text(storeName.toUpperCase(), size.width / 2, 5.5, { align: "center" })

        // Product name
        pdf.setFontSize(selectedSize === "30x20" ? 6 : selectedSize === "40x30" ? 7 : 8)
        pdf.setTextColor(0, 0, 0)
        pdf.setFont("helvetica", "bold")
        const productNameLines = pdf.splitTextToSize(product.name, size.width - 6)
        const nameLinesCount = Math.min(productNameLines.length, 2)
        pdf.text(productNameLines.slice(0, nameLinesCount), size.width / 2, 10, { align: "center" })

        // Price section
        const priceY = selectedSize === "30x20" ? 14 : selectedSize === "40x30" ? 17 : 18
        pdf.setFillColor(254, 252, 232)
        pdf.roundedRect(3, priceY - 3, size.width - 6, 5, 0.5, 0.5, "F")

        pdf.setFontSize(selectedSize === "30x20" ? 12 : selectedSize === "40x30" ? 16 : 20)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(0, 75, 52)
        const priceText = `${formatCurrency(product.price)} So'm`
        pdf.text(priceText, size.width / 2, priceY + 1, { align: "center" })

        // Barcode with improved scanning area
        if (canvas) {
          const barcodeY = selectedSize === "30x20" ? 17 : selectedSize === "40x30" ? 21 : 24
          const barcodeHeight = selectedSize === "30x20" ? 5 : selectedSize === "40x30" ? 8 : 11
          const barcodeWidth = size.width - 5

          // White background for better contrast
          pdf.setFillColor(255, 255, 255)
          pdf.rect(2.5, barcodeY - 1, barcodeWidth, barcodeHeight + 2, "F")

          const imgData = canvas.toDataURL("image/png")
          pdf.addImage(imgData, "PNG", 2.5, barcodeY, barcodeWidth, barcodeHeight)
        }

        // Date
        pdf.setFontSize(5)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(100, 100, 100)
        pdf.text(date, size.width / 2, size.height - 0.5, { align: "center" })

      } else if (templateStyle === "minimal") {
        // Minimal Template - Simple and clean
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(7)
        pdf.setTextColor(0, 75, 52)
        pdf.text(storeName.toUpperCase(), size.width / 2, 3, { align: "center" })

        pdf.setLineWidth(0.2)
        pdf.setDrawColor(0, 75, 52)
        pdf.line(5, 4, size.width - 5, 4)

        // Product name
        pdf.setFontSize(selectedSize === "30x20" ? 7 : selectedSize === "40x30" ? 8 : 9)
        pdf.setTextColor(0, 0, 0)
        pdf.setFont("helvetica", "bold")
        const productNameLines = pdf.splitTextToSize(product.name, size.width - 4)
        pdf.text(productNameLines.slice(0, 2), size.width / 2, 7, { align: "center" })

        // Barcode with improved scanning area
        if (canvas) {
          const barcodeY = selectedSize === "30x20" ? 10 : selectedSize === "40x30" ? 12 : 13
          const barcodeHeight = selectedSize === "30x20" ? 6 : selectedSize === "40x30" ? 10 : 13
          const barcodeWidth = size.width - 3

          // White background for better contrast
          pdf.setFillColor(255, 255, 255)
          pdf.rect(1.5, barcodeY - 1, barcodeWidth, barcodeHeight + 2, "F")

          const imgData = canvas.toDataURL("image/png")
          pdf.addImage(imgData, "PNG", 1.5, barcodeY, barcodeWidth, barcodeHeight)
        }

        // Price
        const priceY = selectedSize === "30x20" ? size.height - 4 : selectedSize === "40x30" ? size.height - 5 : size.height - 6
        pdf.setFontSize(selectedSize === "30x20" ? 16 : selectedSize === "40x30" ? 20 : 24)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(0, 75, 52)
        const priceText = `${formatCurrency(product.price)}`
        pdf.text(priceText, size.width / 2, priceY, { align: "center" })

        pdf.setFontSize(7)
        pdf.text("So'm", size.width / 2, priceY + 3, { align: "center" })

        // Date
        pdf.setFontSize(5)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(120, 120, 120)
        pdf.text(date, size.width / 2, size.height - 1, { align: "center" })

      } else if (templateStyle === "elegant") {
        // Elegant Template - Premium design
        pdf.setDrawColor(0, 75, 52)
        pdf.setLineWidth(0.3)

        // Corner decorations
        pdf.line(1, 1, 4, 1)
        pdf.line(1, 1, 1, 4)
        pdf.line(size.width - 4, 1, size.width - 1, 1)
        pdf.line(size.width - 1, 1, size.width - 1, 4)
        pdf.line(1, size.height - 1, 4, size.height - 1)
        pdf.line(1, size.height - 4, 1, size.height - 1)
        pdf.line(size.width - 4, size.height - 1, size.width - 1, size.height - 1)
        pdf.line(size.width - 1, size.height - 4, size.width - 1, size.height - 1)

        // Store name
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(8)
        pdf.setTextColor(0, 75, 52)
        pdf.text(storeName.toUpperCase(), size.width / 2, 5, { align: "center" })

        // Decorative line
        pdf.setDrawColor(153, 198, 30)
        pdf.setLineWidth(0.5)
        pdf.line(8, 6.5, size.width - 8, 6.5)

        // Product name
        pdf.setFontSize(selectedSize === "30x20" ? 7 : selectedSize === "40x30" ? 8 : 9)
        pdf.setTextColor(0, 0, 0)
        pdf.setFont("helvetica", "bold")
        const productNameLines = pdf.splitTextToSize(product.name, size.width - 6)
        pdf.text(productNameLines.slice(0, 2), size.width / 2, 10, { align: "center" })

        // Price with elegant frame
        const priceY = selectedSize === "30x20" ? 15 : selectedSize === "40x30" ? 17 : 19
        pdf.setDrawColor(0, 75, 52)
        pdf.setLineWidth(0.3)
        pdf.setFillColor(248, 250, 252)
        pdf.roundedRect(4, priceY - 3.5, size.width - 8, 5, 0.5, 0.5, "FD")

        pdf.setFontSize(selectedSize === "30x20" ? 14 : selectedSize === "40x30" ? 18 : 22)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(0, 75, 52)
        const priceText = `${formatCurrency(product.price)} So'm`
        pdf.text(priceText, size.width / 2, priceY + 1, { align: "center" })

        // Barcode with improved scanning area
        if (canvas) {
          const barcodeY = selectedSize === "30x20" ? 17 : selectedSize === "40x30" ? 21 : 25
          const barcodeHeight = selectedSize === "30x20" ? 5 : selectedSize === "40x30" ? 9 : 11
          const barcodeWidth = size.width - 7

          // White background for better contrast
          pdf.setFillColor(255, 255, 255)
          pdf.rect(3.5, barcodeY - 1, barcodeWidth, barcodeHeight + 2, "F")

          const imgData = canvas.toDataURL("image/png")
          pdf.addImage(imgData, "PNG", 3.5, barcodeY, barcodeWidth, barcodeHeight)
        }

        // Date
        pdf.setFontSize(5)
        pdf.setFont("helvetica", "italic")
        pdf.setTextColor(120, 120, 120)
        pdf.text(date, size.width / 2, size.height - 1.5, { align: "center" })
      }
    })

    pdf.save(`kometa-narx-yorligi-${selectedSize}-${templateStyle}.pdf`)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Narx yorlig&apos;i</h1>
            <p className="text-sm text-slate-500">Mahsulotlar uchun narx yorliq&apos;larini chop etish</p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Do'kon nomi"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Product Selection */}
        <div className="w-1/3 border-r bg-white p-4 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Izlash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Mahsulotlar ro&apos;yxati</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p.id === product.id)
              return (
                <Card
                  key={product.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    isSelected && "bg-[#004B34]/10 border-[#004B34]"
                  )}
                  onClick={() => handleProductSelect(product)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{product.name}</p>
                        <p className="text-sm text-[#004B34] font-bold mt-1">
                          {formatCurrency(product.price)} So&apos;m
                        </p>
                      </div>
                      {isSelected && (
                        <Badge className="bg-[#004B34] text-white ml-2">
                          Tanlangan
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Selected Products Counter */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Tanlangan:</span>
              <Badge variant="secondary" className="bg-[#004B34] text-white">
                {selectedProducts.length} ta mahsulot
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Template Style Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Dizayn uslubi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                <Button
                  variant={templateStyle === "modern" ? "default" : "outline"}
                  className={cn(
                    "h-20",
                    templateStyle === "modern" && "bg-[#004B34] hover:bg-[#003D2B] text-white"
                  )}
                  onClick={() => setTemplateStyle("modern")}
                >
                  <div className="text-center">
                    <div className="font-semibold">Zamonaviy</div>
                    <div className="text-xs opacity-70 mt-1">Modern</div>
                  </div>
                </Button>
                <Button
                  variant={templateStyle === "classic" ? "default" : "outline"}
                  className={cn(
                    "h-20",
                    templateStyle === "classic" && "bg-[#004B34] hover:bg-[#003D2B] text-white"
                  )}
                  onClick={() => setTemplateStyle("classic")}
                >
                  <div className="text-center">
                    <div className="font-semibold">Klassik</div>
                    <div className="text-xs opacity-70 mt-1">Classic</div>
                  </div>
                </Button>
                <Button
                  variant={templateStyle === "minimal" ? "default" : "outline"}
                  className={cn(
                    "h-20",
                    templateStyle === "minimal" && "bg-[#004B34] hover:bg-[#003D2B] text-white"
                  )}
                  onClick={() => setTemplateStyle("minimal")}
                >
                  <div className="text-center">
                    <div className="font-semibold">Minimal</div>
                    <div className="text-xs opacity-70 mt-1">Simple</div>
                  </div>
                </Button>
                <Button
                  variant={templateStyle === "elegant" ? "default" : "outline"}
                  className={cn(
                    "h-20",
                    templateStyle === "elegant" && "bg-[#004B34] hover:bg-[#003D2B] text-white"
                  )}
                  onClick={() => setTemplateStyle("elegant")}
                >
                  <div className="text-center">
                    <div className="font-semibold">Nafis</div>
                    <div className="text-xs opacity-70 mt-1">Elegant</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Size Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Narx yorlig&apos;i o&apos;lchami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(tagSizes) as TagSize[]).map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={cn(
                      "h-20",
                      selectedSize === size &&
                        "bg-[#004B34] hover:bg-[#003D2B] text-white"
                    )}
                    onClick={() => setSelectedSize(size)}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{tagSizes[size].label}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {size === "60x40" && "Katta"}
                        {size === "60x30" && "O'rtacha"}
                        {size === "40x30" && "Kichik"}
                        {size === "30x20" && "Juda kichik"}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          {selectedProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <QrCode className="h-16 w-16 text-slate-300 mb-4" />
                <p className="text-slate-500 text-center">
                  Narx yorlig&apos;i yaratish uchun mahsulotlarni tanlang
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Narx yorlig&apos;i ({tagSizes[selectedSize].label})
                </h2>
                <Button
                  onClick={handlePrint}
                  className="bg-[#004B34] hover:bg-[#003D2B] text-white"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Chop etish
                </Button>
              </div>

              {/* Preview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 z-10"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <Card className="overflow-hidden">
                      <CardContent className="p-3">
                        <div
                          className="bg-white rounded-lg overflow-hidden shadow-lg relative border"
                          style={{
                            aspectRatio: `${tagSizes[selectedSize].width} / ${tagSizes[selectedSize].height}`,
                          }}
                        >
                          {templateStyle === "modern" && (
                            <div className="h-full flex flex-col">
                              {/* Store Name Header */}
                              <div className="bg-[#004B34] px-2 py-1">
                                <div className="text-[8px] text-white font-bold text-center tracking-wide">
                                  {storeName.toUpperCase()}
                                </div>
                              </div>

                              <div className="flex-1 flex flex-col items-center justify-between p-2">
                                {/* Product Name */}
                                <div className={cn("text-center font-bold text-slate-800 line-clamp-2", selectedSize === "30x20" ? "text-[8px]" : "text-[9px]")}>
                                  {product.name}
                                </div>

                                {/* Barcode - Improved for scanning */}
                                <div className="w-full bg-white p-1 rounded">
                                  <canvas
                                    ref={(el) => { canvasRefs.current[product.id] = el }}
                                    className="w-full"
                                    style={{ height: selectedSize === "30x20" ? "24px" : selectedSize === "40x30" ? "38px" : "48px" }}
                                  />
                                </div>

                                {/* Price */}
                                <div className="w-full bg-[#99C61E] py-1 -mx-2">
                                  <div className={cn("text-white font-black text-center", selectedSize === "30x20" ? "text-xs" : selectedSize === "40x30" ? "text-base" : "text-xl")}>
                                    {formatCurrency(product.price)} So&apos;m
                                  </div>
                                </div>

                                {/* Date */}
                                <div className="text-[5px] text-slate-400 mt-0.5">
                                  {new Date().toLocaleDateString("ru-RU")}
                                </div>
                              </div>
                            </div>
                          )}

                          {templateStyle === "classic" && (
                            <div className="h-full flex flex-col border-2 border-[#004B34] m-1">
                              {/* Store Name */}
                              <div className="bg-[#004B34] px-2 py-1 rounded-t">
                                <div className="text-[7px] text-white font-bold text-center">
                                  {storeName.toUpperCase()}
                                </div>
                              </div>

                              <div className="flex-1 flex flex-col items-center justify-between p-2">
                                {/* Product Name */}
                                <div className={cn("text-center font-bold text-slate-800 line-clamp-2", selectedSize === "30x20" ? "text-[7px]" : "text-[8px]")}>
                                  {product.name}
                                </div>

                                {/* Price */}
                                <div className="bg-yellow-50 border border-[#004B34]/20 rounded px-2 py-1">
                                  <div className={cn("text-[#004B34] font-black text-center", selectedSize === "30x20" ? "text-sm" : selectedSize === "40x30" ? "text-lg" : "text-2xl")}>
                                    {formatCurrency(product.price)}
                                  </div>
                                  <div className="text-[6px] text-center text-[#004B34]">So&apos;m</div>
                                </div>

                                {/* Barcode - Improved for scanning */}
                                <div className="w-full bg-white p-1 rounded">
                                  <canvas
                                    ref={(el) => { canvasRefs.current[product.id] = el }}
                                    className="w-full"
                                    style={{ height: selectedSize === "30x20" ? "22px" : selectedSize === "40x30" ? "34px" : "44px" }}
                                  />
                                </div>

                                {/* Date */}
                                <div className="text-[5px] text-slate-400">
                                  {new Date().toLocaleDateString("ru-RU")}
                                </div>
                              </div>
                            </div>
                          )}

                          {templateStyle === "minimal" && (
                            <div className="h-full flex flex-col items-center justify-between p-2">
                              {/* Store Name */}
                              <div className="w-full">
                                <div className="text-[7px] text-[#004B34] font-bold text-center">
                                  {storeName.toUpperCase()}
                                </div>
                                <div className="h-px bg-[#004B34] mt-0.5 mb-1" />
                              </div>

                              {/* Product Name */}
                              <div className={cn("text-center font-bold text-slate-800 line-clamp-2 flex-shrink-0", selectedSize === "30x20" ? "text-[8px]" : "text-[9px]")}>
                                {product.name}
                              </div>

                              {/* Barcode - Improved for scanning */}
                              <div className="w-full bg-white p-1 rounded shadow-sm">
                                <canvas
                                  ref={(el) => { canvasRefs.current[product.id] = el }}
                                  className="w-full"
                                  style={{ height: selectedSize === "30x20" ? "24px" : selectedSize === "40x30" ? "38px" : "48px" }}
                                />
                              </div>

                              {/* Price */}
                              <div className="text-center">
                                <div className={cn("text-[#004B34] font-black", selectedSize === "30x20" ? "text-lg" : selectedSize === "40x30" ? "text-2xl" : "text-3xl")}>
                                  {formatCurrency(product.price)}
                                </div>
                                <div className="text-[7px] text-[#004B34] font-bold">So&apos;m</div>
                              </div>

                              {/* Date */}
                              <div className="text-[5px] text-slate-400">
                                {new Date().toLocaleDateString("ru-RU")}
                              </div>
                            </div>
                          )}

                          {templateStyle === "elegant" && (
                            <div className="h-full flex flex-col p-1 relative">
                              {/* Corner Decorations */}
                              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#004B34]" />
                              <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#004B34]" />
                              <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#004B34]" />
                              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#004B34]" />

                              <div className="flex-1 flex flex-col items-center justify-between p-2">
                                {/* Store Name */}
                                <div className="text-center">
                                  <div className="text-[8px] text-[#004B34] font-bold">
                                    {storeName.toUpperCase()}
                                  </div>
                                  <div className="h-px bg-gradient-to-r from-transparent via-[#99C61E] to-transparent mt-0.5 mb-1" />
                                </div>

                                {/* Product Name */}
                                <div className={cn("text-center font-bold text-slate-800 line-clamp-2", selectedSize === "30x20" ? "text-[7px]" : "text-[8px]")}>
                                  {product.name}
                                </div>

                                {/* Price */}
                                <div className="border border-[#004B34]/30 bg-slate-50 rounded px-2 py-1">
                                  <div className={cn("text-[#004B34] font-black text-center", selectedSize === "30x20" ? "text-base" : selectedSize === "40x30" ? "text-xl" : "text-2xl")}>
                                    {formatCurrency(product.price)} So&apos;m
                                  </div>
                                </div>

                                {/* Barcode - Improved for scanning */}
                                <div className="w-full bg-white p-1.5 rounded border border-slate-200">
                                  <canvas
                                    ref={(el) => { canvasRefs.current[product.id] = el }}
                                    className="w-full"
                                    style={{ height: selectedSize === "30x20" ? "22px" : selectedSize === "40x30" ? "36px" : "46px" }}
                                  />
                                </div>

                                {/* Date */}
                                <div className="text-[5px] text-slate-400 italic">
                                  {new Date().toLocaleDateString("ru-RU")}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
