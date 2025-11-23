"use client"

import { useState } from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Building2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const debts = [
  {
    id: 1,
    supplier: "Coca-Cola HBC",
    totalDebt: 8500000,
    lastPayment: "2025-01-10",
    lastPurchase: "2025-01-15",
    dueDate: "2025-01-25",
    status: "overdue",
  },
  {
    id: 2,
    supplier: "Elma Group",
    totalDebt: 3200000,
    lastPayment: "2025-01-12",
    lastPurchase: "2025-01-14",
    dueDate: "2025-01-28",
    status: "pending",
  },
  {
    id: 3,
    supplier: "P&G Distribution",
    totalDebt: 12000000,
    lastPayment: "2025-01-05",
    lastPurchase: "2025-01-13",
    dueDate: "2025-01-20",
    status: "overdue",
  },
  {
    id: 4,
    supplier: "Unilever",
    totalDebt: 5600000,
    lastPayment: "2025-01-08",
    lastPurchase: "2025-01-11",
    dueDate: "2025-02-01",
    status: "pending",
  },
  {
    id: 5,
    supplier: "Mars Inc.",
    totalDebt: 2100000,
    lastPayment: "2025-01-14",
    lastPurchase: "2025-01-16",
    dueDate: "2025-02-05",
    status: "pending",
  },
  {
    id: 6,
    supplier: "Nestle Uzbekistan",
    totalDebt: 0,
    lastPayment: "2025-01-15",
    lastPurchase: "2025-01-10",
    dueDate: null,
    status: "paid",
  },
]

export default function DebtPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredDebts = debts.filter((debt) => {
    const matchesSearch = debt.supplier
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || debt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredDebts.length / itemsPerPage)
  const paginatedDebts = filteredDebts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const totalDebt = debts.reduce((sum, d) => sum + d.totalDebt, 0)
  const overdueDebt = debts
    .filter((d) => d.status === "overdue")
    .reduce((sum, d) => sum + d.totalDebt, 0)
  const overdueCount = debts.filter((d) => d.status === "overdue").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            Muddati o&apos;tgan
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-600"
          >
            Kutilmoqda
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="border-green-500 text-green-600">
            To&apos;langan
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Qarzdorlik</h1>
        <p className="text-sm text-slate-500">
          Ta&apos;minotchilarga bo&apos;lgan qarzdorlikni boshqaring
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jami qarzdorlik</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalDebt)} so&apos;m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Muddati o&apos;tgan</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(overdueDebt)} so&apos;m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Building2 className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Muddati o&apos;tgan ta&apos;minotchilar
                </p>
                <p className="text-2xl font-bold">{overdueCount} ta</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Label className="mb-2 block">Holat</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Barchasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barchasi</SelectItem>
                  <SelectItem value="overdue">Muddati o&apos;tgan</SelectItem>
                  <SelectItem value="pending">Kutilmoqda</SelectItem>
                  <SelectItem value="paid">To&apos;langan</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

      {/* Debt List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Qarzdorlik ro&apos;yxati</CardTitle>
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
            {paginatedDebts.map((debt) => (
              <div
                key={debt.id}
                className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-bold text-white">
                    {debt.supplier.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{debt.supplier}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Oxirgi xarid: {debt.lastPurchase}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        Oxirgi to&apos;lov: {debt.lastPayment}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                  {debt.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      Muddat: {debt.dueDate}
                    </div>
                  )}
                  {getStatusBadge(debt.status)}
                  <p
                    className={`text-lg font-semibold ${
                      debt.totalDebt > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {debt.totalDebt > 0 ? "-" : ""}
                    {formatCurrency(debt.totalDebt)} so&apos;m
                  </p>
                  <Button variant="outline" size="sm">
                    To&apos;lov qilish
                  </Button>
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
    </div>
  )
}
