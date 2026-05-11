import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Compass, Users, MapPinned, ShieldCheck, Quote, Camera, Sparkles, Mountain, X } from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import campfireImg from "@/assets/campfire.jpg";
import roadImg from "@/assets/road-trip.jpg";
import nightImg from "@/assets/night-mountain.jpg";
import { SectionTitle, Counter, FadeIn } from "@/components/ui-bits";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.name },
      { name: "description", content: `Cinematic curated weekend trips around Bangalore & Hyderabad. Travel with strangers, become friends, create stories with ${siteConfig.name}.` },
      { property: "og:title", content: `${siteConfig.name} — Weekend Escapes` },
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
  "Not Tourism. A Cinematic Life Experience.",
];

function HomePage() {
  return (
    <>
      <Hero />
      <WhyJoin />
      <Experience />
      <GalleryPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

function GalleryPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778349112/2b1cfb81-1fd9-4d92-bf7c-2181b94ce954_rzlzq4.jpg",
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778355049/bead7296-d51e-4a6a-8e8f-d3a750ed6878_ttyq0y.jpg",
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778349162/1ba9f4da-aef6-4bf7-b332-a4e1ea03a3e4_iub73e.jpg",
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778349131/a42243c5-d646-43d3-a68a-9b3bb4f5460d_ztvdkr.jpg",
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778355011/566061d0-7a21-4f9d-8c76-67ae15d188b8_gjzdze.jpg",
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778355043/5eaac294-21c5-4155-86d3-599a33bd541b_pmkwal.jpg",
    "https://res.cloudinary.com/dybpntnhv/image/upload/v1778349170/6a4f60a8-4875-406f-a40c-f759fe34e44b_wr4ixe.jpg"
  ];

  return (
    <section className="py-12 md:py-24 overflow-hidden bg-background">
      <div className="container-cinema px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle 
            center={false} 
            eyebrow="Moments" 
            title="Captured Memories" 
            subtitle="Recent weekend explorations."
          />
          <Link to="/gallery" className="btn-ghost mb-16 hidden md:inline-flex">View All Stories</Link>
        </div>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex gap-4 px-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -160 * images.length * 2 }}
          animate={{
            x: [0, -160 * images.length - 16 * images.length]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ width: "fit-content" }}
        >
          {[...images, ...images, ...images].map((src, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedImage(src)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="shrink-0 w-[180px] md:w-[360px] aspect-[4/5] rounded-xl md:rounded-[2rem] overflow-hidden border border-white/10 group/item relative bg-muted cursor-pointer"
            >
              <img src={src} alt={`Gallery ${i}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover/item:opacity-100 transition-all duration-300 translate-y-4 group-hover/item:translate-y-0">
                <p className="text-white text-xs font-medium flex items-center gap-2">
                  <Camera className="h-3.5 w-3.5" /> View
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop-only secondary row for better coverage on large screens if needed */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 h-10 w-10 grid place-items-center rounded-full glass z-50"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl bg-card"
            >
              <img src={selectedImage} alt="Full screen memory" className="w-full h-auto max-h-[85vh] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
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
        <img src={heroImg} alt="Misty mountain sunrise" className="h-[120%] w-full object-cover scale-[1.1]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

      {/* Floating particles with better distribution */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-[1px] w-[1px] rounded-full bg-white/40"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -100 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
          style={{ left: `${Math.random() * 100}%`, bottom: `${Math.random() * 40}%` }}
        />
      ))}

      <motion.div style={{ opacity }} className="container-cinema relative z-10 flex h-full flex-col justify-center px-6 pt-32 md:px-10">
        <div className="max-w-5xl">
          <div className="relative min-h-[180px] sm:min-h-[200px] md:min-h-[260px] lg:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(5px)" }}
                transition={{ 
                  duration: 0.9, 
                  ease: [0.22, 1, 0.36, 1],
                  scale: { type: "spring", damping: 15, stiffness: 100 }
                }}
                className="absolute inset-0 font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.92] tracking-tighter"
              >
                {headlines[idx].split(" ").map((word, i) => (
                  <span key={i} className={i % 3 === 2 ? "text-gradient-sunset" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-xl text-lg text-foreground/60 leading-relaxed md:mt-8 md:text-xl font-light"
        >
          Curated weekend trips for professionals who want to escape routine life and explore hidden gems around South India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3 md:mt-12 md:gap-4"
        >
          <Link to="/trips" className="btn-primary group !px-6 !py-3 md:!px-10 md:!py-5 md:text-base">
            Explore Trips <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/gallery" className="btn-ghost !px-6 !py-3 md:!px-8 md:!py-5">View Gallery</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50"
        >
          <span>Scroll to begin</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
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
        
        <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl glass p-5 md:p-8 transition-all hover:bg-white/[0.05]"
            >
              <div className="mb-4 md:mb-6 grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl md:rounded-2xl bg-gradient-to-br from-[oklch(0.82_0.16_85)] to-[oklch(0.7_0.12_70)] text-background shadow-lg group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="font-display text-base md:text-xl">{f.title}</h3>
              <p className="mt-2 md:mt-3 text-[10px] md:text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
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
        <SectionTitle eyebrow="The experience" title="More than a trip. A story." subtitle={`Three things make every ${siteConfig.name} weekend feel different.`} />
        <div className="space-y-10 md:space-y-28">
          {expSections.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={s.title} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    perspective: 1000,
                    rotateX: 15,
                    y: 40
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateX: 0,
                    y: 0 
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.22, 1, 0.36, 1],
                    scale: { type: "spring", damping: 20, stiffness: 100 }
                  }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-video md:aspect-video overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-cinema bg-muted"
                  >
                    <motion.img 
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={s.img} 
                      alt={s.title} 
                      loading="lazy" 
                      className="absolute inset-0 h-full w-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute -inset-2 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
                <FadeIn delay={0.15}>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.7_0.19_50)]">{s.eyebrow}</span>
                  <h3 className="mt-2 font-display text-lg md:mt-3 md:text-5xl leading-tight">{s.title}</h3>
                  <p className="mt-2 max-w-md text-xs text-muted-foreground md:mt-5 md:text-lg">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-foreground/80 md:mt-6 md:text-sm">
                    <s.icon className="h-4 w-4 text-[oklch(0.7_0.19_50)]" />
                    Part of every {siteConfig.name} weekend
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


const reviews = [
  { name: "Aarushi Mehta", role: "Product Manager · Bangalore", text: "I went solo, came back with seven friends and a hundred photos I keep looking at. The Coorg trip felt like a cinematic short film.", img: "https://i.pravatar.cc/150?img=47" },
  { name: "Karthik Iyer", role: "Software Engineer · Hyderabad", text: "Skandagiri night trek was unreal. Tiny group, perfect logistics, zero stress. I was back at my desk Monday feeling reset.", img: "https://i.pravatar.cc/150?img=12" },
  { name: "Neha Reddy", role: "Designer · Bangalore", text: "Every detail was thought through. The hidden waterfall in Chikmagalur is something I'll never find on Google Maps. I'm hooked.", img: "https://i.pravatar.cc/150?img=32" },
  { name: "Rahul Bansal", role: "Consultant · Bangalore", text: "Travelled with strangers. Came back with my new weekend gang. GVRTRAVLP doesn't sell trips — they engineer connection.", img: "https://i.pravatar.cc/150?img=15" },
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
        <div className="text-center mb-6 md:mb-12">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[oklch(0.7_0.19_50)]">Stories</span>
          <h2 className="mt-2 font-display text-2xl md:text-5xl leading-tight">What our travelers say</h2>
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Quote className="mx-auto h-6 w-6 md:h-10 md:w-10 text-[oklch(0.7_0.19_50)] opacity-60" />
            <div className="relative mt-4 md:mt-8 min-h-[160px] md:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="font-display text-base md:text-3xl leading-snug text-foreground">
                  “{reviews[active].text}”
                </p>
                <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3">
                  <img src={reviews[active].img} alt="" className="h-12 w-12 rounded-full border border-border object-cover" />
                  <div className="text-left">
                    <p className="text-sm md:text-base font-medium text-foreground">{reviews[active].name}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{reviews[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 md:mt-10 flex justify-center gap-2">
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
            <Link to="/trips" className="btn-primary">Book Your Adventure <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/gallery" className="btn-ghost">View Gallery</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
