import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const CTASection = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Glow System */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Layout Container */}
      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative text-center rounded-3xl border border-border/40 bg-background/70 backdrop-blur-xl px-6 py-16 md:py-20 md:px-16 shadow-sm overflow-hidden">
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-primary/5 via-transparent to-transparent" />

            {/* Badge */}
            <Badge className="relative mb-6 px-4 py-1.5 text-sm font-medium rounded-full bg-secondary/60 text-foreground border border-border/40">
              ✨ Trusted by creators & teams
            </Badge>

            {/* Heading */}
            <h2 className="relative text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Break every{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                language barrier
              </span>
            </h2>

            {/* Subtext */}
            <p className="relative mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Translate conversations in real time with AI. No setup, no credit
              card just start speaking and connect globally.
            </p>

            {/* CTA Button */}
            <div className="relative mt-8 flex justify-center">
              <Link to="/translate">
                <Button
                  size="lg"
                  className="
                    h-12 md:h-14 px-8 md:px-10
                    rounded-full
                    bg-gradient-to-r from-primary to-primary/80
                    text-primary-foreground
                    shadow-xs shadow-primary/20
                    hover:shadow-xs hover:shadow-primary/30
                    hover:scale-[1.03]
                    transition-all duration-300
                    font-semibold
                  "
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Live Translation
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
