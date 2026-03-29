import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Sparkles,
  HeartPulse,
  TrendingUp,
  Crown,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const audiences = [
  {
    icon: ShieldCheck,
    text: "Quer blindar sua saúde e energia sem abrir mão da alta performance profissional",
  },
  {
    icon: Users,
    text: "Busca conexões genuínas com outras mulheres líderes, sem competição predatória",
  },
  {
    icon: Sparkles,
    text: "Deseja dominar sua autoridade visual e construir uma marca pessoal que abre portas",
  },
  {
    icon: HeartPulse,
    text: "Quer aprender com especialistas de referência em medicina integrativa e longevidade",
  },
  {
    icon: TrendingUp,
    text: "Busca o equilíbrio entre performance sustentável, bem-estar e liderança de impacto",
  },
  {
    icon: Crown,
    text: "Já conquistou resultados expressivos e agora quer o próximo nível de presença e legado",
  },
];

const AudienceSection = () => {
  return (
    <section className="bg-[#151515] py-24 relative overflow-hidden border-t border-[#ee6983]/10">
      
      {/* Subtle glow (opcional mas bom para a harmonia) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Título centralizado Premium */}
        <motion.div {...fadeUp} className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-[1px] bg-[#ee6983]/40" />
            <p className="text-[#ee6983] text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-bold">
              Para quem é o Fórum
            </p>
            <div className="w-6 h-[1px] bg-[#ee6983]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight leading-tight">
            O Fórum é para
            <br className="hidden md:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 ml-0 md:ml-3">
              você que
            </span>
          </h2>
        </motion.div>

        {/* Grade 3 × 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative bg-[#080808] border border-white/5 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center gap-6 hover:border-[#ee6983]/30 transition-colors duration-300 cursor-default"
            >
              {/* Ícone Minimalista */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center group-hover:bg-[#ee6983]/10 group-hover:border-[#ee6983]/30 transition-colors duration-300">
                <item.icon
                  className="w-7 h-7 text-[#ee6983]"
                  strokeWidth={1.5}
                />
              </div>

              {/* Texto limpo */}
              <p className="relative z-10 text-white/50 group-hover:text-white/80 text-sm leading-[1.8] font-light transition-colors duration-300">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AudienceSection;
