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

/* ENGLISH */
const englishMessages: Message[] = [
  { time: "00:04", speaker: "SPEAKER 01", text: "How are you, Luis?" },
  { time: "00:08", speaker: "SPEAKER 02", text: "I'm good, thank you!" },
  { time: "00:12", speaker: "SPEAKER 01", text: "I'll need your email." },
  {
    time: "00:16",
    speaker: "SPEAKER 02",
    text: "Sure, I can share it with you.",
  },
  {
    time: "00:22",
    speaker: "SPEAKER 01",
    text: "Let's start the project tomorrow.",
  },
];

/* BANGLA (BENGALI) */
const banglaMessages: Message[] = [
  { time: "00:04", speaker: "SPEAKER 01", text: "তুমি কেমন আছো, লুইস?" },
  { time: "00:08", speaker: "SPEAKER 02", text: "আমি ভালো আছি, ধন্যবাদ!" },
  { time: "00:12", speaker: "SPEAKER 01", text: "আমি তোমার ইমেইলটা দরকার।" },
  {
    time: "00:16",
    speaker: "SPEAKER 02",
    text: "ঠিক আছে, আমি তোমাকে পাঠাচ্ছি।",
  },
  { time: "00:22", speaker: "SPEAKER 01", text: "চলো কাল থেকে কাজ শুরু করি।" },
];

const tabs = ["Two-way", "One-way", "Transcribe"] as const;

const TranslationDemo = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Two-way");
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
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="demo" className="relative py-28">
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    activeTab === tab
                      ? "gradient-coral text-primary-foreground shadow-soft"
                      : "bg-card/40 text-muted-foreground border border-border/40 hover:text-foreground hover:bg-card/60"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl p-6 md:p-8 shadow-sm">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm mb-3">
                English → বাংলা Live Demo
              </span>

              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Real-time AI translation that preserves meaning, tone, and
                intent.
              </p>
            </div>

            {/* Panels */}
            <div className="grid md:grid-cols-2 gap-12 relative">
              {/* ENGLISH */}
              <div className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-5 min-h-[340px]">
                <div className="flex items-center gap-2 mb-5">
                  <Globe className="w-6 h-6 text-muted-foreground" />
                  <span className="font-semibold">English</span>
                </div>

                <div className="space-y-4">
                  {englishMessages.slice(0, visibleCount).map((msg, i) => (
                    <MessageRow
                      key={i}
                      msg={msg}
                      lang="EN"
                      isNew={i === visibleCount - 1}
                    />
                  ))}
                </div>
              </div>

              {/* SWAP BUTTON */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="w-11 h-11 rounded-full gradient-coral flex items-center justify-center shadow-glow hover:scale-105 transition">
                  <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>

              {/* BANGLA */}
              <div className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-5 min-h-[340px]">
                <div className="flex items-center gap-2 mb-5">
                  <Globe className="w-6 h-6 text-muted-foreground" />
                  <span className="font-semibold">বাংলা</span>
                </div>

                <div className="space-y-4">
                  {banglaMessages.slice(0, visibleCount).map((msg, i) => (
                    <MessageRow
                      key={i}
                      msg={msg}
                      lang="BN"
                      isNew={i === visibleCount - 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link to="/translate">
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-border/40"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Full Screen
                </Button>
              </Link>

              <Link to="/translate">
                <Button className="gradient-coral text-primary-foreground rounded-full px-6">
                  <Mic className="w-4 h-4 mr-2" />
                  Start Talking
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ICON */
const Globe = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

/* MESSAGE */
const MessageRow = ({
  msg,
  lang,
  isNew,
}: {
  msg: Message;
  lang: string;
  isNew: boolean;
}) => (
  <div
    className={`transition-all duration-500 ${isNew ? "animate-in fade-in" : ""}`}
  >
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
      <span>{msg.time}</span>
      <span>{msg.speaker}</span>
    </div>

    <div className="flex items-start gap-2">
      <span className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
        {lang}
      </span>

      <p className="text-sm text-foreground">{msg.text}</p>
    </div>
  </div>
);

export default TranslationDemo;
