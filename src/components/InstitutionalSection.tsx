import { motion } from "framer-motion";
import audienceBg from "@/assets/audience-bg.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const milestones = [
  {
    year: "A Origem",
    title: "Um movimento, não um evento",
    body: "O I Fórum de Estética e Performance nasce a partir do Instituto Mulheres de Sucesso Brasileiras, fundado por Lúcia Leandro. A premissa é simples: o sucesso feminino é multidimensional — precisa de saúde, imagem e comunidade para ser sustentável.",
  },
  {
    year: "A Missão",
    title: "Curar a solidão do topo",
    body: "Ao atingirem cargos de liderança ou o sucesso nos negócios, muitas mulheres perdem o círculo social de apoio. O Fórum nasce como esse refúgio: um espaço onde elas falam a mesma língua, sem julgamentos e sem competição predatória.",
  },
  {
    year: "O Momento",
    title: "Natal, 17 e 18 de Abril",
    body: "O UNIFACEX – Campus Capim Macio foi escolhido pela infraestrutura de alto padrão: auditório climatizado, telões LED de alta definição, foyer amplo para networking e acesso pleno. O primeiro grande encontro desta geração de líderes no nordeste.",
  },
];

const InstitutionalSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background image ultra dim */}
      <div className="absolute inset-0 z-0">
        <img
          src={audienceBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.06] grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-2">Instituto Mulheres de Sucesso · Natal, 2026</p>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            O Movimento por Trás <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#ffc4c4]">do Fórum</span>
          </h2>
          <p className="text-white/40 text-base leading-relaxed mx-auto max-w-2xl">
            Em um mercado onde performance ainda é medida apenas em produtividade, o Instituto Mulheres de Sucesso Brasileiras propõe uma revolução: a performance integrada — mente, corpo e imagem em harmonia.
          </p>
        </motion.div>

        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className="relative group bg-white/[0.025] backdrop-blur-xl rounded-[5%] p-8 border border-white/8 hover:border-[#ee6983]/30 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden"
            >
              {/* Top glare */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ee6983]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <span className="text-[#ee6983] text-xs font-black uppercase tracking-[0.2em] mb-4 block">{m.year}</span>
                <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-wide leading-tight mb-4">{m.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">{m.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Banner */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="relative rounded-[5%] overflow-hidden border border-white/8 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              "O sucesso profissional <br className="hidden md:block" />
              não precisa custar{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">
                a sua saúde.
              </span>"
            </p>
            <div className="flex flex-col items-center gap-1 pt-2">
              <span className="text-white/80 font-bold text-sm tracking-wider uppercase">Lúcia Leandro</span>
              <span className="text-white/30 text-xs uppercase tracking-widest">Fundadora — Instituto Mulheres de Sucesso Brasileiras</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalSection;
