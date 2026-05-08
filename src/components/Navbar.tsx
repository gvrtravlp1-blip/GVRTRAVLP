import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mountain } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/trips", label: "Trips" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-cinema flex items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.19_50)] to-[oklch(0.42_0.08_155)] shadow-lg">
            <Mountain className="h-4 w-4 text-background" strokeWidth={2.4} />
          </div>
          <span className="font-display text-lg tracking-tight">Wandr<span className="text-gradient-sunset">Stories</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className={active ? "text-foreground" : ""}>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.19_50)] to-transparent"
                  />
                )}
              </Link>
            );
          })}
          <Link to="/trips" className="ml-4 btn-primary !py-2.5 !px-5 text-xs">Plan Escape</Link>
        </nav>

        <button
          aria-label="menu"
          className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border glass-strong md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="block rounded-lg px-4 py-3 text-base text-foreground transition hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
