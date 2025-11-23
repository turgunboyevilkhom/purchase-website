import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BIS - Business Intelligence System",
  description: "Inventory management and business intelligence system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
