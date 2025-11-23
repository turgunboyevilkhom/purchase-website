"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const suppliers = [
  {
    id: 1,
    name: "Coca-Cola HBC",
    contact: "Aziz Karimov",
    phone: "+998 90 123 45 67",
    email: "aziz@coca-cola.uz",
    address: "Toshkent sh., Chilonzor t.",
    status: "active",
    totalOrders: 156,
    totalDebt: 25000000,
  },
  {
    id: 2,
    name: "Elma Group",
    contact: "Sardor Alimov",
    phone: "+998 91 234 56 78",
    email: "sardor@elma.uz",
    address: "Toshkent sh., Yakkasaroy t.",
    status: "active",
    totalOrders: 89,
    totalDebt: 12500000,
  },
  {
    id: 3,
    name: "Nestle Uzbekistan",
    contact: "Malika Rahimova",
    phone: "+998 93 345 67 89",
    email: "malika@nestle.uz",
    address: "Toshkent sh., Mirzo Ulug'bek t.",
    status: "active",
    totalOrders: 234,
    totalDebt: 0,
  },
  {
    id: 4,
    name: "P&G Distribution",
    contact: "Bobur Toshmatov",
    phone: "+998 94 456 78 90",
    email: "bobur@pg.uz",
    address: "Toshkent sh., Sergeli t.",
    status: "inactive",
    totalOrders: 45,
    totalDebt: 8700000,
  },
  {
    id: 5,
    name: "Unilever",
    contact: "Dilnoza Karimova",
    phone: "+998 95 567 89 01",
    email: "dilnoza@unilever.uz",
    address: "Toshkent sh., Olmazor t.",
    status: "active",
    totalOrders: 178,
    totalDebt: 15300000,
  },
  {
    id: 6,
    name: "Mars Inc.",
    contact: "Jahongir Saidov",
    phone: "+998 97 678 90 12",
    email: "jahongir@mars.uz",
    address: "Toshkent sh., Uchtepa t.",
    status: "active",
    totalOrders: 67,
    totalDebt: 5600000,
  },
]

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage)
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const totalDebt = suppliers.reduce((sum, s) => sum + s.totalDebt, 0)
  const activeSuppliers = suppliers.filter((s) => s.status === "active").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004B34]">
            Yetkazib beruvchilar
          </h1>
          <p className="text-sm text-[#004B34]/60">
            Barcha ta&apos;minotchilarni boshqaring
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34] font-semibold hover:from-[#AAD72F] hover:to-[#8BB918]"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Yangi ta&apos;minotchi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-[#99C61E]/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004B34]/10">
                <Building2 className="h-6 w-6 text-[#004B34]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Jami ta&apos;minotchilar</p>
                <p className="text-2xl font-bold text-[#004B34]">{suppliers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#99C61E]/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#99C61E]/10">
                <Building2 className="h-6 w-6 text-[#99C61E]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Faol ta&apos;minotchilar</p>
                <p className="text-2xl font-bold text-[#004B34]">{activeSuppliers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <Building2 className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Umumiy qarzdorlik</p>
                <p className="text-2xl font-bold text-[#004B34]">{formatCurrency(totalDebt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers List */}
      <Card className="border-[#99C61E]/20">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-[#004B34]">Ta&apos;minotchilar ro&apos;yxati</CardTitle>
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
            {paginatedSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="flex flex-col gap-4 rounded-xl border border-[#99C61E]/20 p-4 transition-all hover:shadow-md hover:shadow-[#99C61E]/10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004B34]/10">
                    <Building2 className="h-6 w-6 text-[#004B34]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#004B34]">{supplier.name}</p>
                      <Badge
                        className={
                          supplier.status === "active"
                            ? "bg-[#99C61E] text-[#004B34]"
                            : "bg-gray-200 text-gray-600"
                        }
                      >
                        {supplier.status === "active" ? "Faol" : "Nofaol"}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#004B34]/60">{supplier.contact}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#004B34]/60">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {supplier.email}
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
                    <p className="text-sm text-[#004B34]/60">Buyurtmalar</p>
                    <p className="font-semibold text-[#004B34]">{supplier.totalOrders}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#004B34]/60">Qarzdorlik</p>
                    <p className={`font-semibold ${supplier.totalDebt > 0 ? "text-red-500" : "text-[#99C61E]"}`}>
                      {formatCurrency(supplier.totalDebt)} so&apos;m
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

      {/* Add Supplier Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi ta&apos;minotchi</DialogTitle>
            <DialogDescription>
              Yangi ta&apos;minotchi ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Kompaniya nomi</Label>
              <Input placeholder="Kompaniya nomi" />
            </div>
            <div>
              <Label className="mb-2 block">Aloqa shaxsi</Label>
              <Input placeholder="To'liq ism" />
            </div>
            <div>
              <Label className="mb-2 block">Telefon raqami</Label>
              <Input placeholder="+998 90 123 45 67" />
            </div>
            <div>
              <Label className="mb-2 block">Email</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div>
              <Label className="mb-2 block">Manzil</Label>
              <Input placeholder="Manzilni kiriting" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Bekor qilish
            </Button>
            <Button
              onClick={() => setShowAddDialog(false)}
              className="bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34]"
            >
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
