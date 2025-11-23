"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Plus, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-gradient-to-r from-[#004B34] via-[#003D2B] to-[#002E20] px-4 shadow-xl shadow-[#004B34]/20 lg:pl-[272px] backdrop-blur-lg border-b border-[#99C61E]/10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#99C61E]/20 lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/tovarlar/add">
            <Button className="hidden gap-2 bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34] font-semibold hover:from-[#AAD72F] hover:to-[#8BB918] shadow-lg shadow-[#99C61E]/20 sm:flex transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#99C61E]/30">
              <Plus className="h-4 w-4" />
              Yangi tovar qo'shish
            </Button>
          </Link>
          <Link href="/yetkazib-beruvchilar/add">
            <Button
              variant="outline"
              className="hidden gap-2 border-[#99C61E]/40 bg-white/5 text-white hover:bg-[#99C61E]/15 hover:border-[#99C61E] sm:flex transition-all duration-200 hover:scale-[1.02] rounded-xl h-10"
            >
              <Plus className="h-4 w-4" />
              Yangi ta'minotchi
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-11 w-11 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <Avatar className="h-9 w-9 rounded-xl ring-2 ring-[#99C61E]/30">
                  <AvatarFallback className="bg-gradient-to-br from-[#99C61E] to-[#7BA817] text-[#004B34] rounded-xl font-semibold">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 rounded-xl p-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-xl">
                    <AvatarFallback className="bg-gradient-to-br from-[#99C61E] to-[#7BA817] text-[#004B34] rounded-xl font-bold">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-900">Admin</p>
                    <p className="text-xs text-slate-500">admin@kometa.uz</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="rounded-lg px-3 py-2.5 cursor-pointer">
                <User className="mr-3 h-4 w-4 text-slate-500" />
                <span className="font-medium">Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg px-3 py-2.5 cursor-pointer">
                <Settings className="mr-3 h-4 w-4 text-slate-500" />
                <span className="font-medium">Sozlamalar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                className="rounded-lg px-3 py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Chiqish</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader className="pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <LogOut className="h-7 w-7 text-red-500" />
              </div>
              <DialogTitle className="text-lg font-bold text-slate-900">Tizimdan chiqish</DialogTitle>
              <DialogDescription className="text-slate-500 mt-2">
                Haqiqatan ham tizimdan chiqmoqchimisiz?
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1 h-11 rounded-xl font-medium"
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1 h-11 rounded-xl font-medium bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25"
            >
              Chiqish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
