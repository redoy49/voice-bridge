import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenuAlt3,
  HiX,
  HiOutlineLogin,
  HiOutlineUserAdd,
} from "react-icons/hi";

import { Button } from "@/components/ui/button";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Features",
      href: "#features",
      isRoute: false,
    },
    {
      name: "Demo",
      href: "#demo",
      isRoute: false,
    },
    {
      name: "How It Works",
      href: "#how-it-works",
      isRoute: false,
    },
    {
      name: "Pricing",
      href: "/pricing",
      isRoute: true,
    },
  ];

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "h-16 rounded-full border border-border/50",
            "backdrop-blur-xl transition-all duration-300",
            "flex items-center justify-between px-5 lg:px-8",
            scrolled
              ? "bg-background/80 shadow-lg shadow-black/5"
              : "bg-background/60",
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <VoiceBridgeLogo size={40} className="rounded-full" />
            </div>

            <span className="hidden sm:block text-xl font-bold tracking-tight">
              VoiceBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.isRoute ? (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "relative text-sm font-medium transition-colors",
                      "after:absolute after:left-0 after:-bottom-1",
                      "after:h-[2px] after:w-0",
                      "after:bg-primary after:transition-all after:duration-300",
                      isActive
                        ? "text-foreground after:w-full"
                        : "text-muted-foreground hover:text-foreground hover:after:w-full",
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    relative
                    text-sm
                    font-medium
                    text-muted-foreground
                    hover:text-foreground
                    transition-colors
                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-[2px]
                    after:w-0
                    after:bg-primary
                    after:transition-all
                    after:duration-300
                    hover:after:w-full
                  "
                >
                  {link.name}
                </a>
              ),
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            <div className="h-6 w-px bg-border" />

            <Link to="/login">
              <Button
                variant="ghost"
                className="
                  rounded-full
                  px-5
                  font-medium
                "
              >
                Log In
              </Button>
            </Link>

            <Link to="/register">
              <Button
                className="
                  rounded-full
                  px-6
                  text-white
                  font-medium
                  bg-gradient-to-r
                  from-primary
                  to-primary/80
                  hover:scale-105
                  hover:shadow-lg
                  hover:shadow-primary/20
                  transition-all
                  duration-300
                "
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                p-2.5
                rounded-full
                border
                border-border/50
                bg-background/60
                hover:bg-secondary/60
                transition-colors
              "
            >
              {mobileOpen ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiOutlineMenuAlt3 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="
                lg:hidden
                mt-3
                rounded-3xl
                border
                border-border/50
                bg-background/95
                backdrop-blur-2xl
                shadow-xl
                overflow-hidden
              "
            >
              <div className="p-3">
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="
                        flex
                        items-center
                        px-4
                        py-3
                        rounded-2xl
                        text-sm
                        font-medium
                        text-muted-foreground
                        hover:text-foreground
                        hover:bg-secondary/50
                        transition-all
                      "
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="
                        flex
                        items-center
                        px-4
                        py-3
                        rounded-2xl
                        text-sm
                        font-medium
                        text-muted-foreground
                        hover:text-foreground
                        hover:bg-secondary/50
                        transition-all
                      "
                    >
                      {link.name}
                    </a>
                  ),
                )}

                <div className="h-px bg-border my-3" />

                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl h-11 mb-2"
                  >
                    <HiOutlineLogin className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>

                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button
                    className="
                      w-full
                      h-11
                      rounded-2xl
                      text-white
                      bg-gradient-to-r
                      from-primary
                      to-primary/80
                    "
                  >
                    <HiOutlineUserAdd className="mr-2 h-4 w-4" />
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
