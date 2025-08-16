import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarFallback(name?: string, fallback: string = "U") {
  if (!name) return fallback;
  return name.trim().charAt(0).toUpperCase() || fallback;
}
