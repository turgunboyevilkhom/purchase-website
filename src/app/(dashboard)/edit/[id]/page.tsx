"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Search, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ProductRow {
  id: number
  barcode: string
  name: string
  stock: number
  quantity: number
  unit: string
  purchasePrice: number
  markup: number
  sellingPrice: number
  totalPurchase: number
  totalSelling: number
  expiryDate: string
}

// Sample documents data (in real app, this would come from API)
const documentsData: Record<string, {
  docNumber: string
  date: string
  supplier: string
  warehouse: string
  paymentType: string
  receiver: string
  status: string
  products: Array<{
    name: string
    quantity: number
    price: number
    total: number
    unit: string
    barcode: string
    markup: number
    sellingPrice: number
  }>
}> = {
  "2": {
    docNumber: "DOC-2025-002",
    date: "2025-01-14",
    supplier: "elma",
    warehouse: "asosiy",
    paymentType: "bank",
    receiver: "Alisher",
    status: "Qoralama",
    products: [
      { name: "Elma Sok 1L", quantity: 50, price: 14000, total: 700000, unit: "dona", barcode: "4600002345678", markup: 25, sellingPrice: 17500 },
      { name: "Elma Nektar 0.5L", quantity: 80, price: 9000, total: 720000, unit: "dona", barcode: "4600002345679", markup: 25, sellingPrice: 11250 },
    ],
  },
  "4": {
    docNumber: "DOC-2025-004",
    date: "2025-01-12",
    supplier: "pg",
    warehouse: "asosiy",
    paymentType: "bank",
    receiver: "Bobur",
    status: "Kutilmoqda",
    products: [
      { name: "Ariel 3kg", quantity: 100, price: 85000, total: 8500000, unit: "dona", barcode: "4600003456789", markup: 20, sellingPrice: 102000 },
      { name: "Tide 2kg", quantity: 60, price: 60000, total: 3600000, unit: "dona", barcode: "4600003456790", markup: 20, sellingPrice: 72000 },
    ],
  },
}

const suppliers = [
  { id: "coca-cola", name: "Coca-Cola HBC" },
  { id: "elma", name: "Elma Group" },
  { id: "nestle", name: "Nestle Uzbekistan" },
  { id: "pg", name: "P&G Distribution" },
]

export default function EditDocumentPage() {
  const router = useRouter()
  const params = useParams()
  const docId = params.id as string

  const [supplier, setSupplier] = useState("")
  const [warehouse, setWarehouse] = useState("")
  const [date, setDate] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [receiver, setReceiver] = useState("")
  const [docNumber, setDocNumber] = useState("")
  const [loading, setLoading] = useState(true)

  const [products, setProducts] = useState<ProductRow[]>([])

  useEffect(() => {
    // Load document data
    const docData = documentsData[docId]
    if (docData) {
      setSupplier(docData.supplier)
      setWarehouse(docData.warehouse)
      setDate(docData.date)
      setPaymentType(docData.paymentType)
      setReceiver(docData.receiver)
      setDocNumber(docData.docNumber)
      setProducts(
        docData.products.map((p, idx) => ({
          id: idx + 1,
          barcode: p.barcode,
          name: p.name,
          stock: 0,
          quantity: p.quantity,
          unit: p.unit,
          purchasePrice: p.price,
          markup: p.markup,
          sellingPrice: p.sellingPrice,
          totalPurchase: p.total,
          totalSelling: p.quantity * p.sellingPrice,
          expiryDate: "",
        }))
      )
    }
    setLoading(false)
  }, [docId])

  const addProductRow = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        barcode: "",
        name: "",
        stock: 0,
        quantity: 0,
        unit: "dona",
        purchasePrice: 0,
        markup: 25,
        sellingPrice: 0,
        totalPurchase: 0,
        totalSelling: 0,
        expiryDate: "",
      },
    ])
  }

  const removeProductRow = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const updateProduct = (
    id: number,
    field: keyof ProductRow,
    value: string | number
  ) => {
    setProducts(
      products.map((p) => {
        if (p.id !== id) return p

        const updated = { ...p, [field]: value }

        if (field === "purchasePrice" || field === "markup") {
          const purchasePrice =
            field === "purchasePrice" ? Number(value) : p.purchasePrice
          const markup = field === "markup" ? Number(value) : p.markup
          updated.sellingPrice = Math.round(
            purchasePrice * (1 + markup / 100)
          )
        }

        if (
          field === "quantity" ||
          field === "purchasePrice" ||
          field === "sellingPrice" ||
          field === "markup"
        ) {
          updated.totalPurchase = updated.quantity * updated.purchasePrice
          updated.totalSelling = updated.quantity * updated.sellingPrice
        }

        return updated
      })
    )
  }

  const totalPurchase = products.reduce((sum, p) => sum + p.totalPurchase, 0)
  const totalSelling = products.reduce((sum, p) => sum + p.totalSelling, 0)
  const totalItems = products.filter((p) => p.quantity > 0).length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const handleDownloadPDF = () => {
    const pdfContent = `
KIRIM HUJJATI

Hujjat raqami: ${docNumber}
Sana: ${date}
Ta'minotchi: ${suppliers.find(s => s.id === supplier)?.name || supplier}
Ombor: ${warehouse === 'asosiy' ? 'Asosiy ombor' : 'Ikkinchi ombor'}
To'lov turi: ${paymentType}

MAHSULOTLAR:
${products.map((p, i) => `${i + 1}. ${p.name} - ${p.quantity} ${p.unit} x ${formatCurrency(p.purchasePrice)} = ${formatCurrency(p.totalPurchase)} UZS`).join('\n')}

JAMI SUMMA: ${formatCurrency(totalPurchase)} UZS
    `.trim()

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${docNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = (status: "Qoralama" | "Tasdiqlangan") => {
    console.log({
      supplier,
      warehouse,
      date,
      paymentType,
      receiver,
      docNumber,
      products,
      status,
    })
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-slate-500">Yuklanmoqda...</p>
      </div>
    )
  }

  if (!documentsData[docId]) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-slate-500">Hujjat topilmadi</p>
        <Link href="/">
          <Button>Orqaga qaytish</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Hujjatni tahrirlash
            </h1>
            <p className="text-sm text-slate-500">
              Hujjat: {docNumber}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Yuklab olish
        </Button>
      </div>

      {/* Form Fields */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label className="mb-2 block">Ta&apos;minotchi</Label>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Ombor</Label>
              <Select value={warehouse} onValueChange={setWarehouse}>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asosiy">Asosiy ombor</SelectItem>
                  <SelectItem value="ikkinchi">Ikkinchi ombor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Sana</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block">To&apos;lov turi</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naqd">Naqd</SelectItem>
                  <SelectItem value="bank">Bank o&apos;tkazmasi</SelectItem>
                  <SelectItem value="qarz">Qarz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Qabul qiluvchi</Label>
              <Input
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="Xodim ismi"
              />
            </div>

            <div>
              <Label className="mb-2 block">Hujjat raqami</Label>
              <Input
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mahsulotlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Shtrix-kod</TableHead>
                  <TableHead className="min-w-[200px]">Nomi</TableHead>
                  <TableHead className="w-[80px]">Qoldiq</TableHead>
                  <TableHead className="w-[80px]">Miqdor</TableHead>
                  <TableHead className="w-[80px]">Birlik</TableHead>
                  <TableHead className="w-[120px]">Xarid narxi</TableHead>
                  <TableHead className="w-[80px]">Ustama %</TableHead>
                  <TableHead className="w-[120px]">Sotish narxi</TableHead>
                  <TableHead className="w-[120px]">Jami xarid</TableHead>
                  <TableHead className="w-[120px]">Jami sotish</TableHead>
                  <TableHead className="w-[120px]">Yaroqlilik</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative">
                        <Input
                          value={product.barcode}
                          onChange={(e) =>
                            updateProduct(product.id, "barcode", e.target.value)
                          }
                          placeholder="Skanerlang"
                          className="pr-8"
                        />
                        <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={product.name}
                        onChange={(e) =>
                          updateProduct(product.id, "name", e.target.value)
                        }
                        placeholder="Mahsulot nomi"
                      />
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-500">{product.stock}</span>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.quantity || ""}
                        onChange={(e) =>
                          updateProduct(
                            product.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={product.unit}
                        onValueChange={(v) =>
                          updateProduct(product.id, "unit", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dona">dona</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="litr">litr</SelectItem>
                          <SelectItem value="quti">quti</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.purchasePrice || ""}
                        onChange={(e) =>
                          updateProduct(
                            product.id,
                            "purchasePrice",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.markup || ""}
                        onChange={(e) =>
                          updateProduct(
                            product.id,
                            "markup",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.sellingPrice || ""}
                        onChange={(e) =>
                          updateProduct(
                            product.id,
                            "sellingPrice",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(product.totalPurchase)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(product.totalSelling)}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={product.expiryDate}
                        onChange={(e) =>
                          updateProduct(
                            product.id,
                            "expiryDate",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeProductRow(product.id)}
                        disabled={products.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button variant="outline" className="mt-4" onClick={addProductRow}>
            <Plus className="mr-2 h-4 w-4" />
            Qator qo&apos;shish
          </Button>
        </CardContent>
      </Card>

      {/* Totals and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-slate-500">Jami mahsulot:</span>
                <span className="ml-2 font-semibold">{totalItems} ta</span>
              </div>
              <div>
                <span className="text-slate-500">Xarid summasi:</span>
                <span className="ml-2 font-semibold">
                  {formatCurrency(totalPurchase)} so&apos;m
                </span>
              </div>
              <div>
                <span className="text-slate-500">Sotish summasi:</span>
                <span className="ml-2 font-semibold text-green-600">
                  {formatCurrency(totalSelling)} so&apos;m
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline">Bekor qilish</Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => handleSubmit("Qoralama")}
              >
                Qoralama sifatida saqlash
              </Button>
              <Button
                className="bg-gradient-to-r from-[#004B34] to-[#006644]"
                onClick={() => handleSubmit("Tasdiqlangan")}
              >
                Tasdiqlash
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
