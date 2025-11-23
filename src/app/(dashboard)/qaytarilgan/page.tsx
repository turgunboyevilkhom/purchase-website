"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Eye, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const returns = [
  {
    id: 1,
    docNumber: "RET-2025-001",
    supplier: "Coca-Cola HBC",
    phone: "+998 90 123 45 67",
    date: "2025-01-15",
    totalAmount: 15000000,
    reason: "Yaroqlilik muddati tugash arafasida",
    products: [
      { name: "Coca-Cola 1L", quantity: 100, price: 12000, total: 1200000 },
      { name: "Fanta 0.5L", quantity: 200, price: 8500, total: 1700000 },
      { name: "Sprite 1.5L", quantity: 150, price: 15000, total: 2250000 },
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
      { name: "Elma Sok 1L", quantity: 50, price: 14000, total: 700000 },
      { name: "Elma Nektar 0.5L", quantity: 80, price: 9000, total: 720000 },
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
      { name: "Nestle Shokolad", quantity: 300, price: 25000, total: 7500000 },
      { name: "Nestle Kofe", quantity: 200, price: 45000, total: 9000000 },
    ],
  },
]

export default function ReturnsPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<
    (typeof returns)[0] | null
  >(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(returns.length / itemsPerPage)
  const paginatedReturns = returns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalAmount = returns.reduce((sum, item) => sum + item.totalAmount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const handleViewDetail = (ret: (typeof returns)[0]) => {
    setSelectedReturn(ret)
    setShowDetailDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Qaytarilgan mahsulotlar</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Xarid raqami</TableHead>
                <TableHead>Taminotchi</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead className="text-right">Summa</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReturns.map((ret) => (
                <TableRow key={ret.id}>
                  <TableCell className="font-medium">{ret.docNumber}</TableCell>
                  <TableCell>{ret.supplier}</TableCell>
                  <TableCell>{ret.phone}</TableCell>
                  <TableCell>{ret.date}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(ret.totalAmount)} so&apos;m
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetail(ret)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Batafsil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="font-semibold">
                  Jami:
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(totalAmount)} so&apos;m
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

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
