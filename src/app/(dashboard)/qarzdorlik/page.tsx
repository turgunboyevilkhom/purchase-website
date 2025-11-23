"use client"

import { useState } from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const debts = [
  {
    id: 1,
    supplier: "Coca-Cola HBC",
    totalDebt: 25000000,
    paidAmount: 15000000,
    dueDate: "2025-02-15",
    lastPayment: "2025-01-10",
    status: "normal",
  },
  {
    id: 2,
    supplier: "Elma Group",
    totalDebt: 12500000,
    paidAmount: 8000000,
    dueDate: "2025-01-30",
    lastPayment: "2025-01-05",
    status: "warning",
  },
  {
    id: 3,
    supplier: "Nestle Uzbekistan",
    totalDebt: 35000000,
    paidAmount: 35000000,
    dueDate: "2025-01-20",
    lastPayment: "2025-01-18",
    status: "paid",
  },
  {
    id: 4,
    supplier: "P&G Distribution",
    totalDebt: 18700000,
    paidAmount: 5000000,
    dueDate: "2025-01-10",
    lastPayment: "2024-12-20",
    status: "overdue",
  },
  {
    id: 5,
    supplier: "Unilever",
    totalDebt: 22300000,
    paidAmount: 12000000,
    dueDate: "2025-02-28",
    lastPayment: "2025-01-15",
    status: "normal",
  },
  {
    id: 6,
    supplier: "Mars Inc.",
    totalDebt: 8600000,
    paidAmount: 3000000,
    dueDate: "2025-01-25",
    lastPayment: "2025-01-08",
    status: "warning",
  },
  {
    id: 7,
    supplier: "Pepsi Co",
    totalDebt: 45000000,
    paidAmount: 20000000,
    dueDate: "2025-03-01",
    lastPayment: "2025-01-12",
    status: "normal",
  },
  {
    id: 8,
    supplier: "Ferrero",
    totalDebt: 15000000,
    paidAmount: 0,
    dueDate: "2025-01-05",
    lastPayment: null,
    status: "overdue",
  },
]

export default function DebtPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const itemsPerPage = 10

  const filteredDebts = debts.filter((debt) => {
    const matchesSearch = debt.supplier
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      filterStatus === "all" || debt.status === filterStatus
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
  const totalPaid = debts.reduce((sum, d) => sum + d.paidAmount, 0)
  const remainingDebt = totalDebt - totalPaid
  const overdueCount = debts.filter((d) => d.status === "overdue").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-[#99C61E] text-[#004B34]">To&apos;langan</Badge>
      case "normal":
        return <Badge className="bg-[#004B34] text-white">Normal</Badge>
      case "warning":
        return <Badge className="bg-amber-500 text-white">Yaqinlashmoqda</Badge>
      case "overdue":
        return <Badge className="bg-red-500 text-white">Muddati o&apos;tgan</Badge>
      default:
        return null
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-[#99C61E]"
      case "normal":
        return "bg-[#004B34]"
      case "warning":
        return "bg-amber-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004B34]">Qarzdorlik</h1>
          <p className="text-sm text-[#004B34]/60">
            Ta&apos;minotchilarga qarzdorlikni kuzating
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#99C61E]/20 hover:shadow-lg hover:shadow-[#99C61E]/10 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004B34]/10">
                <DollarSign className="h-6 w-6 text-[#004B34]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Umumiy qarz</p>
                <p className="text-2xl font-bold text-[#004B34]">
                  {formatCurrency(totalDebt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#99C61E]/20 hover:shadow-lg hover:shadow-[#99C61E]/10 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#99C61E]/10">
                <TrendingUp className="h-6 w-6 text-[#99C61E]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">To&apos;langan</p>
                <p className="text-2xl font-bold text-[#004B34]">
                  {formatCurrency(totalPaid)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#99C61E]/20 hover:shadow-lg hover:shadow-[#99C61E]/10 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <TrendingDown className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Qolgan qarz</p>
                <p className="text-2xl font-bold text-[#004B34]">
                  {formatCurrency(remainingDebt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 hover:shadow-lg hover:shadow-red-100/50 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Muddati o&apos;tgan</p>
                <p className="text-2xl font-bold text-[#004B34]">{overdueCount}</p>
                <p className="text-xs text-red-500">Zudlik bilan to&apos;lang</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("all")}
          className={
            filterStatus === "all"
              ? "bg-[#004B34] text-white"
              : "border-[#99C61E]/30 hover:bg-[#99C61E]/10"
          }
        >
          Barchasi
        </Button>
        <Button
          variant={filterStatus === "overdue" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("overdue")}
          className={
            filterStatus === "overdue"
              ? "bg-red-500 text-white"
              : "border-[#99C61E]/30 hover:bg-[#99C61E]/10"
          }
        >
          Muddati o&apos;tgan
        </Button>
        <Button
          variant={filterStatus === "warning" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("warning")}
          className={
            filterStatus === "warning"
              ? "bg-amber-500 text-white"
              : "border-[#99C61E]/30 hover:bg-[#99C61E]/10"
          }
        >
          Yaqinlashmoqda
        </Button>
        <Button
          variant={filterStatus === "normal" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("normal")}
          className={
            filterStatus === "normal"
              ? "bg-[#004B34] text-white"
              : "border-[#99C61E]/30 hover:bg-[#99C61E]/10"
          }
        >
          Normal
        </Button>
        <Button
          variant={filterStatus === "paid" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("paid")}
          className={
            filterStatus === "paid"
              ? "bg-[#99C61E] text-[#004B34]"
              : "border-[#99C61E]/30 hover:bg-[#99C61E]/10"
          }
        >
          To&apos;langan
        </Button>
      </div>

      {/* Debt List */}
      <Card className="border-[#99C61E]/20">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-[#004B34]">Qarzdorlik ro&apos;yxati</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#004B34]/40" />
              <Input
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:w-[250px] border-[#99C61E]/30 focus:border-[#99C61E]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedDebts.map((debt) => {
              const progressPercent = (debt.paidAmount / debt.totalDebt) * 100
              const remaining = debt.totalDebt - debt.paidAmount

              return (
                <div
                  key={debt.id}
                  className="rounded-xl border border-[#99C61E]/20 p-4 transition-all hover:shadow-md hover:shadow-[#99C61E]/10"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004B34]/10">
                        <Building2 className="h-6 w-6 text-[#004B34]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[#004B34]">
                            {debt.supplier}
                          </p>
                          {getStatusBadge(debt.status)}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-3 text-sm text-[#004B34]/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Muddat: {debt.dueDate}
                          </span>
                          {debt.lastPayment && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Oxirgi to&apos;lov: {debt.lastPayment}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#004B34]/60">Qolgan qarz</p>
                      <p
                        className={`text-xl font-bold ${
                          remaining > 0 ? "text-red-500" : "text-[#99C61E]"
                        }`}
                      >
                        {formatCurrency(remaining)} so&apos;m
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-[#004B34]/60">
                        To&apos;langan: {formatCurrency(debt.paidAmount)} so&apos;m
                      </span>
                      <span className="text-[#004B34]/60">
                        Jami: {formatCurrency(debt.totalDebt)} so&apos;m
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(debt.status)}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-sm text-[#004B34]/60">
                      {progressPercent.toFixed(0)}% to&apos;langan
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-[#004B34]/60">
                Sahifa {currentPage} / {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-[#99C61E]/30 hover:bg-[#99C61E]/10"
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
                  className="border-[#99C61E]/30 hover:bg-[#99C61E]/10"
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
