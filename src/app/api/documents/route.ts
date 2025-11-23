import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(documents)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      docNumber,
      date,
      supplier,
      warehouse,
      paymentType,
      totalAmount,
      status,
      receiver,
      products,
    } = body

    const document = await prisma.document.create({
      data: {
        docNumber,
        date,
        supplier,
        warehouse,
        paymentType,
        totalAmount,
        status,
        receiver,
        itemsCount: products?.length || 0,
        products: {
          create: products?.map((p: {
            barcode: string
            name: string
            quantity: number
            markup: number
            purchasePrice: string
            sellingPrice: string
            totalPurchase: string
            totalSelling: string
            productGroup: string
            expiryDate?: string
          }) => ({
            barcode: p.barcode,
            name: p.name,
            quantity: p.quantity,
            markup: p.markup,
            purchasePrice: p.purchasePrice,
            sellingPrice: p.sellingPrice,
            totalPurchase: p.totalPurchase,
            totalSelling: p.totalSelling,
            productGroup: p.productGroup,
            expiryDate: p.expiryDate,
          })) || [],
        },
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    )
  }
}
