import { motion } from "framer-motion";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";
import speaker5 from "@/assets/speaker-5.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const speakers = [
  { name: "RENATA VICHI", role: "CEO do Grupo CRM - Kopenhagen, Chocolates Brasil Cacau e Kop Koffee", img: speaker1 },
  { name: "FLÁVIO AUGUSTO", role: "Founder & CEO of Wiser Educação, Escritor best-seller", img: speaker2 },
  { name: "JOÃO ADIBE MARQUES", role: "Presidente da CIMED. Um dos maiores grupos farmacêuticos do Brasil.", img: speaker3 },
  { name: "CARLOS BUSCH", role: "4x Top Global em Vendas, Ex-VP Salesforce, Oracle", img: speaker4 },
  { name: "LUCIANO POTTER", role: "Empreendedor, comunicador, jornalista, podcaster e palestrante.", img: speaker5 },
  { name: "EM BREVE", role: "", img: null },
];

const SpeakersSection = () => (
  <section className="bg-background py-24">
    <div className="section-container">
      <motion.h2 {...fadeUp} className="heading-display text-2xl md:text-3xl text-center text-foreground mb-4">
        Quem guiará você nessa jornada inspiradora que entrará para a história
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {speakers.map((s, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden border-accent-thin">
              {s.img ? (
                <img src={s.img} alt={s.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl text-muted-foreground mb-2">👥</div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-accent-orange font-bold text-lg">{s.name}</h3>
            {s.role && <p className="text-muted-foreground text-sm">{s.role}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SpeakersSection;
