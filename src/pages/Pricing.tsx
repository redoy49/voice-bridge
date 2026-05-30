import { Check, X, Zap, Building2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description:
      "Perfect for trying out real-time translation in casual conversations.",
    cta: "Start Free",
    icon: Mic,
    popular: false,
    features: [
      { text: "15 Minutes / Session", included: true },
      { text: "5 Sessions Per Month", included: true },
      { text: "10 Languages", included: true },
      { text: "Auto Language Detection", included: true },
      { text: "Text Input Mode", included: true },
      { text: "Transcript Export (TXT)", included: true },
      { text: "Speaker Diarization", included: false },
      { text: "Priority Support", included: false },
      { text: "Custom Glossary", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description:
      "For professionals who need unlimited, high-quality translation daily.",
    cta: "Start 14-Day Free Trial",
    icon: Zap,
    popular: true,
    features: [
      { text: "Unlimited Session Length", included: true },
      { text: "Unlimited Sessions", included: true },
      { text: "60+ Languages", included: true },
      { text: "Auto Language Detection", included: true },
      { text: "Text & Voice Input", included: true },
      { text: "Transcript Export (TXT, PDF)", included: true },
      { text: "Speaker Diarization", included: true },
      { text: "Priority Support", included: true },
      { text: "Custom Glossary", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored billing",
    description:
      "Dedicated infrastructure, SLAs, and compliance for large teams.",
    cta: "Contact Sales",
    icon: Building2,
    popular: false,
    features: [
      { text: "Unlimited Everything", included: true },
      { text: "All 60+ Languages", included: true },
      { text: "Auto Language Detection", included: true },
      { text: "All Input & Export Modes", included: true },
      { text: "Advanced Speaker Diarization", included: true },
      { text: "Custom Glossary & Terminology", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "SSO & SAML Integration", included: true },
      { text: "99.9% SLA Guarantee", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I Switch Plans At Any Time?",
    a: "Yes. Upgrade, downgrade, or cancel at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is There A Free Trial For Pro?",
    a: "Absolutely you get 14 days of full Pro access, no credit card required.",
  },
  {
    q: "What Happens When I Exceed The Free Plan Limits?",
    a: "Your session pauses and you can upgrade anytime without losing progress.",
  },
  {
    q: "Do You Offer Discounts For Nonprofits Or Education?",
    a: "Yes. Eligible organizations receive up to 50% off Pro and Enterprise plans.",
  },
  {
    q: "How Does Enterprise Billing Work?",
    a: "Flexible annual contracts with volume-based pricing.",
  },
  {
    q: "Is My Data Secure?",
    a: "All translations are encrypted end-to-end and never stored after processing.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10">
        {/* HERO */}
        <section className="pt-32 pb-16">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <Badge className="mb-4 px-4 py-1.5 rounded-full bg-secondary text-foreground">
                Simple, Transparent Pricing
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                Plans That Scale With{" "}
                <span className="text-primary">Your Voice</span>
              </h1>

              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Start free, upgrade anytime no hidden fees.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="pb-24">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {tiers.map((tier, i) => {
                const Icon = tier.icon;

                return (
                  <ScrollReveal key={tier.name} delay={i * 0.1}>
                    <div
                      className={`
                        relative rounded-2xl p-8 h-full flex flex-col
                        border border-border/40
                        bg-card/40 backdrop-blur-md
                        transition-all duration-300
                        hover:-translate-y-1 hover:shadow-sm
                        ${tier.popular ? "ring-2 ring-primary/40 scale-[1.02]" : ""}
                      `}
                    >
                      {/* popular badge */}
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground rounded-full px-4">
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      {/* icon */}
                      <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 bg-secondary text-foreground">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* title */}
                      <h3 className="text-xl font-bold text-foreground">
                        {tier.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        {tier.description}
                      </p>

                      {/* price */}
                      <div className="mt-6 mb-6">
                        <span className="text-4xl font-bold text-foreground">
                          {tier.price}
                        </span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          / {tier.period}
                        </span>
                      </div>

                      {/* FIXED CTA BUTTON (MAIN FIX) */}
                      <Link to="/translate" className="mb-6">
                        <Button
                          className={`
                            w-full h-12 rounded-full text-base font-semibold
                            transition-all duration-300

                            ${
                              tier.popular
                                ? "gradient-coral text-primary-foreground border-0 shadow-glow hover:opacity-90"
                                : "bg-background border border-border text-foreground hover:bg-secondary"
                            }
                          `}
                        >
                          {tier.cta}
                        </Button>
                      </Link>

                      {/* features */}
                      <ul className="space-y-3 text-sm flex-1">
                        {tier.features.map((f) => (
                          <li key={f.text} className="flex items-start gap-3">
                            {f.included ? (
                              <Check className="w-4 h-4 text-primary mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/40 mt-0.5" />
                            )}
                            <span
                              className={
                                f.included
                                  ? "text-foreground"
                                  : "text-muted-foreground/50"
                              }
                            >
                              {f.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
<section className="py-24">
  <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

    <ScrollReveal>
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-14">
        Frequently Asked Questions
      </h2>
    </ScrollReveal>

    <div className="grid md:grid-cols-2 gap-6">

      {faqs.map((faq, i) => (
        <ScrollReveal key={faq.q} delay={i * 0.05}>

          <div className="
            relative group rounded-2xl p-6
            border border-border/40
            bg-card/30 backdrop-blur-md
            transition-all duration-300
            hover:-translate-y-1 hover:border-primary/30
            hover:shadow-sm
          ">

            {/* subtle glow on hover */}
            <div className="
              absolute inset-0 rounded-2xl
              bg-gradient-to-br from-primary/5 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              pointer-events-none
            " />

            {/* question */}
            <h3 className="
              relative z-10 font-semibold text-foreground mb-3
              flex items-start gap-2
            ">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
              {faq.q}
            </h3>

            {/* answer */}
            <p className="relative z-10 text-sm text-muted-foreground leading-relaxed pl-3 border-l border-border/40">
              {faq.a}
            </p>

          </div>

        </ScrollReveal>
      ))}

    </div>
  </div>
</section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-12 bg-secondary/40 border border-border/40">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready To Break Language Barriers?
              </h2>

              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands already using VoiceBridge daily.
              </p>

              <Link to="/translate">
                <Button className="gradient-coral text-primary-foreground rounded-full h-14 px-8 font-semibold">
                  <Mic className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
