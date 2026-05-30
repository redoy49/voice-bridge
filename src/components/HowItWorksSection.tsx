import { Mic, Cpu, Volume2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Mic,
    step: "01",
    title: "Speak Naturally",
    description: "Just talk in your language. VoiceBridge auto-detects the source language and speaker identity.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Translates In Real-Time",
    description: "Streaming AI processes audio in small chunks, translating incrementally with predictive context.",
  },
  {
    icon: Volume2,
    step: "03",
    title: "Everyone Understands",
    description: "Each listener hears a natural voice translation in their preferred language — instantly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 capitalize">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">Three Steps. Zero Setup.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.15}>
              <div className="relative text-center">
                <div className="relative mx-auto mb-6 w-16 h-16">
                  {/* Glass circle behind icon */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/15" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <span className="text-xs font-display font-semibold text-primary/70 tracking-widest mb-2 block">
                  STEP {s.step}
                </span>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3 capitalize">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.description}</p>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 text-border">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
