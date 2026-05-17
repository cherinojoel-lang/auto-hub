// This file is needed by Shadcn/UI for utility functions like cn()
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ⚡ Bolt: Cache Intl.NumberFormat to avoid recreating it on every render
// This improves rendering performance on pages with many prices
const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatPrice = (price?: number) => {
  if (!price) return 'Preis auf Anfrage';
  return currencyFormatter.format(price);
};
