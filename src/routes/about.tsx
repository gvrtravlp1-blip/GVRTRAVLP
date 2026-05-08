import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Users, Shield, Compass, Target, Eye } from "lucide-react";
import aboutImg from "@/assets/about-hero.jpg";
import campfireImg from "@/assets/campfire.jpg";
import { FadeIn, SectionTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WandrStories" },
      { name: "description", content: "Turning weekend escapes into life stories. Helping professionals rediscover adventure." },
      { property: "og:title", content: "About — WandrStories" },
      { property: "og:description", content: "The story behind WandrStories — built by a traveler, for travelers." },
    ],
  }),
  component: AboutPage,
});

const blocks = [
  { icon: Heart, title: "Who We Are", text: "WandrStories started as a personal journal — a working professional who needed weekends to feel like weekends. It grew into a community of like-minded escape artists." },
  { icon: Users, title: "Why This Community Exists", text: "Because routine is comfortable, but it isn't memorable. We exist for everyone who's ever opened a calendar and wished a weekend felt longer." },
  { icon: Compass, title: "Strangers → Friends", text: "We curate trips around shared energy, not just shared locations. By night two, the group already has inside jokes." },
  { icon: Shield, title: "Safe & Organized", text: "Every itinerary is personally vetted. Every trip is monitored end-to-end. Your only job is to show up with a backpack." },
  { icon: Target, title: "Mission", text: "To turn 52 ordinary weekends a year into 52 unforgettable stories — for every working professional in South India." },
  { icon: Eye, title: "Vision", text: "A nationwide community of curious travelers, where escaping routine isn't a luxury — it's a habit." },
];

function AboutPage() {
  return (
    <>
      <header className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
        <img src={aboutImg} alt="Traveler on cliff" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        <div className="container-cinema relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] text-[oklch(0.78_0.18_55)]">Our story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mt-3 max-w-4xl font-display text-5xl leading-[1.02] md:text-7xl">
            Turning weekend escapes into <span className="text-gradient-sunset">life stories.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 max-w-xl text-base text-foreground/80 md:text-lg">
            Helping working professionals escape routine, rediscover adventure, and build a community along the way.
          </motion.p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container-cinema">
          <SectionTitle eyebrow="What we believe" title="Built by a traveler. For travelers." subtitle="Six things that shape every WandrStories weekend — from the way we curate to the way we close out a trip." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl glass p-7"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.42_0.08_155)] to-[oklch(0.22_0.05_155)] text-foreground">
                  <b.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-5 font-display text-xl">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src={campfireImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="container-cinema relative px-6 py-24 text-center md:px-10 md:py-32">
          <FadeIn>
            <p className="mx-auto max-w-3xl font-display text-3xl leading-snug md:text-5xl">
              “We don't sell trips. We engineer the kind of weekends you'll still talk about five years from now.”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Founder, WandrStories</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
