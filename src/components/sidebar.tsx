"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShoppingCart,
  RotateCcw,
  TrendingDown,
  Wallet,
  Package,
  Truck,
  DollarSign,
  ChevronDown,
  Eye,
  EyeOff,
  X,
  Receipt,
  Users,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    id: "kirim",
    label: "Kirim hujjatlari",
    icon: ShoppingCart,
    href: "/",
  },
  {
    id: "qaytarilgan",
    label: "Qaytarilgan mahsulotlar",
    icon: RotateCcw,
    href: "/qaytarilgan",
  },
  {
    id: "chiqim",
    label: "Tovarlarni hisobdan chiqarish",
    icon: TrendingDown,
    href: "/chiqim",
  },
  {
    id: "kassa",
    label: "Kassa",
    icon: Wallet,
    href: "#",
    submenu: [
      { id: "kassa-main", label: "Kassa", href: "/kassa", icon: Wallet },
      { id: "harajatlar", label: "Harajatlar", href: "/harajatlar", icon: Receipt },
      { id: "tolovlar", label: "Yetkazib beruvchilarga to'lovlar", href: "/tolovlar", icon: CreditCard },
    ],
  },
  {
    id: "ombor",
    label: "Ombor qoldiqlari",
    icon: Package,
    href: "/ombor",
  },
  {
    id: "yetkazib",
    label: "Yetkazib beruvchilar",
    icon: Truck,
    href: "#",
    submenu: [
      { id: "royxat", label: "Ro'yxat", href: "/yetkazib-beruvchilar", icon: Users },
      { id: "qarzdorlik", label: "Qarzdorlik", href: "/qarzdorlik", icon: CreditCard },
    ],
  },
  {
    id: "narxlar",
    label: "Narxlarni yangilash",
    icon: DollarSign,
    href: "/narxlarni-yangilash",
  },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [hiddenMenus, setHiddenMenus] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("hiddenMenus")
    if (saved) {
      setHiddenMenus(JSON.parse(saved))
    }
  }, [])

  const toggleSubmenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const toggleMenuVisibility = (id: string) => {
    const newHidden = hiddenMenus.includes(id)
      ? hiddenMenus.filter((m) => m !== id)
      : [...hiddenMenus, id]
    setHiddenMenus(newHidden)
    localStorage.setItem("hiddenMenus", JSON.stringify(newHidden))
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-gradient-to-b from-[#004B34] via-[#003D2B] to-[#002518] transition-transform duration-300 ease-out lg:translate-x-0 shadow-2xl shadow-black/20",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-[#99C61E]/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#99C61E] to-[#7BA817] font-bold text-[#004B34] text-lg shadow-lg shadow-[#99C61E]/30 transition-transform hover:scale-105">
                K
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-wide">
                  Kometa
                </h1>
                <p className="text-xs text-[#99C61E]/70 font-medium">Biznes tizimi</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl lg:hidden transition-all"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Settings Toggle */}
          <div className="px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start gap-2 text-white/50 hover:bg-white/5 hover:text-white/80 rounded-xl h-9 transition-all",
                showSettings && "bg-white/5 text-[#99C61E]"
              )}
              onClick={() => setShowSettings(!showSettings)}
            >
              {showSettings ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="text-xs font-medium">Menu sozlamalari</span>
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-1 py-2">
              {menuItems.map((item) => {
                if (hiddenMenus.includes(item.id) && !showSettings) return null

                const Icon = item.icon
                const hasSubmenu = item.submenu && item.submenu.length > 0
                const isExpanded = expandedMenus.includes(item.id)
                const active = hasSubmenu
                  ? item.submenu?.some((sub) => isActive(sub.href))
                  : isActive(item.href)

                return (
                  <div key={item.id}>
                    <div className="flex items-center gap-1">
                      {showSettings && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 text-slate-500 hover:text-white"
                          onClick={() => toggleMenuVisibility(item.id)}
                        >
                          {hiddenMenus.includes(item.id) ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className={cn(
                            "flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            active
                              ? "bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34] shadow-lg shadow-[#99C61E]/25"
                              : "text-white/80 hover:bg-[#99C61E]/10 hover:text-white"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            active
                              ? "bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34] shadow-lg shadow-[#99C61E]/25"
                              : "text-white/80 hover:bg-[#99C61E]/10 hover:text-white"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </div>

                    {/* Submenu */}
                    {hasSubmenu && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-[#99C61E]/30 pl-4">
                        {item.submenu?.map((sub) => {
                          const SubIcon = sub.icon
                          return (
                            <Link
                              key={sub.id}
                              href={sub.href}
                              onClick={onClose}
                              className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                                isActive(sub.href)
                                  ? "bg-[#99C61E]/20 text-[#99C61E]"
                                  : "text-white/60 hover:bg-[#99C61E]/10 hover:text-white"
                              )}
                            >
                              <SubIcon className="h-4 w-4" />
                              <span>{sub.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-[#99C61E]/10 p-4">
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#99C61E] to-[#7BA817] flex items-center justify-center text-[8px] font-bold text-[#004B34]">
                K
              </div>
              <p className="text-xs text-white/40 font-medium">
                © 2025 Kometa
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
