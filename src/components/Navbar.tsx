import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mountain } from "lucide-react";
import { siteConfig } from "@/config/site";

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
      className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 transition-all duration-500"
    >
      <div 
        className={`container-cinema flex flex-col transition-all duration-700 ${
          scrolled || open
            ? "mx-4 w-[calc(100%-2rem)] glass-strong border border-white/5 px-6 py-2 md:px-10 rounded-[2rem]" 
            : "w-full bg-transparent px-6 py-4 md:px-10 rounded-[2.5rem]"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="group flex items-center gap-3 shrink-0">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-primary/20 bg-white p-0.5 shadow-lg transition-all group-hover:scale-105 group-hover:border-primary/50">
            <img 
              src={siteConfig.logo} 
              alt={siteConfig.name} 
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-tight text-white md:text-xl">
              {siteConfig.name}
            </span>
          </div>
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
                <motion.span 
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
                  className={active ? "text-foreground" : ""}
                >
                  {item.label}
                </motion.span>
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
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 py-6 border-t border-white/10 mt-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      to={item.to}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition active:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 px-4">
                   <Link to="/trips" className="btn-primary w-full justify-center py-4">Plan Escape</Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
