import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";

const Footer = () => {
  const socialLinks = [
    { icon: FaXTwitter, href: "/voice-bridge", label: "Twitter" },
    { icon: FaLinkedinIn, href: "/voice-bridge", label: "LinkedIn" },
    { icon: FaGithub, href: "/voice-bridge", label: "GitHub" },
    { icon: FaInstagram, href: "/voice-bridge", label: "Instagram" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-background text-foreground border-t border-border/40">
      {/* Glow Effects */}
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      {/* Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-3 group">
                <VoiceBridgeLogo
                  size={40}
                  className="group-hover:scale-110 transition-transform duration-300 rounded-full"
                />

                <span className="text-xl font-bold">VoiceBridge</span>
              </Link>

              <p className="mt-5 text-sm leading-7 text-muted-foreground max-w-sm">
                Real-time AI voice translation that removes language barriers
                and enables natural global communication.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="
                        h-10 w-10 flex items-center justify-center
                        rounded-full
                        border border-border/50
                        bg-secondary/50
                        text-muted-foreground
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-secondary
                        hover:text-foreground
                      "
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold mb-5">Product</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/translate" className="hover:text-foreground">
                    Translate
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold mb-5">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold mb-5">Legal</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 VoiceBridge. All rights reserved.</p>
            <p>Built for real-time AI communication.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
