import { motion } from "framer-motion";
import { Target, Users, Presentation, Award } from "lucide-react";
import aboutAudienceBg from "@/assets/about-audience-2.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const fadeLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const features = [
  {
    icon: Target,
    title: "Autoridade Visual",
    text: "Construa uma autoridade visual magnética. Alinhe sua inteligência à imagem que você projeta ao mundo.",
  },
  {
    icon: Users,
    title: "Conexões de Alto Nível",
    text: "Quebre a solidão do topo. Conecte-se profundamente com outras mulheres em cargos de alta decisão.",
  },
  {
    icon: Presentation,
    title: "Referências Reais",
    text: "Aprenda com mulheres que são referências absolutas em saúde, estética e gestão de carreira.",
  },
  {
    icon: Award,
    title: "Blindagem do Burnout",
    text: "Domine o pilar da medicina integrativa para blindar sua saúde contra o Burnout empreendedor.",
  },
];

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-black">

      {/* ══ FUNDO — imagem cobrindo toda a seção ══ */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={aboutAudienceBg}
          alt="Plateia do evento"
          className="w-full h-full object-cover object-[20%_bottom] lg:object-[30%_bottom] scale-[1.35] origin-[20%_100%] lg:origin-[30%_100%] opacity-40 brightness-75 mix-blend-luminosity"
        />
        {/* Gradiente da DIREITA para ESQUERDA — mesclagem cinematográfica mais polida */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 70%, #000 100%)",
          }}
        />
        {/* Gradiente da BASE — integra os cards */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #000 0%, #000 14%, rgba(0,0,0,0.88) 32%, transparent 58%)",
          }}
        />
        {/* Vinheta topo suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
      </div>

      {/* ══ CONTEÚDO SOBRE O FUNDO ══ */}
      <div className="relative z-10">

        {/* Bloco de texto — coluna ESQUERDA */}
        <div className="section-container pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-lg mr-auto ml-0">

            {/* Overline */}
            <motion.span
              {...fadeLeft}
              className="text-[#ee6983] text-[10px] font-black uppercase tracking-[0.35em] mb-5 block"
            >
              Instituto Mulheres de Sucesso Brasileiras
            </motion.span>

            {/* Título */}
            <motion.h2
              {...fadeLeft}
              transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-[22px] sm:text-2xl md:text-[26px] font-light text-white/80 leading-snug mb-6"
            >
              o que é o{" "}
              <span className="font-black text-white">
                I Fórum de Estética<br /> e Performance:
              </span>
            </motion.h2>

            {/* Parágrafos */}
            <motion.div
              {...fadeLeft}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-4 text-white/60 text-[14.5px] leading-[1.85] font-light"
            >
              <p>
                Explore uma jornada de transformação no{" "}
                <span className="text-white/85 font-medium">
                  I Fórum de Estética e Performance da Mulher Empreendedora
                </span>{" "}
                — um encontro pioneiro que reúne líderes femininas visionárias dispostas a ir além dos resultados financeiros.
              </p>
              <p>
                Em dois dias imersivos no prestigioso UNIFACEX – Campus Capim Macio, em Natal/RN, você mergulha em um oceano de conhecimento prático onde especialistas de primeiro nível revelam os pilares invisíveis do sucesso sustentável feminino.
              </p>
              <p>
                Prepare-se para absorver insights sobre medicina integrativa, estética estratégica e liderança de alta performance. Saia do evento com ferramentas reais para transformar sua imagem, blindar sua saúde e construir as conexões que sua carreira exige.
              </p>
              <p className="text-[#ee6983]/85 font-medium">
                Participe deste evento extraordinário e eleve sua performance a um nível que nenhum treinamento convencional alcança.
              </p>
            </motion.div>

            {/* Nome do evento */}
            <motion.div
              {...fadeLeft}
              transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <p className="text-white/20 text-[9px] uppercase tracking-[0.35em] mb-1">Edição 2026</p>
              <p className="text-white font-black text-base sm:text-lg uppercase tracking-widest leading-tight">
                I FÓRUM DE ESTÉTICA E{" "}
                <span className="text-[#ee6983]">PERFORMANCE</span>
              </p>
              <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">
                da Mulher Empreendedora · Natal/RN
              </p>
            </motion.div>

          </div>
        </div>

        {/* ══ 4 CARDS — integrados na mesma seção ══ */}
        <div className="section-container pb-20 md:pb-24">

          {/* Label */}
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-white/15 text-[9px] uppercase tracking-[0.4em] mb-2">O que você leva</p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-[0.12em]">
              I FÓRUM DE ESTÉTICA E{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#ffc4c4]">
                PERFORMANCE
              </span>
            </h3>
          </motion.div>

          {/* Grade 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#ee6983]/40 transition-all duration-300 cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#ee6983]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Mobile: horizontal */}
                <div className="flex lg:hidden items-start gap-4 p-5 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#ee6983]/10 border border-[#ee6983]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ee6983]/20 transition-colors">
                    <f.icon className="w-5 h-5 text-[#ee6983]" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white/80 font-bold text-xs uppercase tracking-wider mb-1">{f.title}</h4>
                    <p className="text-white/45 group-hover:text-white/70 text-xs leading-relaxed transition-colors duration-300">{f.text}</p>
                  </div>
                </div>

                {/* Desktop: vertical */}
                <div className="hidden lg:flex flex-col p-7 relative z-10 gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#ee6983]/10 border border-[#ee6983]/20 flex items-center justify-center group-hover:bg-[#ee6983]/20 transition-colors">
                    <f.icon className="w-6 h-6 text-[#ee6983]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white/70 font-bold text-xs uppercase tracking-wider">{f.title}</h4>
                    <p className="text-white/45 group-hover:text-white/75 text-sm leading-relaxed transition-colors duration-300">{f.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutSection;
