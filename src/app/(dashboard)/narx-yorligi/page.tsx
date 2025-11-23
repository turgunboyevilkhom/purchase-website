"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Printer, X, QrCode } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
    store: "Bob's Supermarket",
  },
  {
    id: 3,
    name: "Fanta 0.5L",
    barcode: "4600492001241",
    price: 8500,
    unit: "So'm",
    store: "Bob's Supermarket",
  },
  {
    id: 4,
    name: "Sprite 1.5L",
    barcode: "4600492001258",
    price: 15000,
    unit: "So'm",
    store: "Bob's Supermarket",
  },
  {
    id: 5,
    name: "Nestle Shokolad",
    barcode: "7613034626844",
    price: 25000,
    unit: "So'm",
    store: "Bob's Supermarket",
  },
  {
    id: 6,
    name: "Colgate 100ml",
    barcode: "6920354814471",
    price: 18000,
    unit: "So'm",
    store: "Bob's Supermarket",
  },
  {
    id: 7,
    name: "Lipton Choy 100g",
    barcode: "8722700055556",
    price: 32000,
    unit: "So'm",
    store: "Bob's Supermarket",
  },
  {
    id: 8,
    name: "Ariel 450g",
    barcode: "8001841459721",
    price: 45000,
    unit: "So'm",
    store: "Bob's Supermarket",
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
  const [storeName, setStoreName] = useState("Bob's Supermarket")
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
            width: 2,
            height: 40,
            displayValue: true,
            fontSize: 12,
            margin: 5,
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

      // Draw corner decorations
      pdf.setDrawColor(0, 75, 52) // #004B34
      pdf.setLineWidth(0.3)

      // Top-left corner
      pdf.line(1, 1, 3, 1)
      pdf.line(1, 1, 1, 3)

      // Top-right corner
      pdf.line(size.width - 3, 1, size.width - 1, 1)
      pdf.line(size.width - 1, 1, size.width - 1, 3)

      // Bottom-left corner
      pdf.line(1, size.height - 1, 3, size.height - 1)
      pdf.line(1, size.height - 3, 1, size.height - 1)

      // Bottom-right corner
      pdf.line(size.width - 3, size.height - 1, size.width - 1, size.height - 1)
      pdf.line(size.width - 1, size.height - 3, size.width - 1, size.height - 1)

      // Store name header with background
      pdf.setFillColor(0, 75, 52) // #004B34
      pdf.roundedRect(2, 2, size.width - 4, 4, 0.5, 0.5, "F")

      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(6)
      pdf.setTextColor(255, 255, 255)
      pdf.text(storeName.toUpperCase(), size.width / 2, 4.5, { align: "center" })

      // Product name
      pdf.setFontSize(selectedSize === "30x20" ? 6 : selectedSize === "40x30" ? 7 : 8)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont("helvetica", "bold")
      const productNameLines = pdf.splitTextToSize(product.name, size.width - 6)
      const nameLinesCount = Math.min(productNameLines.length, selectedSize === "30x20" ? 1 : 2)
      pdf.text(productNameLines.slice(0, nameLinesCount), size.width / 2, 8, { align: "center" })

      // Divider line
      const dividerY = selectedSize === "30x20" ? 10 : selectedSize === "40x30" ? 11.5 : 12
      pdf.setDrawColor(0, 75, 52)
      pdf.setLineWidth(0.1)
      const lineStart = size.width * 0.2
      const lineEnd = size.width * 0.8
      pdf.line(lineStart, dividerY, lineEnd, dividerY)

      // Price with yellow background
      const priceY = selectedSize === "30x20" ? 13 : selectedSize === "40x30" ? 16 : 18
      const priceParts = formatPrice(product.price)
      const priceText = `${priceParts.join(" ")} ${product.unit}`

      // Yellow background for price
      pdf.setFillColor(254, 252, 232) // Light yellow
      const textWidth = pdf.getTextWidth(priceText)
      pdf.roundedRect(
        (size.width - textWidth - 2) / 2,
        priceY - 3,
        textWidth + 2,
        3.5,
        0.5,
        0.5,
        "F"
      )

      pdf.setFontSize(selectedSize === "30x20" ? 12 : selectedSize === "40x30" ? 16 : 20)
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(0, 75, 52) // #004B34
      pdf.text(priceText, size.width / 2, priceY, { align: "center" })

      // Barcode with white background
      if (canvas) {
        const barcodeY = selectedSize === "30x20" ? 15 : selectedSize === "40x30" ? 20 : 24
        const barcodeHeight = selectedSize === "30x20" ? 4 : selectedSize === "40x30" ? 8 : 12
        const barcodeWidth = size.width - 4

        // White background for barcode
        pdf.setFillColor(255, 255, 255)
        pdf.roundedRect(2, barcodeY - 0.5, barcodeWidth, barcodeHeight + 1, 0.5, 0.5, "F")

        const imgData = canvas.toDataURL("image/png")
        pdf.addImage(imgData, "PNG", 2, barcodeY, barcodeWidth, barcodeHeight)
      }

      // Date at bottom
      const date = new Date().toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      pdf.setFontSize(5)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(100, 100, 100)
      pdf.text(`📅 ${date}`, size.width / 2, size.height - 2, { align: "center" })
    })

    // Save or print
    pdf.save(`narx-yorligi-${selectedSize}.pdf`)
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
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Mahsulot nomi</h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomi</TableHead>
                  <TableHead className="w-20">Shtrix-kod</TableHead>
                  <TableHead className="w-24 text-right">Narxi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const isSelected = selectedProducts.some((p) => p.id === product.id)
                  return (
                    <TableRow
                      key={product.id}
                      className={cn(
                        "cursor-pointer hover:bg-slate-50",
                        isSelected && "bg-[#004B34]/5"
                      )}
                      onClick={() => handleProductSelect(product)}
                    >
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-xs text-slate-500">{product.barcode}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(product.price)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
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
                          className="bg-gradient-to-br from-white to-slate-50 border-2 border-[#004B34]/20 rounded-lg overflow-hidden shadow-lg relative"
                          style={{
                            aspectRatio: `${tagSizes[selectedSize].width} / ${tagSizes[selectedSize].height}`,
                          }}
                        >
                          {/* Corner Decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#004B34]" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#004B34]" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#004B34]" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#004B34]" />

                          <div className="h-full flex flex-col items-center justify-center p-2">
                            {/* Store Name with Background */}
                            <div className="w-full bg-gradient-to-r from-[#004B34] to-[#006B4D] rounded px-2 py-0.5 mb-1">
                              <div className="text-[8px] text-white font-semibold text-center tracking-wide">
                                {storeName.toUpperCase()}
                              </div>
                            </div>

                            {/* Product Name */}
                            <div
                              className={cn(
                                "text-center font-bold text-slate-800 mb-1 line-clamp-2 px-1",
                                selectedSize === "30x20" ? "text-[8px]" : "text-[10px]"
                              )}
                            >
                              {product.name}
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#004B34]/30 to-transparent mb-1" />

                            {/* Price - Enhanced Design */}
                            <div className="relative mb-1">
                              <div
                                className={cn(
                                  "font-black text-[#004B34] relative z-10",
                                  selectedSize === "30x20"
                                    ? "text-sm"
                                    : selectedSize === "40x30"
                                      ? "text-lg"
                                      : "text-2xl"
                                )}
                              >
                                {formatCurrency(product.price)}
                                <span
                                  className={cn(
                                    "ml-0.5 font-bold",
                                    selectedSize === "30x20" ? "text-[8px]" : "text-xs"
                                  )}
                                >
                                  So&apos;m
                                </span>
                              </div>
                              {/* Price Background Accent */}
                              <div className="absolute inset-0 bg-yellow-100/50 rounded -z-10 blur-sm scale-110" />
                            </div>

                            {/* Barcode */}
                            <div className="flex items-center justify-center w-full bg-white rounded px-1 py-0.5">
                              <canvas
                                ref={(el) => {
                                  canvasRefs.current[product.id] = el
                                }}
                                className="max-w-full"
                                style={{
                                  height:
                                    selectedSize === "30x20"
                                      ? "20px"
                                      : selectedSize === "40x30"
                                        ? "30px"
                                        : "40px",
                                }}
                              />
                            </div>

                            {/* Date with Icon */}
                            <div className="text-[6px] text-slate-500 mt-1 font-medium">
                              📅 {new Date().toLocaleDateString("ru-RU", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-[10px] text-slate-500 mt-2">
                          {product.barcode}
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
