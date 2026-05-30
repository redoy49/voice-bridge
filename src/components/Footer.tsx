import { Link } from "react-router-dom";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";

const Footer = () => {
  return (
    <footer className="relative bg-foreground pt-16 pb-8 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] gradient-coral opacity-60" />
      {/* Ambient glow */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <VoiceBridgeLogo size={36} className="brightness-0 invert" />
              <span className="font-display font-bold text-lg text-background">VoiceBridge</span>
            </Link>
            <p className="text-background/50 text-sm leading-relaxed max-w-sm">
              Real-time voice translation powered by AI. Break language barriers in meetings, conversations, and collaboration — instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-background/50 hover:text-background transition-colors">Home</Link></li>
              <li><Link to="/#features" className="text-sm text-background/50 hover:text-background transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-sm text-background/50 hover:text-background transition-colors">Pricing</Link></li>
              <li><Link to="/translate" className="text-sm text-background/50 hover:text-background transition-colors">Translate</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-background/50 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-background/50 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-background/50 hover:text-background transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-background/50 hover:text-background transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-background/50 hover:text-background transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-background/50 hover:text-background transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-6" />

        {/* Copyright */}
        <p className="text-center text-xs text-background/40">
          © 2026 VoiceBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
