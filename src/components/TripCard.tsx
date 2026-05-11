import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Calendar, TrendingUp, ArrowUpRight } from "lucide-react";
import { JoinTripModal } from "./JoinTripModal";

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
  registrationClose?: string;
  image: string;
};

export function TripCard({ trip, variant = "monthly" }: { trip: Trip; variant?: "monthly" | "weekend" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isWeekend = variant === "weekend";
  const urgent = trip.remainingSlots <= 3;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card shadow-[0_20px_50px_-30px_oklch(0_0_0/0.6)]"
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
              <span className="rounded-full bg-[oklch(0.82_0.16_85)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                Small group · {trip.groupSize}
              </span>
            )}
          </div>

          <div className="absolute inset-x-5 bottom-5">
            <div className="flex items-center gap-1.5 text-xs text-foreground/80">
              <MapPin className="h-2.5 w-2.5" />
              <span className="truncate">{trip.location}</span>
            </div>
            <h3 className="mt-1 font-display text-sm md:text-2xl text-foreground truncate">{trip.title}</h3>
          </div>
        </div>

          <div className="space-y-2.5 md:space-y-4 p-3 md:p-6">
            <div className="flex flex-wrap gap-1 md:gap-1.5 h-auto md:h-12 overflow-hidden">
              {trip.highlights.slice(0, 3).map((h) => (
                <span key={h} className="rounded-full border border-border bg-white/[0.03] px-1.5 py-0.5 text-[8px] md:text-[9px] text-muted-foreground whitespace-nowrap">
                  {h}
                </span>
              ))}
            </div>

          <div className={`grid gap-2 border-y border-border/50 py-1.5 md:py-4 text-[8px] md:text-xs ${variant === "monthly" ? "grid-cols-3" : "grid-cols-2"}`}>
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-2.5 w-2.5" />Dur.</span>
              <span className="font-medium text-foreground truncate">{trip.duration.split(" / ")[0]}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-2.5 w-2.5" />Grp.</span>
              <span className="font-medium text-foreground">{trip.groupSize} max</span>
            </div>
            {variant === "monthly" && (
              <div className="flex flex-col gap-0.5 border-none">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-2.5 w-2.5" />
                  Close
                </span>
                <span className="font-medium text-foreground">
                  {trip.registrationClose || "TBA"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[7px] md:text-[10px] uppercase tracking-widest text-muted-foreground leading-none mb-0.5 md:mb-1">Per Person</span>
              <span className="font-display text-lg md:text-3xl text-foreground leading-none">{trip.price}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[oklch(0.82_0.16_85)] to-[oklch(0.7_0.12_70)] px-3 py-1.5 md:px-6 md:py-2.5 text-[9px] md:text-xs font-bold text-background shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Join <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.article>

      <JoinTripModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        trip={trip} 
      />
    </>
  );
}
