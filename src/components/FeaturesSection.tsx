import { Zap, Users, Globe, Brain, Headphones, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description:
      "Start translating while the speaker is still talking. Predictive AI reduces delay to near real-time.",
  },
  {
    icon: Globe,
    title: "60+ Languages",
    description:
      "Automatic language detection with seamless switching even mid-sentence.",
  },
  {
    icon: Users,
    title: "Speaker Identification",
    description:
      "Recognizes and separates speakers with consistent voice fingerprints.",
  },
  {
    icon: Brain,
    title: "Context-Aware AI",
    description:
      "Preserves meaning, tone, and intent instead of literal word translation.",
  },
  {
    icon: Headphones,
    title: "Private Listening Mode",
    description:
      "Receive translations privately without interrupting live conversations.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "End-to-end encryption with secure processing and compliance standards.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 bg-background">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built for Speed. Designed for Humans.
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature is engineered to remove language barriers in real time,
            without breaking natural conversation flow.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <ScrollReveal key={feature.title} delay={i * 0.06}>
                <div
                  className="
                    group relative rounded-2xl
                    border border-border/40
                    bg-card/40 backdrop-blur-md
                    p-7
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-border
                    hover:shadow-lg
                  "
                >
                  {/* icon container */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* title */}
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>

                  {/* description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;