import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const where: {
      date?: {
        gte?: string
        lte?: string
      }
    } = {}

    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = startDate
      if (endDate) where.date.lte = endDate
    }

    const writeOffs = await prisma.writeOff.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(writeOffs)
  } catch (error) {
    console.error("Error fetching write-offs:", error)
    return NextResponse.json(
      { error: "Failed to fetch write-offs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productName, barcode, warehouseId, quantity, reason, date } = body

    const writeOff = await prisma.writeOff.create({
      data: {
        productName,
        barcode,
        warehouseId,
        quantity,
        reason,
        date,
      },
    })

    // Also reduce inventory
    await prisma.inventoryStock.update({
      where: {
        barcode_warehouseId: {
          barcode,
          warehouseId,
        },
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    })

    return NextResponse.json(writeOff, { status: 201 })
  } catch (error) {
    console.error("Error creating write-off:", error)
    return NextResponse.json(
      { error: "Failed to create write-off" },
      { status: 500 }
    )
  }
}
