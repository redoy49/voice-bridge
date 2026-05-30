import { useState, useEffect } from "react";
import { ArrowLeftRight, Mic, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

interface Message {
  time: string;
  speaker: string;
  text: string;
}

const englishMessages: Message[] = [
  { time: "00:04", speaker: "SPEAKER 01", text: "How are you, Luis?" },
  { time: "00:08", speaker: "SPEAKER 02", text: "How are you?" },
  { time: "00:12", speaker: "SPEAKER 01", text: "I'll need your email." },
  { time: "00:16", speaker: "SPEAKER 02", text: "I can't reach out without an email." },
  { time: "00:22", speaker: "SPEAKER 01", text: "And I want to start the work from tomorrow. Are you free?" },
];

const spanishMessages: Message[] = [
  { time: "00:04", speaker: "SPEAKER 01", text: "¿Cómo estás, Luis?" },
  { time: "00:08", speaker: "SPEAKER 02", text: "¿Cómo estás?" },
  { time: "00:12", speaker: "SPEAKER 01", text: "Necesitaré tu correo electrónico." },
  { time: "00:16", speaker: "SPEAKER 02", text: "No puedo comunicarme sin un correo." },
  { time: "00:22", speaker: "SPEAKER 01", text: "Y quiero empezar el trabajo desde mañana. ¿Estás libre?" },
];

const tabs = ["Two-way", "One-way", "Transcribe"] as const;

const TranslationDemo = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Two-way");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= englishMessages.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="demo" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  activeTab === tab
                    ? "gradient-coral text-primary-foreground shadow-soft"
                    : "bg-card/60 backdrop-blur-sm text-muted-foreground border border-white/20 hover:text-foreground hover:bg-card/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Demo card — glassmorphism */}
        <ScrollReveal delay={0.15}>
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-card/20 backdrop-blur-xl border border-white/25 p-8 shadow-[0_8px_32px_-8px_hsl(12_90%_58%/0.08)]">
              {/* Gradient border overlay */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  padding: "1px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.06) 100%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 text-center mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-sm font-medium text-primary mb-3 capitalize">
                  {activeTab} Translation
                </span>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Real-Time Back-And-Forth Translation Preserving Your Intent And Nuances
                </p>
              </div>

              {/* Translation panels */}
              <div className="relative z-10 grid md:grid-cols-2 gap-6 relative">
                {/* English Panel */}
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-5 min-h-[340px] border border-white/15">
                  <div className="flex items-center gap-2 mb-5">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="font-display font-semibold text-foreground">English</span>
                  </div>
                  <div className="space-y-4">
                    {englishMessages.slice(0, visibleCount).map((msg, i) => (
                      <MessageRow key={i} msg={msg} lang="EN" isNew={i === visibleCount - 1} />
                    ))}
                    {visibleCount < englishMessages.length && (
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span className="animate-typing">●</span>
                        <span className="animate-typing" style={{ animationDelay: "0.2s" }}>●</span>
                        <span className="animate-typing" style={{ animationDelay: "0.4s" }}>●</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Swap button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <button className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center shadow-glow">
                    <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>

                {/* Spanish Panel */}
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-5 min-h-[340px] border border-white/15">
                  <div className="flex items-center gap-2 mb-5">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="font-display font-semibold text-foreground">Español</span>
                  </div>
                  <div className="space-y-4">
                    {spanishMessages.slice(0, visibleCount).map((msg, i) => (
                      <MessageRow key={i} msg={msg} lang="ES" isNew={i === visibleCount - 1} />
                    ))}
                    {visibleCount < spanishMessages.length && (
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span className="animate-typing">●</span>
                        <span className="animate-typing" style={{ animationDelay: "0.2s" }}>●</span>
                        <span className="animate-typing" style={{ animationDelay: "0.4s" }}>●</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom controls */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link to="/translate">
                  <Button variant="outline" className="gap-2 rounded-full px-6 border-white/25 bg-card/40 backdrop-blur-sm hover:bg-card/60">
                    <Maximize2 className="w-4 h-4" />
                    Full Screen
                  </Button>
                </Link>
                <Link to="/translate">
                  <Button className="gradient-coral text-primary-foreground border-0 gap-2 hover:opacity-90 rounded-full px-6 shadow-soft">
                    <Mic className="w-4 h-4" />
                    Start Talking
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);

const MessageRow = ({ msg, lang, isNew }: { msg: Message; lang: string; isNew: boolean }) => (
  <div className={`transition-all duration-500 ${isNew ? "animate-in fade-in slide-in-from-bottom-2" : ""}`}>
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
      <span>{msg.time}</span>
      <span>{msg.speaker}</span>
    </div>
    <div className="flex items-start gap-2">
      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground shrink-0">
        {lang}
      </span>
      <p className={`text-sm ${msg.speaker === "SPEAKER 02" ? "text-primary" : "text-foreground"}`}>
        {msg.text}
      </p>
    </div>
  </div>
);

export default TranslationDemo;
