import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Compass, Users, MapPinned, ShieldCheck, Quote, Camera, Sparkles, Mountain } from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import campfireImg from "@/assets/campfire.jpg";
import roadImg from "@/assets/road-trip.jpg";
import nightImg from "@/assets/night-mountain.jpg";
import { SectionTitle, Counter, FadeIn } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WandrStories — Weekend Escapes for Working Professionals" },
      { name: "description", content: "Cinematic curated weekend trips around Bangalore & Hyderabad. Travel with strangers, become friends, create stories." },
      { property: "og:title", content: "WandrStories — Weekend Escapes" },
      { property: "og:description", content: "Escape routine. Explore hidden gems. Meet new people." },
    ],
  }),
  component: HomePage,
});

const headlines = [
  "Balance Your Work Life With Real Adventures",
  "Weekend Escapes for Working Professionals",
  "Travel Far. Meet Strangers. Create Stories.",
  "Your Monday Feels Better After a Weekend Adventure.",
];

function HomePage() {
  return (
    <>
      <Hero />
      <WhyJoin />
      <Experience />
      <Stats />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="Misty mountain sunrise" className="h-[120%] w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

      {/* floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-[oklch(0.78_0.18_55)]/60"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [Math.random() * 600, Math.random() * 200],
          }}
          transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, delay: i * 0.6 }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        />
      ))}

      <motion.div style={{ opacity }} className="container-cinema relative z-10 flex h-full flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80"
        >
          <Sparkles className="h-3 w-3 text-[oklch(0.78_0.18_55)]" /> Weekend escapes · Bangalore & Hyderabad
        </motion.div>

        <div className="mt-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[1.02] tracking-tight"
            >
              {headlines[idx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 max-w-xl text-base text-foreground/75 md:text-lg"
        >
          Curated weekend trips for professionals who want to escape routine life and explore hidden gems around South India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link to="/trips" className="btn-primary group">
            Explore Upcoming Trips <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/contact" className="btn-ghost">Join Community</Link>
          <Link to="/gallery" className="btn-ghost">View Hidden Gems</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown className="h-3 w-3" />
          </motion.div>
          Scroll to begin
        </motion.div>
      </motion.div>
    </section>
  );
}

const features = [
  { icon: Compass, title: "Stress Relief", desc: "Escape office pressure and refresh your mind in nature's quiet corners." },
  { icon: Users, title: "Meet New People", desc: "Connect with strangers who become travel partners and lifelong friends." },
  { icon: MapPinned, title: "Hidden Gems", desc: "Discover places most tourists never visit — handpicked, off the map." },
  { icon: ShieldCheck, title: "Safe & Organized", desc: "Every trip is planned, vetted and personally monitored end-to-end." },
];

function WhyJoin() {
  return (
    <section className="section-padding relative">
      <div className="container-cinema">
        <SectionTitle eyebrow="Why us" title="Why Travel With Us?" subtitle="Four reasons our community keeps coming back, one weekend at a time." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-7"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[oklch(0.7_0.19_50)]/20 to-transparent blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.7_0.19_50)] to-[oklch(0.55_0.16_30)] text-background shadow-lg">
                  <f.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const expSections = [
  {
    img: campfireImg,
    eyebrow: "Curated groups",
    title: "Strangers tonight. Friends by sunrise.",
    desc: "Small, intentional groups of 6–20 working professionals. No tour bus energy. Just real conversations around a fire.",
    icon: Users,
  },
  {
    img: roadImg,
    eyebrow: "Hidden trails",
    title: "Places no tourist map will ever show.",
    desc: "We scout offbeat trails, secret viewpoints and quiet villages — so your weekend feels like a discovery, not an itinerary.",
    icon: MapPinned,
  },
  {
    img: nightImg,
    eyebrow: "Cinematic memories",
    title: "Your trip. Beautifully captured.",
    desc: "Each escape comes with a curated photo & film story so the memories don't fade with Monday.",
    icon: Camera,
  },
];

function Experience() {
  return (
    <section className="section-padding relative bg-[oklch(0.11_0.012_150)]">
      <div className="container-cinema">
        <SectionTitle eyebrow="The experience" title="More than a trip. A story." subtitle="Three things make every WandrStories weekend feel different." />
        <div className="space-y-28">
          {expSections.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={s.title} className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
                <FadeIn>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]"
                  >
                    <img src={s.img} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
                  </motion.div>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.7_0.19_50)]">{s.eyebrow}</span>
                  <h3 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{s.title}</h3>
                  <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80">
                    <s.icon className="h-4 w-4 text-[oklch(0.7_0.19_50)]" />
                    Part of every WandrStories weekend
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Travelers" },
  { value: 100, suffix: "+", label: "Trips Completed" },
  { value: 50, suffix: "+", label: "Hidden Gems Explored" },
  { value: 95, suffix: "%", label: "Returning Travelers" },
];

function Stats() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.7_0.19_50)]/[0.06] to-transparent" />
      </div>
      <div className="container-cinema">
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="rounded-3xl glass p-8 text-center"
            >
              <p className="font-display text-5xl text-gradient-sunset md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { name: "Aarushi Mehta", role: "Product Manager · Bangalore", text: "I went solo, came back with seven friends and a hundred photos I keep looking at. The Coorg trip felt like a cinematic short film.", img: "https://i.pravatar.cc/150?img=47" },
  { name: "Karthik Iyer", role: "Software Engineer · Hyderabad", text: "Skandagiri night trek was unreal. Tiny group, perfect logistics, zero stress. I was back at my desk Monday feeling reset.", img: "https://i.pravatar.cc/150?img=12" },
  { name: "Neha Reddy", role: "Designer · Bangalore", text: "Every detail was thought through. The hidden waterfall in Chikmagalur is something I'll never find on Google Maps. I'm hooked.", img: "https://i.pravatar.cc/150?img=32" },
  { name: "Rahul Bansal", role: "Consultant · Bangalore", text: "Travelled with strangers. Came back with my new weekend gang. WandrStories doesn't sell trips — they engineer connection.", img: "https://i.pravatar.cc/150?img=15" },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-padding relative bg-[oklch(0.11_0.012_150)]">
      <div className="container-cinema">
        <SectionTitle eyebrow="Stories" title="What our travelers say" subtitle="Real reviews from professionals who turned a routine weekend into a story." />
        <div className="relative mx-auto max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-[oklch(0.7_0.19_50)] opacity-60" />
          <div className="relative mt-8 min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                  “{reviews[active].text}”
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <img src={reviews[active].img} alt="" className="h-12 w-12 rounded-full border border-border object-cover" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{reviews[active].name}</p>
                    <p className="text-xs text-muted-foreground">{reviews[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`review ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-[oklch(0.7_0.19_50)]" : "w-4 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={nightImg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      </div>
      <div className="container-cinema flex flex-col items-center px-6 py-32 text-center md:px-10 md:py-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <Mountain className="mx-auto h-8 w-8 text-[oklch(0.7_0.19_50)]" />
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-7xl">
            Your Next Story <br /> Starts <span className="text-gradient-sunset">This Weekend.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-foreground/80 md:text-lg">
            Escape routine life and experience something unforgettable. We've kept a seat for you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Book Your Adventure <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/trips" className="btn-ghost">See All Trips</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
