import { motion } from "framer-motion";
import venueMap from "@/assets/venue-map.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const sectors = [
  { letter: "A", name: "PRIVATE", color: "bg-gold" },
  { letter: "B", name: "SELECT", color: "bg-accent" },
  { letter: "C", name: "START", color: "bg-accent" },
  { letter: "D", name: "MEZANINO", color: "bg-secondary" },
];

const VenueMapSection = () => (
  <section className="bg-surface py-24">
    <div className="section-container">
      <motion.div {...fadeUp} className="text-center mb-4">
        <h2 className="heading-display text-2xl md:text-3xl text-foreground">ESPAÇO DO EVENTO</h2>
        <p className="text-accent-orange font-bold text-sm uppercase tracking-wider mt-2">
          CONFIRA O LOCAL DOS ASSENTOS DE CADA CATEGORIA
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="max-w-4xl mx-auto my-12">
        <img src={venueMap} alt="Mapa do evento" className="w-full rounded-2xl" />
      </motion.div>

      <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-6">
        <div className="text-muted-foreground text-sm font-bold mr-4">SETORES</div>
        {sectors.map((s) => (
          <div key={s.letter} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center text-xs font-black text-background`}>
              {s.letter}
            </div>
            <span className="text-foreground text-sm font-medium">{s.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default VenueMapSection;
