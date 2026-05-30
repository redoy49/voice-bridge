import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(12 85% 96%), hsl(24 88% 94%), hsl(35 75% 93%))",
            }}
          >
            {/* Warm gradient blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(12 90% 88%), transparent)" }}
            />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(24 100% 85%), transparent)" }}
            />

            <Badge variant="secondary" className="relative mb-6 px-4 py-1.5 text-sm font-medium bg-white/50 backdrop-blur-sm border-white/30 text-foreground rounded-full">
              ✨ Trusted By Millions
            </Badge>

            <h2 className="relative text-3xl md:text-5xl font-display font-bold text-foreground mb-4 capitalize">
              Break Every{" "}
              <span className="gradient-text">
                Language Barrier
              </span>
            </h2>
            <p className="relative text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Start Translating Your Meetings In Seconds. No Credit Card Required.
              With Our User-Friendly Interface.
            </p>
            <Link to="/translate">
              <Button
                size="lg"
                className="relative h-14 px-8 text-base font-semibold shadow-soft gradient-coral text-primary-foreground border-0 hover:opacity-90 rounded-full"
              >
                <Mic className="w-5 h-5 mr-2" />
                Get Started Today
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
