import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const scheduleDay1 = [
  { time: "17h", event: "Abertura Cultural" },
  { time: "18h", event: "Boas-Vindas Reitora Candysse Figueiredo\n& Prof.MSc. Lucia Leandro", highlight: true },
  { time: " ", event: "Daniele Mafra, Marina Aragão,\nDra. Mitia Montenegro, Dr. Rafael Almeida" },
  { time: "20h30", event: "Apresentação das lutadoras da Academia Gracie Barra" },
];

const scheduleDay2 = [
  { time: "8h", event: "Profa. Dra. Alice Fuscella", highlight: true },
  { time: " ", event: "Dra. Eneida Carreiro, Dra. Bruna Covre,\nDra. Glenda Oliveira" },
  { time: "13h30", event: "Dra. Dani Maia e Wanderley Cunha", highlight: true },
  { time: "15h30", event: "Dra. Débora Ricque, Pollyana Chacon\ne Suyane Melre" },
];

const ScheduleSection = () => {
  return (
    <section className="bg-background py-24 relative overflow-hidden flex flex-col items-center">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-5xl">
        
        {/* Header Premium Centralizado */}
        <motion.div {...fadeUp} className="text-center mb-24 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-[1px] bg-[#ee6983]/40" />
            <p className="text-[#ee6983] text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-bold">
              Agenda do Evento
            </p>
            <div className="w-6 h-[1px] bg-[#ee6983]/40" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight leading-tight mb-8">
            Programação <br className="hidden md:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              Oficial
            </span>
          </h2>
          
          {/* Centered Pill (Ribbon) Ajustado para contraste rosa premium */}
          <div className="inline-flex items-center justify-center px-12 py-3.5 rounded-full bg-gradient-to-r from-[#850e35] via-[#ee6983] to-[#850e35] relative overflow-hidden shadow-[0_0_40px_rgba(238,105,131,0.25)] border border-[#ee6983]/40">
            <h3 className="relative z-10 font-bold text-white text-[10px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-md">
              Jornada de Transformação
            </h3>
          </div>
        </motion.div>

        {/* Schedule Grid Layout - 2 Days */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-20 w-full px-2 md:px-6">
          
          {/* Column 1: Day 1 */}
          <div className="w-full relative">
            <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-[#ee6983]/5 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Cabeçalho do Dia */}
            <div className="relative mb-10 pb-6 border-b border-white/10">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest relative z-10 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                Dia 1 
                <span className="text-[#ee6983] text-sm tracking-[0.2em] font-bold">17/04 - Sexta-Feira</span>
              </h3>
            </div>

            {/* Itens do Dia 1 */}
            <div className="flex flex-col">
              {scheduleDay1.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex items-center gap-6 py-5 border-b border-white/[0.08] hover:border-white/20 transition-colors duration-400 cursor-default"
                >
                  <span className="relative z-10 text-lg sm:text-xl font-light text-white/50 group-hover:text-white w-16 text-left shrink-0 tabular-nums tracking-wider transition-colors duration-300">
                    {item.time}
                  </span>
                  
                  <span className={`relative z-10 text-sm sm:text-base font-bold uppercase tracking-widest whitespace-pre-line transition-all duration-300 ${item.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#ffc4c4]" : "text-white/70 group-hover:text-[#ee6983]"}`}>
                    {item.event}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Day 2 */}
          <div className="w-full relative mt-8 lg:mt-0">
            <div className="absolute -top-10 -right-10 w-[300px] h-[300px] bg-[#ee6983]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Cabeçalho do Dia */}
            <div className="relative mb-10 pb-6 border-b border-white/10">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest relative z-10 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                Dia 2 
                <span className="text-[#ee6983] text-sm tracking-[0.2em] font-bold">18/04 - Sábado</span>
              </h3>
            </div>

            {/* Itens do Dia 2 */}
            <div className="flex flex-col">
              {scheduleDay2.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex items-center gap-6 py-5 border-b border-white/[0.08] hover:border-white/20 transition-colors duration-400 cursor-default"
                >
                  <span className="relative z-10 text-lg sm:text-xl font-light text-white/50 group-hover:text-white w-16 text-left shrink-0 tabular-nums tracking-wider transition-colors duration-300">
                    {item.time}
                  </span>
                  
                  <div className="relative z-10 flex flex-col gap-1 w-full">
                    <span className={`text-sm sm:text-base font-bold uppercase tracking-widest leading-tight whitespace-pre-line transition-all duration-300 ${item.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#ffc4c4]" : "text-white/70 group-hover:text-[#ee6983]"}`}>
                      {item.event}
                    </span>
                  </div>
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
