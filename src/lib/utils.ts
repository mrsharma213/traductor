import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx, resolving conflicts via tailwind-merge.
 * Use this for all component className props.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
