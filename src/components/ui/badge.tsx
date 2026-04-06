/**
 * Badge — Rolling Ventures Design System
 *
 * Pill-shaped labels for status, categories, and counts.
 *
 * Variants:
 *   default     — Amber fill, black text
 *   secondary   — Dark surface, white text
 *   outline     — Transparent, amber border
 *   ghost       — Very subtle fill
 *   success     — Green status
 *   error       — Red status
 *   warning     — Yellow status
 *   info        — Blue status
 *   dot-*       — With a colored status dot
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-[11px] font-semibold tracking-[0.06em] uppercase",
    "border",
    "transition-colors duration-150",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        // ── Brand ──────────────────────────────────────────────────────────
        default: [
          "bg-[#fbbf24] text-black border-transparent",
        ],
        secondary: [
          "bg-[#111111] text-white border-[rgba(255,255,255,0.08)]",
        ],
        outline: [
          "bg-transparent text-[#fbbf24] border-[rgba(251,191,36,0.40)]",
        ],
        ghost: [
          "bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.70)] border-transparent",
        ],

        // ── Status ─────────────────────────────────────────────────────────
        success: [
          "bg-[rgba(34,197,94,0.15)] text-[#22c55e] border-[rgba(34,197,94,0.20)]",
        ],
        error: [
          "bg-[rgba(239,68,68,0.15)] text-[#ef4444] border-[rgba(239,68,68,0.20)]",
        ],
        warning: [
          "bg-[rgba(251,191,36,0.15)] text-[#fbbf24] border-[rgba(251,191,36,0.20)]",
        ],
        info: [
          "bg-[rgba(96,165,250,0.15)] text-[#60a5fa] border-[rgba(96,165,250,0.20)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a colored status dot before the label */
  dot?: boolean;
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  const dotColor = {
    default: "bg-black",
    secondary: "bg-white",
    outline: "bg-[#fbbf24]",
    ghost: "bg-[rgba(255,255,255,0.55)]",
    success: "bg-[#22c55e]",
    error: "bg-[#ef4444]",
    warning: "bg-[#fbbf24]",
    info: "bg-[#60a5fa]",
  }[variant ?? "default"];

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0 animate-pulse", dotColor)}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
