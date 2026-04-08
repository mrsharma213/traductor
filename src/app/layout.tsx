import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Translate — Smart Translator",
  description: "AI-powered English to Spanish translator that understands intent.",
  icons: { icon: "/icon-180.png", apple: "/icon-180.png" },
  openGraph: {
    title: "Translate",
    description: "AI translator that understands what you mean, not just what you type.",
    url: "https://translate.nik.co",
    type: "website",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Translate",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><meta name="theme-color" content="#000000" /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
