"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Download,
  AlertTriangle,
  PackageX,
  Calendar,
} from "lucide-react"
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

const writeOffs = [
  {
    id: 1,
    warehouse: "Asosiy ombor",
    product: "Coca-Cola 1L",
    quantity: 50,
    reason: "Yaroqlilik muddati o'tgan",
    date: "2025-01-15",
  },
  {
    id: 2,
    warehouse: "Asosiy ombor",
    product: "Fanta 0.5L",
    quantity: 24,
    reason: "Shikastlangan qadoq",
    date: "2025-01-14",
  },
  {
    id: 3,
    warehouse: "Ikkinchi ombor",
    product: "Sprite 1.5L",
    quantity: 12,
    reason: "Sifat standartlariga mos kelmaydi",
    date: "2025-01-13",
  },
  {
    id: 4,
    warehouse: "Asosiy ombor",
    product: "Nestle Shokolad",
    quantity: 36,
    reason: "Yaroqlilik muddati o'tgan",
    date: "2025-01-12",
  },
  {
    id: 5,
    warehouse: "Asosiy ombor",
    product: "Lipton Choy 100g",
    quantity: 18,
    reason: "Boshqa",
    date: "2025-01-10",
  },
]

export default function WriteOffsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredWriteOffs = writeOffs.filter((item) =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredWriteOffs.length / itemsPerPage)
  const paginatedWriteOffs = filteredWriteOffs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalQuantity = writeOffs.reduce((sum, item) => sum + item.quantity, 0)

  const uniqueReasons = Array.from(new Set(writeOffs.map(w => w.reason)))

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-white">
              <h1 className="text-2xl font-bold">
                Tovarlarni hisobdan chiqarish
              </h1>
              <p className="text-red-100">
                Yaroqsiz mahsulotlarni hisobdan chiqaring
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={() => alert("Eksport funksiyasi")}
              >
                <Download className="h-4 w-4" />
                Eksport
              </Button>
              <Button
                className="gap-2 bg-white text-red-600 hover:bg-red-50"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Yangi hisobdan chiqarish
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jami holat</p>
                <p className="text-2xl font-bold">{writeOffs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <PackageX className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jami miqdor</p>
                <p className="text-2xl font-bold">{totalQuantity}</p>
                <p className="text-xs text-slate-500">dona</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Sabablar</p>
                <p className="text-2xl font-bold">{uniqueReasons.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Oxirgi chiqarish</p>
                <p className="text-lg font-semibold">{writeOffs[0]?.date || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
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
            <div className="flex-1">
              <Label className="mb-2 block">Qidirish</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Mahsulot nomi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Hisobdan chiqarishlar ro&apos;yxati</CardTitle>
            {filteredWriteOffs.length > 0 && (
              <Badge variant="outline" className="text-sm">
                Jami: {filteredWriteOffs.length} ta
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredWriteOffs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <PackageX className="h-16 w-16 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Hech narsa topilmadi
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Qidiruv natijasida hech narsa topilmadi
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Ombor</TableHead>
                    <TableHead>Mahsulot</TableHead>
                    <TableHead className="text-center">Miqdori</TableHead>
                    <TableHead>Sabab</TableHead>
                    <TableHead>Sana</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedWriteOffs.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">#{item.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                          {item.warehouse}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                          {item.quantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.reason.includes("Yaroqlilik")
                              ? "bg-orange-50 border-orange-200 text-orange-700"
                              : item.reason.includes("Shikastlangan")
                                ? "bg-red-50 border-red-200 text-red-700"
                                : "bg-slate-50 border-slate-200 text-slate-700"
                          }
                        >
                          {item.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-semibold">
                      Jami:
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                        {totalQuantity}
                      </span>
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>

              {/* Improved Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t px-6 py-4">
                  <p className="text-sm text-slate-500">
                    {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, filteredWriteOffs.length)} dan {filteredWriteOffs.length} ta
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

      {/* Add Write-off Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi hisobdan chiqarish</DialogTitle>
            <DialogDescription>
              Hisobdan chiqariladigan mahsulot ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Mahsulot</Label>
              <Input placeholder="Mahsulot nomi yoki shtrix-kod" />
            </div>
            <div>
              <Label className="mb-2 block">Ombor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asosiy">Asosiy ombor</SelectItem>
                  <SelectItem value="ikkinchi">Ikkinchi ombor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Miqdori</Label>
              <Input type="number" placeholder="0" min={1} />
            </div>
            <div>
              <Label className="mb-2 block">Sabab</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expired">
                    Yaroqlilik muddati o&apos;tgan
                  </SelectItem>
                  <SelectItem value="damaged">Shikastlangan qadoq</SelectItem>
                  <SelectItem value="quality">
                    Sifat standartlariga mos kelmaydi
                  </SelectItem>
                  <SelectItem value="other">Boshqa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Sana</Label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowAddDialog(false)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hisobdan chiqarish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
