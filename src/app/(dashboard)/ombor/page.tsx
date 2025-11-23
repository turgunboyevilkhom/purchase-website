"use client"

import { useState } from "react"
import {
  Package,
  DollarSign,
  AlertTriangle,
  Search,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Download,
  PackageX,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

const inventoryData = [
  {
    id: 1,
    name: "Coca-Cola 1L",
    category: "Ichimliklar",
    barcode: "4600492001234",
    quantity: 156,
    minStock: 50,
    maxStock: 200,
    price: 12000,
    status: "Yetarli",
  },
  {
    id: 2,
    name: "Fanta 0.5L",
    category: "Ichimliklar",
    barcode: "4600492001235",
    quantity: 42,
    minStock: 50,
    maxStock: 150,
    price: 8500,
    status: "O'rtacha",
  },
  {
    id: 3,
    name: "Sprite 1.5L",
    category: "Ichimliklar",
    barcode: "4600492001236",
    quantity: 8,
    minStock: 30,
    maxStock: 100,
    price: 15000,
    status: "Kam",
  },
  {
    id: 4,
    name: "Nestle Shokolad",
    category: "Oziq-ovqat",
    barcode: "7613035123456",
    quantity: 234,
    minStock: 100,
    maxStock: 300,
    price: 25000,
    status: "Yetarli",
  },
  {
    id: 5,
    name: "Colgate 100ml",
    category: "Gigiyena",
    barcode: "8901234567890",
    quantity: 0,
    minStock: 20,
    maxStock: 80,
    price: 18000,
    status: "Tugagan",
  },
  {
    id: 6,
    name: "Lipton Choy 100g",
    category: "Ichimliklar",
    barcode: "8712100234567",
    quantity: 67,
    minStock: 40,
    maxStock: 120,
    price: 32000,
    status: "Yetarli",
  },
  {
    id: 7,
    name: "Ariel 450g",
    category: "Maishiy kimyo",
    barcode: "5410076769001",
    quantity: 23,
    minStock: 30,
    maxStock: 100,
    price: 45000,
    status: "O'rtacha",
  },
  {
    id: 8,
    name: "Arizona 0.5L",
    category: "Ichimliklar",
    barcode: "6130254001234",
    quantity: 89,
    minStock: 40,
    maxStock: 150,
    price: 14000,
    status: "Yetarli",
  },
]

const statusColors: Record<string, string> = {
  Yetarli: "bg-green-500",
  "O'rtacha": "bg-amber-500",
  Kam: "bg-red-500",
  Tugagan: "bg-red-700",
}

export default function WarehousePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [warehouseFilter, setWarehouseFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredItems = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.includes(searchQuery)
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalProducts = inventoryData.length
  const totalValue = inventoryData.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const lowStockItems = inventoryData.filter(
    (item) => item.quantity < item.minStock
  ).length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const getStockPercentage = (quantity: number, maxStock: number) => {
    return Math.min((quantity / maxStock) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ombor qoldiqlari</h1>
          <p className="text-sm text-slate-500">
            Barcha mahsulotlar inventarizatsiyasi
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Ombor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha omborlar</SelectItem>
              <SelectItem value="asosiy">Asosiy ombor</SelectItem>
              <SelectItem value="ikkinchi">Ikkinchi ombor</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Kategoriya" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="Ichimliklar">Ichimliklar</SelectItem>
              <SelectItem value="Oziq-ovqat">Oziq-ovqat</SelectItem>
              <SelectItem value="Gigiyena">Gigiyena</SelectItem>
              <SelectItem value="Maishiy kimyo">Maishiy kimyo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={() => alert("Hisobot funksiyasi")}>
            <BarChart3 className="h-4 w-4" />
            Hisobot
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => alert("Eksport funksiyasi")}>
            <Download className="h-4 w-4" />
            Eksport
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Jami mahsulotlar</p>
                <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
                <p className="text-xs text-slate-500 mt-1">turda</p>
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
                <p className="text-sm font-medium text-slate-500">Umumiy qiymat</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalValue)}
                </p>
                <p className="text-xs text-slate-500 mt-1">so&apos;m</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.2%</span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Kam qolgan</p>
                <p className="text-3xl font-bold text-red-600">{lowStockItems}</p>
                <p className="text-xs text-red-600 mt-1">Zudlik bilan to&apos;ldiring</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Mahsulotlar ro&apos;yxati</CardTitle>
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <PackageX className="h-16 w-16 text-slate-300" />
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
                  <TableHead>Kategoriya</TableHead>
                  <TableHead>Shtrix-kod</TableHead>
                  <TableHead>Miqdori</TableHead>
                  <TableHead className="text-right">Narxi</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">ID: {item.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-slate-600">
                      {item.barcode}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[140px]">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">{item.quantity}</span>
                          <span className="text-slate-400">
                            / {item.maxStock} dona
                          </span>
                        </div>
                        <Progress
                          value={getStockPercentage(item.quantity, item.maxStock)}
                          className={`h-2 ${
                            item.quantity < item.minStock
                              ? "[&>div]:bg-red-500"
                              : item.quantity < item.minStock * 1.5
                                ? "[&>div]:bg-amber-500"
                                : "[&>div]:bg-green-500"
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(item.price)}
                      </p>
                      <p className="text-xs text-slate-500">so&apos;m</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[item.status]} text-white`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredItems.length)} /{" "}
                {filteredItems.length} ta mahsulot
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Oldingi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Keyingi
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
