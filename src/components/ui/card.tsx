/**
 * Card — Rolling Ventures Design System
 *
 * Background: #0a0a0a
 * Border: rgba(255,255,255,0.05) — very subtle
 * Radius: 12px
 * Padding: 24px default
 *
 * Variants:
 *   default  — Standard card
 *   glass    — Frosted glass surface (rgba(255,255,255,0.10) + backdrop-blur)
 *   elevated — Slightly lighter bg with stronger shadow
 *   outline  — Transparent with visible border
 *   amber    — Amber-tinted border glow
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "rounded-[12px]",
    "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[#0a0a0a]",
          "border border-[rgba(255,255,255,0.05)]",
          "shadow-[0_4px_12px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.6)]",
        ],
        glass: [
          "bg-[rgba(255,255,255,0.10)]",
          "backdrop-blur-[12px]",
          "border border-[rgba(255,255,255,0.08)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.4)]",
        ],
        elevated: [
          "bg-[#111111]",
          "border border-[rgba(255,255,255,0.08)]",
          "shadow-[0_10px_40px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.5)]",
        ],
        outline: [
          "bg-transparent",
          "border border-[rgba(255,255,255,0.10)]",
        ],
        amber: [
          "bg-[#0a0a0a]",
          "border border-[rgba(251,191,36,0.20)]",
          "shadow-[0_0_24px_rgba(251,191,36,0.08),0_4px_12px_rgba(0,0,0,0.5)]",
        ],
      },
      interactive: {
        true: [
          "cursor-pointer",
          "hover:border-[rgba(255,255,255,0.12)]",
          "hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.5)]",
          "hover:-translate-y-[1px]",
        ],
        false: [],
      },
    },
    compoundVariants: [
      {
        variant: "amber",
        interactive: true,
        className: "hover:border-[rgba(251,191,36,0.40)] hover:shadow-[0_0_32px_rgba(251,191,36,0.15),0_8px_32px_rgba(0,0,0,0.6)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// ─── Card Header ─────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ─── Card Title ───────────────────────────────────────────────────────────────
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[1.0625rem] font-semibold leading-tight tracking-[-0.015em] text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ─── Card Description ─────────────────────────────────────────────────────────
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[0.875rem] text-[rgba(255,255,255,0.55)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─── Card Content ─────────────────────────────────────────────────────────────
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ─── Card Footer ──────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0 gap-3",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ─── Card Divider ─────────────────────────────────────────────────────────────
const CardDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("border-0 border-t border-[rgba(255,255,255,0.06)] mx-6", className)}
    {...props}
  />
));
CardDivider.displayName = "CardDivider";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardDivider,
};
