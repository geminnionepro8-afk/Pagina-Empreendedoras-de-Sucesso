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
  <section className="bg-flf-dark py-24">
    <div className="section-container max-w-5xl">
      <motion.h2 {...fadeUp} className="text-2xl md:text-3xl lg:text-3xl text-center text-white font-bold tracking-wide uppercase mb-12">
        O <span className="font-black">FLFEZTIVAL</span> É PARA VOCÊ QUE
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="border border-flf-orange/50 rounded-xl p-8 bg-flf-dark text-center flex flex-col items-center justify-center min-h-[160px] gap-4"
          >
            <div className="bg-flf-gray px-3 py-3 rounded-xl border border-flf-orange/30">
              <card.icon className="w-8 h-8 text-flf-orange" strokeWidth={1.5} />
            </div>
            <p className="text-white font-medium text-sm leading-relaxed px-2">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} className="mt-20 text-center">
        <h3 className="text-xl md:text-2xl text-white font-bold leading-relaxed max-w-2xl mx-auto">
          Quem guiará você nessa jornada inspiradora que entrará para a história
        </h3>
      </motion.div>
    </div>
  </section>
);

export default AudienceSection;
