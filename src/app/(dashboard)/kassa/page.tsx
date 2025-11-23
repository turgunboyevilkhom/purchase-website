"use client"

import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const transactions = [
  {
    id: 1,
    type: "income",
    description: "Sotuvdan tushum - DOC-2025-001",
    amount: 15500000,
    method: "Naqd",
    date: "2025-01-15 14:30",
  },
  {
    id: 2,
    type: "expense",
    description: "Ta'minotchi to'lovi - Coca-Cola",
    amount: 8000000,
    method: "Bank",
    date: "2025-01-15 12:15",
  },
  {
    id: 3,
    type: "income",
    description: "Sotuvdan tushum - DOC-2025-002",
    amount: 8750000,
    method: "Bank",
    date: "2025-01-14 16:45",
  },
  {
    id: 4,
    type: "expense",
    description: "Kommunal xarajatlar",
    amount: 2500000,
    method: "Bank",
    date: "2025-01-14 10:00",
  },
  {
    id: 5,
    type: "income",
    description: "Sotuvdan tushum - DOC-2025-003",
    amount: 22300000,
    method: "Naqd",
    date: "2025-01-13 15:20",
  },
  {
    id: 6,
    type: "expense",
    description: "Ish haqi to'lovi",
    amount: 12000000,
    method: "Bank",
    date: "2025-01-13 09:00",
  },
  {
    id: 7,
    type: "income",
    description: "Sotuvdan tushum - DOC-2025-004",
    amount: 12100000,
    method: "Naqd",
    date: "2025-01-12 11:30",
  },
  {
    id: 8,
    type: "expense",
    description: "Ijara to'lovi",
    amount: 5000000,
    method: "Bank",
    date: "2025-01-12 09:00",
  },
]

export default function CashRegisterPage() {
  const [timeRange, setTimeRange] = useState("today")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType
    const matchesSearch = t.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kassa</h1>
          <p className="text-sm text-slate-500">
            Pul oqimini kuzating
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="today">Bugun</TabsTrigger>
              <TabsTrigger value="week">Hafta</TabsTrigger>
              <TabsTrigger value="month">Oy</TabsTrigger>
              <TabsTrigger value="custom">Boshqa</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Custom Date Range */}
      {timeRange === "custom" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Boshlanish sanasi"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Tugash sanasi"
                />
              </div>
              <Button>Qo&apos;llash</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Jami kirim</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </p>
                <p className="text-xs text-slate-500 mt-1">so&apos;m</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Jami chiqim</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpense)}
                </p>
                <p className="text-xs text-slate-500 mt-1">so&apos;m</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-red-600">+8.2%</span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <TrendingDown className="h-7 w-7 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Balans</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(balance)}
                </p>
                <p className="text-xs text-slate-500 mt-1">so&apos;m</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">+4.3%</span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Wallet className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Tranzaksiyalar</p>
                <p className="text-2xl font-bold text-purple-600">
                  {transactions.length}
                </p>
                <p className="text-xs text-slate-500 mt-1">ta</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-slate-500">Bugun</span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <CreditCard className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Tranzaksiyalar</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barchasi</SelectItem>
                  <SelectItem value="income">Kirim</SelectItem>
                  <SelectItem value="expense">Chiqim</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:w-[200px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Wallet className="h-16 w-16 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Tranzaksiya topilmadi
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tanlangan filtrlar bo&apos;yicha tranzaksiya yo&apos;q
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {paginatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md hover:border-slate-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-6 w-6 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-slate-500">{transaction.date}</p>
                        <span className="text-slate-300">•</span>
                        <Badge
                          variant="outline"
                          className={
                            transaction.method === "Naqd"
                              ? "border-blue-500 text-blue-600 bg-blue-50"
                              : "border-purple-500 text-purple-600 bg-purple-50"
                          }
                        >
                          {transaction.method}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">so&apos;m</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredTransactions.length
                )}{" "}
                / {filteredTransactions.length} ta tranzaksiya
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
