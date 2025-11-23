import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const items = await prisma.itemMaster.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching items:", error)
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { barcode, name, productGroup, unit, minStock, description } = body

    // Check if barcode already exists
    const existing = await prisma.itemMaster.findUnique({
      where: { barcode },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Barcode already exists" },
        { status: 400 }
      )
    }

    const item = await prisma.itemMaster.create({
      data: {
        barcode,
        name,
        productGroup,
        unit,
        minStock: minStock || 10,
        description,
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error("Error creating item:", error)
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    )
  }
}
