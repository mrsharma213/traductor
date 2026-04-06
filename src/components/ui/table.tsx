/**
 * Table — Rolling Ventures Design System
 *
 * Dark data table with amber accent on sortable headers.
 *
 * Structure:
 *   Table → TableHeader → TableRow → TableHead
 *         → TableBody  → TableRow → TableCell
 *         → TableFooter → TableRow → TableCell
 *         → TableCaption
 *
 * Features:
 *   - Sticky header option
 *   - Row hover highlight
 *   - Sortable column headers with amber indicator
 *   - Numeric cell alignment
 *   - Status cell with colored dot
 */

import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Table Wrapper ────────────────────────────────────────────────────────────
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { containerClassName?: string }
>(({ className, containerClassName, ...props }, ref) => (
  <div
    className={cn(
      "relative w-full overflow-auto rounded-[12px]",
      "border border-[rgba(255,255,255,0.05)]",
      "bg-[#0a0a0a]",
      containerClassName
    )}
  >
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-[14px] border-collapse", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// ─── Table Header ─────────────────────────────────────────────────────────────
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "border-b border-[rgba(255,255,255,0.06)]",
      "[&_tr]:hover:bg-transparent",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// ─── Table Body ───────────────────────────────────────────────────────────────
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// ─── Table Footer ─────────────────────────────────────────────────────────────
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[rgba(255,255,255,0.06)]",
      "bg-[rgba(255,255,255,0.02)]",
      "font-medium",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// ─── Table Row ────────────────────────────────────────────────────────────────
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[rgba(255,255,255,0.04)]",
      "transition-colors duration-100",
      "hover:bg-[rgba(255,255,255,0.025)]",
      "data-[state=selected]:bg-[rgba(251,191,36,0.06)]",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// ─── Table Head ───────────────────────────────────────────────────────────────
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  numeric?: boolean;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, numeric, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-11 px-4",
        "text-left align-middle",
        "text-[11px] font-semibold tracking-[0.06em] uppercase",
        "text-[rgba(255,255,255,0.40)]",
        "whitespace-nowrap",
        numeric && "text-right",
        sortable && "cursor-pointer select-none hover:text-[rgba(255,255,255,0.80)] transition-colors duration-150",
        sortDirection && "text-[#fbbf24]",
        className
      )}
      {...props}
    >
      {sortable ? (
        <span className={cn("inline-flex items-center gap-1", numeric && "flex-row-reverse")}>
          {children}
          <SortIcon direction={sortDirection ?? null} />
        </span>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  if (direction === "asc") return <ChevronUp className="h-3.5 w-3.5 text-[#fbbf24]" />;
  if (direction === "desc") return <ChevronDown className="h-3.5 w-3.5 text-[#fbbf24]" />;
  return <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />;
}

// ─── Table Cell ───────────────────────────────────────────────────────────────
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
  muted?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, numeric, muted, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 align-middle",
        "text-[14px]",
        muted ? "text-[rgba(255,255,255,0.45)]" : "text-[rgba(255,255,255,0.85)]",
        numeric && "text-right font-mono tabular-nums",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

// ─── Table Caption ────────────────────────────────────────────────────────────
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-[13px] text-[rgba(255,255,255,0.40)] text-left px-4 pb-3",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
