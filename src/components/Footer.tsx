import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, MessageCircle, Mountain } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container-cinema grid gap-6 md:gap-12 px-6 py-8 md:py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2 max-w-md">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border-2 border-primary/20 bg-white p-0.5 shadow-lg">
              <img src={siteConfig.logo} alt={siteConfig.name} className="h-full w-full rounded-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg md:text-2xl tracking-tight text-white">{siteConfig.name}</span>
            </div>
          </Link>
          <p className="mt-3 md:mt-6 font-display text-lg md:text-2xl leading-snug text-foreground/90">
            “Life begins where routine ends.”
          </p>
          <p className="mt-1 md:mt-3 text-xs md:text-sm text-muted-foreground">
            Curated weekend escapes for professionals.
          </p>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-[10px] md:text-sm font-medium uppercase tracking-widest text-muted-foreground">Explore</h4>
          <ul className="mt-2 md:mt-5 space-y-2 md:space-y-3 text-[11px] md:text-sm">
            <li><Link to="/trips" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">Upcoming</Link></li>
            <li><Link to="/gallery" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">Gallery</Link></li>
            <li><Link to="/about" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">About</Link></li>
          </ul>
        </div>

        <div className="md:col-span-1 md:text-right flex flex-col md:items-end">
          <h4 className="text-[10px] md:text-sm font-medium uppercase tracking-widest text-muted-foreground">Connect</h4>
          <div className="mt-2 md:mt-5 flex gap-2 md:gap-3">
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full glass transition hover:scale-110 hover:text-[oklch(0.7_0.19_50)]"><MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" /></a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full glass transition hover:scale-110 hover:text-[oklch(0.7_0.19_50)]"><Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" /></a>
          </div>
          <div className="mt-3 md:mt-6 space-y-1 md:space-y-2">
            <p className="text-[10px] md:text-xs text-muted-foreground transition hover:text-foreground">{siteConfig.email}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">+91 93901 84813</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-cinema flex flex-col items-center justify-between gap-1 px-6 py-4 text-[10px] md:text-xs text-muted-foreground md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Crafted with mountains in mind.</p>
        </div>
      </div>
    </footer>
  );
}
