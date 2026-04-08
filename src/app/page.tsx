"use client";

import React, { useState, useRef, useEffect } from "react";
import { Languages, ArrowRight, Copy, Check, Loader2, Lock, ChevronDown, ChevronUp } from "lucide-react";

// API key is server-side only via /api/translate

interface Correction {
  original: string;
  fixed: string;
}

interface TranslationResult {
  interpreted: string;
  spanish?: string;
  translated: string;
  direction?: string;
  corrections: Correction[];
  notes: string;
}

interface HistoryEntry {
  input: string;
  result: TranslationResult;
  ts: string;
}

// ─── Diff Highlighter ──────────────────────────────────────────────────────────

function HighlightedText({ text, corrections }: { text: string; corrections: Correction[] }) {
  if (!corrections || corrections.length === 0) {
    return <span>{text}</span>;
  }

  // Find positions of corrected words in the interpreted text and highlight them
  let result: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Sort corrections by position in interpreted text (find each "fixed" word)
  const fixedWords = corrections.map((c) => c.fixed.toLowerCase());

  // Simple approach: split by words, highlight any that match a correction
  const words = text.split(/(\s+)/);
  
  for (const word of words) {
    const wordLower = word.toLowerCase().replace(/[.,!?;:'"]/g, "");
    const matchIdx = fixedWords.findIndex((fw) => {
      // Check if the fixed phrase contains this word or matches
      const fwWords = fw.split(/\s+/);
      return fwWords.some((fww) => fww === wordLower);
    });

    if (matchIdx !== -1 && wordLower.length > 0) {
      result.push(
        <span
          key={key++}
          className="bg-[rgba(251,191,36,0.2)] text-[#fbbf24] rounded px-0.5 -mx-0.5"
        >
          {word}
        </span>
      );
    } else {
      result.push(<span key={key++}>{word}</span>);
    }
  }

  return <>{result}</>;
}

// ─── Lock Screen ───────────────────────────────────────────────────────────────

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (index === 3 && value) {
      const code = newPin.join("");
      if (code === "1234") {
        sessionStorage.setItem("translate-auth", "1");
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPin(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <Lock className="w-10 h-10 text-[#fbbf24] mb-6" />
      <h2 className="text-[rgba(255,255,255,0.6)] text-lg mb-8">Enter passcode</h2>
      <div className="flex gap-3 mb-4">
        {pin.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !pin[i] && i > 0) inputRefs.current[i - 1]?.focus();
            }}
            autoFocus={i === 0}
            className={`w-14 h-16 bg-[#0a0a0a] border ${error ? "border-red-500" : "border-[rgba(255,255,255,0.1)] focus:border-[#fbbf24]"} rounded-lg text-white text-2xl text-center outline-none transition-all focus:ring-2 focus:ring-[rgba(251,191,36,0.15)]`}
            style={{ WebkitTextSecurity: "disc" } as React.CSSProperties}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">Wrong code</p>}
    </div>
  );
}

// ─── Corrections Badge ─────────────────────────────────────────────────────────

function CorrectionsBadge({ corrections }: { corrections: Correction[] }) {
  const [open, setOpen] = useState(false);
  if (!corrections || corrections.length === 0) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[12px] text-[#fbbf24] hover:text-[#f59e0b] transition-colors"
      >
        <span className="bg-[rgba(251,191,36,0.15)] text-[#fbbf24] text-[11px] font-semibold px-2 py-0.5 rounded-full">
          {corrections.length} correction{corrections.length > 1 ? "s" : ""} made
        </span>
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {open && (
        <div className="mt-2 space-y-1.5 pl-1">
          {corrections.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px]">
              <span className="text-[rgba(255,255,255,0.4)] line-through">{c.original}</span>
              <ArrowRight className="w-3 h-3 text-[rgba(255,255,255,0.25)]" />
              <span className="text-[#fbbf24]">{c.fixed}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function TranslatorPage() {
  const [locked, setLocked] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("translate-auth") !== "1" : true
  );
  const [input, setInput] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState<"interpreted" | "spanish" | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle Ctrl+V image paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target?.result as string;
            setPastedImage(dataUrl);
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const translate = async () => {
    if (!input.trim() && !pastedImage) return;
    if (loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, image: pastedImage || undefined }),
      });

      const parsed: TranslationResult = await res.json();
      setResult(parsed);

      const entry: HistoryEntry = { input, result: parsed, ts: new Date().toISOString() };
      setHistory((prev) => [entry, ...prev].slice(0, 20));
    } catch (e) {
      setResult({
        interpreted: "Error translating. Try again.",
        translated: "",
        corrections: [],
        notes: String(e),
      });
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

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (locked) return <LockScreen onUnlock={() => setLocked(false)} />;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[600px] mx-auto px-5 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
            <Languages className="w-7 h-7 text-[#fbbf24]" />
            Translate
          </h1>
          <p className="text-[rgba(255,255,255,0.5)] text-sm mt-1">
            English ↔ Spanish. Type text or paste a screenshot (Ctrl+V).
          </p>
        </header>

        {/* Input */}
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type in English or Spanish... or paste a screenshot (Ctrl+V)"
            rows={3}
            autoFocus
            className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:border-[#fbbf24] focus:ring-2 focus:ring-[rgba(251,191,36,0.15)] transition-all resize-none"
          />
          {/* Pasted image preview */}
          {pastedImage && (
            <div className="mt-2 relative">
              <img src={pastedImage} alt="Pasted screenshot" className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] max-h-48 object-contain bg-[#0a0a0a]" />
              <button
                onClick={() => setPastedImage(null)}
                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full hover:bg-black transition-colors"
              >
                ✕ Remove
              </button>
            </div>
          )}
          <button
            onClick={translate}
            disabled={(!input.trim() && !pastedImage) || loading}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-semibold text-[15px] py-3 px-6 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Translating...
              </>
            ) : (
              <>
                Translate <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Result */}
        {result && (result.translated || result.spanish) && (
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
                  {copied === "interpreted" ? (
                    <Check className="w-4 h-4 text-[#22c55e]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-white text-[15px] leading-relaxed">
                <HighlightedText text={result.interpreted} corrections={result.corrections} />
              </p>
              <CorrectionsBadge corrections={result.corrections} />
            </div>

            {/* Translation */}
            <div className="bg-[#111111] border border-[rgba(251,191,36,0.2)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#fbbf24]">
                    {result.direction === "es→en" ? "English" : "Español"}
                  </span>
                  <span className="text-[10px] font-medium bg-[rgba(34,197,94,0.15)] text-[#22c55e] px-2 py-0.5 rounded-full">
                    Natural
                  </span>
                  {result.direction && (
                    <span className="text-[10px] font-medium bg-[rgba(251,191,36,0.1)] text-[#fbbf24] px-2 py-0.5 rounded-full">
                      {result.direction}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => copyText(result.translated || result.spanish || "", "spanish")}
                  className="text-[rgba(255,255,255,0.4)] hover:text-[#fbbf24] transition-colors"
                >
                  {copied === "spanish" ? (
                    <Check className="w-4 h-4 text-[#22c55e]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-white text-[18px] leading-relaxed font-medium">{result.translated || result.spanish}</p>
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
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[13px] text-[rgba(255,255,255,0.5)] truncate flex-1">{h.input}</p>
                    <span className="text-[10px] text-[rgba(255,255,255,0.25)] ml-2 whitespace-nowrap">
                      {formatTime(h.ts)}
                    </span>
                  </div>
                  <p className="text-[14px] text-white truncate">{h.result.translated || h.result.spanish}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center pt-10 pb-6">
          <p className="text-[11px] text-[rgba(255,255,255,0.2)]">Powered by GPT-4o · Paste screenshots with Ctrl+V</p>
        </footer>
      </div>
    </div>
  );
}
