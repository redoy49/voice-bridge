import { useState, useCallback, useRef, useEffect } from "react";
import {
  ArrowLeftRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  Maximize,
  Minimize,
  Download,
  Languages as LangIcon,
  Send,
  Keyboard,
  Clock,
  Users,
  Wifi,
  WifiOff,
  AlertCircle,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import LANGUAGES, { LANG_NAMES } from "@/lib/languages";
import { streamTranslation, detectLanguage } from "@/lib/translation-api";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { toast } from "@/hooks/use-toast";
import { createShareUrl, decodeTranslation } from "@/lib/share-translation";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useSearchParams } from "react-router-dom";

interface TranscriptEntry {
  id: string;
  speaker: string;
  time: string;
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  highlights?: string[];
}

type Mode = "two-way" | "one-way" | "transcribe";

function extractHighlights(text: string): string[] {
  const highlights: string[] = [];
  const datePatterns =
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2}(?:,?\s+\d{4})?)\b/gi;
  const dates = text.match(datePatterns);
  if (dates) highlights.push(...dates.map((d) => `📅 ${d}`));
  const pricePatterns = /[\$€£¥₹]\s?\d[\d,]*\.?\d*/g;
  const prices = text.match(pricePatterns);
  if (prices) highlights.push(...prices.map((p) => `💰 ${p}`));
  const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
  const emails = text.match(emailPattern);
  if (emails) highlights.push(...emails.map((e) => `📧 ${e}`));
  if (
    /\b(deadline|urgent|asap|action item|todo|follow[ -]?up|reminder)\b/i.test(
      text,
    )
  ) {
    highlights.push("⚡ Action item detected");
  }
  return highlights;
}

const LiveTranslate = () => {
  const [sourceLang, setSourceLang] = useState("bn");
  const [targetLang, setTargetLang] = useState("en");
  const [searchParams] = useSearchParams();
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [interimText, setInterimText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<Mode>("two-way");
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [textInput, setTextInput] = useState("");
  const [autoDetect, setAutoDetect] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const speakerCount = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceScrollRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef<HTMLDivElement>(null);
  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { speak, stop: stopSpeech } = useTextToSpeech();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        variant: "destructive",
        title: "Connection Lost",
        description: "Translations may fail. Check your network.",
      });
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, []);

  // Load shared translation from URL
  useEffect(() => {
    const shared = searchParams.get("shared");
    if (shared) {
      const data = decodeTranslation(shared);
      if (data) {
        setSourceLang(data.sourceLang);
        setTargetLang(data.targetLang);
        const id = crypto.randomUUID();
        const now = new Date();
        const time = `${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
        setEntries([
          {
            id,
            speaker: "Shared",
            time,
            originalText: data.source,
            translatedText: data.target,
            sourceLang: data.sourceLang,
            targetLang: data.targetLang,
          },
        ]);
        toast({
          title: "Shared Translation Loaded",
          description: "A shared translation has been loaded.",
        });
      }
    }
  }, [searchParams]);

  const translateEntry = useCallback(
    async (id: string, text: string, srcLang: string, tgtLang: string) => {
      setIsTranslating(true);
      let translated = "";
      try {
        await streamTranslation({
          text,
          sourceLang: srcLang,
          targetLang: tgtLang,
          onDelta: (chunk) => {
            translated += chunk;
            setEntries((prev) =>
              prev.map((e) =>
                e.id === id ? { ...e, translatedText: translated } : e,
              ),
            );
          },
          onDone: () => {
            setIsTranslating(false);
            const highlights = extractHighlights(translated);
            if (highlights.length > 0) {
              setEntries((prev) =>
                prev.map((e) => (e.id === id ? { ...e, highlights } : e)),
              );
            }
            if (autoSpeak && translated) speak(translated, tgtLang);
          },
        });
      } catch (err: any) {
        setIsTranslating(false);
        toast({
          variant: "destructive",
          title: "Translation Error",
          description: err.message || "Failed to translate",
        });
      }
    },
    [autoSpeak, speak],
  );

  const addEntry = useCallback(
    async (text: string) => {
      const id = crypto.randomUUID();
      const now = new Date();
      const time = `${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      speakerCount.current += 1;
      let detectedSource = sourceLang;

      if (autoDetect) {
        try {
          detectedSource = await detectLanguage(text);
          if (detectedSource === targetLang) {
            const newEntry: TranscriptEntry = {
              id,
              speaker: `Speaker ${speakerCount.current % 2 === 0 ? "02" : "01"}`,
              time,
              originalText: text,
              translatedText: "",
              sourceLang: detectedSource,
              targetLang: sourceLang,
            };
            setEntries((prev) => [...prev, newEntry]);
            await translateEntry(id, text, detectedSource, sourceLang);
            return;
          }
        } catch {}
      }

      const newEntry: TranscriptEntry = {
        id,
        speaker: `Speaker ${speakerCount.current % 2 === 0 ? "02" : "01"}`,
        time,
        originalText: text,
        translatedText: activeTab === "transcribe" ? "" : "",
        sourceLang: detectedSource,
        targetLang,
      };
      setEntries((prev) => [...prev, newEntry]);
      if (activeTab !== "transcribe")
        await translateEntry(id, text, detectedSource, targetLang);
    },
    [sourceLang, targetLang, autoDetect, activeTab, translateEntry],
  );

  const handleFinalResult = useCallback(
    async (text: string) => {
      setInterimText("");
      await addEntry(text);
    },
    [addEntry],
  );

  const {
    isListening,
    start: startListeningRaw,
    stop: stopListeningRaw,
  } = useSpeechRecognition({
    lang: sourceLang,
    onResult: (text, isFinal) => {
      if (isFinal) handleFinalResult(text);
      else setInterimText(text);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: error,
      });
    },
  });

  const startListening = useCallback(() => {
    startListeningRaw();
    setSessionDuration(0);
    sessionTimerRef.current = setInterval(
      () => setSessionDuration((d) => d + 1),
      1000,
    );
  }, [startListeningRaw]);

  const stopListening = useCallback(() => {
    stopListeningRaw();
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
  }, [stopListeningRaw]);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    const text = textInput.trim();
    setTextInput("");
    await addEntry(text);
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };
  const clearTranscript = () => {
    setEntries([]);
    speakerCount.current = 0;
    setSessionDuration(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const downloadTranscript = () => {
    const lines = entries.map((e) => {
      let line = `[${e.time}] ${e.speaker}\n  ${LANG_NAMES[e.sourceLang] || e.sourceLang}: ${e.originalText}`;
      if (e.translatedText)
        line += `\n  ${LANG_NAMES[e.targetLang] || e.targetLang}: ${e.translatedText}`;
      if (e.highlights?.length)
        line += `\n  Key Info: ${e.highlights.join(", ")}`;
      return line;
    });
    const text = `VoiceBridge Transcript — ${new Date().toLocaleString()}\nSession Duration: ${formatTime(sessionDuration)}\n${"=".repeat(50)}\n\n${lines.join("\n\n")}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voicebridge-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    sourceScrollRef.current?.scrollTo({
      top: sourceScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
    targetScrollRef.current?.scrollTo({
      top: targetScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, interimText]);

  const sourceLangObj = LANGUAGES.find((l) => l.code === sourceLang);
  const targetLangObj = LANGUAGES.find((l) => l.code === targetLang);
  const showTranslation = activeTab !== "transcribe";

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background flex flex-col relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      {/* Header — glass */}
      <header className="border-b border-white/10 bg-card/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="/" className="flex items-center gap-2.5">
            <VoiceBridgeLogo size={36} />
            <span className="font-display font-bold text-lg text-foreground">
              VoiceBridge
            </span>
          </a>

          {/* Mode tabs — pill style */}
          <div className="hidden sm:flex gap-1.5 bg-card/30 backdrop-blur-sm rounded-full p-1 border border-white/10">
            {(["two-way", "one-way", "transcribe"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
                  activeTab === tab
                    ? "gradient-coral text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "two-way"
                  ? "Two-Way"
                  : tab === "one-way"
                    ? "One-Way"
                    : "Transcribe"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {(isListening || sessionDuration > 0) && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground mr-2 bg-card/30 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                <Clock className="w-3 h-3" />
                <span>{formatTime(sessionDuration)}</span>
              </div>
            )}
            <div className="mr-1">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-primary" />
              ) : (
                <WifiOff className="w-4 h-4 text-destructive" />
              )}
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (entries.length === 0) return;
                const lastEntry = entries[entries.length - 1];
                const url = createShareUrl({
                  source: lastEntry.originalText,
                  target: lastEntry.translatedText,
                  sourceLang: lastEntry.sourceLang,
                  targetLang: lastEntry.targetLang,
                });
                navigator.clipboard.writeText(url);
                toast({
                  title: "Link Copied!",
                  description:
                    "Share this link with anyone to see this translation.",
                });
              }}
              title="Share translation"
              disabled={entries.length === 0}
              className="rounded-full hover:bg-card/40"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title="Fullscreen"
              className="rounded-full hover:bg-card/40"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadTranscript}
              title="Download transcript"
              disabled={entries.length === 0}
              className="rounded-full hover:bg-card/40"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearTranscript}
              title="Clear"
              disabled={entries.length === 0}
              className="rounded-full hover:bg-card/40"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-5 overflow-hidden relative z-10">
        {/* Language selectors */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-1.5">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="w-48 bg-card/40 backdrop-blur-sm border-white/15 rounded-full px-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card/90 backdrop-blur-xl border-white/15">
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeTab === "two-way" && (
              <button
                onClick={() => setAutoDetect(!autoDetect)}
                className={`text-xs transition-colors ${autoDetect ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                {autoDetect ? "✓ Auto-Detect On" : "Auto-Detect"}
              </button>
            )}
          </div>

          {showTranslation && (
            <>
              <button
                onClick={swapLanguages}
                className="w-11 h-11 rounded-full gradient-coral flex items-center justify-center hover:opacity-90 transition-all shadow-glow"
              >
                <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
              </button>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-48 bg-card/40 backdrop-blur-sm border-white/15 rounded-full px-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/90 backdrop-blur-xl border-white/15">
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        {/* Transcript panels — glassmorphism */}
        <div
          className={`grid ${showTranslation ? "md:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto w-full"} gap-5 flex-1 min-h-0`}
        >
          {/* Source panel */}
          <div className="relative rounded-2xl bg-card/20 backdrop-blur-xl border border-white/20 flex flex-col overflow-hidden shadow-[0_8px_32px_-8px_hsl(12_90%_58%/0.06)]">
            {/* Gradient border overlay */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 px-5 py-3.5 border-b border-white/10 flex items-center gap-2">
              <span className="text-lg">{sourceLangObj?.flag}</span>
              <span className="font-display font-semibold text-sm text-foreground">
                {sourceLangObj?.name}
              </span>
              {isListening && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Listening
                </span>
              )}
              <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3" />
                {new Set(entries.map((e) => e.speaker)).size || 0} Speakers
              </span>
            </div>
            <div
              ref={sourceScrollRef}
              className="relative z-10 flex-1 overflow-y-auto p-5 space-y-3 min-h-[280px] max-h-[55vh]"
            >
              {entries.map((entry) => (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  side="source"
                  onSpeak={(text, lang) => speak(text, lang)}
                />
              ))}
              {interimText && (
                <div className="text-sm text-muted-foreground italic animate-pulse px-1">
                  {interimText}
                </div>
              )}
              {entries.length === 0 && !interimText && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary/8 flex items-center justify-center">
                    <Mic className="w-6 h-6 text-primary/40" />
                  </div>
                  <span>
                    {inputMode === "voice"
                      ? 'Press "Start Talking" To Begin'
                      : "Type A Message Below"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Target panel */}
          {showTranslation && (
            <div className="relative rounded-2xl bg-card/20 backdrop-blur-xl border border-white/20 flex flex-col overflow-hidden shadow-[0_8px_32px_-8px_hsl(12_90%_58%/0.06)]">
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10 px-5 py-3.5 border-b border-white/10 flex items-center gap-2">
                <span className="text-lg">{targetLangObj?.flag}</span>
                <span className="font-display font-semibold text-sm text-foreground">
                  {targetLangObj?.name}
                </span>
                {isTranslating && (
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Translating
                  </span>
                )}
              </div>
              <div
                ref={targetScrollRef}
                className="relative z-10 flex-1 overflow-y-auto p-5 space-y-3 min-h-[280px] max-h-[55vh]"
              >
                {entries.map((entry) => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    side="target"
                    onSpeak={(text, lang) => speak(text, lang)}
                  />
                ))}
                {entries.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary/8 flex items-center justify-center">
                      <LangIcon className="w-6 h-6 text-primary/40" />
                    </div>
                    <span>Translations Appear Here</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Text input area */}
        {inputMode === "text" && (
          <div className="flex gap-3 max-w-3xl mx-auto w-full">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleTextKeyDown}
              placeholder="Type a message to translate…"
              className="resize-none bg-card/30 backdrop-blur-sm border-white/15 rounded-2xl min-h-[48px] max-h-24 focus:border-primary/30"
              rows={1}
            />
            <Button
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isTranslating}
              className="gradient-coral text-primary-foreground border-0 shrink-0 rounded-full w-12 h-12 shadow-soft"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Controls — pill buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pb-3">
          <Button
            variant="outline"
            onClick={() =>
              setInputMode(inputMode === "voice" ? "text" : "voice")
            }
            className="gap-2 rounded-full px-5 border-white/15 bg-card/30 backdrop-blur-sm hover:bg-card/50"
          >
            {inputMode === "voice" ? (
              <Keyboard className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
            {inputMode === "voice" ? "Type Instead" : "Voice Instead"}
          </Button>

          <Button
            variant="outline"
            onClick={toggleFullscreen}
            className="gap-2 rounded-full px-5 border-white/15 bg-card/30 backdrop-blur-sm hover:bg-card/50"
          >
            <Maximize className="w-4 h-4" />
            Full Screen
          </Button>

          <Button
            onClick={() => setAutoSpeak(!autoSpeak)}
            variant="outline"
            className="gap-2 rounded-full px-5 border-white/15 bg-card/30 backdrop-blur-sm hover:bg-card/50"
          >
            {autoSpeak ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {autoSpeak ? "Auto-Speak On" : "Auto-Speak Off"}
          </Button>

          {inputMode === "voice" && (
            <Button
              size="lg"
              onClick={isListening ? stopListening : startListening}
              disabled={!isOnline}
              className={`gap-2 h-14 px-8 text-base font-semibold rounded-full transition-all ${
                isListening
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "gradient-coral text-primary-foreground border-0 hover:opacity-90 shadow-glow"
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5" />
                  Stop Listening
                </>
              ) : (
                <>
                  <div className="relative">
                    <Mic className="w-5 h-5" />
                    {!isOnline && (
                      <WifiOff className="w-3 h-3 absolute -top-1 -right-1 text-destructive" />
                    )}
                  </div>
                  Start Talking
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

const EntryRow = ({
  entry,
  side,
  onSpeak,
}: {
  entry: TranscriptEntry;
  side: "source" | "target";
  onSpeak: (text: string, lang: string) => void;
}) => {
  const text = side === "source" ? entry.originalText : entry.translatedText;
  const lang = side === "source" ? entry.sourceLang : entry.targetLang;
  const isTarget = side === "target";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-300 group">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <span>{entry.time}</span>
        <span className="uppercase font-medium">{entry.speaker}</span>
        <button
          onClick={() => onSpeak(text, lang)}
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto hover:text-primary"
          title="Play audio"
        >
          <Volume2 className="w-3 h-3" />
        </button>
      </div>
      <div className="flex items-start gap-2">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary shrink-0 uppercase">
          {lang}
        </span>
        <p
          className={`text-sm leading-relaxed ${isTarget ? "text-primary" : "text-foreground"}`}
        >
          {text || (
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="animate-typing">●</span>
              <span
                className="animate-typing"
                style={{ animationDelay: "0.2s" }}
              >
                ●
              </span>
              <span
                className="animate-typing"
                style={{ animationDelay: "0.4s" }}
              >
                ●
              </span>
            </span>
          )}
        </p>
      </div>
      {entry.highlights && entry.highlights.length > 0 && side === "target" && (
        <div className="flex flex-wrap gap-1.5 mt-1.5 ml-8">
          {entry.highlights.map((h, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15"
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default LiveTranslate;
