"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Calendar,
  Building2,
  Warehouse,
  CreditCard,
} from "lucide-react"
import jsPDF from "jspdf"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Sample data
const documents = [
  {
    id: 1,
    docNumber: "DOC-2025-001",
    date: "2025-01-15",
    supplier: "Coca-Cola HBC",
    warehouse: "Asosiy ombor",
    paymentType: "Naqd",
    totalAmount: 15500000,
    itemsCount: 24,
    status: "Tasdiqlangan",
    products: [
      { name: "Coca-Cola 1L", quantity: 100, price: 12000, total: 1200000 },
      { name: "Fanta 0.5L", quantity: 200, price: 8500, total: 1700000 },
      { name: "Sprite 1.5L", quantity: 150, price: 15000, total: 2250000 },
    ],
  },
  {
    id: 2,
    docNumber: "DOC-2025-002",
    date: "2025-01-14",
    supplier: "Elma Group",
    warehouse: "Asosiy ombor",
    paymentType: "Bank",
    totalAmount: 8750000,
    itemsCount: 15,
    status: "Qoralama",
    products: [
      { name: "Elma Sok 1L", quantity: 50, price: 14000, total: 700000 },
      { name: "Elma Nektar 0.5L", quantity: 80, price: 9000, total: 720000 },
    ],
  },
  {
    id: 3,
    docNumber: "DOC-2025-003",
    date: "2025-01-13",
    supplier: "Nestle Uzbekistan",
    warehouse: "Ikkinchi ombor",
    paymentType: "Naqd",
    totalAmount: 22300000,
    itemsCount: 32,
    status: "Tasdiqlangan",
    products: [
      { name: "Nestle Shokolad", quantity: 300, price: 25000, total: 7500000 },
      { name: "Nestle Kofe", quantity: 200, price: 45000, total: 9000000 },
    ],
  },
  {
    id: 4,
    docNumber: "DOC-2025-004",
    date: "2025-01-12",
    supplier: "P&G Distribution",
    warehouse: "Asosiy ombor",
    paymentType: "Bank",
    totalAmount: 12100000,
    itemsCount: 18,
    status: "Kutilmoqda",
    products: [
      { name: "Ariel 3kg", quantity: 100, price: 85000, total: 8500000 },
      { name: "Tide 2kg", quantity: 60, price: 60000, total: 3600000 },
    ],
  },
  {
    id: 5,
    docNumber: "DOC-2025-005",
    date: "2025-01-11",
    supplier: "Unilever",
    warehouse: "Asosiy ombor",
    paymentType: "Naqd",
    totalAmount: 9800000,
    itemsCount: 12,
    status: "Bekor qilingan",
    products: [
      { name: "Lipton Tea 100g", quantity: 200, price: 25000, total: 5000000 },
      { name: "Dove Soap", quantity: 150, price: 32000, total: 4800000 },
    ],
  },
]

const statusColors: Record<string, string> = {
  Tasdiqlangan: "bg-green-500",
  Qoralama: "bg-amber-500",
  "Bekor qilingan": "bg-red-500",
  Kutilmoqda: "bg-blue-500",
}

export default function IncomingDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<(typeof documents)[0] | null>(
    null
  )
  const [newStatus, setNewStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [viewDoc, setViewDoc] = useState<(typeof documents)[0] | null>(null)

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage)
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleStatusChange = (doc: (typeof documents)[0]) => {
    setSelectedDoc(doc)
    setNewStatus(doc.status)
    setShowStatusDialog(true)
  }

  const handleViewDoc = (doc: (typeof documents)[0]) => {
    setViewDoc(doc)
    setShowViewDialog(true)
  }

  const handleDownloadPDF = (doc: (typeof documents)[0]) => {
    // Create PDF document
    const pdf = new jsPDF()

    // Colors
    const primaryColor: [number, number, number] = [0, 75, 52] // #004B34
    const secondaryColor: [number, number, number] = [153, 198, 30] // #99C61E
    const textColor: [number, number, number] = [51, 51, 51]
    const lightGray: [number, number, number] = [245, 245, 245]

    // Header background
    pdf.setFillColor(...primaryColor)
    pdf.rect(0, 0, 210, 45, 'F')

    // Company name
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('KOMETA', 20, 25)

    // Subtitle
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Biznes tizimi', 20, 33)

    // Document type badge
    pdf.setFillColor(...secondaryColor)
    pdf.roundedRect(140, 15, 50, 20, 3, 3, 'F')
    pdf.setTextColor(...primaryColor)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('KIRIM HUJJATI', 145, 28)

    // Document info section
    let yPos = 60

    // Document number and date
    pdf.setTextColor(...primaryColor)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text(doc.docNumber, 20, yPos)

    pdf.setTextColor(...textColor)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Sana: ${doc.date}`, 150, yPos)

    yPos += 15

    // Info boxes
    const boxWidth = 85
    const boxHeight = 25
    const boxY = yPos

    // Supplier box
    pdf.setFillColor(...lightGray)
    pdf.roundedRect(20, boxY, boxWidth, boxHeight, 2, 2, 'F')
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.text("Ta'minotchi", 25, boxY + 8)
    pdf.setTextColor(...textColor)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(doc.supplier, 25, boxY + 18)

    // Warehouse box
    pdf.setFillColor(...lightGray)
    pdf.roundedRect(110, boxY, boxWidth, boxHeight, 2, 2, 'F')
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Ombor', 115, boxY + 8)
    pdf.setTextColor(...textColor)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(doc.warehouse, 115, boxY + 18)

    yPos = boxY + boxHeight + 10

    // Payment and Status boxes
    // Payment box
    pdf.setFillColor(...lightGray)
    pdf.roundedRect(20, yPos, boxWidth, boxHeight, 2, 2, 'F')
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text("To'lov turi", 25, yPos + 8)
    pdf.setTextColor(...textColor)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(doc.paymentType, 25, yPos + 18)

    // Status box
    const statusColors: Record<string, [number, number, number]> = {
      "Tasdiqlangan": [34, 197, 94],
      "Qoralama": [245, 158, 11],
      "Kutilmoqda": [59, 130, 246],
      "Bekor qilingan": [239, 68, 68],
    }
    const statusColor = statusColors[doc.status] || [100, 100, 100]

    pdf.setFillColor(...statusColor)
    pdf.roundedRect(110, yPos, boxWidth, boxHeight, 2, 2, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Status', 115, yPos + 8)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(doc.status, 115, yPos + 18)

    yPos += boxHeight + 20

    // Products table header
    pdf.setFillColor(...primaryColor)
    pdf.rect(20, yPos, 170, 10, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text('#', 25, yPos + 7)
    pdf.text('Mahsulot', 35, yPos + 7)
    pdf.text('Miqdor', 100, yPos + 7)
    pdf.text('Narx', 130, yPos + 7)
    pdf.text('Jami', 160, yPos + 7)

    yPos += 10

    // Products rows
    pdf.setFont('helvetica', 'normal')
    doc.products.forEach((product, idx) => {
      const rowColor: [number, number, number] = idx % 2 === 0 ? [255, 255, 255] : [250, 250, 250]
      pdf.setFillColor(...rowColor)
      pdf.rect(20, yPos, 170, 10, 'F')

      pdf.setTextColor(...textColor)
      pdf.setFontSize(9)
      pdf.text(String(idx + 1), 25, yPos + 7)
      pdf.text(product.name, 35, yPos + 7)
      pdf.text(String(product.quantity), 100, yPos + 7)
      pdf.text(formatCurrency(product.price), 130, yPos + 7)
      pdf.setFont('helvetica', 'bold')
      pdf.text(formatCurrency(product.total), 160, yPos + 7)
      pdf.setFont('helvetica', 'normal')

      yPos += 10
    })

    // Table border
    pdf.setDrawColor(200, 200, 200)
    pdf.rect(20, yPos - (doc.products.length * 10) - 10, 170, (doc.products.length * 10) + 10)

    yPos += 10

    // Total section
    pdf.setFillColor(...secondaryColor)
    pdf.roundedRect(110, yPos, 80, 20, 3, 3, 'F')
    pdf.setTextColor(...primaryColor)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('JAMI SUMMA:', 115, yPos + 8)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text(formatCurrency(doc.totalAmount), 115, yPos + 16)

    // Footer
    pdf.setTextColor(150, 150, 150)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Yaratilgan: ${new Date().toLocaleDateString('uz-UZ')} | Kometa Biznes Tizimi`, 20, 280)

    // Save PDF
    pdf.save(`${doc.docNumber}.pdf`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " UZS"
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#004B34] to-[#006644] shadow-lg shadow-[#004B34]/20">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kirim hujjatlari</h1>
              <p className="text-sm text-slate-500">
                Jami <span className="font-semibold text-[#004B34]">{documents.length}</span> ta hujjat mavjud
              </p>
            </div>
          </div>
        </div>
        <Link href="/add">
          <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-[#004B34] to-[#006644] hover:from-[#003D2B] hover:to-[#005535] shadow-lg shadow-[#004B34]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#004B34]/30 rounded-xl font-medium">
            <Plus className="h-5 w-5" />
            Yangi hujjat
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{documents.filter(d => d.status === "Tasdiqlangan").length}</p>
              <p className="text-xs text-slate-500">Tasdiqlangan</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{documents.filter(d => d.status === "Qoralama").length}</p>
              <p className="text-xs text-slate-500">Qoralama</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{documents.filter(d => d.status === "Kutilmoqda").length}</p>
              <p className="text-xs text-slate-500">Kutilmoqda</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#99C61E]/10">
              <CreditCard className="h-5 w-5 text-[#004B34]" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(documents.reduce((sum, d) => sum + d.totalAmount, 0)).replace(' UZS', '')}</p>
              <p className="text-xs text-slate-500">Jami summa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Hujjat raqami yoki ta'minotchi bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all focus:ring-2 focus:ring-[#99C61E]/20 focus:border-[#99C61E]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 h-12 px-5 rounded-xl border-slate-200 hover:border-[#99C61E] hover:bg-[#99C61E]/5 transition-all ${showFilters ? 'bg-[#99C61E]/10 border-[#99C61E] text-[#004B34]' : ''}`}
            >
              <Filter className="h-5 w-5" />
              Filtrlar
              {showFilters && <span className="ml-1 text-xs bg-[#004B34] text-white px-2 py-0.5 rounded-full">ON</span>}
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-4 animate-fade-in">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Barchasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barchasi</SelectItem>
                    <SelectItem value="Tasdiqlangan">Tasdiqlangan</SelectItem>
                    <SelectItem value="Qoralama">Qoralama</SelectItem>
                    <SelectItem value="Kutilmoqda">Kutilmoqda</SelectItem>
                    <SelectItem value="Bekor qilingan">Bekor qilingan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Ta&apos;minotchi</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Barchasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barchasi</SelectItem>
                    <SelectItem value="coca-cola">Coca-Cola HBC</SelectItem>
                    <SelectItem value="elma">Elma Group</SelectItem>
                    <SelectItem value="nestle">Nestle Uzbekistan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Sanadan</Label>
                <Input type="date" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Sanagacha</Label>
                <Input type="date" className="h-11 rounded-xl" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableHead className="font-semibold text-slate-700 py-4">Hujjat raqami</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sana</TableHead>
                  <TableHead className="font-semibold text-slate-700">Ta&apos;minotchi</TableHead>
                  <TableHead className="font-semibold text-slate-700">Ombor</TableHead>
                  <TableHead className="font-semibold text-slate-700">To&apos;lov</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Summa</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Mahsulot</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="stagger-animation">
                {paginatedDocs.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="font-semibold text-[#004B34] py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-[#99C61E]/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-[#004B34]" />
                        </div>
                        {doc.docNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {doc.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                          {doc.supplier.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-medium text-slate-700">{doc.supplier}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Warehouse className="h-4 w-4 text-slate-400" />
                        {doc.warehouse}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-medium ${
                          doc.paymentType === "Naqd"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-purple-200 bg-purple-50 text-purple-700"
                        }`}
                      >
                        {doc.paymentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-slate-900">{formatCurrency(doc.totalAmount)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-semibold">
                        {doc.itemsCount} ta
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`cursor-pointer font-medium shadow-sm transition-all hover:scale-105 ${
                          doc.status === "Tasdiqlangan" ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30" :
                          doc.status === "Qoralama" ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30" :
                          doc.status === "Kutilmoqda" ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30" :
                          "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                        }`}
                        onClick={() => handleStatusChange(doc)}
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDoc(doc)}
                          className="h-9 w-9 rounded-xl hover:bg-[#99C61E]/10 hover:text-[#004B34]"
                          title="Ko'rish"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {doc.status !== "Tasdiqlangan" && (
                          <Link href={`/edit/${doc.id}`}>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600" title="Tahrirlash">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadPDF(doc)}
                          className="h-9 w-9 rounded-xl hover:bg-emerald-50 hover:text-emerald-600"
                          title="PDF yuklab olish"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-lg shadow-slate-200/50">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-[#004B34]">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredDocs.length)}</span>
            {" "}/ {filteredDocs.length} ta hujjat
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-10 px-4 rounded-xl hover:bg-[#99C61E]/10 hover:border-[#99C61E] hover:text-[#004B34] disabled:opacity-50 transition-all"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Oldingi
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-xl transition-all ${currentPage === page ? 'bg-[#004B34] hover:bg-[#003D2B]' : 'hover:bg-[#99C61E]/10 hover:border-[#99C61E]'}`}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-10 px-4 rounded-xl hover:bg-[#99C61E]/10 hover:border-[#99C61E] hover:text-[#004B34] disabled:opacity-50 transition-all"
            >
              Keyingi
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* View Document Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#004B34] to-[#006644] flex items-center justify-center shadow-lg shadow-[#004B34]/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900">{viewDoc?.docNumber}</DialogTitle>
                <p className="text-sm text-slate-500">Hujjat tafsilotlari</p>
              </div>
            </div>
          </DialogHeader>
          {viewDoc && (
            <div className="space-y-6 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Ta&apos;minotchi</Label>
                  </div>
                  <p className="font-semibold text-slate-900">{viewDoc.supplier}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Sana</Label>
                  </div>
                  <p className="font-semibold text-slate-900">{viewDoc.date}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Warehouse className="h-4 w-4 text-slate-400" />
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Ombor</Label>
                  </div>
                  <p className="font-semibold text-slate-900">{viewDoc.warehouse}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-slate-400" />
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">To&apos;lov turi</Label>
                  </div>
                  <p className="font-semibold text-slate-900">{viewDoc.paymentType}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Mahsulotlar</h4>
                  <Badge
                    className={`font-medium ${
                      viewDoc.status === "Tasdiqlangan" ? "bg-emerald-500 shadow-emerald-500/30" :
                      viewDoc.status === "Qoralama" ? "bg-amber-500 shadow-amber-500/30" :
                      viewDoc.status === "Kutilmoqda" ? "bg-blue-500 shadow-blue-500/30" :
                      "bg-red-500 shadow-red-500/30"
                    } shadow-lg`}
                  >
                    {viewDoc.status}
                  </Badge>
                </div>
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Mahsulot</TableHead>
                        <TableHead className="text-center font-semibold">Miqdor</TableHead>
                        <TableHead className="text-right font-semibold">Narx</TableHead>
                        <TableHead className="text-right font-semibold">Jami</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewDoc.products.map((product, idx) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50">
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="text-center">{product.quantity}</TableCell>
                          <TableCell className="text-right text-slate-600">{formatCurrency(product.price)}</TableCell>
                          <TableCell className="text-right font-semibold text-[#004B34]">{formatCurrency(product.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="bg-gradient-to-r from-[#99C61E]/10 to-[#99C61E]/5 rounded-xl px-6 py-3 border border-[#99C61E]/20">
                    <span className="text-sm text-slate-600">Jami summa: </span>
                    <span className="text-xl font-bold text-[#004B34]">{formatCurrency(viewDoc.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="pt-4 border-t border-slate-100 gap-3">
            <Button variant="outline" onClick={() => setShowViewDialog(false)} className="rounded-xl h-11 px-6">
              Yopish
            </Button>
            <Button onClick={() => viewDoc && handleDownloadPDF(viewDoc)} className="rounded-xl h-11 px-6 bg-gradient-to-r from-[#004B34] to-[#006644] hover:from-[#003D2B] hover:to-[#005535] shadow-lg shadow-[#004B34]/20">
              <Download className="mr-2 h-4 w-4" />
              PDF yuklab olish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#99C61E]/10 flex items-center justify-center">
                <Edit className="h-5 w-5 text-[#004B34]" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900">Statusni o&apos;zgartirish</DialogTitle>
                <DialogDescription className="text-sm">
                  {selectedDoc?.docNumber}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <Label className="mb-3 block text-sm font-medium text-slate-700">Yangi statusni tanlang</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tasdiqlangan">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    Tasdiqlangan
                  </div>
                </SelectItem>
                <SelectItem value="Qoralama">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Qoralama
                  </div>
                </SelectItem>
                <SelectItem value="Kutilmoqda">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    Kutilmoqda
                  </div>
                </SelectItem>
                <SelectItem value="Bekor qilingan">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    Bekor qilingan
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
              className="rounded-xl h-11 px-6"
            >
              Bekor qilish
            </Button>
            <Button onClick={() => setShowStatusDialog(false)} className="rounded-xl h-11 px-6 bg-gradient-to-r from-[#004B34] to-[#006644] hover:from-[#003D2B] hover:to-[#005535] shadow-lg shadow-[#004B34]/20">
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
