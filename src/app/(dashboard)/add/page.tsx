"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Search } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

interface Supplier {
  id: string
  name: string
  phone: string
  address: string
}

interface Product {
  id: string
  barcode: string
  name: string
  category: string
  unit: string
}

// Initial suppliers list
const initialSuppliers: Supplier[] = [
  { id: "coca-cola", name: "Coca-Cola HBC", phone: "+998 90 123 45 67", address: "Tashkent" },
  { id: "elma", name: "Elma Group", phone: "+998 90 234 56 78", address: "Tashkent" },
  { id: "nestle", name: "Nestle Uzbekistan", phone: "+998 90 345 67 89", address: "Tashkent" },
  { id: "pg", name: "P&G Distribution", phone: "+998 90 456 78 90", address: "Tashkent" },
]

// Initial products catalog
const initialProductsCatalog: Product[] = [
  { id: "1", barcode: "4600001234567", name: "Coca-Cola 1L", category: "Ichimliklar", unit: "dona" },
  { id: "2", barcode: "4600001234568", name: "Fanta 0.5L", category: "Ichimliklar", unit: "dona" },
  { id: "3", barcode: "4600001234569", name: "Sprite 1.5L", category: "Ichimliklar", unit: "dona" },
]

export default function AddDocumentPage() {
  const router = useRouter()
  const [supplier, setSupplier] = useState("")
  const [warehouse, setWarehouse] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [paymentType, setPaymentType] = useState("")
  const [receiver, setReceiver] = useState("")
  const [docNumber, setDocNumber] = useState(
    `DOC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
  )

  // Suppliers state
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [showAddSupplier, setShowAddSupplier] = useState(false)
  const [newSupplierName, setNewSupplierName] = useState("")
  const [newSupplierPhone, setNewSupplierPhone] = useState("")
  const [newSupplierAddress, setNewSupplierAddress] = useState("")

  // Products catalog state
  const [productsCatalog, setProductsCatalog] = useState<Product[]>(initialProductsCatalog)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProductBarcode, setNewProductBarcode] = useState("")
  const [newProductName, setNewProductName] = useState("")
  const [newProductCategory, setNewProductCategory] = useState("")
  const [newProductUnit, setNewProductUnit] = useState("")

  const [products, setProducts] = useState<ProductRow[]>([
    {
      id: 1,
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

        // Auto-calculate selling price based on markup
        if (field === "purchasePrice" || field === "markup") {
          const purchasePrice =
            field === "purchasePrice" ? Number(value) : p.purchasePrice
          const markup = field === "markup" ? Number(value) : p.markup
          updated.sellingPrice = Math.round(
            purchasePrice * (1 + markup / 100)
          )
        }

        // Calculate totals
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

  // Add new supplier handler
  const handleAddSupplier = () => {
    if (newSupplierName && newSupplierPhone) {
      const newId = newSupplierName.toLowerCase().replace(/\s+/g, '-')
      const newSupplier: Supplier = {
        id: newId,
        name: newSupplierName,
        phone: newSupplierPhone,
        address: newSupplierAddress,
      }
      setSuppliers([...suppliers, newSupplier])
      setSupplier(newId)
      setNewSupplierName("")
      setNewSupplierPhone("")
      setNewSupplierAddress("")
      setShowAddSupplier(false)
    }
  }

  // Add new product to catalog handler
  const handleAddProductToCatalog = () => {
    if (newProductBarcode && newProductName && newProductCategory && newProductUnit) {
      const newProduct: Product = {
        id: String(productsCatalog.length + 1),
        barcode: newProductBarcode,
        name: newProductName,
        category: newProductCategory,
        unit: newProductUnit,
      }
      setProductsCatalog([...productsCatalog, newProduct])

      // Also add a row to the products table with this product
      const newRow: ProductRow = {
        id: products.length + 1,
        barcode: newProductBarcode,
        name: newProductName,
        stock: 0,
        quantity: 1,
        unit: newProductUnit,
        purchasePrice: 0,
        markup: 25,
        sellingPrice: 0,
        totalPurchase: 0,
        totalSelling: 0,
        expiryDate: "",
      }
      setProducts([...products, newRow])

      setNewProductBarcode("")
      setNewProductName("")
      setNewProductCategory("")
      setNewProductUnit("")
      setShowAddProduct(false)
    }
  }

  const totalPurchase = products.reduce((sum, p) => sum + p.totalPurchase, 0)
  const totalSelling = products.reduce((sum, p) => sum + p.totalSelling, 0)
  const totalItems = products.filter((p) => p.quantity > 0).length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const handleSubmit = (status: "Qoralama" | "Tasdiqlangan") => {
    // Here you would submit to API
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Yangi kirim hujjati
          </h1>
          <p className="text-sm text-slate-500">
            Yangi xarid hujjatini yarating
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label className="mb-2 block">Ta&apos;minotchi</Label>
              <div className="flex gap-2">
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger className="flex-1">
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowAddSupplier(true)}
                  title="Yangi ta'minotchi qo'shish"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddProduct(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yangi tovar qo&apos;shish
          </Button>
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

      {/* Add Supplier Dialog */}
      <Dialog open={showAddSupplier} onOpenChange={setShowAddSupplier}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi ta&apos;minotchi qo&apos;shish</DialogTitle>
            <DialogDescription>
              Yangi ta&apos;minotchi ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Nomi <span className="text-red-500">*</span></Label>
              <Input
                placeholder="Ta'minotchi nomi"
                value={newSupplierName}
                onChange={(e) => setNewSupplierName(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Telefon <span className="text-red-500">*</span></Label>
              <Input
                placeholder="+998 XX XXX XX XX"
                value={newSupplierPhone}
                onChange={(e) => setNewSupplierPhone(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Manzil</Label>
              <Input
                placeholder="Manzil"
                value={newSupplierAddress}
                onChange={(e) => setNewSupplierAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddSupplier(false)
                setNewSupplierName("")
                setNewSupplierPhone("")
                setNewSupplierAddress("")
              }}
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleAddSupplier}
              disabled={!newSupplierName || !newSupplierPhone}
              className="bg-gradient-to-r from-[#004B34] to-[#006644]"
            >
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi tovar qo&apos;shish</DialogTitle>
            <DialogDescription>
              Yangi tovar ma&apos;lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Shtrix-kod <span className="text-red-500">*</span></Label>
              <Input
                placeholder="Shtrix-kod"
                value={newProductBarcode}
                onChange={(e) => setNewProductBarcode(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Nomi <span className="text-red-500">*</span></Label>
              <Input
                placeholder="Mahsulot nomi"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Kategoriya <span className="text-red-500">*</span></Label>
              <Select value={newProductCategory} onValueChange={setNewProductCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ichimliklar">Ichimliklar</SelectItem>
                  <SelectItem value="oziq-ovqat">Oziq-ovqat</SelectItem>
                  <SelectItem value="gigiyena">Gigiyena</SelectItem>
                  <SelectItem value="maishiy">Maishiy texnika</SelectItem>
                  <SelectItem value="boshqa">Boshqa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">O&apos;lchov birligi <span className="text-red-500">*</span></Label>
              <Select value={newProductUnit} onValueChange={setNewProductUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dona">dona</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="litr">litr</SelectItem>
                  <SelectItem value="quti">quti</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddProduct(false)
                setNewProductBarcode("")
                setNewProductName("")
                setNewProductCategory("")
                setNewProductUnit("")
              }}
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleAddProductToCatalog}
              disabled={!newProductBarcode || !newProductName || !newProductCategory || !newProductUnit}
              className="bg-gradient-to-r from-[#004B34] to-[#006644]"
            >
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
