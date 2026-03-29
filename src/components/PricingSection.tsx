import { motion } from "framer-motion";
import { Check, ShieldCheck, MapPin, Sparkles, Building, GraduationCap, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const tiers = [
  {
    id: "estudante",
    name: "Estudante",
    description: "Para estudantes de outras instituições",
    price: "73,50",
    icon: GraduationCap,
    benefits: [
      "Acesso presencial aos 2 dias",
      "Palestras e painéis exclusivos",
      "Networking estruturado",
      "Certificado digital"
    ],
    highlight: false,
  },
  {
    id: "profissional",
    name: "Profissional",
    description: "Experiência completa de imersão",
    price: "147,00",
    icon: Building,
    benefits: [
      "Acesso presencial aos 2 dias",
      "Acesso livre a toda a programação",
      "Networking de alto nível",
      "Certificado digital de participação"
    ],
    highlight: true,
  },
  {
    id: "unifacex",
    name: "Estudante Unifacex",
    description: "Taxa social exclusiva Unifacex",
    price: "20,00",
    sufix: "+ 1kg Alimento",
    extraInfo: "Doação para LAE - Lar do Ancião Evangélico (Entregar na abertura 17/04).",
    icon: HeartHandshake,
    benefits: [
      "Subsídio especial de estudante",
      "Acesso presencial aos 2 dias",
      "Transformação em dobro (Doação)",
      "Certificado digital"
    ],
    highlight: false,
  }
];

const PricingSection = () => (
  <section className="bg-[#151515] py-24 relative overflow-hidden border-t border-[#ee6983]/10">
    {/* Subtle glow similar to Audience Section */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

    <div className="section-container relative z-10">
      <motion.div {...fadeUp} className="mb-20 space-y-4 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="hidden sm:block w-8 h-[1px] bg-[#ee6983]/50" />
          <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
            Investimento
          </p>
          <div className="hidden sm:block w-8 h-[1px] bg-[#ee6983]/50" />
        </div>
        <h2 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
          Escolha seu <br />
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">Ingresso</span>
        </h2>
        <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base leading-relaxed pt-2">
          Garanta sua vaga na maior imersão de estética, integrativa e negócios da região. Vagas limitadas.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative flex flex-col"
          >
            {/* Credential Body */}
            <div className={`relative flex flex-col flex-1 rounded-xl overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 ${
              tier.highlight 
                ? "bg-[#050102]/80 border border-white/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)]" 
                : "bg-black/40 border border-white/10 hover:border-white/20"
            }`}>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 text-center">
                
                {/* Header (Title) */}
                <div className="mb-6 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                    tier.highlight ? "bg-white/10 text-white" : "bg-white/5 text-white/40"
                  }`}>
                    <tier.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-1">
                    <span className="block text-[8px] sm:text-[9px] font-bold tracking-[0.3em] text-white/40 mb-1">
                      CREDENCIAL DE
                    </span>
                    <span className={`tracking-tight ${tier.highlight ? "text-white" : "text-white/90"}`}>
                      {tier.name}
                    </span>
                  </h3>
                  
                  <p className="text-[#ee6983] text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="relative py-6 my-2 flex flex-col items-center border-y border-dashed border-white/10">
                  <div className="flex items-start justify-center gap-1">
                    <span className={`font-bold text-base mt-2 ${tier.highlight ? "text-[#ee6983]" : "text-white/40"}`}>R$</span>
                    <span className={`text-5xl font-black tracking-tighter leading-none ${tier.highlight ? "text-white" : "text-white/90"}`}>{tier.price.split(',')[0]}</span>
                    <span className={`font-bold text-lg mt-1 ${tier.highlight ? "text-white/50" : "text-white/30"}`}>,{tier.price.split(',')[1]}</span>
                  </div>
                  
                  {tier.sufix && (
                    <p className={`text-[10px] sm:text-xs font-black uppercase tracking-wider mt-3 ${tier.highlight ? "text-[#ee6983]" : "text-white/40"}`}>{tier.sufix}</p>
                  )}
                </div>

                {tier.extraInfo && (
                  <div className="mb-5 mt-2">
                    <p className={`text-[9px] uppercase tracking-wider px-3 py-2 rounded-lg border leading-relaxed ${
                      tier.highlight ? "bg-white/5 text-white/70 border-white/10" : "bg-white/5 text-white/40 border-white/5"
                    }`}>
                      {tier.extraInfo}
                    </p>
                  </div>
                )}

                {/* Benefits List */}
                <ul className="flex flex-col gap-3.5 mb-8 flex-1 justify-center items-center px-2">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2.5 w-full">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 ${tier.highlight ? "text-white" : "text-white/30"}`} strokeWidth={2.5} />
                      <span className={`text-xs leading-tight font-medium text-left ${tier.highlight ? "text-white/80" : "text-white/50"}`}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Link
                  to="/inscricao"
                  state={{ selectedTier: tier.id }}
                  className={`w-full py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 ${
                    tier.highlight
                      ? "bg-[#ee6983] hover:bg-[#ff7b96] text-white"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/30"
                  }`}
                >
                  Garantir Participação
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center flex flex-col items-center gap-3">
        <p className="text-white/30 text-xs flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Pagamento Seguro (PIX)
        </p>
      </div>
    </div>
  </section>
);

export default PricingSection;
