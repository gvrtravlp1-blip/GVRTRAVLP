import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Users, Shield, Compass, Target, Eye } from "lucide-react";
import aboutImg from "@/assets/about-hero.jpg";
import campfireImg from "@/assets/campfire.jpg";
import { FadeIn, SectionTitle } from "@/components/ui-bits";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: siteConfig.name },
      { name: "description", content: "Turning weekend escapes into life stories. Helping professionals rediscover adventure." },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: `The story behind ${siteConfig.name} — built by a traveler, for travelers.` },
    ],
  }),
  component: AboutPage,
});

const blocks = [
  { icon: Heart, title: "Who We Are", text: `${siteConfig.name} started as a personal journal — a working professional who needed weekends to feel like weekends. It grew into a community of like-minded escape artists.` },
  { icon: Users, title: "Why This Community Exists", text: "Because routine is comfortable, but it isn't memorable. We exist for everyone who's ever opened a calendar and wished a weekend felt longer." },
  { icon: Compass, title: "Strangers → Friends", text: "We curate trips around shared energy, not just shared locations. By night two, the group already has inside jokes." },
  { icon: Shield, title: "Safe & Organized", text: "Every itinerary is personally vetted. Every trip is monitored end-to-end. Your only job is to show up with a backpack." },
  { icon: Target, title: "Mission", text: "To turn 52 ordinary weekends a year into 52 unforgettable stories — for every working professional in South India." },
  { icon: Eye, title: "Vision", text: "A nationwide community of curious travelers, where escaping routine isn't a luxury — it's a habit." },
];

function AboutPage() {
  return (
    <>
      <header className="relative h-[60svh] md:h-[80svh] min-h-[400px] md:min-h-[520px] w-full overflow-hidden">
        <img 
          src="https://res.cloudinary.com/dybpntnhv/image/upload/v1778562637/bf988531-009e-4243-8786-03addfe43f9a_arlcqo.jpg" 
          alt="Founder Travel Influencer" 
          className="absolute inset-0 h-full w-full object-cover object-[32%_25%]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        <div className="container-cinema relative z-10 flex h-full flex-col justify-end px-6 pb-12 md:px-10 md:pb-28">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.16_85)]">Our story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mt-2 md:mt-3 max-w-4xl font-display text-3xl md:text-7xl leading-[1.1] md:leading-[1.02]">
            Turning weekend escapes into <span className="text-gradient-sunset">life stories.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 md:mt-6 max-w-xl text-sm md:text-lg text-foreground/80">
            Helping working professionals escape routine, rediscover adventure, and build a community along the way.
          </motion.p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container-cinema">
          <SectionTitle eyebrow="What we believe" title="Built by a traveler. For travelers." subtitle={`Six things that shape every ${siteConfig.name} weekend — from the way we curate to the way we close out a trip.`} />
          <div className="grid gap-4 grid-cols-3">
            {blocks.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -2 }}
                className="rounded-xl glass p-3 md:p-7"
              >
                <div className="grid h-6 w-6 md:h-11 md:w-11 place-items-center rounded-lg md:rounded-2xl bg-gradient-to-br from-[oklch(0.42_0.08_190)] to-[oklch(0.25_0.05_190)] text-foreground">
                  <b.icon className="h-2.5 w-2.5 md:h-4 md:w-4" />
                </div>
                <h3 className="mt-2 md:mt-5 font-display text-[11px] md:text-xl leading-tight">{b.title}</h3>
                <p className="mt-1 md:mt-2 text-[8px] md:text-sm text-muted-foreground line-clamp-3 md:line-clamp-none">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/[0.01]">
        <div className="container-cinema">
          <div className="grid gap-6 grid-cols-2 lg:items-center">
            <FadeIn>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">The mission</span>
                <h2 className="mt-2 md:mt-4 font-display text-xl md:text-6xl leading-tight">
                  Built by a traveler. <span className="text-gradient-sunset">For travelers.</span>
                </h2>
                <div className="mt-4 md:mt-8 space-y-3 md:space-y-6 text-[10px] md:text-lg text-muted-foreground leading-snug md:leading-relaxed">
                  <p>
                    Hi, I'm the founder of {siteConfig.name}. My journey started on a dusty trail in the Western Ghats. Like you, I spent weeks staring at spreadsheets and weekends craving more.
                  </p>
                  <p>
                    I realized travel is about the shift in perspective. A simple sunrise trek or a night around a campfire can recharge your soul for the entire month.
                  </p>
                  <p>
                    That's why I built this community. To make these "cinematic" escapes accessible for every professional who feels the call of the wild.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-cinema aspect-[4/5] lg:aspect-auto lg:h-[600px]">
                <img 
                  src="https://res.cloudinary.com/dybpntnhv/image/upload/v1778274372/f4580d9f-c141-42b2-afc3-8554e7315bfa_e5sryh.jpg" 
                  alt="Influencer Founder" 
                  className="h-full w-full object-cover object-[32%_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-cinema">
          <SectionTitle 
            eyebrow="The Initiative" 

            title="GVRTRAVLP   Community" 
            subtitle="Travel Together. Contribute Together. Experience More."
          />
          
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl md:text-4xl">Social & Travel Initiative</h3>
                  <p className="mt-2 md:mt-4 text-[10px] md:text-base text-muted-foreground leading-snug md:leading-relaxed">
                    We are organizing a monthly group travel experience designed to bring people together, explore new places, and create meaningful connections. 
                  </p>
                  <p className="mt-2 md:mt-4 text-[10px] md:text-base text-muted-foreground leading-snug md:leading-relaxed">
                    In addition to travel, we also conduct basic food and essential support distribution during our journeys.
                  </p>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "One organized trip every month",
                    "Optional weekend adventures",
                    "Networking & Connections",
                    "Social Support Distribution"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl glass p-2.5 md:p-4 text-[9px] md:text-sm font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-0 overflow-hidden group shadow-cinema">
                <div className="absolute inset-0 z-0">
                
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/40" />
                </div>
                
                <div className="relative z-10 p-5 md:p-12">
                  <h4 className="font-display text-lg md:text-2xl">How It Works</h4>
                  <p className="mt-2 md:mt-4 text-[9px] md:text-sm text-muted-foreground leading-relaxed">
                    You can join as a travel participant + supporting partner. You may contribute any amount voluntarily. Your contribution is fully adjustable or returnable during your trip participation. 
                  </p>
                  
                  <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
                    <h4 className="font-display text-lg md:text-2xl">Why Join Us</h4>
                    <ul className="grid gap-2 md:gap-4 text-[9px] md:text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        Meet new like-minded people
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        Travel in a safe, organized group
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        Transparent & structured initiative
                      </li>
                      <li className="flex items-center gap-2 font-medium text-foreground">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        Priority access for partners
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 md:mt-10 pt-6 md:pt-10 border-t border-white/10">
                    <h4 className="font-display text-base md:text-xl">Transparency & Trust</h4>
                    <p className="mt-2 md:mt-3 text-[8px] md:text-xs leading-relaxed text-muted-foreground italic">
                      All activities are planned and communicated clearly. Contributions are recorded and acknowledged. You remain in full control.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
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
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Founder, {siteConfig.name}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
