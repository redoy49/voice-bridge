import { Mic, Cpu, Volume2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Mic,
    step: "01",
    title: "Speak Naturally",
    description:
      "Just talk in your language. VoiceBridge automatically detects speech and speaker identity.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Translates in Real Time",
    description:
      "Streaming AI processes audio in chunks, translating with contextual understanding.",
  },
  {
    icon: Volume2,
    step: "03",
    title: "Everyone Understands",
    description:
      "Each participant hears natural translation in their preferred language instantly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 bg-background">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            How It Works
          </h2>

          <p className="text-muted-foreground text-lg">
            Three simple steps. Zero setup required.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-3 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;

            return (
              <ScrollReveal key={s.step} delay={i * 0.1}>
                <div className="relative text-center group">
                  {/* Icon */}
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border/40 bg-card/40 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-border">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Step badge */}
                  <span className="mb-2 block text-xs font-semibold tracking-widest text-primary/70">
                    STEP {s.step}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>

                  {/* Connector line (desktop only) */}
                  {i < steps.length - 1 && (
                    <div className="absolute top-8 -right-6 hidden md:block text-border/60">
                      <svg
                        width="32"
                        height="16"
                        viewBox="0 0 32 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 8 H28 M28 8 L22 2 M28 8 L22 14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
