import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, MessageCircle, Mountain } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[oklch(0.1_0.012_150)]">
      <div className="container-cinema grid gap-12 px-6 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2 max-w-md">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.19_50)] to-[oklch(0.42_0.08_155)]">
              <Mountain className="h-4 w-4 text-background" strokeWidth={2.4} />
            </div>
            <span className="font-display text-xl">Wandr<span className="text-gradient-sunset">Stories</span></span>
          </Link>
          <p className="mt-6 font-display text-2xl leading-snug text-foreground/90">
            “Life begins where routine ends.”
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Curated weekend escapes for working professionals around Bangalore & Hyderabad.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/trips" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">Upcoming Trips</Link></li>
            <li><Link to="/gallery" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">Travel Gallery</Link></li>
            <li><Link to="/about" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">Our Story</Link></li>
            <li><Link to="/contact" className="text-foreground/80 transition hover:text-[oklch(0.7_0.19_50)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Connect</h4>
          <div className="mt-5 flex gap-3">
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full glass transition hover:scale-110 hover:text-[oklch(0.7_0.19_50)]"><MessageCircle className="h-4 w-4" /></a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full glass transition hover:scale-110 hover:text-[oklch(0.7_0.19_50)]"><Instagram className="h-4 w-4" /></a>
            <a href={siteConfig.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-11 w-11 place-items-center rounded-full glass transition hover:scale-110 hover:text-[oklch(0.7_0.19_50)]"><Youtube className="h-4 w-4" /></a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{siteConfig.email}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-cinema flex flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} WandrStories. All rights reserved.</p>
          <p>Crafted with mountains in mind.</p>
        </div>
      </div>
    </footer>
  );
}
