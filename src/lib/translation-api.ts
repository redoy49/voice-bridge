// Streaming translation via edge function
const TRANSLATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`;
const AUTH_HEADER = {
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
  "Content-Type": "application/json",
};

export async function detectLanguage(text: string): Promise<string> {
  const resp = await fetch(TRANSLATE_URL, {
    method: "POST",
    headers: AUTH_HEADER,
    body: JSON.stringify({ text, mode: "detect" }),
  });
  if (!resp.ok) throw new Error("Language detection failed");
  const data = await resp.json();
  return data.language || "en";
}

export async function streamTranslation({
  text,
  sourceLang,
  targetLang,
  onDelta,
  onDone,
}: {
  text: string;
  sourceLang: string;
  targetLang: string;
  onDelta: (chunk: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(TRANSLATE_URL, {
    method: "POST",
    headers: AUTH_HEADER,
    body: JSON.stringify({ text, sourceLang, targetLang }),
  });

  if (!resp.ok || !resp.body) {
    const err = await resp.json().catch(() => ({ error: "Translation failed" }));
    throw new Error(err.error || "Translation failed");
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

// Non-streaming quick translation
export async function quickTranslate(text: string, sourceLang: string, targetLang: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let result = "";
    streamTranslation({
      text,
      sourceLang,
      targetLang,
      onDelta: (chunk) => { result += chunk; },
      onDone: () => resolve(result),
    }).catch(reject);
  });
}
