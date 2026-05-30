import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_LANGS = new Set([
  "en", "es", "fr", "de", "pt", "it", "ru", "zh", "ja", "ko",
  "ar", "hi", "bn", "tr", "vi", "th", "pl", "nl", "sv", "uk",
]);
const VALID_MODES = new Set(["detect", "translate", undefined]);
const MAX_TEXT_LENGTH = 5000;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // --- Input Validation ---
    const { text, sourceLang, targetLang, mode } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(JSON.stringify({ error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!VALID_MODES.has(mode)) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (mode !== "detect") {
      if (sourceLang && !VALID_LANGS.has(sourceLang)) {
        return new Response(JSON.stringify({ error: "Invalid source language" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (targetLang && !VALID_LANGS.has(targetLang)) {
        return new Response(JSON.stringify({ error: "Invalid target language" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Sanitize text - remove control characters
    const sanitizedText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    console.log("Translation request", { mode, textLength: sanitizedText.length });

    if (mode === "detect") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            { role: "system", content: "You are a language detector. Given text, respond with ONLY the ISO 639-1 language code (e.g., 'en', 'es', 'fr', 'bn', 'hi', 'ar', 'zh', 'ja', 'ko', 'de', 'pt', 'ru'). Nothing else." },
            { role: "user", content: sanitizedText },
          ],
        }),
      });
      if (!response.ok) {
        const t = await response.text();
        console.error("Detection error:", response.status, t);
        return new Response(JSON.stringify({ error: "Detection failed" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const data = await response.json();
      const lang = data.choices?.[0]?.message?.content?.trim().toLowerCase().slice(0, 2) || "en";
      return new Response(JSON.stringify({ language: lang }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Translation mode - streaming
    const systemPrompt = `You are an ultra-fast, real-time translator. Translate the following text from ${sourceLang} to ${targetLang}. 
Rules:
- Output ONLY the translated text, nothing else
- Preserve the speaker's tone, emotion, and intent
- Use natural, conversational language - not literal/robotic translation
- If the text is already in the target language, return it as-is
- Handle incomplete sentences gracefully - translate what's there
- Preserve proper nouns, names, numbers, dates as-is`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: sanitizedText },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add credits in Settings." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Translation error:", response.status, t);
      return new Response(JSON.stringify({ error: "Translation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("translate error:", e);
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
