import { motion } from "framer-motion";
import { Users } from "lucide-react";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";
import speaker5 from "@/assets/speaker-5.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const speakers = [
  { name: "DRA. MITIA MONTENEGRO", role: "Especialista em Medicina Integrativa e Longevidade", img: speaker1 },
  { name: "DRA. ALICE FUSCELLA", role: "Mentora de Carreiras e Doutora em Ciências da Saúde", img: speaker2 },
  { name: "DRA. BRUNA COVRE", role: "Especialista em Estética Avançada e Beleza Estratégica", img: speaker3 },
  { name: "DRA. ENEIDA CARREIRO", role: "Cosmetologia Clínica e Autoridade Visual", img: speaker4 },
  { name: "LÚCIA LEANDRO", role: "Mentora e Fundadora do Instituto Mulheres de Sucesso", img: speaker5 },
  { name: "EM BREVE", role: "Ativação Surpresa e Networking", img: null },
];

const SpeakersSection = () => (
  <section className="bg-background py-24 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
    <div className="section-container relative z-10">
      <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">Corpo Docente · Editado por convite</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center text-white uppercase tracking-tight">
          As Autoridades que guiarão <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">Sua Jornada de Performance</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {speakers.map((s, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[5%] overflow-hidden border border-white/8 hover:border-[#ee6983]/40 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            {/* Top glare line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />
            {/* Hover bloom */}
            <div className="absolute inset-0 bg-[#ee6983]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

            <div className="aspect-[4/5] overflow-hidden">
              {s.img ? (
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1a0b13] to-[#0a0a0a] flex items-center justify-center">
                  <Users className="w-16 h-16 text-[#ee6983]/30" strokeWidth={1} />
                </div>
              )}
              {/* Bottom gradient overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
            </div>

            <div className="relative z-10 p-6 -mt-12">
              <h3 className="text-[#ee6983] font-black text-sm md:text-base uppercase tracking-wider mb-1">{s.name}</h3>
              {s.role && <p className="text-white/50 text-xs leading-relaxed">{s.role}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SpeakersSection;
