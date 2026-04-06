import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const schedule = {
  17: [
    { time: "17:00", title: "Abertura Cultural", type: "Recepção" },
    { 
      time: "18:00", 
      title: "Boas-Vindas & Painel de Abertura", 
      speakers: ["Reitora Candysse Figueiredo", "Prof.MSc. Lucia Leandro"], 
      highlight: true 
    },
    { 
      time: "19:00", 
      title: "Liderança de Impacto & Networking", 
      speakers: ["Daniele Mafra", "Marina Aragão", "Dra. Mitia Montenegro", "Dr. Rafael Almeida"] 
    },
    { time: "20:30", title: "Showcase: Academia Gracie Barra", type: "Experience" },
  ],
  18: [
    { 
      time: "08:00", 
      title: "Bioestética & Ciência Integrativa", 
      speakers: ["Profa. Dra. Alice Fuscella", "Dra. Eneida Carreiro", "Dra. Bruna Covre", "Dra. Glenda Oliveira"],
      highlight: true 
    },
    { 
      time: "13:30", 
      title: "Posicionamento & Autoridade Digital", 
      speakers: ["Dra. Dani Maia", "Wanderley Cunha"],
      highlight: true 
    },
    { 
      time: "15:30", 
      title: "Encerramento: Transformação em Dobro", 
      speakers: ["Dra. Débora Ricque", "Pollyana Chacon", "Suyane Melre"] 
    },
  ]
};

const ScheduleSection = () => {
  return (
    <section id="programacao" className="bg-[#080808] py-24 md:py-32 relative overflow-hidden border-t border-[#ee6983]/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Header Master */}
        <motion.div {...fadeUp} className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <SectionLabel text="Programação Oficial" centered />
          
          <h2 className="text-[34px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
            Agenda <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              do Fórum 2026
            </span>
          </h2>
        </motion.div>

        {/* Tabela de Grid Binaural (All-in-One) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          
          {/* COLUNA: DIA 17 */}
          <div className="flex flex-col">
            <div className="mb-8 sm:mb-12 border-b border-[#ee6983]/20 pb-4 sm:pb-6 flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#ee6983] uppercase">DIA 01</span>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
                17 de Abril
              </h3>
            </div>

            <div className="flex flex-col">
              {schedule[17].map((item, i) => (
                <div key={i} className="group relative">
                  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-start py-6 sm:py-8 group-hover:bg-white/[0.01] transition-all duration-300 px-2 -mx-2 rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-light text-white/20 group-hover:text-[#ee6983] transition-colors duration-300 tabular-nums">
                        {item.time}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2.5">
                      <h3 className={`text-[14px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[0.15em] leading-tight ${item.highlight ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                        {item.title}
                      </h3>
                      
                      {item.speakers && (
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-80">
                          <p className="text-[12px] sm:text-[13px] font-medium text-white/40 tracking-wide leading-relaxed">
                            {item.speakers.map((s, idx) => (
                              <span key={idx}>
                                {s}{idx < item.speakers!.length - 1 && <span className="mx-2 text-[#ee6983]/30">•</span>}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {i < schedule[17].length - 1 && (
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* COLUNA: DIA 18 */}
          <div className="flex flex-col">
            <div className="mb-8 sm:mb-12 border-b border-[#ee6983]/20 pb-4 sm:pb-6 flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#ee6983] uppercase">DIA 02</span>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
                18 de Abril
              </h3>
            </div>

            <div className="flex flex-col">
              {schedule[18].map((item, i) => (
                <div key={i} className="group relative">
                  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-start py-6 sm:py-8 group-hover:bg-white/[0.01] transition-all duration-300 px-2 -mx-2 rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-light text-white/20 group-hover:text-[#ee6983] transition-colors duration-300 tabular-nums">
                        {item.time}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2.5">
                      <h3 className={`text-[14px] sm:text-[15px] md:text-[16px] font-bold uppercase tracking-[0.15em] leading-tight ${item.highlight ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                        {item.title}
                      </h3>
                      
                      {item.speakers && (
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-80">
                          <p className="text-[12px] sm:text-[13px] font-medium text-white/40 tracking-wide leading-relaxed">
                            {item.speakers.map((s, idx) => (
                              <span key={idx}>
                                {s}{idx < item.speakers!.length - 1 && <span className="mx-2 text-[#ee6983]/30">•</span>}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {i < schedule[18].length - 1 && (
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
