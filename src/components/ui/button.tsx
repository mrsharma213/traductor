/**
 * Button — Rolling Ventures Design System
 *
 * Variants:
 *   default    — Amber fill, black text. Primary CTA.
 *   secondary  — Dark surface, white text. Secondary action.
 *   outline    — Transparent with amber border. Tertiary.
 *   ghost      — No border/fill. Subtle action.
 *   destructive — Red fill. Destructive actions.
 *   link       — Amber underline text. Inline links.
 *
 * Sizes:
 *   sm  — 14px text, compact padding
 *   md  — 15px text, default padding (default)
 *   lg  — 16px text, generous padding
 *   xl  — 18px text, hero CTAs
 *   icon — Square icon-only button
 *
 * All buttons are pill-shaped by default (border-radius: 100px).
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium tracking-wide",
    "border border-transparent",
    "rounded-[100px]", // Pill shape
    "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        // ── Primary: Amber fill ──────────────────────────────────────────
        default: [
          "bg-[#fbbf24] text-black",
          "hover:bg-[#f59e0b]",
          "shadow-[0_0_0_0_rgba(251,191,36,0)] hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]",
        ],

        // ── Secondary: Dark surface ──────────────────────────────────────
        secondary: [
          "bg-[#111111] text-white border-[rgba(255,255,255,0.08)]",
          "hover:bg-[#1a1a1a] hover:border-[rgba(255,255,255,0.16)]",
        ],

        // ── Outline: Amber border ────────────────────────────────────────
        outline: [
          "bg-transparent text-[#fbbf24] border-[rgba(251,191,36,0.40)]",
          "hover:bg-[rgba(251,191,36,0.08)] hover:border-[rgba(251,191,36,0.70)]",
        ],

        // ── Ghost: No border ─────────────────────────────────────────────
        ghost: [
          "bg-transparent text-[rgba(255,255,255,0.70)] border-transparent",
          "hover:bg-[rgba(255,255,255,0.06)] hover:text-white",
        ],

        // ── Destructive: Red fill ────────────────────────────────────────
        destructive: [
          "bg-[#ef4444] text-white",
          "hover:bg-[#dc2626]",
          "shadow-[0_0_0_0_rgba(239,68,68,0)] hover:shadow-[0_0_20px_rgba(239,68,68,0.30)]",
        ],

        // ── Link: Amber text ─────────────────────────────────────────────
        link: [
          "bg-transparent text-[#fbbf24] border-transparent",
          "underline underline-offset-4 decoration-[rgba(251,191,36,0.40)]",
          "hover:decoration-[#fbbf24]",
          "rounded-none px-0",
        ],
      },

      size: {
        sm: "h-8 px-4 text-[13px] gap-1.5",
        md: "h-10 px-5 text-[14px]",
        lg: "h-11 px-6 text-[15px]",
        xl: "h-13 px-8 text-[16px] font-semibold",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component (Radix Slot pattern) */
  asChild?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Left-side icon */
  leftIcon?: React.ReactNode;
  /** Right-side icon */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// ─── Loading Spinner ──────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export { Button, buttonVariants };
