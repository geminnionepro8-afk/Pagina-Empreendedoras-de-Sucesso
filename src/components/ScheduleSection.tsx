import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4 },
};

const getTimePeriod = (time: string) => {
  const hour = parseInt(time.split(':')[0]);
  if (hour < 12) return "Manhã";
  if (hour < 18) return "Tarde";
  return "Noite";
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
  const [activeDay, setActiveDay] = useState<17 | 18>(17);

  return (
    <section id="programacao" className="bg-[#080808] py-24 md:py-32 relative overflow-hidden border-t border-[#ee6983]/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Header Master */}
        <motion.div {...fadeUp} className="flex flex-col items-center mb-12 md:mb-24 text-center">
          <SectionLabel text="Programação Oficial" centered />
          
          <h2 className="text-[34px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
            Agenda <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              do Fórum 2026
            </span>
          </h2>
        </motion.div>

        {/* Mobile Tabs Controller */}
        <div className="flex lg:hidden justify-center gap-4 mb-12">
            <button 
                onClick={() => setActiveDay(17)}
                className={`flex-1 py-4 px-6 rounded-2xl border transition-all duration-300 text-sm font-bold uppercase tracking-wider ${activeDay === 17 ? 'bg-[#ee6983] border-[#ee6983] text-white shadow-[0_10px_20px_rgba(238,105,131,0.2)]' : 'bg-white/5 border-white/10 text-white/40'}`}
            >
                17 Abr <span className="block text-[10px] opacity-60 font-normal">Quinta-feira</span>
            </button>
            <button 
                onClick={() => setActiveDay(18)}
                className={`flex-1 py-4 px-6 rounded-2xl border transition-all duration-300 text-sm font-bold uppercase tracking-wider ${activeDay === 18 ? 'bg-[#ee6983] border-[#ee6983] text-white shadow-[0_10px_20px_rgba(238,105,131,0.2)]' : 'bg-white/5 border-white/10 text-white/40'}`}
            >
                18 Abr <span className="block text-[10px] opacity-60 font-normal">Sexta-feira</span>
            </button>
        </div>

        {/* Tabela de Grid Binaural (All-in-One) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          
          {/* COLUNA: DIA 17 */}
          <div className={`flex flex-col ${activeDay === 17 ? 'flex' : 'hidden lg:flex'}`}>
            <div className="mb-8 sm:mb-12 border-b border-[#ee6983]/20 pb-4 sm:pb-6 flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#ee6983] uppercase">DIA 01</span>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
                17 de Abril
              </h3>
            </div>

            <div className="flex flex-col">
              {schedule[17].map((item, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-start py-6 sm:py-8 group-hover:bg-white/[0.01] transition-all duration-300 px-2 -mx-2 rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex flex-col items-start">
                        <span className="text-lg sm:text-xl md:text-2xl font-light text-white/20 group-hover:text-[#ee6983] transition-colors duration-300 tabular-nums leading-none">
                          {item.time}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-[#ee6983]/80 transition-colors duration-300 mt-1.5 ml-0.5">
                          {getTimePeriod(item.time)}
                        </span>
                      </div>
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUNA: DIA 18 */}
          <div className={`flex flex-col ${activeDay === 18 ? 'flex' : 'hidden lg:flex'}`}>
            <div className="mb-8 sm:mb-12 border-b border-[#ee6983]/20 pb-4 sm:pb-6 flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#ee6983] uppercase">DIA 02</span>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
                18 de Abril
              </h3>
            </div>

            <div className="flex flex-col">
              {schedule[18].map((item, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-start py-6 sm:py-8 group-hover:bg-white/[0.01] transition-all duration-300 px-2 -mx-2 rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex flex-col items-start">
                        <span className="text-lg sm:text-xl md:text-2xl font-light text-white/20 group-hover:text-[#ee6983] transition-colors duration-300 tabular-nums leading-none">
                          {item.time}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-[#ee6983]/80 transition-colors duration-300 mt-1.5 ml-0.5">
                          {getTimePeriod(item.time)}
                        </span>
                      </div>
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
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
