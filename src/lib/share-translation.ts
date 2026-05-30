export function encodeTranslation(data: {
  source: string;
  target: string;
  sourceLang: string;
  targetLang: string;
}): string {
  const payload = JSON.stringify(data);
  return btoa(encodeURIComponent(payload));
}

export function decodeTranslation(encoded: string): {
  source: string;
  target: string;
  sourceLang: string;
  targetLang: string;
} | null {
  try {
    const payload = decodeURIComponent(atob(encoded));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function createShareUrl(data: {
  source: string;
  target: string;
  sourceLang: string;
  targetLang: string;
}): string {
  const encoded = encodeTranslation(data);
  return `${window.location.origin}/translate?shared=${encoded}`;
}
