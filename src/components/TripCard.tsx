import { motion } from "framer-motion";
import { MapPin, Users, Calendar, TrendingUp, ArrowUpRight } from "lucide-react";

export type Trip = {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  groupSize: number;
  remainingSlots: number;
  difficulty: string;
  highlights: string[];
  startDate?: string;
  endDate?: string;
  image: string;
};

export function TripCard({ trip, variant = "monthly" }: { trip: Trip; variant?: "monthly" | "weekend" }) {
  const isWeekend = variant === "weekend";
  const urgent = trip.remainingSlots <= 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_50px_-30px_oklch(0_0_0/0.6)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isWeekend && (
            <span className="rounded-full bg-[oklch(0.7_0.19_50)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
              Small group · {trip.groupSize}
            </span>
          )}
          {urgent && (
            <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[oklch(0.78_0.18_55)] backdrop-blur animate-pulse-glow">
              Only {trip.remainingSlots} seats left
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4">
          <span className="rounded-full glass px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground">
            {trip.difficulty}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-center gap-1.5 text-xs text-foreground/80">
            <MapPin className="h-3 w-3" />
            <span>{trip.location}</span>
          </div>
          <h3 className="mt-1 font-display text-2xl text-foreground">{trip.title}</h3>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-1.5">
          {trip.highlights.slice(0, 3).map((h) => (
            <span key={h} className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground">
              {h}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 border-y border-border py-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />Duration</span>
            <span className="font-medium text-foreground">{trip.duration}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" />Group</span>
            <span className="font-medium text-foreground">{trip.groupSize} max</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-muted-foreground"><TrendingUp className="h-3 w-3" />Slots</span>
            <span className="font-medium text-foreground">{trip.remainingSlots} left</span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Starting</p>
            <p className="font-display text-3xl text-foreground">{trip.price}</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.7_0.19_50)] to-[oklch(0.55_0.16_30)] px-5 py-2.5 text-xs font-medium text-background shadow-lg transition-transform hover:scale-105"
          >
            Join Trip <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
