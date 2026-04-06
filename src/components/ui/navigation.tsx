/**
 * Navigation — Rolling Ventures Design System
 *
 * Two navigation components:
 *
 * 1. TopNav — Full-width top navigation bar
 *    - Glass background with backdrop blur
 *    - Amber accent on active items
 *    - Logo slot + nav links + right actions slot
 *    - Sticky by default
 *
 * 2. Sidebar — Left sidebar navigation
 *    - Dark surface (#0a0a0a)
 *    - Grouped nav items with icons
 *    - Amber active state with subtle glow
 *    - Collapsible support
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

// ─── TopNav ───────────────────────────────────────────────────────────────────
export interface TopNavProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  rightSlot?: React.ReactNode;
  className?: string;
  /** Glass background (default) vs solid */
  variant?: "glass" | "solid" | "transparent";
}

function TopNav({
  logo,
  items = [],
  rightSlot,
  className,
  variant = "glass",
}: TopNavProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-[200]",
        "w-full h-14",
        "flex items-center justify-between",
        "px-4 md:px-6",
        // Variants
        variant === "glass" && [
          "bg-[rgba(0,0,0,0.70)] backdrop-blur-[12px]",
          "border-b border-[rgba(255,255,255,0.06)]",
          "shadow-[0_1px_0_rgba(255,255,255,0.04)]",
        ],
        variant === "solid" && [
          "bg-[#0a0a0a]",
          "border-b border-[rgba(255,255,255,0.06)]",
        ],
        variant === "transparent" && "bg-transparent",
        className
      )}
    >
      {/* Logo */}
      {logo && (
        <div className="flex items-center shrink-0 mr-6">
          {logo}
        </div>
      )}

      {/* Nav Links */}
      {items.length > 0 && (
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {items.map((item) => (
            <TopNavItem key={item.href} item={item} />
          ))}
        </nav>
      )}

      {/* Right Slot */}
      {rightSlot && (
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {rightSlot}
        </div>
      )}
    </header>
  );
}

function TopNavItem({ item }: { item: NavItem }) {
  const Comp = item.external ? "a" : Link;
  const externalProps = item.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Comp
      href={item.href}
      {...externalProps}
      className={cn(
        "relative px-3 py-1.5 rounded-full",
        "text-[13px] font-medium",
        "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]",
        item.active
          ? "text-[#fbbf24] bg-[rgba(251,191,36,0.10)]"
          : "text-[rgba(255,255,255,0.55)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]",
        item.disabled && "opacity-40 pointer-events-none"
      )}
      aria-current={item.active ? "page" : undefined}
    >
      <span className="flex items-center gap-1.5">
        {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
        {item.label}
        {item.badge !== undefined && (
          <span
            className={cn(
              "ml-1 inline-flex items-center justify-center",
              "h-4 min-w-4 px-1 rounded-full",
              "text-[10px] font-bold",
              item.active
                ? "bg-[#fbbf24] text-black"
                : "bg-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.70)]"
            )}
          >
            {item.badge}
          </span>
        )}
      </span>
    </Comp>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export interface SidebarProps {
  groups?: NavGroup[];
  items?: NavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}

function Sidebar({
  groups,
  items,
  header,
  footer,
  className,
  collapsed = false,
}: SidebarProps) {
  // Normalize: if flat items provided, wrap in single group
  const navGroups: NavGroup[] = groups ?? (items ? [{ items }] : []);

  return (
    <aside
      className={cn(
        "flex flex-col",
        "bg-[#0a0a0a]",
        "border-r border-[rgba(255,255,255,0.05)]",
        "h-full",
        collapsed ? "w-[60px]" : "w-[220px]",
        "transition-[width] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
    >
      {/* Header */}
      {header && (
        <div className={cn("px-3 py-4 border-b border-[rgba(255,255,255,0.05)]", collapsed && "px-2")}>
          {header}
        </div>
      )}

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-5">
        {navGroups.map((group, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            {group.label && !collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold tracking-[0.08em] uppercase text-[rgba(255,255,255,0.30)]">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <SidebarItem key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className={cn("px-2 py-3 border-t border-[rgba(255,255,255,0.05)]", collapsed && "px-1.5")}>
          {footer}
        </div>
      )}
    </aside>
  );
}

function SidebarItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const Comp = item.external ? "a" : Link;
  const externalProps = item.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Comp
      href={item.href}
      {...externalProps}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-2.5",
        "px-2.5 py-2 rounded-[8px]",
        "text-[13px] font-medium",
        "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]",
        collapsed && "justify-center px-2",
        item.active
          ? [
              "bg-[rgba(251,191,36,0.12)] text-[#fbbf24]",
              "shadow-[inset_0_0_0_1px_rgba(251,191,36,0.15)]",
            ]
          : "text-[rgba(255,255,255,0.55)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]",
        item.disabled && "opacity-40 pointer-events-none"
      )}
      aria-current={item.active ? "page" : undefined}
    >
      {item.icon && (
        <span
          className={cn(
            "shrink-0 h-4 w-4",
            item.active ? "text-[#fbbf24]" : "text-[rgba(255,255,255,0.45)]"
          )}
        >
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className={cn(
                "inline-flex items-center justify-center",
                "h-4 min-w-4 px-1 rounded-full",
                "text-[10px] font-bold",
                item.active
                  ? "bg-[#fbbf24] text-black"
                  : "bg-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.60)]"
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </Comp>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <span className="text-[rgba(255,255,255,0.25)] text-[13px]" aria-hidden="true">
                /
              </span>
            )}
            {isLast || !item.href ? (
              <span
                className={cn(
                  "text-[13px]",
                  isLast
                    ? "text-white font-medium"
                    : "text-[rgba(255,255,255,0.45)]"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-[13px] text-[rgba(255,255,255,0.45)] hover:text-white transition-colors duration-150"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export { TopNav, Sidebar, Breadcrumb };
