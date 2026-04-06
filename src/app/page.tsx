"use client";

import React, { useState, useRef } from "react";
import { Languages, ArrowRight, Copy, Check, Loader2 } from "lucide-react";

// API key is server-side only via /api/translate

interface TranslationResult {
  interpreted: string;
  spanish: string;
  notes: string;
}

export default function TranslatorPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState<"interpreted" | "spanish" | null>(null);
  const [history, setHistory] = useState<{ input: string; result: TranslationResult }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const translate = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const parsed: TranslationResult = await res.json();
      setResult(parsed);
      setHistory((prev) => [{ input, result: parsed }, ...prev].slice(0, 20));
    } catch (e) {
      setResult({ interpreted: "Error translating. Try again.", spanish: "", notes: String(e) });
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, which: "interpreted" | "spanish") => {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      translate();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[600px] mx-auto px-5 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
            <Languages className="w-7 h-7 text-amber" />
            Traductor
          </h1>
          <p className="text-foreground-muted text-sm mt-1">
            Type English (even broken English). Get natural Spanish.
          </p>
        </header>

        {/* Input */}
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type what you want to say in English..."
            rows={3}
            autoFocus
            className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:border-[#fbbf24] focus:ring-2 focus:ring-[rgba(251,191,36,0.15)] transition-all resize-none"
          />
          <button
            onClick={translate}
            disabled={!input.trim() || loading}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-[15px] py-3 px-6 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Translating...</>
            ) : (
              <>Translate <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>

        {/* Result */}
        {result && result.spanish && (
          <div className="space-y-3 mb-8">
            {/* Interpreted English */}
            <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">
                  What you meant
                </span>
                <button
                  onClick={() => copyText(result.interpreted, "interpreted")}
                  className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
                >
                  {copied === "interpreted" ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-white text-[15px] leading-relaxed">{result.interpreted}</p>
            </div>

            {/* Spanish */}
            <div className="bg-[#111111] border border-[rgba(251,191,36,0.2)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#fbbf24]">
                  Español
                </span>
                <button
                  onClick={() => copyText(result.spanish, "spanish")}
                  className="text-[rgba(255,255,255,0.4)] hover:text-[#fbbf24] transition-colors"
                >
                  {copied === "spanish" ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-white text-[18px] leading-relaxed font-medium">{result.spanish}</p>
            </div>

            {/* Notes */}
            {result.notes && (
              <div className="px-4 py-2">
                <p className="text-[13px] text-[rgba(255,255,255,0.4)] italic">{result.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[rgba(255,255,255,0.3)] mb-3">
              Recent
            </h2>
            <div className="space-y-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(h.input);
                    setResult(h.result);
                  }}
                  className="w-full text-left bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 hover:border-[rgba(255,255,255,0.15)] transition-all"
                >
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] truncate">{h.input}</p>
                  <p className="text-[14px] text-white truncate mt-0.5">{h.result.spanish}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center pt-10 pb-6">
          <p className="text-[11px] text-[rgba(255,255,255,0.2)]">Powered by GPT-4o-mini</p>
        </footer>
      </div>
    </div>
  );
}
