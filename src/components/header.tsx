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
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-gradient-to-r from-[#004B34] to-[#003D2B] px-4 shadow-lg lg:pl-[272px]">
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
          <Link href="/yetib-kelgan/add">
            <Button className="hidden gap-2 bg-gradient-to-r from-[#99C61E] to-[#7BA817] text-[#004B34] font-semibold hover:from-[#AAD72F] hover:to-[#8BB918] shadow-lg shadow-[#99C61E]/20 sm:flex">
              <Plus className="h-4 w-4" />
              Yangi tovar qoshish
            </Button>
          </Link>
          <Link href="/yetkazib-beruvchilar/add">
            <Button
              variant="outline"
              className="hidden gap-2 border-[#99C61E]/50 bg-transparent text-white hover:bg-[#99C61E]/10 hover:border-[#99C61E] sm:flex"
            >
              <Plus className="h-4 w-4" />
              Yangi taminotchi qoshish
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarFallback className="bg-[#99C61E] text-[#004B34]">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@kometa.uz
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Sozlamalar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Chiqish</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tizimdan chiqish</DialogTitle>
            <DialogDescription>
              Haqiqatan ham tizimdan chiqmoqchimisiz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Bekor qilish
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Chiqish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
