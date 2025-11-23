"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Receipt,
  Zap,
  Users,
  Home,
  MoreHorizontal,
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

const expenses = [
  {
    id: 1,
    description: "Elektr energiyasi",
    amount: 2500000,
    category: "Kommunal",
    date: "2025-01-15",
  },
  {
    id: 2,
    description: "Xodimlar ish haqi",
    amount: 12000000,
    category: "Ish haqi",
    date: "2025-01-13",
  },
  {
    id: 3,
    description: "Ombor ijarasi",
    amount: 5000000,
    category: "Ijara",
    date: "2025-01-12",
  },
  {
    id: 4,
    description: "Internet xizmati",
    amount: 350000,
    category: "Kommunal",
    date: "2025-01-10",
  },
  {
    id: 5,
    description: "Transport xarajatlari",
    amount: 1800000,
    category: "Boshqa",
    date: "2025-01-08",
  },
  {
    id: 6,
    description: "Suv to'lovi",
    amount: 450000,
    category: "Kommunal",
    date: "2025-01-05",
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Kommunal: <Zap className="h-4 w-4" />,
  "Ish haqi": <Users className="h-4 w-4" />,
  Ijara: <Home className="h-4 w-4" />,
  Boshqa: <MoreHorizontal className="h-4 w-4" />,
}

const categoryColors: Record<string, string> = {
  Kommunal: "bg-yellow-100 text-yellow-700",
  "Ish haqi": "bg-blue-100 text-blue-700",
  Ijara: "bg-purple-100 text-purple-700",
  Boshqa: "bg-gray-100 text-gray-700",
}

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage)
  const paginatedExpenses = filteredExpenses.slice(
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
          <h1 className="text-2xl font-bold text-slate-900">Harajatlar</h1>
          <p className="text-sm text-slate-500">
            Barcha xarajatlarni boshqaring
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Yangi harajat
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

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Harajatlar ro&apos;yxati</CardTitle>
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
            {paginatedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <Receipt className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-slate-500">{expense.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={categoryColors[expense.category]}>
                    <span className="mr-1">
                      {categoryIcons[expense.category]}
                    </span>
                    {expense.category}
                  </Badge>
                  <p className="text-lg font-semibold text-red-600">
                    -{formatCurrency(expense.amount)} so&apos;m
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

      {/* Add Expense Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi harajat</DialogTitle>
            <DialogDescription>
              Yangi harajat ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Tavsif</Label>
              <Input placeholder="Harajat tavsifi" />
            </div>
            <div>
              <Label className="mb-2 block">Summa</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div>
              <Label className="mb-2 block">Kategoriya</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kommunal">Kommunal</SelectItem>
                  <SelectItem value="ish-haqi">Ish haqi</SelectItem>
                  <SelectItem value="ijara">Ijara</SelectItem>
                  <SelectItem value="boshqa">Boshqa</SelectItem>
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
