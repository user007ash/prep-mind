
/**
 * Utility functions for the app
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines tailwind classes with conditional logic
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Formats a date to a readable string
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// Truncates text to a specified length
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Delay function with promise
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
