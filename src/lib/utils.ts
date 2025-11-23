import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' UZS'
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('uz-UZ').format(num)
}

export function parseNumber(value: string): number {
  return Number(value.replace(/[^\d.-]/g, '')) || 0
}
