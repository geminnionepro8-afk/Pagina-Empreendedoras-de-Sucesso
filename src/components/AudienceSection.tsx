import { motion } from "framer-motion";
import { Rocket, Mountain, Target, TrendingUp, Handshake, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const cards = [
  { icon: Rocket, text: "Deseja ser diferente dos demais e perseguir seu sonho" },
  { icon: Mountain, text: "Quer aprender com pessoas que já trilharam o caminho" },
  { icon: Target, text: "Já tem ou tem interesse em abrir um negócio" },
  { icon: TrendingUp, text: "Busca constantemente aumentar suas vendas" },
  { icon: Handshake, text: "Busca conectar-se com pessoas com valores semelhantes" },
  { icon: Zap, text: "Quer escalar seu negócio" },
];

const AudienceSection = () => (
  <section className="bg-surface py-24">
    <div className="section-container">
      <motion.h2 {...fadeUp} className="heading-display text-2xl md:text-3xl text-center text-foreground mb-16">
        O <span className="text-accent-orange font-black">FLFEZTIVAL</span> É PARA VOCÊ QUE
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="border-accent-thin rounded-xl p-8 bg-background text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-lg bg-accent/10 flex items-center justify-center">
              <card.icon className="w-8 h-8 text-accent-orange" />
            </div>
            <p className="text-foreground font-medium">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceSection;
