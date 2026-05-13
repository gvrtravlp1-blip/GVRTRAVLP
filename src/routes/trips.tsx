import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import monthly from "@/data/monthlyTrips.json";
import weekend from "@/data/weekendTrips.json";
import { TripCard, type Trip } from "@/components/TripCard";
import { SectionTitle } from "@/components/ui-bits";
import { siteConfig } from "@/config/site";
import roadImg from "@/assets/road-trip.jpg";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: `Upcoming Weekend Trips from Bangalore & Hyderabad | ${siteConfig.name}` },
      { name: "description", content: "Discover upcoming trekking trips, hidden gems, and weekend adventures from Bangalore and Hyderabad. Join our small, curated groups for unforgettable experiences." },
      { name: "keywords", content: "trekking trips Karnataka, weekend trips from Bangalore, weekend trips Hyderabad, hidden places near Bangalore, group travel India" },
      { property: "og:title", content: `Pick Your Next Adventure | ${siteConfig.name}` },
      { property: "og:description", content: "Monthly adventures and weekend escapes designed for working professionals." },
      { property: "og:url", content: `${siteConfig.url}/trips` },
      { property: "og:image", content: `${siteConfig.url}${siteConfig.ogImage}` },
    ],
    links: [
      { rel: "canonical", href: `${siteConfig.url}/trips` },
      { rel: "preload", href: roadImg, as: "image" },
    ],
  }),
  component: TripsPage,
});

function TripsPage() {
  const monthlyTrips = monthly as Trip[];
  const weekendTrips = weekend as Trip[];

  return (
    <>
      <header className="relative overflow-hidden pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="absolute inset-0 -z-10">
          <img src={roadImg} alt="Scenic open road for travel adventures" decoding="async" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="container-cinema px-6 md:px-10">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold"
          >Upcoming escapes</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="mt-2 font-display text-4xl leading-[1.05] md:text-6xl"
          >
            Pick your <span className="text-gradient-sunset">next weekend.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base"
          >
            Monthly adventures and weekend escapes. Equally cinematic.
          </motion.p>
        </div>
      </header>

      <section className="px-6 pt-0 pb-16 md:px-10">
        <div className="container-cinema">
          <SectionTitle center={false} eyebrow="Monthly Adventures" title="Long-form journeys, deep stories." subtitle="Multi-day trips with up to 20 fellow travelers. Time slows down. Friendships form. Vote For Your Trip Below By Joining" />
          {monthlyTrips.length === 0 ? (
            <EmptyState text="New monthly adventures coming soon." />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
              {monthlyTrips.map((t) => <TripCard key={t.id} trip={t} variant="monthly" />)}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 md:py-16 bg-white/[0.02]">
        <div className="container-cinema">
          <SectionTitle center={false} eyebrow="Weekend Escapes" title="Tight crews. Limited seats. Big stories." subtitle="Small curated groups of 5–6. Designed for spontaneity, depth, and the kind of weekends Mondays remember." />
          {weekendTrips.length === 0 ? (
            <EmptyState text="No weekend escapes scheduled right now." />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
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
