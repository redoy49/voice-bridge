import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineMenuAlt3, 
  HiX, 
  HiOutlineLightningBolt, 
  HiOutlinePlay, 
  HiOutlineInformationCircle, 
  HiOutlineCurrencyDollar,
  HiOutlineLogin,
  HiOutlineUserAdd
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features", icon: HiOutlineLightningBolt },
    { name: "Demo", href: "#demo", icon: HiOutlinePlay },
    { name: "How It Works", href: "#how-it-works", icon: HiOutlineInformationCircle },
    { name: "Pricing", href: "/pricing", icon: HiOutlineCurrencyDollar, isRoute: true },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-4",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div 
        className={cn(
          "container mx-auto max-w-7xl flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-300",
          scrolled 
            ? "bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5" 
            : "bg-transparent"
        )}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <VoiceBridgeLogo size={40} />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            VoiceBridge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </a>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <div className="h-6 w-[1px] bg-border/50 mx-1" />
          <Link to="/login">
            <Button variant="ghost" size="sm" className="rounded-xl px-5 text-sm font-medium">
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="rounded-xl px-6 bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20 transition-all active:scale-95">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2 text-foreground hover:bg-secondary/50 rounded-xl transition-colors" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              )
            ))}
            <div className="h-[1px] bg-border/50 my-2" />
            <Link 
              to="/login" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <HiOutlineLogin className="w-5 h-5" />
              <span className="font-medium">Log In</span>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full mt-2 rounded-xl h-12 bg-primary text-primary-foreground">
                <HiOutlineUserAdd className="mr-2 h-5 w-5" />
                Sign Up Free
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
