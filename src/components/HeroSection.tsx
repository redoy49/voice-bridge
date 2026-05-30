import { ArrowRight, Mic, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-illustration.png";

const rotatingWords = [
  "Instantly.",
  "Seamlessly.",
  "Effortlessly.",
  "Naturally.",
];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />

      {/* Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8 md:ml-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Ultra-Low Latency Translation
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-6xl font-display font-bold leading-[1.05] text-foreground"
            >
              Speak Any Language.{" "}
              <span className="text-slider-container">
                <span className="text-slider-track">
                  {rotatingWords.map((word) => (
                    <div key={word} className="gradient-text-slider">
                      {word}
                    </div>
                  ))}
                  <div className="gradient-text-slider">{rotatingWords[0]}</div>
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Real-Time AI Translation For Meetings, Calls, And Live Events.
              Every Word Translated As It's Spoken Zero Delay, Zero Setup.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/translate">
                <Button
                  size="lg"
                  className="gradient-coral text-primary-foreground border-0 hover:opacity-90 h-14 px-8 text-base font-semibold shadow-glow rounded-full"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Translating Free
                </Button>
              </Link>

              <Link to="/translate">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    h-14 px-8 text-base font-medium
                    border-border
                    text-foreground
                    bg-transparent
                    rounded-full
                    transition-all duration-300
                    hover:bg-secondary
                    hover:text-foreground
                    hover:border-border
                  "
                >
                  Watch Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Feature row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-2"
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

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative rounded-3xl p-6 bg-card/40 backdrop-blur-md border border-border/40 shadow-sm">
              <img
                src={heroImage}
                alt="AI voice translation illustration"
                className="w-full max-w-lg rounded-2xl"
                fetchPriority="high"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-lg rounded-full shadow-lg border border-border/40 px-4 py-3 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  Live Translating…
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
