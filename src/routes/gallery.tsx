import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import gallery from "@/data/gallery.json";
import { SectionTitle, FadeIn } from "@/components/ui-bits";
import campfireImg from "@/assets/campfire.jpg";

type Memory = { id: number; trip: string; date: string; location: string; image: string; caption: string };

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Travel Memories | WandrStories" },
      { name: "description", content: "Cinematic memories from weekend escapes and monthly adventures across South India." },
      { property: "og:title", content: "Travel Gallery — WandrStories" },
      { property: "og:description", content: "Travel memories and milestones from our community." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const memories = gallery.memories as Memory[];
  const timeline = gallery.timeline;
  const [open, setOpen] = useState<Memory | null>(null);

  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 -z-10">
          <img src={campfireImg} alt="" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container-cinema px-6 md:px-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.7_0.19_50)]">The archive</span>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-7xl">
            Memories from the <span className="text-gradient-sunset">road less travelled.</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
            Every face, every fire, every sunrise. The story of a community built one weekend at a time.
          </p>
        </div>
      </header>

      <section className="section-padding pt-12">
        <div className="container-cinema">
          <SectionTitle center={false} eyebrow="Our journey" title="Milestones along the trail" />
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-[oklch(0.7_0.19_50)] via-border to-transparent md:left-1/2" />
            <div className="space-y-12">
              {timeline.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <FadeIn key={m.year}>
                    <div className={`relative grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>div:first-child]:col-start-2"}`}>
                      <div className={`relative pl-12 md:pl-0 ${left ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                        <span className="absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.19_50)] to-[oklch(0.55_0.16_30)] text-[10px] font-bold text-background md:left-1/2 md:-translate-x-1/2" style={{ left: left ? undefined : 0 }}>
                          ●
                        </span>
                        <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.7_0.19_50)]">{m.year}</p>
                        <h3 className="mt-2 font-display text-2xl md:text-3xl">{m.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[oklch(0.11_0.012_150)]">
        <div className="container-cinema">
          <SectionTitle eyebrow="The gallery" title="Scenes from the trail" subtitle="Click any moment to step inside the memory." />
          {memories.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">No memories yet — first trip coming soon.</div>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {memories.map((m, i) => (
                <motion.button
                  key={m.id}
                  type="button"
                  onClick={() => setOpen(m)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 6) * 0.06, duration: 0.6 }}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border break-inside-avoid"
                >
                  <img src={m.image} alt={m.caption} loading="lazy" className="w-full transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[oklch(0.78_0.18_55)]">{m.location}</p>
                    <p className="mt-1 font-display text-lg leading-tight text-foreground">{m.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
          >
            <button onClick={() => setOpen(null)} className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full glass" aria-label="close"><X className="h-4 w-4" /></button>
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card"
            >
              <img src={open.image} alt={open.caption} className="aspect-video w-full object-cover" />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{open.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{open.date}</span>
                  <span>· {open.trip}</span>
                </div>
                <p className="mt-3 font-display text-2xl">{open.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
