import { ArrowRight, Mic, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-illustration.png";

const rotatingWords = ["Instantly.", "Seamlessly.", "Effortlessly.", "Naturally."];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary capitalize">Ultra-Low Latency Translation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05] text-foreground capitalize"
            >
              Speak Any Language.{" "}
              <span className="text-slider-container">
                <span className="text-slider-track">
                  {rotatingWords.map((word) => (
                    <div key={word} className="gradient-text-slider">{word}</div>
                  ))}
                  <div className="gradient-text-slider">{rotatingWords[0]}</div>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed capitalize"
            >
              Real-Time AI Translation For Meetings, Calls, And Live Events. 
              Every Word Translated As It's Spoken — Zero Delay, Zero Setup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/translate">
                <Button size="lg" className="gradient-coral text-primary-foreground border-0 hover:opacity-90 h-14 px-8 text-base font-semibold shadow-glow rounded-full">
                  <Mic className="w-5 h-5 mr-2" />
                  Start Translating Free
                </Button>
              </Link>
              <Link to="/translate">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-medium border-border hover:bg-secondary rounded-full">
                  Watch Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" />
                <span>60+ Languages</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>&lt;500ms Latency</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mic className="w-4 h-4 text-primary" />
                <span>Auto-Detect</span>
              </div>
            </motion.div>
          </div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center"
          >
            {/* Glass card wrapper */}
            <div className="relative rounded-3xl p-6 bg-card/15 backdrop-blur-md border border-white/25 shadow-[0_8px_32px_-8px_hsl(12_90%_58%/0.10)]">
              {/* Gradient border overlay */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  padding: "1px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 100%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              {/* Inner glow overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <img
                src={heroImage}
                width={600}
                height={400}
                fetchPriority="high"
                decoding="async"
                alt="Two people communicating across languages using their phones"
                className="w-full max-w-lg relative z-10 rounded-2xl"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-lg rounded-xl shadow-soft border border-white/30 px-4 py-3 animate-float z-20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground">Live Translating…</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
