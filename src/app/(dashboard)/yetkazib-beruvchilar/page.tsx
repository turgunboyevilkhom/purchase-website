"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Building2,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const suppliers = [
  {
    id: 1,
    name: "Coca-Cola HBC",
    phone: "+998 71 123 45 67",
    address: "Toshkent sh., Chilonzor tumani",
    balance: -8500000,
    status: "active",
  },
  {
    id: 2,
    name: "Elma Group",
    phone: "+998 71 234 56 78",
    address: "Toshkent sh., Yakkasaroy tumani",
    balance: -3200000,
    status: "active",
  },
  {
    id: 3,
    name: "Nestle Uzbekistan",
    phone: "+998 71 345 67 89",
    address: "Toshkent sh., Mirzo Ulug'bek tumani",
    balance: 0,
    status: "active",
  },
  {
    id: 4,
    name: "P&G Distribution",
    phone: "+998 71 456 78 90",
    address: "Toshkent sh., Sergeli tumani",
    balance: -12000000,
    status: "active",
  },
  {
    id: 5,
    name: "Unilever",
    phone: "+998 71 567 89 01",
    address: "Toshkent sh., Olmazor tumani",
    balance: -5600000,
    status: "inactive",
  },
  {
    id: 6,
    name: "Mars Inc.",
    phone: "+998 71 678 90 12",
    address: "Toshkent sh., Shayxontohur tumani",
    balance: -2100000,
    status: "active",
  },
]

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage)
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(Math.abs(amount))
  }

  const totalDebt = suppliers.reduce((sum, s) => sum + s.balance, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Yetkazib beruvchilar
          </h1>
          <p className="text-sm text-slate-500">
            Barcha ta&apos;minotchilarni boshqaring
          </p>
        </div>
        <Link href="/yetkazib-beruvchilar/add">
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500">
            <Plus className="h-4 w-4" />
            Yangi ta&apos;minotchi
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jami ta&apos;minotchilar</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Faol</p>
                <p className="text-2xl font-bold">
                  {suppliers.filter((s) => s.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Building2 className="h-6 w-6 text-red-600" />
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
      </div>

      {/* Suppliers List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Ta&apos;minotchilar ro&apos;yxati</CardTitle>
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
            {paginatedSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-bold text-white">
                    {supplier.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {supplier.address}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        supplier.status === "active"
                          ? "border-green-500 text-green-600"
                          : "border-slate-400 text-slate-500"
                      }
                    >
                      {supplier.status === "active" ? "Faol" : "Nofaol"}
                    </Badge>
                    <p
                      className={`mt-1 text-lg font-semibold ${
                        supplier.balance < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {supplier.balance < 0 ? "-" : ""}
                      {formatCurrency(supplier.balance)} so&apos;m
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        O&apos;chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
