import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kometa - Biznes Boshqaruv Tizimi",
  description: "Kometa - zamonaviy inventar va biznes boshqaruv tizimi",
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
