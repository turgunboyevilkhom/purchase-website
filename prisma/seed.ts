import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create User
  await prisma.user.upsert({
    where: { username: "bobs" },
    update: {},
    create: {
      username: "bobs",
      password: "bobs2025",
      name: "Admin User",
      role: "admin",
    },
  })

  // Create Warehouses
  const warehouse1 = await prisma.warehouse.upsert({
    where: { name: "Asosiy ombor" },
    update: {},
    create: {
      name: "Asosiy ombor",
      location: "Toshkent shahri",
    },
  })

  const warehouse2 = await prisma.warehouse.upsert({
    where: { name: "Ikkinchi ombor" },
    update: {},
    create: {
      name: "Ikkinchi ombor",
      location: "Samarqand shahri",
    },
  })

  // Create Suppliers
  const suppliers = [
    { name: "Coca-Cola HBC", phone: "+998 90 123 45 67", address: "Toshkent" },
    { name: "Elma Group", phone: "+998 90 234 56 78", address: "Toshkent" },
    { name: "Nestle Uzbekistan", phone: "+998 90 345 67 89", address: "Toshkent" },
    { name: "P&G Distribution", phone: "+998 90 456 78 90", address: "Toshkent" },
    { name: "Unilever", phone: "+998 90 567 89 01", address: "Toshkent" },
  ]

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: {},
      create: supplier,
    })
  }

  // Create Item Master
  const items = [
    { barcode: "4600492001234", name: "Coca-Cola 1L", productGroup: "Ichimliklar", unit: "dona" },
    { barcode: "4600492001235", name: "Fanta 0.5L", productGroup: "Ichimliklar", unit: "dona" },
    { barcode: "4600492001236", name: "Sprite 1.5L", productGroup: "Ichimliklar", unit: "dona" },
    { barcode: "7613035123456", name: "Nestle Shokolad", productGroup: "Oziq-ovqat", unit: "dona" },
    { barcode: "8901234567890", name: "Colgate 100ml", productGroup: "Gigiyena", unit: "dona" },
    { barcode: "8712100234567", name: "Lipton Choy 100g", productGroup: "Ichimliklar", unit: "dona" },
    { barcode: "5410076769001", name: "Ariel 450g", productGroup: "Maishiy kimyo", unit: "dona" },
    { barcode: "6130254001234", name: "Arizona 0.5L", productGroup: "Ichimliklar", unit: "dona" },
  ]

  for (const item of items) {
    await prisma.itemMaster.upsert({
      where: { barcode: item.barcode },
      update: {},
      create: item,
    })
  }

  // Create Price Lists
  await prisma.priceList.upsert({
    where: { name: "Narxlar ro'yxati 01" },
    update: {},
    create: { name: "Narxlar ro'yxati 01" },
  })

  await prisma.priceList.upsert({
    where: { name: "Narxlar ro'yxati 02" },
    update: {},
    create: { name: "Narxlar ro'yxati 02" },
  })

  // Create Inventory Stock
  const inventoryItems = [
    { barcode: "4600492001234", name: "Coca-Cola 1L", productGroup: "Ichimliklar", warehouseId: 1, quantity: 156, purchasePrice: "10000", sellingPrice: "12000" },
    { barcode: "4600492001235", name: "Fanta 0.5L", productGroup: "Ichimliklar", warehouseId: 1, quantity: 42, purchasePrice: "7000", sellingPrice: "8500" },
    { barcode: "4600492001236", name: "Sprite 1.5L", productGroup: "Ichimliklar", warehouseId: 1, quantity: 8, purchasePrice: "12000", sellingPrice: "15000" },
    { barcode: "7613035123456", name: "Nestle Shokolad", productGroup: "Oziq-ovqat", warehouseId: 1, quantity: 234, purchasePrice: "20000", sellingPrice: "25000" },
    { barcode: "8901234567890", name: "Colgate 100ml", productGroup: "Gigiyena", warehouseId: 1, quantity: 0, purchasePrice: "14000", sellingPrice: "18000" },
    { barcode: "8712100234567", name: "Lipton Choy 100g", productGroup: "Ichimliklar", warehouseId: 1, quantity: 67, purchasePrice: "26000", sellingPrice: "32000" },
    { barcode: "5410076769001", name: "Ariel 450g", productGroup: "Maishiy kimyo", warehouseId: 1, quantity: 23, purchasePrice: "36000", sellingPrice: "45000" },
    { barcode: "6130254001234", name: "Arizona 0.5L", productGroup: "Ichimliklar", warehouseId: 1, quantity: 89, purchasePrice: "11000", sellingPrice: "14000" },
  ]

  for (const item of inventoryItems) {
    await prisma.inventoryStock.upsert({
      where: {
        barcode_warehouseId: {
          barcode: item.barcode,
          warehouseId: item.warehouseId,
        },
      },
      update: { quantity: item.quantity },
      create: item,
    })
  }

  // Create sample documents
  const doc1 = await prisma.document.create({
    data: {
      docNumber: "DOC-2025-001",
      date: "2025-01-15",
      supplier: "Coca-Cola HBC",
      warehouse: "Asosiy ombor",
      paymentType: "Naqd",
      totalAmount: "15500000",
      status: "Tasdiqlangan",
      itemsCount: 3,
      products: {
        create: [
          {
            barcode: "4600492001234",
            name: "Coca-Cola 1L",
            quantity: 100,
            markup: 25,
            purchasePrice: "10000",
            sellingPrice: "12500",
            totalPurchase: "1000000",
            totalSelling: "1250000",
            productGroup: "Ichimliklar",
          },
          {
            barcode: "4600492001235",
            name: "Fanta 0.5L",
            quantity: 200,
            markup: 21,
            purchasePrice: "7000",
            sellingPrice: "8500",
            totalPurchase: "1400000",
            totalSelling: "1700000",
            productGroup: "Ichimliklar",
          },
        ],
      },
    },
  })

  // Create sample transactions
  const transactions = [
    { type: "income", description: "Sotuvdan tushum - DOC-2025-001", amount: 15500000, method: "Naqd", date: "2025-01-15" },
    { type: "expense", description: "Ta'minotchi to'lovi - Coca-Cola", amount: 8000000, method: "Bank", date: "2025-01-15" },
    { type: "income", description: "Sotuvdan tushum - DOC-2025-002", amount: 8750000, method: "Bank", date: "2025-01-14" },
    { type: "expense", description: "Kommunal xarajatlar", amount: 2500000, method: "Bank", category: "Kommunal", date: "2025-01-14" },
    { type: "income", description: "Sotuvdan tushum - DOC-2025-003", amount: 22300000, method: "Naqd", date: "2025-01-13" },
    { type: "expense", description: "Ish haqi to'lovi", amount: 12000000, method: "Bank", category: "Ish haqi", date: "2025-01-13" },
  ]

  for (const tx of transactions) {
    await prisma.transaction.create({ data: tx })
  }

  // Create sample write-offs
  const writeOffs = [
    { productName: "Coca-Cola 1L", barcode: "4600492001234", warehouseId: 1, quantity: 50, reason: "Yaroqlilik muddati o'tgan", date: "2025-01-15" },
    { productName: "Fanta 0.5L", barcode: "4600492001235", warehouseId: 1, quantity: 24, reason: "Shikastlangan qadoq", date: "2025-01-14" },
  ]

  for (const wo of writeOffs) {
    await prisma.writeOff.create({ data: wo })
  }

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
