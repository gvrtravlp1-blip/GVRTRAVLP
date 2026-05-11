import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, Mail, Mountain } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Trip } from "./TripCard";

interface JoinTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

export function JoinTripModal({ isOpen, onClose, trip }: JoinTripModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  if (!trip) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello ${siteConfig.name}! I'm interested in joining a trip.

Trip Details:
Trip: ${trip.title}
Location: ${trip.location}
Duration: ${trip.duration}
Price: ${trip.price}

My Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}

Please let me know the next steps!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${siteConfig.whatsappNumber.replace(/\D/g, "")}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-card shadow-2xl mx-4"
          >
            <div className="relative p-6 md:p-12">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full glass p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <div className="flex items-center gap-2 md:gap-3 text-primary mb-4 md:mb-6">
                <Mountain className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Booking Request</span>
              </div>

              <h2 className="font-display text-2xl leading-tight md:text-4xl">
                Ready for <span className="text-gradient-sunset">{trip.title}?</span>
              </h2>
              <p className="mt-2 md:mt-3 text-[13px] md:text-sm text-muted-foreground leading-snug">
                Enter your details below. We'll redirect you to WhatsApp to finalize your spot.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 md:mt-10 space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] py-2.5 md:py-4 pl-10 md:pl-12 pr-4 text-[13px] md:text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.06]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                    <input
                      required
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] py-2.5 md:py-4 pl-10 md:pl-12 pr-4 text-[13px] md:text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.06]"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] py-2.5 md:py-4 pl-10 md:pl-12 pr-4 text-[13px] md:text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.06]"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-4 md:mt-6 w-full !py-3 md:!py-4 text-sm md:text-base font-semibold"
                >
                  Send Join Request <Send className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-[10px] text-muted-foreground/60">
                By clicking, you'll be redirected to WhatsApp to contact the trip organizer.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
