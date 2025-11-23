import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const where: {
      type?: string
      date?: {
        gte?: string
        lte?: string
      }
    } = {}

    if (type && type !== "all") {
      where.type = type
    }

    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = startDate
      if (endDate) where.date.lte = endDate
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, description, amount, method, category, supplierId, date } =
      body

    const transaction = await prisma.transaction.create({
      data: {
        type,
        description,
        amount,
        method,
        category,
        supplierId,
        date,
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    )
  }
}
