/**
 * Tabs — Rolling Ventures Design System
 *
 * Built on Radix UI Tabs primitives.
 *
 * Variants:
 *   default    — Underline indicator, amber active state
 *   pills      — Pill-shaped tabs, amber fill on active
 *   boxed      — Contained tabs in a dark surface box
 *   segment    — iOS-style segmented control
 */

"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

// ─── List Variants ────────────────────────────────────────────────────────────
const tabsListVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      variant: {
        default: [
          "gap-0",
          "border-b border-[rgba(255,255,255,0.08)]",
          "w-full",
        ],
        pills: [
          "gap-1",
          "p-0",
        ],
        boxed: [
          "gap-0",
          "bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)]",
          "rounded-[10px] p-1",
        ],
        segment: [
          "gap-0",
          "bg-[#111111] border border-[rgba(255,255,255,0.08)]",
          "rounded-full p-1",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ─── Trigger Variants ─────────────────────────────────────────────────────────
const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "text-[13px] font-medium",
    "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-40",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: [
          "px-4 py-2.5",
          "text-[rgba(255,255,255,0.50)]",
          "border-b-2 border-transparent -mb-px",
          "hover:text-[rgba(255,255,255,0.80)]",
          "data-[state=active]:text-[#fbbf24] data-[state=active]:border-[#fbbf24]",
        ],
        pills: [
          "px-4 py-2 rounded-full",
          "text-[rgba(255,255,255,0.50)]",
          "hover:text-white hover:bg-[rgba(255,255,255,0.06)]",
          "data-[state=active]:bg-[#fbbf24] data-[state=active]:text-black",
        ],
        boxed: [
          "px-4 py-2 rounded-[8px]",
          "text-[rgba(255,255,255,0.50)]",
          "hover:text-white hover:bg-[rgba(255,255,255,0.04)]",
          "data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
        ],
        segment: [
          "px-4 py-1.5 rounded-full",
          "text-[rgba(255,255,255,0.50)]",
          "hover:text-white",
          "data-[state=active]:bg-[#fbbf24] data-[state=active]:text-black data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.4)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ─── Context for variant propagation ─────────────────────────────────────────
const TabsVariantContext = React.createContext<"default" | "pills" | "boxed" | "segment">("default");

// ─── TabsList ─────────────────────────────────────────────────────────────────
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant ?? "default"}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  </TabsVariantContext.Provider>
));
TabsList.displayName = TabsPrimitive.List.displayName;

// ─── TabsTrigger ──────────────────────────────────────────────────────────────
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ─── TabsContent ──────────────────────────────────────────────────────────────
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      "data-[state=active]:animate-[fade-in_0.15s_ease-out]",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
