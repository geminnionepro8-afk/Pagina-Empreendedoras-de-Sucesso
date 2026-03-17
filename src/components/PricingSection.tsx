import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

interface Benefit {
  text: string;
  included: boolean;
}

interface Ticket {
  name: string;
  headerColor: string;
  benefits: Benefit[];
  originalPrice: string;
  installments: string;
  installmentPrice: string;
  cashPrice: string;
}

const tickets: Ticket[] = [
  {
    name: "START",
    headerColor: "bg-destructive",
    benefits: [
      { text: "Acesso presencial ao evento, cara a cara com quem está fazendo acontecer e ditando as tendências do mercado", included: true },
      { text: "Kit participante FLFeztival 2023 com itens exclusivos para que você aproveite ao máximo a experiência no evento", included: true },
      { text: "Espaço dedicado a grupos empresariais para networking e troca de experiências.", included: false },
      { text: "Assentos mais próximos ao palco", included: false },
      { text: "Check In Exclusivo VIP", included: false },
      { text: "Acesso ao grupo de empresários(as) para Mentoria Q&A com Flávio Augusto", included: false },
    ],
    originalPrice: "R$1.190,00",
    installments: "12x de",
    installmentPrice: "R$99,22",
    cashPrice: "Ou R$ 899,00 à vista",
  },
  {
    name: "MEZANINO",
    headerColor: "bg-secondary",
    benefits: [
      { text: "Acesso presencial ao evento, cara a cara com quem está fazendo acontecer e ditando as tendências do mercado", included: true },
      { text: "Kit participante FLFeztival 2023 com itens exclusivos para que você aproveite ao máximo a experiência no evento", included: true },
      { text: "Espaço dedicado a grupos empresariais para networking e troca de experiências.", included: true },
      { text: "Assentos com visão panorâmica", included: true },
      { text: "Check In Exclusivo VIP", included: false },
      { text: "Acesso ao grupo de empresários(as) para Mentoria Q&A com Flávio Augusto", included: false },
    ],
    originalPrice: "R$1.499,00",
    installments: "12x de",
    installmentPrice: "R$139,23",
    cashPrice: "Ou R$ 1.249,00 à vista",
  },
  {
    name: "SELECT",
    headerColor: "bg-gold",
    benefits: [
      { text: "Acesso presencial ao evento, cara a cara com quem está fazendo acontecer e ditando as tendências do mercado", included: true },
      { text: "Kit participante FLFeztival 2023 com itens exclusivos para que você aproveite ao máximo a experiência no evento", included: true },
      { text: "Espaço dedicado a grupos empresariais para networking e troca de experiências.", included: true },
      { text: "Assentos mais próximos ao palco, com visão privilegiada", included: true },
      { text: "Check In Exclusivo VIP", included: true },
      { text: "Acesso ao grupo de empresários(as) para Mentoria Q&A com Flávio Augusto", included: false },
    ],
    originalPrice: "R$2.149",
    installments: "12x de",
    installmentPrice: "R$206,08",
    cashPrice: "Ou R$ 1.849,00 à vista",
  },
];

const privateFeatures = [
  "Mentoria exclusiva com Flávio Augusto ao final do evento",
  "Acesso ao FLFClub, nosso grupo premium de empresários",
  "Acesso a mentores renomados nos encontros mensais do FLFClub",
  "Networking de alto nível com membros do FLFClub",
  "Credenciamento VIP pré-evento para membros do FLFClub",
  "Press kit exclusivo para novos membros do FLFClub",
  "Assentos VIP frente ao palco para membros do FLFClub",
  "Espaço VIP FLFClub (água, café e frutas durante todo o evento)",
  "Pré-evento virtual com personalidades do FLFeztival",
  "Coquetel exclusivo pré-evento",
];

const PricingSection = () => (
  <section className="bg-background py-24">
    <div className="section-container">
      <motion.h2 {...fadeUp} className="text-accent-orange font-bold text-center text-xl md:text-2xl uppercase mb-16">
        ESCOLHA A MELHOR EXPERIÊNCIA PARA VOCÊ
      </motion.h2>

      {/* Ticket cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {tickets.map((ticket, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
            className="card-glass overflow-hidden flex flex-col"
          >
            <div className="text-center py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">INGRESSO</div>
            <div className={`${ticket.headerColor} py-4 text-center`}>
              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-wider">{ticket.name}</h3>
            </div>

            <div className="p-6 flex-1 space-y-4">
              {ticket.benefits.map((b, j) => (
                <div key={j} className={`flex gap-3 pb-4 border-b border-border/20 ${!b.included ? "opacity-40" : ""}`}>
                  {b.included ? (
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground line-through">De {ticket.originalPrice} por</p>
              <p className="text-accent-orange font-bold text-sm">{ticket.installments}</p>
              <p className="text-gold text-4xl md:text-5xl font-black tabular-nums">{ticket.installmentPrice}</p>
              <p className="text-xs text-muted-foreground">{ticket.cashPrice}</p>
              <div className="pt-2">
                <span className="inline-block bg-accent-orange text-background text-xs font-bold px-4 py-1 rounded-full">10% OFF</span>
              </div>
              <button className="btn-cta w-full mt-4">COMPRAR AGORA</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Private */}
      <motion.div {...fadeUp} className="bg-gradient-to-b from-card to-background rounded-2xl p-8 md:p-16">
        <h2 className="heading-display text-3xl md:text-4xl text-center text-foreground mb-4">ACESSO PRIVATE</h2>
        <p className="text-center text-muted-foreground mb-12">Apenas para 50 empresários(as), veja os diferenciais:</p>

        <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden bg-secondary mb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center mx-auto mb-4">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-foreground ml-1" />
            </div>
            <p className="text-muted-foreground text-sm">Vídeo exclusivo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {privateFeatures.map((f, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-border/20">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground text-sm">{f}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-cta text-lg">FAZER PARTE DO GRUPO</button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PricingSection;
