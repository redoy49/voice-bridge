import { Zap, Users, Globe, Brain, Headphones, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description: "Start translating while the speaker is still talking. Predictive translation anticipates sentence endings.",
  },
  {
    icon: Globe,
    title: "60+ Languages",
    description: "Support for dozens of global languages with automatic detection. Handles code-switching mid-sentence.",
  },
  {
    icon: Users,
    title: "Speaker Diarization",
    description: "Automatically identifies who said what with persistent voice fingerprints for returning speakers.",
  },
  {
    icon: Brain,
    title: "Context-Aware AI",
    description: "Preserves tone, emotion, and intent. Natural conversational flow over literal translation.",
  },
  {
    icon: Headphones,
    title: "Silent Mode",
    description: "Hear translations privately without other participants needing to install anything.",
  },
  {
    icon: Shield,
    title: "Enterprise Secure",
    description: "End-to-end encryption. SOC 2 compliant. Your conversations never leave the secure pipeline.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 capitalize">
            Built For Speed. Designed For Humans.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every Feature Engineered To Make Language Barriers Disappear Instantly.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.08}>
              <div className="relative bg-card/30 backdrop-blur-md rounded-2xl p-7 border border-white/20 hover:shadow-soft transition-all duration-300 group overflow-hidden">
                {/* Glass gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 capitalize">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
