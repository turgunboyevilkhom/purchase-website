"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Eye, Info, Plus, Search, Trash2, Download, PackageX, TrendingDown, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ReturnProduct {
  id: number
  name: string
  quantity: number
  price: number
  total: number
}

interface Return {
  id: number
  docNumber: string
  supplier: string
  phone: string
  date: string
  totalAmount: number
  reason: string
  products: ReturnProduct[]
}

const initialReturns: Return[] = [
  {
    id: 1,
    docNumber: "RET-2025-001",
    supplier: "Coca-Cola HBC",
    phone: "+998 90 123 45 67",
    date: "2025-01-15",
    totalAmount: 15000000,
    reason: "Yaroqlilik muddati tugash arafasida",
    products: [
      { id: 1, name: "Coca-Cola 1L", quantity: 100, price: 12000, total: 1200000 },
      { id: 2, name: "Fanta 0.5L", quantity: 200, price: 8500, total: 1700000 },
      { id: 3, name: "Sprite 1.5L", quantity: 150, price: 15000, total: 2250000 },
    ],
  },
  {
    id: 2,
    docNumber: "RET-2025-002",
    supplier: "Elma Group",
    phone: "+998 90 234 56 78",
    date: "2025-01-14",
    totalAmount: 8500000,
    reason: "Shikastlangan mahsulotlar",
    products: [
      { id: 1, name: "Elma Sok 1L", quantity: 50, price: 14000, total: 700000 },
      { id: 2, name: "Elma Nektar 0.5L", quantity: 80, price: 9000, total: 720000 },
    ],
  },
  {
    id: 3,
    docNumber: "RET-2025-003",
    supplier: "Nestle Uzbekistan",
    phone: "+998 90 345 67 89",
    date: "2025-01-13",
    totalAmount: 22000000,
    reason: "Noto'g'ri yetkazib berish",
    products: [
      { id: 1, name: "Nestle Shokolad", quantity: 300, price: 25000, total: 7500000 },
      { id: 2, name: "Nestle Kofe", quantity: 200, price: 45000, total: 9000000 },
    ],
  },
]

const suppliers = [
  { id: "coca-cola", name: "Coca-Cola HBC", phone: "+998 90 123 45 67" },
  { id: "elma", name: "Elma Group", phone: "+998 90 234 56 78" },
  { id: "nestle", name: "Nestle Uzbekistan", phone: "+998 90 345 67 89" },
  { id: "pg", name: "P&G Distribution", phone: "+998 90 456 78 90" },
]

const returnReasons = [
  "Yaroqlilik muddati tugash arafasida",
  "Shikastlangan mahsulotlar",
  "Noto'g'ri yetkazib berish",
  "Sifat muammolari",
  "Ortiqcha buyurtma",
  "Boshqa",
]

export default function ReturnsPage() {
  const [returns, setReturns] = useState<Return[]>(initialReturns)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Add new return state
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newSupplier, setNewSupplier] = useState("")
  const [newReason, setNewReason] = useState("")
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0])
  const [newProducts, setNewProducts] = useState<ReturnProduct[]>([
    { id: 1, name: "", quantity: 0, price: 0, total: 0 },
  ])

  const totalPages = Math.ceil(returns.length / itemsPerPage)
  const paginatedReturns = returns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalAmount = returns.reduce((sum, item) => sum + item.totalAmount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const handleViewDetail = (ret: Return) => {
    setSelectedReturn(ret)
    setShowDetailDialog(true)
  }

  const addProductRow = () => {
    setNewProducts([
      ...newProducts,
      { id: newProducts.length + 1, name: "", quantity: 0, price: 0, total: 0 },
    ])
  }

  const removeProductRow = (id: number) => {
    if (newProducts.length > 1) {
      setNewProducts(newProducts.filter((p) => p.id !== id))
    }
  }

  const updateNewProduct = (id: number, field: keyof ReturnProduct, value: string | number) => {
    setNewProducts(
      newProducts.map((p) => {
        if (p.id !== id) return p
        const updated = { ...p, [field]: value }
        if (field === "quantity" || field === "price") {
          updated.total = updated.quantity * updated.price
        }
        return updated
      })
    )
  }

  const handleAddReturn = () => {
    if (newSupplier && newReason && newProducts.some(p => p.name && p.quantity > 0)) {
      const supplier = suppliers.find(s => s.id === newSupplier)
      const newTotalAmount = newProducts.reduce((sum, p) => sum + p.total, 0)
      const newReturn: Return = {
        id: returns.length + 1,
        docNumber: `RET-${new Date().getFullYear()}-${String(returns.length + 1).padStart(3, "0")}`,
        supplier: supplier?.name || "",
        phone: supplier?.phone || "",
        date: newDate,
        totalAmount: newTotalAmount,
        reason: newReason,
        products: newProducts.filter(p => p.name && p.quantity > 0),
      }
      setReturns([newReturn, ...returns])
      resetAddForm()
      setShowAddDialog(false)
    }
  }

  const resetAddForm = () => {
    setNewSupplier("")
    setNewReason("")
    setNewDate(new Date().toISOString().split("T")[0])
    setNewProducts([{ id: 1, name: "", quantity: 0, price: 0, total: 0 }])
  }

  const newTotalAmount = newProducts.reduce((sum, p) => sum + p.total, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Qaytarilgan mahsulotlar</h1>
          <p className="text-sm text-slate-500">Barcha qaytarilgan mahsulotlar ro&apos;yxati</p>
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
            className="gap-2 bg-gradient-to-r from-[#004B34] to-[#006644]"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Yangi qaytarish
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <PackageX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jami qaytarishlar</p>
                <p className="text-2xl font-bold">{returns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jami summa</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalAmount)}
                </p>
                <p className="text-xs text-slate-500">so&apos;m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Eng ko&apos;p sabab</p>
                <p className="text-lg font-semibold">Yaroqlilik muddati</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label className="mb-2 block">Boshlang&apos;ich sana</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label className="mb-2 block">Tugash sanasi</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Qidirish
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Qaytarishlar ro&apos;yxati</CardTitle>
            {returns.length > 0 && (
              <Badge variant="outline" className="text-sm">
                Jami: {returns.length} ta
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {returns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <PackageX className="h-16 w-16 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Qaytarish topilmadi
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Hozircha qaytarilgan mahsulotlar yo&apos;q
              </p>
              <Button
                className="mt-4 gap-2 bg-gradient-to-r from-[#004B34] to-[#006644]"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Birinchi qaytarishni qo&apos;shish
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Xarid raqami</TableHead>
                    <TableHead>Taminotchi</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Sana</TableHead>
                    <TableHead>Sabab</TableHead>
                    <TableHead className="text-right">Summa</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReturns.map((ret) => (
                    <TableRow key={ret.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{ret.docNumber}</TableCell>
                      <TableCell>{ret.supplier}</TableCell>
                      <TableCell className="text-slate-600">{ret.phone}</TableCell>
                      <TableCell>{ret.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                          {ret.reason.length > 30 ? ret.reason.substring(0, 30) + "..." : ret.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-red-600">
                        {formatCurrency(ret.totalAmount)} so&apos;m
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(ret)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Batafsil
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} className="font-semibold">
                      Jami:
                    </TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      {formatCurrency(totalAmount)} so&apos;m
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t px-6 py-4">
                  <p className="text-sm text-slate-500">
                    {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, returns.length)} dan {returns.length} ta
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Oldingi
                    </Button>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-slate-700">
                        {currentPage} / {totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="gap-2"
                    >
                      Keyingi
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Return Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yangi qaytarish qo&apos;shish</DialogTitle>
            <DialogDescription>
              Qaytarilayotgan mahsulotlar ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Form Fields */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label className="mb-2 block">Ta&apos;minotchi <span className="text-red-500">*</span></Label>
                <Select value={newSupplier} onValueChange={setNewSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang..." />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">Sana <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block">Sabab <span className="text-red-500">*</span></Label>
                <Select value={newReason} onValueChange={setNewReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang..." />
                  </SelectTrigger>
                  <SelectContent>
                    {returnReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="font-semibold">Mahsulotlar</Label>
                <Button variant="outline" size="sm" onClick={addProductRow}>
                  <Plus className="mr-2 h-4 w-4" />
                  Qator qo&apos;shish
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahsulot nomi</TableHead>
                    <TableHead className="w-[100px]">Miqdor</TableHead>
                    <TableHead className="w-[120px]">Narx</TableHead>
                    <TableHead className="w-[120px]">Jami</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative">
                          <Input
                            value={product.name}
                            onChange={(e) =>
                              updateNewProduct(product.id, "name", e.target.value)
                            }
                            placeholder="Mahsulot nomi"
                            className="pr-8"
                          />
                          <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={product.quantity || ""}
                          onChange={(e) =>
                            updateNewProduct(product.id, "quantity", Number(e.target.value))
                          }
                          min={0}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={product.price || ""}
                          onChange={(e) =>
                            updateNewProduct(product.id, "price", Number(e.target.value))
                          }
                          min={0}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(product.total)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeProductRow(product.id)}
                          disabled={newProducts.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-right">
                <span className="text-slate-500">Jami summa: </span>
                <span className="text-lg font-bold">{formatCurrency(newTotalAmount)} so&apos;m</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                resetAddForm()
                setShowAddDialog(false)
              }}
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleAddReturn}
              disabled={!newSupplier || !newReason || !newProducts.some(p => p.name && p.quantity > 0)}
              className="bg-gradient-to-r from-[#004B34] to-[#006644]"
            >
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Qaytarish tafsilotlari - {selectedReturn?.docNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div className="space-y-4">
              {/* Supplier Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-slate-500">Ta&apos;minotchi</Label>
                  <p className="font-medium">{selectedReturn.supplier}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Telefon</Label>
                  <p className="font-medium">{selectedReturn.phone}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Qaytarish sanasi</Label>
                  <p className="font-medium">{selectedReturn.date}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Sabab</Label>
                  <p className="font-medium">{selectedReturn.reason}</p>
                </div>
              </div>

              {/* Info Banner */}
              <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                <Info className="h-5 w-5 text-blue-600" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Qaytarish holati</p>
                  <p>
                    Bu qaytarish ta&apos;minotchiga yuborildi va qayta ishlanmoqda.
                  </p>
                </div>
              </div>

              {/* Products Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahsulot</TableHead>
                    <TableHead className="text-center">Miqdor</TableHead>
                    <TableHead className="text-right">Narx</TableHead>
                    <TableHead className="text-right">Jami</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedReturn.products.map((product, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-center">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(product.price)} so&apos;m
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(product.total)} so&apos;m
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-semibold">
                      Jami:
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(selectedReturn.totalAmount)} so&apos;m
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
