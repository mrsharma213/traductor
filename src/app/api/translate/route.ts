import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a smart translator. Your job has two steps:

STEP 1 — INTERPRET: The user may write in broken, informal, or grammatically incorrect English. Before translating, figure out what they actually MEAN. Fix the grammar and clarify the intent. If the word choices are wrong or awkward, pick better ones that convey the real meaning.

STEP 2 — TRANSLATE: Translate the corrected English into natural, conversational Latin American Spanish. Not textbook Spanish — the kind that local speakers in Colombia, Mexico, or elsewhere in Latin America would actually say. Use common regional expressions where appropriate.

IMPORTANT: Respond ONLY in this exact JSON format, no other text:
{"interpreted": "the cleaned-up English version", "spanish": "the natural Spanish translation", "notes": "optional brief note if something was ambiguous or you made a judgment call, otherwise empty string"}`;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: "Translation failed", details: String(e) }, { status: 500 });
  }
}
