"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Banknote,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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

const payments = [
  {
    id: 1,
    supplier: "Coca-Cola HBC",
    amount: 8000000,
    method: "Bank",
    date: "2025-01-15",
  },
  {
    id: 2,
    supplier: "Elma Group",
    amount: 5500000,
    method: "Naqd",
    date: "2025-01-14",
  },
  {
    id: 3,
    supplier: "Nestle Uzbekistan",
    amount: 12000000,
    method: "Bank",
    date: "2025-01-13",
  },
  {
    id: 4,
    supplier: "P&G Distribution",
    amount: 7200000,
    method: "Naqd",
    date: "2025-01-12",
  },
  {
    id: 5,
    supplier: "Unilever",
    amount: 4500000,
    method: "Bank",
    date: "2025-01-10",
  },
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredPayments = payments.filter((payment) =>
    payment.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Yetkazib beruvchilarga to&apos;lovlar
          </h1>
          <p className="text-sm text-slate-500">
            Barcha to&apos;lovlarni boshqaring
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Yangi to&apos;lov
        </Button>
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
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>To&apos;lovlar ro&apos;yxati</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    {payment.method === "Bank" ? (
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    ) : (
                      <Banknote className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{payment.supplier}</p>
                    <p className="text-sm text-slate-500">{payment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className={
                      payment.method === "Naqd"
                        ? "border-green-500 text-green-600"
                        : "border-purple-500 text-purple-600"
                    }
                  >
                    {payment.method}
                  </Badge>
                  <p className="text-lg font-semibold">
                    {formatCurrency(payment.amount)} so&apos;m
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Sahifa {currentPage} / {totalPages}
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

      {/* Add Payment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi to&apos;lov</DialogTitle>
            <DialogDescription>
              Yangi to&apos;lov ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Ta&apos;minotchi</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coca-cola">Coca-Cola HBC</SelectItem>
                  <SelectItem value="elma">Elma Group</SelectItem>
                  <SelectItem value="nestle">Nestle Uzbekistan</SelectItem>
                  <SelectItem value="pg">P&G Distribution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Summa</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div>
              <Label className="mb-2 block">To&apos;lov turi</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naqd">Naqd</SelectItem>
                  <SelectItem value="bank">Bank o&apos;tkazmasi</SelectItem>
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
            <Button onClick={() => setShowAddDialog(false)}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
