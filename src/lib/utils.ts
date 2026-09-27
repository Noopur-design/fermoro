import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Catalog prices are authored in USD; convert to INR for an Indian storefront.
// All price display routes through money(), so cart totals stay consistent.
const USD_TO_INR = 83;

export function money(value: number) {
  const inr = Math.round((value * USD_TO_INR) / 10) * 10;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}

export function discountPercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return null;
  return Math.round((1 - price / compareAt) * 100);
}
