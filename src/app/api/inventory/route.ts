import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const warehouseId = searchParams.get("warehouseId")

    const where = warehouseId ? { warehouseId: parseInt(warehouseId) } : {}

    const inventory = await prisma.inventoryStock.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    })
    return NextResponse.json(inventory)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      barcode,
      name,
      productGroup,
      warehouseId,
      quantity,
      purchasePrice,
      sellingPrice,
      expiryDate,
    } = body

    const inventory = await prisma.inventoryStock.upsert({
      where: {
        barcode_warehouseId: {
          barcode,
          warehouseId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
        purchasePrice,
        sellingPrice,
        expiryDate,
      },
      create: {
        barcode,
        name,
        productGroup,
        warehouseId,
        quantity,
        purchasePrice,
        sellingPrice,
        expiryDate,
      },
    })

    return NextResponse.json(inventory, { status: 201 })
  } catch (error) {
    console.error("Error updating inventory:", error)
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    )
  }
}
