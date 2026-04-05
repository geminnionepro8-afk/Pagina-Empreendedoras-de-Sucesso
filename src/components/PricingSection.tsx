import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, MapPin, Sparkles, Building, GraduationCap, HeartHandshake, Diamond } from "lucide-react";
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
  <section id="ingressos" className="bg-[#050505] py-24 relative overflow-hidden border-t border-[#ee6983]/10">
    {/* Subtle glow similar to Audience Section */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

    {/* Definições de Gradiente SVG para Ícones */}
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="pricingIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#ffcce0" offset="0%" />
          <stop stopColor="#ee6983" offset="50%" />
          <stop stopColor="#ee6983" offset="100%" />
        </linearGradient>
      </defs>
    </svg>

    <div className="section-container relative z-10 px-4">
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

      {/* Moldura unificadora (Frame) - Aumentada em 4% e bordas calibradas */}
      <div className="max-w-[1240px] mx-auto bg-[#0c0c0c] p-3 md:p-5 rounded-[24px] border border-white/5 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 items-stretch">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative flex flex-col"
          >
            {/* Credential Body - Efeito Matte Diferenciado */}
            <div className={`relative flex flex-col flex-1 rounded-[20px] overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 border ${
              tier.highlight 
                ? "bg-gradient-to-br from-[#1f1f1f] via-[#111111] to-[#080808] border-white/10 border-t-[#ee6983]/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" 
                : "bg-[#080808] border-white/5 opacity-90 hover:opacity-100"
            }`}>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 text-center">
                
                {/* Header (Title) */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-white/[0.03] border border-white/10 shadow-inner">
                    <tier.icon className="w-6 h-6" stroke="url(#pricingIconGradient)" strokeWidth={1.5} />
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

                {/* Price - Linha em degradê em vez de tracejado */}
                <div className="relative py-8 my-2 flex flex-col items-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent" />
                  <div className="flex items-start justify-center gap-1">
                    <span className="font-bold text-xs mt-3 text-[#ee6983]">R$</span>
                    <span className="text-5xl font-bold tracking-tight leading-none text-white">{tier.price.split(',')[0]}</span>
                    <div className="flex flex-col items-start mt-1">
                      <span className="font-bold text-base text-white/50 leading-none">,{tier.price.split(',')[1]}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent" />
                  
                  {tier.sufix && (
                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider mt-4 text-[#ee6983]">{tier.sufix}</p>
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
                <ul className="flex flex-col gap-4 mb-8 flex-1 justify-center items-center px-4">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 w-full">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" stroke="url(#pricingIconGradient)" strokeWidth={2} />
                      <span className="text-[13px] leading-tight font-medium text-left text-white/70">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Link
                  to="/inscricao"
                  state={{ selectedTier: tier.id }}
                  className={`w-full py-5 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 shadow-lg ${
                    tier.highlight
                      ? "bg-gradient-to-br from-[#ee6983] to-[#b6304b] hover:brightness-110 text-white shadow-[0_10px_30px_rgba(238,105,131,0.35)] border border-[#ee6983]/40 scale-[1.03]"
                      : "bg-[#ee6983] hover:bg-[#ff7b96] text-white opacity-90 hover:opacity-100"
                  }`}
                >
                  Garantir Participação
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
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
