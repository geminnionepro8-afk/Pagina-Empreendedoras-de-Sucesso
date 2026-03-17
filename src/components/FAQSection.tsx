import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const faqs = [
  {
    q: "Quantos palestrantes serão?",
    a: "Contaremos em nosso evento com 6 palestrantes exclusivos; Até o momento podemos divulgar para o público \"apenas\" o Flávio Augusto, mas calma aí que vou te contar mais sobre ele: Ele foi o Fundador da rede de escola de línguas Wise Up e Ex-proprietário do time de futebol Orlando City; divide seu tempo administrando seus negócios e repassando todos os seus ensinamentos e aprendizados.",
  },
  {
    q: "Qual o horário de início e término do evento?",
    a: "Nosso evento terá início às 08:00 e seu término às 18:00; Ahh, para aqueles que adquirirem os ingressos PRIVATE, acompanhe as orientações que serão postadas em nosso Instagram, sua programação se estenderá um pouco mais 😉",
  },
];

const FAQSection = () => (
  <section className="bg-background py-24">
    <div className="section-container">
      <motion.div {...fadeUp} className="text-center mb-12">
        <span className="text-2xl font-black tracking-[0.3em] text-foreground">
          <span className="font-black">FLF</span><span className="font-light">EZTIVAL</span>
        </span>
        <p className="text-foreground font-bold uppercase tracking-wider mt-2">PERGUNTAS FREQUENTES</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {faqs.map((faq, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-glass p-6 space-y-4">
            <h3 className="text-foreground font-bold text-lg">{faq.q}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div {...fadeUp} className="text-center mt-24 space-y-4">
        <h3 className="text-accent-orange font-bold text-xl uppercase">
          QUER FALAR COM ALGUÉM PARA TIRAR SUAS DÚVIDAS?
        </h3>
        <p className="text-muted-foreground">
          Toque no botão abaixo e fale com um especialista em transformação financeira
        </p>
        <button className="inline-flex items-center gap-2 h-14 rounded-full border border-foreground/20 px-8 text-foreground font-bold uppercase hover:bg-foreground/5 transition-colors">
          <MessageCircle className="w-5 h-5" /> FALAR COM UM ESPECIALISTA
        </button>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
