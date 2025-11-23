"use client"

import { useState } from "react"
import { Search, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
        <Button
          className="gap-2 bg-gradient-to-r from-green-600 to-green-500"
          onClick={handleSave}
        >
          <Save className="h-4 w-4" />
          Saqlash
        </Button>
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomi</TableHead>
                <TableHead className="text-right">Xarid narxi</TableHead>
                <TableHead className="text-right">Sotish narxi</TableHead>
                <TableHead className="text-right">Yangi narx</TableHead>
                <TableHead>Narxlar ro&apos;yxati</TableHead>
                <TableHead>Oxirgi yangilanish</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(product.purchasePrice)} so&apos;m
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(product.salePrice)} so&apos;m
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={product.newPrice || ""}
                      onChange={(e) =>
                        updateNewPrice(product.id, Number(e.target.value))
                      }
                      placeholder={formatCurrency(product.salePrice)}
                      className="w-[140px] text-right"
                    />
                  </TableCell>
                  <TableCell>{product.priceList}</TableCell>
                  <TableCell>{product.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
