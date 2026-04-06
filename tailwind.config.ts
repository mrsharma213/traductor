import type { Config } from "tailwindcss";

/**
 * Rolling Ventures Design System — Tailwind CSS v4 Config
 *
 * Design language: Pure black backgrounds, amber/gold accent, Inter Variable,
 * frosted glass surfaces, pill-shaped buttons, negative letter-spacing headlines.
 *
 * See DESIGN-TOKENS.md for the full token reference.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color Tokens ────────────────────────────────────────────────────
      colors: {
        // Backgrounds
        background: {
          DEFAULT: "#000000", // Pure black — primary page background
          surface: "#0a0a0a", // Card/panel background
          elevated: "#111111", // Elevated surface (modals, popovers)
          overlay: "#1a1a1a", // Hover states, subtle contrast
          glass: "rgba(255,255,255,0.10)", // Frosted glass surface
        },

        // Borders
        border: {
          DEFAULT: "rgba(255,255,255,0.08)", // Default subtle border
          card: "rgba(255,255,255,0.05)", // Card border
          focus: "rgba(251,191,36,0.60)", // Amber focus ring
          strong: "rgba(255,255,255,0.16)", // Stronger dividers
        },

        // Accent — Amber/Gold
        amber: {
          DEFAULT: "#fbbf24", // Primary accent
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24", // Same as DEFAULT
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
          muted: "rgba(251,191,36,0.15)", // Amber tinted bg
          glow: "rgba(251,191,36,0.25)", // Glow/shadow
        },

        // Text
        foreground: {
          DEFAULT: "#ffffff", // Primary text
          muted: "rgba(255,255,255,0.55)", // Secondary/muted text
          subtle: "rgba(255,255,255,0.35)", // Placeholder, disabled
          inverted: "#000000", // Text on amber backgrounds
        },

        // Status Colors
        status: {
          green: "#22c55e",
          "green-muted": "rgba(34,197,94,0.15)",
          red: "#ef4444",
          "red-muted": "rgba(239,68,68,0.15)",
          yellow: "#fbbf24",
          "yellow-muted": "rgba(251,191,36,0.15)",
          blue: "#60a5fa",
          "blue-muted": "rgba(96,165,250,0.15)",
        },

        // Semantic aliases (used by shadcn/ui internals)
        primary: {
          DEFAULT: "#fbbf24",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#111111",
          foreground: "rgba(255,255,255,0.55)",
        },
        accent: {
          DEFAULT: "rgba(251,191,36,0.15)",
          foreground: "#fbbf24",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        input: "#1a1a1a",
        ring: "#fbbf24",
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Cascadia Code",
          "ui-monospace",
          "monospace",
        ],
      },

      fontSize: {
        // Display sizes — used with negative tracking
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.025em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "display-xs": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
      },

      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.025em",
        "tight-sm": "-0.015em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
        // Label tracking
        label: "0.06em",
        "label-sm": "0.08em",
      },

      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        // Component-specific tokens
        "btn-sm-x": "0.875rem",   // 14px
        "btn-sm-y": "0.375rem",   // 6px
        "btn-md-x": "1.25rem",    // 20px
        "btn-md-y": "0.625rem",   // 10px
        "btn-lg-x": "1.75rem",    // 28px
        "btn-lg-y": "0.875rem",   // 14px
        "card-pad": "1.5rem",     // 24px
        "card-pad-sm": "1rem",    // 16px
        "card-pad-lg": "2rem",    // 32px
        "nav-h": "3.5rem",        // 56px nav height
        "section-y": "5rem",      // 80px section padding
        "section-y-lg": "7.5rem", // 120px large section
      },

      // ─── Border Radius ───────────────────────────────────────────────────
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",   // Cards
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        // Pill shapes
        pill: "100px",
        "pill-sm": "40px",
        "pill-lg": "100px",
        full: "9999px",
      },

      // ─── Box Shadow ──────────────────────────────────────────────────────
      boxShadow: {
        // Glow effects
        "amber-sm": "0 0 12px rgba(251,191,36,0.20)",
        "amber-md": "0 0 24px rgba(251,191,36,0.25)",
        "amber-lg": "0 0 48px rgba(251,191,36,0.30)",
        "amber-xl": "0 0 80px rgba(251,191,36,0.35)",
        // Surface shadows
        "surface-sm": "0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.6)",
        "surface-md": "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.6)",
        "surface-lg": "0 10px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.5)",
        "surface-xl": "0 20px 60px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.6)",
        // Glass
        glass: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.4)",
        // Inner
        "inner-amber": "inset 0 1px 0 rgba(251,191,36,0.15)",
      },

      // ─── Backdrop Blur ───────────────────────────────────────────────────
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "12px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "2xl": "64px",
      },

      // ─── Transitions ─────────────────────────────────────────────────────
      transitionDuration: {
        fast: "100ms",
        DEFAULT: "150ms",
        normal: "200ms",
        slow: "300ms",
        slower: "500ms",
      },

      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        linear: "linear",
      },

      // ─── Keyframes ───────────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "amber-pulse": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(251,191,36,0.20)" },
          "50%": { boxShadow: "0 0 32px rgba(251,191,36,0.50)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-up": "fade-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-down": "fade-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "amber-pulse": "amber-pulse 2s ease-in-out infinite",
      },

      // ─── Z-Index ─────────────────────────────────────────────────────────
      zIndex: {
        behind: "-1",
        base: "0",
        raised: "10",
        dropdown: "100",
        sticky: "200",
        overlay: "300",
        modal: "400",
        popover: "500",
        toast: "600",
        tooltip: "700",
      },
    },
  },
  plugins: [],
};

export default config;
