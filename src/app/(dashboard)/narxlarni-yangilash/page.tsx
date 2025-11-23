"use client"

import { useState } from "react"
import { Search, Save, Download, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const products = [
  {
    id: 1,
    name: "Coca-Cola 1L",
    purchasePrice: 10000,
    salePrice: 12500,
    newPrice: 0,
    priceList: "Narxlar ro'yxati 01",
    lastUpdate: "2025-01-10",
  },
  {
    id: 2,
    name: "Fanta 0.5L",
    purchasePrice: 7000,
    salePrice: 8750,
    newPrice: 0,
    priceList: "Narxlar ro'yxati 01",
    lastUpdate: "2025-01-10",
  },
  {
    id: 3,
    name: "Sprite 1.5L",
    purchasePrice: 12000,
    salePrice: 15000,
    newPrice: 0,
    priceList: "Narxlar ro'yxati 01",
    lastUpdate: "2025-01-10",
  },
  {
    id: 4,
    name: "Nestle Shokolad",
    purchasePrice: 20000,
    salePrice: 25000,
    newPrice: 0,
    priceList: "Narxlar ro'yxati 02",
    lastUpdate: "2025-01-08",
  },
  {
    id: 5,
    name: "Colgate 100ml",
    purchasePrice: 14000,
    salePrice: 17500,
    newPrice: 0,
    priceList: "Narxlar ro'yxati 01",
    lastUpdate: "2025-01-05",
  },
  {
    id: 6,
    name: "Lipton Choy 100g",
    purchasePrice: 26000,
    salePrice: 32500,
    newPrice: 0,
    priceList: "Narxlar ro'yxati 02",
    lastUpdate: "2025-01-03",
  },
]

export default function PriceUpdatePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceListFilter, setPriceListFilter] = useState("all")
  const [productPrices, setProductPrices] = useState(products)

  const filteredProducts = productPrices.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesPriceList =
      priceListFilter === "all" || product.priceList === priceListFilter
    return matchesSearch && matchesPriceList
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const updateNewPrice = (id: number, price: number) => {
    setProductPrices(
      productPrices.map((p) =>
        p.id === id ? { ...p, newPrice: price } : p
      )
    )
  }

  const handleSave = () => {
    // Here you would save to API
    const updatedProducts = productPrices.filter((p) => p.newPrice > 0)
    console.log("Saving updated prices:", updatedProducts)
    alert("Narxlar muvaffaqiyatli saqlandi!")
  }

  const updatedProductsCount = productPrices.filter((p) => p.newPrice > 0).length
  const averageIncrease = productPrices.reduce((sum, p) => {
    if (p.newPrice > 0) {
      return sum + ((p.newPrice - p.salePrice) / p.salePrice) * 100
    }
    return sum
  }, 0) / (updatedProductsCount || 1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Narxlarni yangilash
          </h1>
          <p className="text-sm text-slate-500">
            Mahsulot narxlarini yangilang
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => alert("Eksport funksiyasi")}
          >
            <Download className="h-4 w-4" />
            Eksport
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-green-600 to-green-500"
            onClick={handleSave}
            disabled={updatedProductsCount === 0}
          >
            <Save className="h-4 w-4" />
            Saqlash ({updatedProductsCount})
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Jami mahsulotlar</p>
                <p className="text-3xl font-bold text-blue-600">{productPrices.length}</p>
                <p className="text-xs text-slate-500 mt-1">ta</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Package className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Yangilangan</p>
                <p className="text-3xl font-bold text-green-600">{updatedProductsCount}</p>
                <p className="text-xs text-slate-500 mt-1">ta mahsulot</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">O&apos;rtacha o&apos;zgarish</p>
                <p className={`text-2xl font-bold ${averageIncrease >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {averageIncrease >= 0 ? '+' : ''}{averageIncrease.toFixed(1)}%
                </p>
                <p className="text-xs text-slate-500 mt-1">narx o&apos;zgarishi</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                {averageIncrease >= 0 ? (
                  <TrendingUp className="h-7 w-7 text-orange-600" />
                ) : (
                  <TrendingDown className="h-7 w-7 text-orange-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Narx ro&apos;yxatlari</p>
                <p className="text-3xl font-bold text-purple-600">2</p>
                <p className="text-xs text-slate-500 mt-1">faol ro&apos;yxat</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <DollarSign className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Mahsulot qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priceListFilter} onValueChange={setPriceListFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Narxlar ro'yxati" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barchasi</SelectItem>
                <SelectItem value="Narxlar ro'yxati 01">
                  Narxlar ro&apos;yxati 01
                </SelectItem>
                <SelectItem value="Narxlar ro'yxati 02">
                  Narxlar ro&apos;yxati 02
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Mahsulotlar narxlari</CardTitle>
            <Badge variant="outline" className="text-sm">
              {filteredProducts.length} ta mahsulot
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Package className="h-16 w-16 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Mahsulot topilmadi
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Qidiruv yoki filtr bo&apos;yicha mahsulot topilmadi
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahsulot</TableHead>
                  <TableHead className="text-right">Xarid narxi</TableHead>
                  <TableHead className="text-right">Joriy sotish narxi</TableHead>
                  <TableHead className="text-right">Yangi narx</TableHead>
                  <TableHead className="text-center">O&apos;zgarish</TableHead>
                  <TableHead>Narxlar ro&apos;yxati</TableHead>
                  <TableHead>Oxirgi yangilanish</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const priceChange = product.newPrice > 0
                    ? ((product.newPrice - product.salePrice) / product.salePrice) * 100
                    : 0
                  return (
                    <TableRow key={product.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500">ID: {product.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <p className="font-medium text-slate-700">
                          {formatCurrency(product.purchasePrice)}
                        </p>
                        <p className="text-xs text-slate-500">so&apos;m</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(product.salePrice)}
                        </p>
                        <p className="text-xs text-slate-500">so&apos;m</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          value={product.newPrice || ""}
                          onChange={(e) =>
                            updateNewPrice(product.id, Number(e.target.value))
                          }
                          placeholder={formatCurrency(product.salePrice)}
                          className={`w-[150px] text-right font-semibold ${
                            product.newPrice > 0
                              ? product.newPrice > product.salePrice
                                ? 'border-green-500 text-green-700'
                                : 'border-red-500 text-red-700'
                              : ''
                          }`}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {product.newPrice > 0 && (
                          <Badge
                            className={
                              priceChange > 0
                                ? "bg-green-100 text-green-700 border-green-300"
                                : priceChange < 0
                                  ? "bg-red-100 text-red-700 border-red-300"
                                  : "bg-slate-100 text-slate-700"
                            }
                          >
                            {priceChange > 0 && <TrendingUp className="h-3 w-3 inline mr-1" />}
                            {priceChange < 0 && <TrendingDown className="h-3 w-3 inline mr-1" />}
                            {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                          {product.priceList}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{product.lastUpdate}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
