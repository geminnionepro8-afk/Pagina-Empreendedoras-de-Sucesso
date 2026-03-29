import { motion } from "framer-motion";

import s1 from "@/assets/speakers/1.png";
import s2 from "@/assets/speakers/2.png";
import s3 from "@/assets/speakers/3.png";
import s4 from "@/assets/speakers/4.png";
import s5 from "@/assets/speakers/5.png";
import s6 from "@/assets/speakers/6.png";
import s7 from "@/assets/speakers/7.png";
import s8 from "@/assets/speakers/8.png";
import s9 from "@/assets/speakers/9.png";
import s10 from "@/assets/speakers/10.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const speakers = [
  { name: "Prof. Dra. Alice Fuscella", role: "Coord. Odontologia e Práticas Integrativas UNIFACEX", img: s1 },
  { name: "Dra. Eneida Carreiro", role: "Fisio. Dermatofuncional e Dra. em Biotecnologia", img: s2 },
  { name: "Dra. Bruna Covre", role: "Médica Endocrinologista e Funcional Integrativa", img: s3 },
  { name: "Dr. Raphael Almeida", role: "Fisio. Esp. Traumato-Ortopedia e Método EDP", img: s4 },
  { name: "Mitia Montenegro", role: "Psicóloga Esp. em Saúde Mental, TCC e Autismo", img: s5 },
  { name: "Wanderley Cunha", role: "CEO Vectax Produtora", img: s6 },
  { name: "Dra. Glenda Oliveira", role: "Biomédica, Esteticista e Mestre em Biotecnologia", img: s7 },
  { name: "Danielle Mafra", role: "Superint. Regional SESI RN e Executiva em ESG", img: s8 },
  { name: "Dra. Dani Maia", role: "Dermatologista, CEO Clínica Daniela Maia", img: s9 },
  { name: "Marina Aragão", role: "Cons. Empresarial e Coord. Carreiras IEL RN", img: s10 },
];

const SpeakersSection = () => {
  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden">
      {/* Luzes de fundo elegantes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[200px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto px-4 sm:px-8 xl:px-12 w-full max-w-[1600px]">
        {/* Header Premium Centralizado */}
        <motion.div {...fadeUp} className="mb-20 space-y-4 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="hidden sm:block w-8 h-[1px] bg-[#ee6983]/50" />
            <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
              Corpo Docente de Referência
            </p>
            <div className="hidden sm:block w-8 h-[1px] bg-[#ee6983]/50" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
            As Autoridades que <br className="hidden md:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">guiarão sua jornada</span>
          </h2>
        </motion.div>

        {/* Layout Premium: Grid sem gap com "Spotlight Effect" */}
        <div className="group/grid grid grid-cols-2 md:grid-cols-5 border-t border-l border-white/5">
          {speakers.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group/card relative aspect-[3/4] border-r border-b border-white/5 overflow-hidden bg-[#020202]"
            >
              {/* Imagem com cores originais — zoom no hover */}
              <img
                src={s.img}
                alt={s.name}
                className="w-full h-full object-cover object-top opacity-90 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-700 ease-out"
              />

              {/* Degradê base fixo para garantir leitura */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

              {/* Textos expansíveis no hover com mais espaço */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 pt-12 flex flex-col justify-end translate-y-6 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
                {/* Linha indicadora fina */}
                <div className="w-0 h-[2px] bg-[#ee6983] mb-4 group-hover/card:w-10 transition-all duration-700 ease-out" />
                
                <h3 className="text-white font-light text-sm sm:text-base uppercase tracking-widest mb-1 leading-tight drop-shadow-md">
                  <span className="font-black">{s.name.split(' ')[0]} </span>
                  {s.name.split(' ').slice(1).join(' ')}
                </h3>
                
                <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.15em] font-semibold opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 mt-1 max-w-[90%] drop-shadow-md pb-1">
                  {s.role}
                </p>
              </div>

              {/* Overlay para escurecer os não-hoverados na grade inteira */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpeakersSection;
