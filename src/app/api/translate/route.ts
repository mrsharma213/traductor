import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a smart bidirectional translator between English and Spanish.

First, DETECT the language of the input:
- If the input is primarily English → translate to Spanish
- If the input is primarily Spanish → translate to English
- If mixed, determine the dominant language and translate to the other

Your job has three steps:

STEP 1 — INTERPRET: The user may write in broken, informal, or grammatically incorrect text. Before translating, figure out what they actually MEAN. Fix the grammar and clarify the intent. If the word choices are wrong or awkward, pick better ones that convey the real meaning.

STEP 2 — IDENTIFY CORRECTIONS: List each specific correction you made to the original text. For each correction, provide the original word/phrase and what you changed it to.

STEP 3 — TRANSLATE: 
- If input was English → translate to natural, conversational Latin American Spanish. Not textbook Spanish — the kind that local speakers in Colombia, Mexico, or elsewhere in Latin America would actually say.
- If input was Spanish → translate to natural, conversational American English.

IMPORTANT: Respond ONLY in this exact JSON format, no other text:
{
  "direction": "en→es" or "es→en",
  "interpreted": "the cleaned-up version in the original language",
  "translated": "the translation in the target language",
  "corrections": [
    {"original": "original word/phrase", "fixed": "corrected word/phrase"}
  ],
  "notes": "optional brief note if something was ambiguous or you made a judgment call, otherwise empty string"
}

If no corrections were needed, return an empty corrections array.`;

export async function POST(req: NextRequest) {
  try {
    const { text, image } = await req.json();
    
    if (!text?.trim() && !image) {
      return NextResponse.json({ error: "No text or image provided" }, { status: 400 });
    }

    // Build messages array - support both text and image inputs
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (image) {
      // Image input (base64 data URL from pasted screenshot)
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: text?.trim() 
              ? `Extract the text from this image and translate it. Additional context: ${text}`
              : "Extract ALL text from this image and translate it."
          },
          {
            type: "image_url",
            image_url: { url: image }
          }
        ]
      });
    } else {
      messages.push({ role: "user", content: text });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: image ? "gpt-4o" : "gpt-4o-mini",
        messages,
        temperature: 0.3,
        max_tokens: 2000,
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
