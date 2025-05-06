import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Get initials from a name
export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.split(' ');
  let initials = '';
  
  if (parts.length === 1) {
    initials = parts[0].charAt(0);
  } else {
    initials = parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  
  return initials.toUpperCase();
}
