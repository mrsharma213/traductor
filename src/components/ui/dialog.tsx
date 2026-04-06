/**
 * Dialog — Rolling Ventures Design System
 *
 * Built on Radix UI Dialog primitives.
 *
 * Overlay: rgba(0,0,0,0.80) backdrop
 * Content: #111111 background, rgba(255,255,255,0.08) border, 16px radius
 * Animation: scale-in + fade-in on open, reverse on close
 *
 * Sizes: sm (400px), md (540px, default), lg (680px), xl (800px), full
 */

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// ─── Overlay ──────────────────────────────────────────────────────────────────
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[400]",
      "bg-black/80 backdrop-blur-[4px]",
      "data-[state=open]:animate-[fade-in_0.15s_ease-out]",
      "data-[state=closed]:animate-[fade-out_0.15s_ease-in]",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ─── Content Variants ─────────────────────────────────────────────────────────
const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-[400]",
    "-translate-x-1/2 -translate-y-1/2",
    "w-full",
    "bg-[#111111]",
    "border border-[rgba(255,255,255,0.08)]",
    "rounded-[16px]",
    "shadow-[0_20px_60px_rgba(0,0,0,0.70),0_8px_24px_rgba(0,0,0,0.60)]",
    "p-6",
    "focus:outline-none",
    "data-[state=open]:animate-[scale-in_0.2s_cubic-bezier(0.16,1,0.3,1)]",
    "data-[state=closed]:animate-[scale-out_0.15s_ease-in]",
  ],
  {
    variants: {
      size: {
        sm: "max-w-[400px]",
        md: "max-w-[540px]",
        lg: "max-w-[680px]",
        xl: "max-w-[800px]",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ─── Content ──────────────────────────────────────────────────────────────────
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Hide the default close button */
  hideClose?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size, hideClose = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4",
            "h-8 w-8 rounded-full",
            "flex items-center justify-center",
            "text-[rgba(255,255,255,0.40)]",
            "bg-transparent border border-transparent",
            "transition-all duration-150",
            "hover:text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.08)]",
            "focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:ring-offset-2 focus:ring-offset-[#111111]",
          )}
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// ─── Header ───────────────────────────────────────────────────────────────────
function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 mb-5 pr-8", className)}
      {...props}
    />
  );
}
DialogHeader.displayName = "DialogHeader";

// ─── Footer ───────────────────────────────────────────────────────────────────
function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 mt-6 pt-5",
        "border-t border-[rgba(255,255,255,0.06)]",
        className
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

// ─── Title ────────────────────────────────────────────────────────────────────
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[1.125rem] font-semibold tracking-[-0.02em] text-white",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// ─── Description ──────────────────────────────────────────────────────────────
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[14px] text-[rgba(255,255,255,0.55)] leading-relaxed", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
