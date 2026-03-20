import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import auditoriumImg from "@/assets/auditorium.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const EventInfoSection = () => {
  return (
    <section className="bg-[#151515] py-24 md:py-32 overflow-hidden border-t-4 border-[#ee6983]/20">
      <div className="section-container relative z-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Auditorium Image with Advanced Glow and Border */}
          <motion.div 
            {...fadeUp}
            className="relative group w-full mt-4"
          >
            {/* Soft Orange Glow behind image */}
            <div className="absolute -inset-4 bg-[#ee6983]/10 rounded-3xl blur-[100px] group-hover:bg-[#ee6983]/20 transition-all duration-1000" />
            
            {/* The Image Wrapper with precise Border */}
            <div className="relative rounded-[2rem] overflow-hidden border-[3px] border-[#ee6983]/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              <img 
                src={auditoriumImg} 
                alt="Auditório do Evento" 
                className="w-full h-auto object-cover grayscale md:grayscale-0 transition-transform duration-[2000ms] group-hover:scale-110"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Event Info precisely structured */}
          <div className="flex flex-col gap-5 lg:mt-4">
            <div className="mb-2">
              <span className="text-[#ee6983] font-bold text-xs uppercase tracking-[0.2em]">17 e 18 de Abril de 2026</span>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1">Local do Evento</h2>
            </div>
            
            {/* Date Box */}
            <motion.div
              {...fadeUp} transition={{ delay: 0.2 }}
              className="relative flex items-center gap-5 bg-white/[0.03] backdrop-blur-xl border border-white/8 p-6 rounded-[5%] group hover:border-[#ee6983]/40 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="bg-gradient-to-br from-[#ee6983] to-[#850e35] p-3 rounded-[5%] shadow-[0_0_20px_rgba(238,105,131,0.4)] flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Data</p>
                <p className="text-white font-bold text-xl md:text-2xl tracking-tight">17 e 18 de Abril, 2026</p>
              </div>
            </motion.div>

            {/* Location Box */}
            <motion.div
              {...fadeUp} transition={{ delay: 0.3 }}
              className="relative flex items-center gap-5 bg-white/[0.03] backdrop-blur-xl border border-white/8 p-6 rounded-[5%] group hover:border-[#ee6983]/40 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="bg-gradient-to-br from-[#ee6983] to-[#850e35] p-3 rounded-[5%] shadow-[0_0_20px_rgba(238,105,131,0.4)] flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Local</p>
                <p className="text-white font-bold text-xl md:text-2xl tracking-tight leading-tight">
                  UNIFACEX - Natal/RN
                </p>
              </div>
            </motion.div>

            {/* Detailed Address and Info Group */}
            <div className="mt-8 space-y-4">
              <motion.p 
                {...fadeUp} transition={{ delay: 0.4 }}
                className="text-white/90 text-xl md:text-2xl font-black md:font-medium tracking-tight leading-snug"
              >
                UNIFACEX - Campus Capim Macio <br className="hidden md:block" />
                Natal / RN
              </motion.p>

              <motion.p 
                {...fadeUp} transition={{ delay: 0.5 }}
                className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-lg"
              >
                O cenário perfeito, projetado para garantir conforto e tecnologia durante sua jornada imersiva em nosso fórum.
              </motion.p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
