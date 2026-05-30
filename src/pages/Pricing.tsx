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
    description: "Perfect for trying out real-time translation in casual conversations.",
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
    description: "For professionals who need unlimited, high-quality translation daily.",
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
    description: "Dedicated infrastructure, SLAs, and compliance for large teams.",
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
    a: "Absolutely — you get 14 days of full Pro access, no credit card required.",
  },
  {
    q: "What Happens When I Exceed The Free Plan Limits?",
    a: "You'll receive a friendly notification. Your session will pause, and you can upgrade instantly or wait until next month.",
  },
  {
    q: "Do You Offer Discounts For Nonprofits Or Education?",
    a: "Yes. Eligible organizations receive up to 50% off Pro and Enterprise plans. Contact our sales team to apply.",
  },
  {
    q: "How Does Enterprise Billing Work?",
    a: "We offer annual contracts with flexible billing. Volume discounts apply for teams larger than 50 seats.",
  },
  {
    q: "Is My Data Secure?",
    a: "All translations are processed with end-to-end encryption. We're SOC 2 compliant, and audio is never stored after processing.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <Navbar />
      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium rounded-full">
                Simple, Transparent Pricing
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-4">
                Plans That Scale With{" "}
                <span className="gradient-text">Your Voice</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start Free, Upgrade When You Need More. No Hidden Fees, No Surprises — Just Seamless Translation.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing" className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
              {tiers.map((tier, i) => (
                <ScrollReveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-glow ${
                    tier.popular
                      ? "scale-[1.02]"
                      : ""
                  }`}
                >
                  {/* Glass background */}
                  <div className="absolute inset-0 rounded-2xl bg-card/20 backdrop-blur-xl" />
                  {/* Gradient border overlay */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                    padding: "1px",
                    background: tier.popular
                      ? "linear-gradient(180deg, hsl(12 90% 58% / 0.6) 0%, hsl(24 100% 50% / 0.15) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }} />
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />

                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <Badge className="gradient-coral text-primary-foreground border-0 px-4 py-1 text-xs font-semibold shadow-glow rounded-full">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="relative z-10 mb-6">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                      tier.popular ? "gradient-coral shadow-soft" : "bg-secondary/60 backdrop-blur-sm"
                    }`}>
                      <tier.icon className={`w-5 h-5 ${tier.popular ? "text-primary-foreground" : "text-foreground"}`} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                  </div>

                  <div className="relative z-10 mb-6">
                    <span className="text-4xl font-display font-bold text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">/ {tier.period}</span>
                  </div>

                  <Link to="/translate" className="relative z-10 block mb-8">
                    <Button
                      className={`w-full h-12 font-semibold text-base rounded-full transition-all duration-200 ${
                        tier.popular
                          ? "gradient-coral text-primary-foreground border-0 hover:opacity-90 shadow-glow"
                          : "border border-border bg-card/40 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                      }`}
                      variant={tier.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {tier.cta}
                    </Button>
                  </Link>

                  <ul className="relative z-10 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? "text-foreground" : "text-muted-foreground/50"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground text-center mb-12">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <ScrollReveal key={faq.q} delay={i * 0.05}>
                <div className="relative rounded-xl p-6 overflow-hidden">
                  {/* Glass bg */}
                  <div className="absolute inset-0 rounded-xl bg-card/20 backdrop-blur-xl" />
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                    padding: "1px",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.04) 100%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }} />
                  <h3 className="relative z-10 font-display font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden" style={{
              background: "linear-gradient(135deg, hsl(12 85% 94%) 0%, hsl(24 90% 92%) 50%, hsl(35 80% 90%) 100%)",
            }}>
              <div className="p-12 md:p-16">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/10" />
                <h2 className="relative text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Ready To Break Language Barriers?
                </h2>
                <p className="relative text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                  Join Thousands Of Professionals Who Translate In Real Time Every Day.
                </p>
                <Link to="/translate">
                  <Button
                    size="lg"
                    className="relative gradient-coral text-primary-foreground rounded-full h-14 px-8 text-base font-semibold shadow-glow hover:opacity-90 transition-all border-0"
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
