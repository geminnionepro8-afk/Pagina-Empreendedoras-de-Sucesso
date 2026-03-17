import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

interface ScheduleItem {
  time: string;
  activity: string;
  highlight: boolean;
  isPrivate?: boolean;
}

const morningSchedule: ScheduleItem[] = [
  { time: "07:00", activity: "CREDENCIAMENTO", highlight: false },
  { time: "08:00", activity: "ABERTURA FLFEZTIVAL", highlight: false },
  { time: "08:30", activity: "LUCIANO POTTER", highlight: true },
  { time: "09:30", activity: "JOÃO ADIBE", highlight: true },
  { time: "11:00", activity: "EM BREVE", highlight: false },
  { time: "12:00", activity: "INTERVALO", highlight: false },
];

const afternoonSchedule: ScheduleItem[] = [
  { time: "13:30", activity: "ATIVAÇÃO FLF", highlight: false },
  { time: "14:00", activity: "RENATA VICHI", highlight: true },
  { time: "15:15", activity: "CARLOS BUSCH", highlight: true },
  { time: "16:15", activity: "EM BREVE", highlight: false },
  { time: "17:00", activity: "FLÁVIO AUGUSTO", highlight: true },
  { time: "18:30", activity: "MENTORIA Q&A FLÁVIO AUGUSTO", highlight: false, isPrivate: true },
];

const lots = [
  { label: "LOTE 1", discount: "40%", active: false },
  { label: "LOTE 2", discount: "30%", active: false },
  { label: "LOTE 3", discount: "20%", active: false },
  { label: "LOTE 4", discount: "10%", active: true },
];

const ScheduleSection = () => (
  <section className="bg-background py-24">
    <div className="section-container">
      {/* Schedule header */}
      <motion.div {...fadeUp} className="mb-12">
        <div className="bg-primary rounded-full py-3 px-8 text-center max-w-md mx-auto">
          <span className="text-primary-foreground font-black tracking-wider uppercase">PROGRAMAÇÃO</span>
        </div>
      </motion.div>

      {/* Schedule grid */}
      <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-4xl mx-auto">
        {[morningSchedule, afternoonSchedule].map((schedule, col) => (
          <div key={col}>
            {schedule.map((item, i) => (
              <div key={i} className="flex items-baseline gap-4 py-4 border-b border-border/30">
                <span className={`text-lg font-medium tabular-nums ${item.highlight ? "text-accent-orange" : "text-muted-foreground"}`}>
                  {item.time}
                </span>
                <span className={`font-bold text-lg ${item.isPrivate ? "text-gold" : "text-foreground"}`}>
                  {item.activity}
                  {item.isPrivate && (
                    <span className="block text-xs text-gold font-normal mt-1">EXCLUSIVO ACESSO PRIVATE</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp} className="text-center mt-12 space-y-2">
        <p className="text-foreground font-bold">EM BREVE PROGRAMAÇÃO COMPLETA</p>
        <p className="text-muted-foreground text-xs uppercase tracking-wider">
          CRONOGRAMA PODERÁ SOFRE ALTERAÇÕES ATÉ O DIA DO EVENTO
        </p>
      </motion.div>

      {/* Lots */}
      <motion.div {...fadeUp} className="mt-24">
        <h3 className="text-accent-orange font-bold text-center text-xl md:text-2xl uppercase mb-12">
          AJA RÁPIDO E APROVEITE A ÚLTIMA OPORTUNIDADE
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {lots.map((lot, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 text-center w-40 ${lot.active ? "card-glass border border-foreground/20" : "bg-secondary/50 opacity-50"}`}
            >
              <p className="text-xs font-bold text-muted-foreground mb-2">{lot.label}</p>
              <p className={`text-4xl font-black ${lot.active ? "text-accent-orange" : "text-muted-foreground"}`}>{lot.discount}</p>
              <p className="text-xs font-bold text-muted-foreground mt-1">OFF</p>
              {lot.active && <p className="text-xs font-bold text-foreground mt-2">LOTE ATUAL</p>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default ScheduleSection;
