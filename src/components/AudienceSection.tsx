import { motion } from "framer-motion";
import { Stethoscope, Network, Palette, BatteryCharging, TrendingUp } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const audiences = [
  {
    icon: Stethoscope,
    title: "Saúde como Estratégia",
    text: "Mulheres líderes que perceberam que Burnout não é fraqueza — é falta de protocolo. Venha aprender os pilares da medicina integrativa para alta performance.",
  },
  {
    icon: Network,
    title: "Redes que Geram Capital",
    text: "Líderes que sentem a solidão do topo e buscam um círculo de alto nível — sem competição predatória, com troca genuína e conexões que convertem.",
  },
  {
    icon: Palette,
    title: "Imagem como Linguagem",
    text: "Mulheres que desejam dominar a comunicação não-verbal: procedimentos estéticos, postura de autoridade e marca pessoal que abre portas antes da fala.",
  },
  {
    icon: BatteryCharging,
    title: "Recarga Energética",
    text: "Profissionais que operam no limite e querem as ferramentas de regulação hormonal, nutrologia e manejo de estresse para liderar sem se esgotar.",
  },
  {
    icon: TrendingUp,
    title: "Performance Sustentável",
    text: "Empreendedoras que já conquistaram resultados e agora buscam a dimensão que faltava: construir um legado de liderança sem sacrificar a saúde.",
  },
];

const AudienceSection = () => {
  return (
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#1a0b13] to-background pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ee6983] opacity-[0.04] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="section-container relative z-10">
        <motion.div {...fadeUp} className="text-center mb-20 space-y-4">
          <div className="mb-2">
            <span className="block text-white/25 text-[10px] uppercase tracking-[0.35em] mb-2">Para quem é o Fórum</span>
            <div className="w-8 h-px bg-[#ee6983]/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            CRIADO PARA <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#ffc4c4]">VOCÊ</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed pt-2">
            Se você é uma mulher que já conquistou resultados, mas ainda busca equilíbrio, saúde e uma presença inegável — este é o seu espaço.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {audiences.map((card, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative bg-white/[0.03] backdrop-blur-xl rounded-[5%] p-8 flex flex-col gap-5 border border-white/8 hover:border-[#ee6983]/40 transition-all duration-500 shadow-[0_4px_24px_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden cursor-default"
            >
              {/* Glare Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[#ee6983]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[5%]" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#ee6983]/8 border border-[#ee6983]/20 rounded-[5%] flex items-center justify-center mb-4 group-hover:bg-[#ee6983]/15 transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-[#ee6983]" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-base uppercase tracking-wider mb-2">{card.title}</h3>
                <p className="text-white/50 group-hover:text-white/75 font-light text-sm leading-relaxed transition-colors duration-300">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: audiences.length * 0.08 }}
            className="group relative bg-gradient-to-br from-[#ee6983]/10 to-[#850e35]/10 backdrop-blur-xl rounded-[5%] p-8 flex flex-col items-center justify-center gap-6 border border-[#ee6983]/30 hover:border-[#ee6983]/60 transition-all duration-500 shadow-[0_0_40px_rgba(238,105,131,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden cursor-default sm:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/40 to-transparent" />
            <div className="text-center space-y-3">
              <p className="text-white/60 text-sm leading-relaxed">
                Se você chegou até aqui, o Fórum já está falando com você.
              </p>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">É para você.</h3>
            </div>
            <button className="btn-matte w-full text-white px-8 py-4 rounded-[5%] font-bold uppercase tracking-wider">
              Garantir Minha Vaga
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
