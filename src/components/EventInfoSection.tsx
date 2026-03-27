import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import auditoriumImg from "@/assets/auditorium.png";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const EventInfoSection = () => {
  return (
    <section className="bg-[#151515] py-8 md:py-10 overflow-hidden border-t border-[#ee6983]/20">
      <div className="section-container relative z-10 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Left: Auditorium Image */}
          <motion.div
            {...fadeUp}
            className="relative group w-full lg:w-[54%] flex-shrink-0"
          >
            <div className="absolute -inset-3 bg-[#ee6983]/10 rounded-2xl blur-[60px] group-hover:bg-[#ee6983]/15 transition-all duration-700" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#ee6983]/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] aspect-[16/10]">
              <img
                src={auditoriumImg}
                alt="Auditório do Evento"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Cards + Address */}
          <div className="flex flex-col gap-3 w-full">

            {/* Date Card */}
            <motion.div
              {...fadeUp} transition={{ delay: 0.1 }}
              className="relative flex items-center gap-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 px-5 py-4 rounded-xl group hover:border-[#ee6983]/40 transition-all duration-400 shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="bg-gradient-to-br from-[#ee6983] to-[#850e35] p-2.5 rounded-lg shadow-[0_0_16px_rgba(238,105,131,0.35)] flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">Data</p>
                <p className="text-white font-semibold text-lg tracking-tight">17 e 18 de Abril, 2026</p>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              {...fadeUp} transition={{ delay: 0.15 }}
              className="relative flex items-center gap-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 px-5 py-4 rounded-xl group hover:border-[#ee6983]/40 transition-all duration-400 shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="bg-gradient-to-br from-[#ee6983] to-[#850e35] p-2.5 rounded-lg shadow-[0_0_16px_rgba(238,105,131,0.35)] flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">Local</p>
                <p className="text-white font-semibold text-lg tracking-tight leading-snug">UNIFACEX - Natal/RN</p>
              </div>
            </motion.div>

            {/* Address block */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mt-1 space-y-1">
              <p className="text-white/90 text-lg font-bold tracking-tight leading-snug">
                UNIFACEX - Campus Capim Macio · Natal / RN
              </p>
              <p className="text-white/40 text-base font-light leading-relaxed max-w-md">
                O cenário perfeito, projetado para garantir conforto e tecnologia durante sua jornada imersiva em nosso fórum.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
