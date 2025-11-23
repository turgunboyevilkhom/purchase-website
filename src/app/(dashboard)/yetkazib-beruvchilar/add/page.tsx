"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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

export default function AddSupplierPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [email, setEmail] = useState("")
  const [inn, setInn] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [bankName, setBankName] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit to API
    console.log({
      name,
      phone,
      address,
      contactPerson,
      email,
      inn,
      bankAccount,
      bankName,
      paymentTerms,
      notes,
    })
    router.push("/yetkazib-beruvchilar")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/yetkazib-beruvchilar">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Yangi ta&apos;minotchi
          </h1>
          <p className="text-sm text-slate-500">
            Yangi ta&apos;minotchi ma&apos;lumotlarini kiriting
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-lg font-semibold">Asosiy ma&apos;lumotlar</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block">
                  Ta&apos;minotchi nomi <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kompaniya nomi"
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block">
                  Telefon raqami <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 XX XXX XX XX"
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block">Mas&apos;ul shaxs</Label>
                <Input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Ism familiya"
                />
              </div>
              <div>
                <Label className="mb-2 block">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="mb-2 block">Manzil</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="To'liq manzil"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-lg font-semibold">Bank rekvizitlari</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block">INN</Label>
                <Input
                  value={inn}
                  onChange={(e) => setInn(e.target.value)}
                  placeholder="123456789"
                />
              </div>
              <div>
                <Label className="mb-2 block">Bank nomi</Label>
                <Input
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Bank nomi"
                />
              </div>
              <div>
                <Label className="mb-2 block">Hisob raqami</Label>
                <Input
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX XXXX"
                />
              </div>
              <div>
                <Label className="mb-2 block">To&apos;lov shartlari</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prepaid">Oldindan to&apos;lov</SelectItem>
                    <SelectItem value="postpaid">Keyingi to&apos;lov</SelectItem>
                    <SelectItem value="credit-7">7 kunlik kredit</SelectItem>
                    <SelectItem value="credit-14">14 kunlik kredit</SelectItem>
                    <SelectItem value="credit-30">30 kunlik kredit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-lg font-semibold">Qo&apos;shimcha</h2>
            <div>
              <Label className="mb-2 block">Izohlar</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Qo'shimcha ma'lumotlar..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link href="/yetkazib-beruvchilar">
            <Button variant="outline">Bekor qilish</Button>
          </Link>
          <Button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-green-500"
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  )
}
