import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const returns = await prisma.return.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(returns)
  } catch (error) {
    console.error("Error fetching returns:", error)
    return NextResponse.json(
      { error: "Failed to fetch returns" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      documentId,
      supplierId,
      supplierName,
      phone,
      reason,
      totalAmount,
      date,
      products,
    } = body

    const returnDoc = await prisma.return.create({
      data: {
        documentId,
        supplierId,
        supplierName,
        phone,
        reason,
        totalAmount,
        date,
        products: {
          create: products?.map((p: {
            barcode: string
            name: string
            quantity: number
            purchasePrice: string
            total: string
          }) => ({
            barcode: p.barcode,
            name: p.name,
            quantity: p.quantity,
            purchasePrice: p.purchasePrice,
            total: p.total,
          })) || [],
        },
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json(returnDoc, { status: 201 })
  } catch (error) {
    console.error("Error creating return:", error)
    return NextResponse.json(
      { error: "Failed to create return" },
      { status: 500 }
    )
  }
}
