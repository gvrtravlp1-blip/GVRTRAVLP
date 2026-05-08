import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import monthly from "@/data/monthlyTrips.json";
import weekend from "@/data/weekendTrips.json";
import { TripCard, type Trip } from "@/components/TripCard";
import { SectionTitle } from "@/components/ui-bits";
import roadImg from "@/assets/road-trip.jpg";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "Upcoming Trips — WandrStories" },
      { name: "description", content: "Browse upcoming monthly adventures and weekend escapes around Bangalore & Hyderabad." },
      { property: "og:title", content: "Upcoming Trips — WandrStories" },
      { property: "og:description", content: "Curated weekend escapes and monthly adventures." },
    ],
  }),
  component: TripsPage,
});

function TripsPage() {
  const monthlyTrips = monthly as Trip[];
  const weekendTrips = weekend as Trip[];

  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 -z-10">
          <img src={roadImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="container-cinema px-6 md:px-10">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-[oklch(0.7_0.19_50)]"
          >Upcoming escapes</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="mt-3 font-display text-5xl leading-[1.05] md:text-7xl"
          >
            Pick your <span className="text-gradient-sunset">next weekend.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-5 max-w-xl text-muted-foreground md:text-lg"
          >
            Monthly adventures for groups up to 20. Weekend escapes for tight crews of 6. Both, equally cinematic.
          </motion.p>
        </div>
      </header>

      <section className="section-padding pt-12">
        <div className="container-cinema">
          <SectionTitle center={false} eyebrow="Monthly Adventures" title="Long-form journeys, deep stories." subtitle="Multi-day trips with up to 20 fellow travelers. Time slows down. Friendships form." />
          {monthlyTrips.length === 0 ? (
            <EmptyState text="New monthly adventures coming soon." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {monthlyTrips.map((t) => <TripCard key={t.id} trip={t} variant="monthly" />)}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-[oklch(0.11_0.012_150)]">
        <div className="container-cinema">
          <SectionTitle center={false} eyebrow="Weekend Escapes" title="Tight crews. Limited seats. Big stories." subtitle="Small curated groups of 5–6. Designed for spontaneity, depth, and the kind of weekends Mondays remember." />
          {weekendTrips.length === 0 ? (
            <EmptyState text="No weekend escapes scheduled right now." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {weekendTrips.map((t) => <TripCard key={t.id} trip={t} variant="weekend" />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
      {text}
    </div>
  );
}
