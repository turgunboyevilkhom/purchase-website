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
} from "lucide-react"
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
    // Create PDF content
    const pdfContent = `
KIRIM HUJJATI

Hujjat raqami: ${doc.docNumber}
Sana: ${doc.date}
Ta'minotchi: ${doc.supplier}
Ombor: ${doc.warehouse}
To'lov turi: ${doc.paymentType}
Status: ${doc.status}

MAHSULOTLAR:
${doc.products.map((p, i) => `${i + 1}. ${p.name} - ${p.quantity} dona x ${formatCurrency(p.price)} = ${formatCurrency(p.total)}`).join('\n')}

JAMI SUMMA: ${formatCurrency(doc.totalAmount)}
    `.trim()

    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.docNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " UZS"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kirim hujjatlari</h1>
          <p className="text-sm text-slate-500">
            Jami: {documents.length} ta hujjat
          </p>
        </div>
        <Link href="/add">
          <Button className="gap-2 bg-gradient-to-r from-[#004B34] to-[#006644]">
            <Plus className="h-4 w-4" />
            Yangi hujjat
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Hujjat raqami yoki ta'minotchi bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtrlar
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-4">
              <div>
                <Label className="mb-2 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Barchasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barchasi</SelectItem>
                    <SelectItem value="Tasdiqlangan">Tasdiqlangan</SelectItem>
                    <SelectItem value="Qoralama">Qoralama</SelectItem>
                    <SelectItem value="Kutilmoqda">Kutilmoqda</SelectItem>
                    <SelectItem value="Bekor qilingan">
                      Bekor qilingan
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">Ta&apos;minotchi</Label>
                <Select>
                  <SelectTrigger>
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
              <div>
                <Label className="mb-2 block">Sanadan</Label>
                <Input type="date" />
              </div>
              <div>
                <Label className="mb-2 block">Sanagacha</Label>
                <Input type="date" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hujjat raqami</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Ta&apos;minotchi</TableHead>
                <TableHead>Ombor</TableHead>
                <TableHead>To&apos;lov</TableHead>
                <TableHead className="text-right">Summa</TableHead>
                <TableHead className="text-center">Soni</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.docNumber}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{doc.supplier}</TableCell>
                  <TableCell>{doc.warehouse}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        doc.paymentType === "Naqd"
                          ? "border-blue-500 text-blue-500"
                          : "border-purple-500 text-purple-500"
                      }
                    >
                      {doc.paymentType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(doc.totalAmount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{doc.itemsCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`cursor-pointer ${statusColors[doc.status]}`}
                      onClick={() => handleStatusChange(doc)}
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDoc(doc)}
                        title="Ko'rish"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {doc.status !== "Tasdiqlangan" && (
                        <Link href={`/edit/${doc.id}`}>
                          <Button variant="ghost" size="icon" title="Tahrirlash">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadPDF(doc)}
                        title="Yuklab olish"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredDocs.length)} /{" "}
            {filteredDocs.length} ta hujjat
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Keyingi
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* View Document Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Hujjat tafsilotlari - {viewDoc?.docNumber}</DialogTitle>
          </DialogHeader>
          {viewDoc && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-slate-500">Ta&apos;minotchi</Label>
                  <p className="font-medium">{viewDoc.supplier}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Sana</Label>
                  <p className="font-medium">{viewDoc.date}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Ombor</Label>
                  <p className="font-medium">{viewDoc.warehouse}</p>
                </div>
                <div>
                  <Label className="text-slate-500">To&apos;lov turi</Label>
                  <p className="font-medium">{viewDoc.paymentType}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Status</Label>
                  <Badge className={statusColors[viewDoc.status]}>
                    {viewDoc.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="mb-2 font-semibold">Mahsulotlar</h4>
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
                    {viewDoc.products.map((product, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-center">{product.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(product.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-right">
                  <span className="text-slate-500">Jami summa: </span>
                  <span className="text-lg font-bold">{formatCurrency(viewDoc.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Yopish
            </Button>
            <Button onClick={() => viewDoc && handleDownloadPDF(viewDoc)}>
              <Download className="mr-2 h-4 w-4" />
              Yuklab olish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Statusni o&apos;zgartirish</DialogTitle>
            <DialogDescription>
              Hujjat: {selectedDoc?.docNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="mb-2 block">Yangi status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tasdiqlangan">Tasdiqlangan</SelectItem>
                <SelectItem value="Qoralama">Qoralama</SelectItem>
                <SelectItem value="Kutilmoqda">Kutilmoqda</SelectItem>
                <SelectItem value="Bekor qilingan">Bekor qilingan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
            >
              Bekor qilish
            </Button>
            <Button onClick={() => setShowStatusDialog(false)}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
