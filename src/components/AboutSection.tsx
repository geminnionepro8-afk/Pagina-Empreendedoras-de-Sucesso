import { motion } from "framer-motion";
import { Target, Users, Presentation, Award, Wand2, HeartPulse } from "lucide-react";
import audienceBg from "@/assets/audience-bg.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const fadeLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const fadeRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const features = [
  { icon: Target, text: "Construa uma autoridade visual magnética. Alinhe sua inteligência à imagem que você projeta ao mundo." },
  { icon: Users, text: "Quebre a solidão do topo. Conecte-se profundamente com outras mulheres em cargos de alta decisão." },
  { icon: Presentation, text: "Aprenda com mulheres que são referências absolutas em saúde, estética e gestão de carreira." },
  { icon: Award, text: "Domine o pilar da medicina integrativa para blindar sua saúde contra o Burnout empreendedor." },
];

const AboutSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-black border-t-0">
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src={audienceBg} alt="Plateia" className="w-full h-full object-cover opacity-[0.08] mix-blend-screen grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050505]/95 to-black" />
      </div>

      <div className="section-container relative z-10 space-y-24">
        
        {/* Texts - Refactored Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 items-center">
          
          <motion.div {...fadeLeft} className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] uppercase">
              O DESPERTAR DA <br />
              <span className="font-black text-[#ee6983] drop-shadow-[0_0_20px_rgba(238,105,131,0.3)]">PERFORMANCE</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              O I Fórum de Estética e Performance não é apenas um evento. É o refúgio onde o sucesso encontra a vitalidade. Desenhado para curar o esgotamento (Burnout) e fortalecer sua marca visual.
            </p>
            <div className="pt-4">
              <div className="relative pl-5 py-3">
                {/* Vertical gradient bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[#ee6983] via-[#c9687e] to-transparent" />
                <span
                  className="block text-white/75 text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
                >
                  "O sucesso profissional não precisa custar a sua saúde."
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeRight} className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#111]/80 backdrop-blur-md border border-[#ee6983]/20 p-8 rounded-3xl shadow-2xl hover:border-[#ee6983]/50 transition-colors duration-500 group">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-[5%] bg-[#ee6983]/10 flex items-center justify-center border border-[#ee6983]/20 flex-shrink-0 group-hover:bg-[#ee6983]/20 transition-colors">
                  <Wand2 className="w-5 h-5 text-[#ee6983]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-3 uppercase tracking-wide">Beleza como Ferramenta de Poder</h3>
                  <p className="text-white/60 leading-relaxed text-[15px] sm:text-[16px]">
                    Não se trata apenas de aparência, mas de como a imagem projetada comunica autoridade e confiança. Especialistas detalham os procedimentos e o treinamento de marca pessoal para que sua a imagem abra portas antes de você falar.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-xl hover:border-white/20 transition-colors duration-500 group">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-[5%] bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <HeartPulse className="w-5 h-5 text-[#ee6983]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-3 uppercase tracking-wide">Medicina Integrativa</h3>
                  <p className="text-white/60 leading-relaxed text-[15px] sm:text-[16px]">
                    Descubra a ciência por trás da longevidade e da energia necessária para liderar grandes projetos. Entenda como o equilíbrio hormonal impacta diretamente sua tomada de decisão.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* The Requested Lower Image Integration */}
        <motion.div 
          {...fadeUp} transition={{ delay: 0.3 }}
          className="w-full relative rounded-3xl overflow-hidden border border-white/10 aspect-[21/9] flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black"
        >
          <img src={audienceBg} alt="Mulheres na plateia" className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-[2000ms]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#ee6983]/20 mix-blend-overlay" />
          
          <div className="absolute left-8 lg:left-16 bottom-10 lg:bottom-16 max-w-xl">
             <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-wider leading-tight mb-4">
               A Cura para a <br className="hidden md:block"/> <span className="text-[#ee6983]">Solidão do Topo</span>
             </h3>
             <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
               Participe de rodadas de networking desenhadas para mulheres que falam a mesma língua que você, compartilhando desafios da gestão e da ascensão feminina sem competição predatória.
             </p>
          </div>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Features / Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 -mt-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-[#050505] rounded-3xl p-8 space-y-6 border border-white/5 hover:border-[#ee6983]/40 transition-all duration-300 shadow-xl overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ee6983]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 group-hover:border-[#ee6983]/30 transition-colors shadow-inner">
                  <f.icon className="w-7 h-7 text-[#ee6983] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-[15px] sm:text-[16px] text-white/50 group-hover:text-white/90 font-medium leading-relaxed transition-colors duration-300">
                  {f.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
