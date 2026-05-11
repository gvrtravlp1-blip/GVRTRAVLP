import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Send, Check, Mail, Instagram } from "lucide-react";
import nightImg from "@/assets/night-mountain.jpg";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: siteConfig.name },
      { name: "description", content: "Plan your next weekend escape. Reach us on WhatsApp or share a trip suggestion." },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: "Tell us where you want to go." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(160),
  suggestion: z.string().trim().min(4, "Tell us a little more").max(600),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", suggestion: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const message =
      `Hello, I am interested in your travel experiences.\n\n` +
      `Name: ${result.data.name}\n` +
      `Phone: ${result.data.phone}\n` +
      `Email: ${result.data.email}\n` +
      `Trip Suggestion: ${result.data.suggestion}\n\n` +
      `I would love to know more details.`;
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    setSent(true);
    setTimeout(() => window.open(url, "_blank"), 700);
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-32">
      <img src={nightImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />

      <div className="container-cinema relative grid gap-12 px-6 pb-32 md:grid-cols-2 md:px-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.16_85)]">Say hello</span>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-7xl">
            Tell us where you <span className="text-gradient-sunset">want to go.</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground md:text-lg">
            Share a trip idea, ask a question, or just say hi. We reply on WhatsApp — usually within an hour.
          </p>
          <div className="mt-10 space-y-3">
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl glass p-5 transition hover:bg-white/[0.08] hover:border-white/20">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.42_0.08_190)] to-[oklch(0.3_0.06_190)] text-white shadow-[0_8px_20px_-6px_oklch(0.42_0.08_190/0.4)] group-hover:scale-110 transition-transform duration-500">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-wide">WhatsApp us directly</p>
                <p className="text-xs text-muted-foreground mt-0.5">+{siteConfig.whatsappNumber}</p>
              </div>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-4 rounded-2xl glass p-5 transition hover:bg-white/[0.08] hover:border-white/20">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.82_0.16_85)] to-[oklch(0.68_0.14_45)] text-white shadow-[0_8px_20px_-6px_oklch(0.82_0.16_85/0.4)] group-hover:scale-110 transition-transform duration-500">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-wide">Business Email</p>
                <p className="text-xs text-muted-foreground mt-0.5">{siteConfig.email}</p>
              </div>
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl glass p-5 transition hover:bg-white/[0.08] hover:border-white/20">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-[0_8px_20px_-6px_rgba(253,29,29,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-wide">Follow the journey</p>
                <p className="text-xs text-muted-foreground mt-0.5">@{siteConfig.instagram.split("/").filter(Boolean).pop()}</p>
              </div>
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          onSubmit={onSubmit}
          className="relative h-fit rounded-3xl glass-strong p-8 md:p-10"
        >
          <h2 className="font-display text-2xl">Plan your escape</h2>
          <p className="mt-1 text-sm text-muted-foreground">Send a message — we'll continue on WhatsApp.</p>

          <div className="mt-6 space-y-4">
            <Field label="Full Name" error={errors.name}>
              <input value={form.name} onChange={update("name")} className="input" placeholder="Your name" />
            </Field>
            <Field label="Phone Number" error={errors.phone}>
              <input value={form.phone} onChange={update("phone")} className="input" placeholder="+91 9876543210" inputMode="tel" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" value={form.email} onChange={update("email")} className="input" placeholder="you@email.com" />
            </Field>
            <Field label="Trip Suggestion" error={errors.suggestion}>
              <textarea value={form.suggestion} onChange={update("suggestion")} rows={4} className="input resize-none" placeholder="A weekend in Coorg? A night trek? Tell us what you're craving." />
            </Field>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Opening WhatsApp…
                </motion.span>
              ) : (
                <motion.span key="send" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  Send via WhatsApp <Send className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <style>{`
            .input { width:100%; background:oklch(1 0 0 / 0.04); border:1px solid oklch(1 0 0 / 0.1); border-radius:0.875rem; padding:0.85rem 1rem; font-size:0.875rem; color:var(--foreground); transition:all .2s; }
            .input::placeholder { color: oklch(0.6 0.01 120); }
            .input:focus { outline:none; border-color: oklch(0.82 0.16 85 / 0.6); background:oklch(1 0 0 / 0.06); box-shadow: 0 0 0 4px oklch(0.82 0.16 85 / 0.12); }
          `}</style>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[oklch(0.7_0.2_30)]">{error}</span>}
    </label>
  );
}
