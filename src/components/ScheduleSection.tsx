import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const scheduleDay1 = [
  { time: "17:00", event: "CREDENCIAMENTO & NETWORKING" },
  { time: "17:30", event: "ABERTURA OFICIAL\nLÚCIA LEANDRO", highlight: true },
  { time: "18:00", event: "MEDICINA INTEGRATIVA\nDRA. MITIA MONTENEGRO" },
  { time: "19:30", event: "A INFLUÊNCIA DA ESTÉTICA NA AUTOESTIMA (PAINEL)" },
  { time: "21:30", event: "ENCERRAMENTO DIA 1" },
];

const scheduleDay2 = [
  { time: "08:00", event: "CAFÉ & CONEXÕES" },
  { time: "09:00", event: "PRODUTIVIDADE 4.0" },
  { time: "10:30", event: "WORKSHOP MARCA PESSOAL", highlight: true },
  { time: "14:00", event: "INTELIGÊNCIA EMOCIONAL" },
  { time: "16:00", event: "O FUTURO DA CARREIRA\nDRA. ALICE FUSCELLA", highlight: true, isPrivate: true },
  { time: "17:00", event: "ENCERRAMENTO OFICIAL" },
];

const ScheduleSection = () => {
  return (
    <section className="bg-background py-24 relative overflow-hidden flex flex-col items-center">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-5xl">
        
        {/* Header Elements */}
        <motion.div {...fadeUp} className="text-center mb-16 space-y-8 w-full">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest text-center">
            PROGRAMAÇÃO OFICIAL
          </h2>
          
          {/* Centered Ribbon */}
          <div className="mx-auto w-full max-w-4xl bg-gradient-to-r from-[#ee6983] to-[#850e35] rounded-[5%] md:rounded-full py-3 shadow-[0_0_30px_rgba(238,105,131,0.2)]">
            <h3 className="text-center font-black text-white text-sm md:text-base tracking-[0.2em] uppercase">
              JORNADA DE TRANSFORMAÇÃO
            </h3>
          </div>
        </motion.div>

        {/* Schedule Grid Layout - 2 Days */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 w-full px-4 md:px-8">
          
          {/* Column 1: Day 1 */}
          <div className="w-full">
            <h3 className="text-xl font-bold text-[#ee6983] mb-6 uppercase tracking-wider border-b border-[#ee6983]/30 pb-4">
              Dia 1: 17 de Abril <br/>
              <span className="text-sm font-normal text-white/50">O Despertar da Performance</span>
            </h3>
            {scheduleDay1.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-6 py-5 border-b border-white/10 group"
              >
                <span className="text-lg md:text-xl font-normal text-white/70 w-16 text-left shrink-0">
                  {item.time}
                </span>
                
                <span className={`text-base md:text-lg font-black uppercase tracking-wider whitespace-pre-line transition-colors ${item.highlight ? "text-[#ee6983]" : "text-white"}`}>
                  {item.event}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Column 2: Day 2 */}
          <div className="w-full mt-6 lg:mt-0">
            <h3 className="text-xl font-bold text-[#ee6983] mb-6 uppercase tracking-wider border-b border-[#ee6983]/30 pb-4">
              Dia 2: 18 de Abril <br/>
              <span className="text-sm font-normal text-white/50">A Maestria da Liderança</span>
            </h3>
            {scheduleDay2.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-6 py-5 border-b border-white/10 group"
              >
                <span className="text-lg md:text-xl font-normal text-white/70 w-16 text-left shrink-0">
                  {item.time}
                </span>
                
                <div className="flex flex-col gap-1 w-full relative">
                  <span className={`text-base md:text-lg font-black uppercase tracking-wider leading-tight whitespace-pre-line transition-colors ${item.highlight ? "text-[#ee6983]" : item.isPrivate ? "text-[#ffc4c4]" : "text-white"}`}>
                    {item.event}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>

        {/* Footer Warning */}
        <motion.div 
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center space-y-4"
        >
          <h4 className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">
            EM BREVE PROGRAMAÇÃO COMPLETA
          </h4>
          <p className="text-white/40 text-[11px] md:text-xs font-medium uppercase tracking-[0.15em]">
            Cronograma poderá sofrer alterações até o dia do evento
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ScheduleSection;
