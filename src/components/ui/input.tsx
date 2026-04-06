/**
 * Input — Rolling Ventures Design System
 *
 * Background: #1a1a1a
 * Border: rgba(255,255,255,0.08) → amber on focus
 * Focus ring: rgba(251,191,36,0.25)
 * Radius: 10px (md) — slightly less pill than buttons
 * Height: 40px default
 *
 * Includes:
 *   Input       — Base input element
 *   InputField  — Composed input with label, helper text, and error state
 *   Textarea    — Multi-line variant
 */

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Base Input ───────────────────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Left icon/adornment */
  leftAdornment?: React.ReactNode;
  /** Right icon/adornment */
  rightAdornment?: React.ReactNode;
  /** Error state */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftAdornment, rightAdornment, error, ...props }, ref) => {
    if (leftAdornment || rightAdornment) {
      return (
        <div className="relative flex items-center">
          {leftAdornment && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[rgba(255,255,255,0.40)]">
              {leftAdornment}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              // Base
              "flex h-10 w-full rounded-[10px]",
              "bg-[#1a1a1a] text-white text-[14px]",
              "border border-[rgba(255,255,255,0.08)]",
              "px-3 py-2",
              "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              // Placeholder
              "placeholder:text-[rgba(255,255,255,0.30)]",
              // Focus
              "focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_0_3px_rgba(251,191,36,0.20)]",
              // Error
              error && "border-[#ef4444] focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.20)]",
              // Disabled
              "disabled:opacity-40 disabled:cursor-not-allowed",
              // Adornment padding
              leftAdornment && "pl-9",
              rightAdornment && "pr-9",
              className
            )}
            {...props}
          />
          {rightAdornment && (
            <div className="absolute right-3 flex items-center pointer-events-none text-[rgba(255,255,255,0.40)]">
              {rightAdornment}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-[10px]",
          "bg-[#1a1a1a] text-white text-[14px]",
          "border border-[rgba(255,255,255,0.08)]",
          "px-3 py-2",
          "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "placeholder:text-[rgba(255,255,255,0.30)]",
          "focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_0_3px_rgba(251,191,36,0.20)]",
          error && "border-[#ef4444] focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.20)]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full rounded-[10px]",
        "bg-[#1a1a1a] text-white text-[14px]",
        "border border-[rgba(255,255,255,0.08)]",
        "px-3 py-2.5",
        "resize-y",
        "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "placeholder:text-[rgba(255,255,255,0.30)]",
        "focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_0_3px_rgba(251,191,36,0.20)]",
        error && "border-[#ef4444] focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.20)]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// ─── InputField (composed) ────────────────────────────────────────────────────
export interface InputFieldProps extends InputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  id?: string;
}

function InputField({
  label,
  helperText,
  errorText,
  required,
  id,
  error,
  ...props
}: InputFieldProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = error || !!errorText;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-medium text-[rgba(255,255,255,0.80)] tracking-wide"
        >
          {label}
          {required && (
            <span className="ml-1 text-[#fbbf24]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <Input id={inputId} error={hasError} {...props} />
      {(helperText || errorText) && (
        <p
          className={cn(
            "text-[12px] leading-relaxed",
            hasError ? "text-[#ef4444]" : "text-[rgba(255,255,255,0.40)]"
          )}
        >
          {errorText ?? helperText}
        </p>
      )}
    </div>
  );
}

export { Input, Textarea, InputField };
