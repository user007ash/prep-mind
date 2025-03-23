
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

// Function to add random animation delay to elements
export function randomAnimationDelay() {
  const delays = [
    'animation-delay-0',
    'animation-delay-100',
    'animation-delay-200',
    'animation-delay-300',
    'animation-delay-400',
    'animation-delay-500',
  ];
  return delays[Math.floor(Math.random() * delays.length)];
}

// Function to get color class based on score
export function getScoreColorClass(score) {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
}

// Function to get background color class based on score
export function getScoreBackgroundClass(score) {
  if (score >= 90) return 'bg-green-600';
  if (score >= 80) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}
