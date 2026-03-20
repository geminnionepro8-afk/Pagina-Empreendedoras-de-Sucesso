import { motion } from "framer-motion";
import { Check, ShieldCheck, Clock, MapPin, Calendar, Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const benefits = [
  { icon: Calendar, text: "Acesso presencial nos 2 dias de imersão" },
  { icon: MapPin, text: "Auditório climatizado do UNIFACEX, Natal/RN" },
  { icon: Sparkles, text: "Palestras, painéis e workshops exclusivos" },
  { icon: Clock, text: "Networking estruturado com mulheres líderes" },
  { icon: Check, text: "Certificado digital de participação" },
];

const PricingSection = () => (
  <section className="bg-background py-24 relative overflow-hidden">
    {/* Deep background */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[#150810] to-background pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ee6983] opacity-[0.04] blur-[130px] rounded-full pointer-events-none" />

    <div className="section-container relative z-10">
        <div className="text-center mb-16 space-y-3">
          <p className="text-[#c9687e] font-bold text-xs uppercase tracking-[0.3em] mb-5">— Acesso Garantido —</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Sua Vaga no Fórum <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">de Transformação</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base leading-relaxed pt-1">
            Uma taxa social que remove a barreira financeira para que seu único foco seja a transformação.
          </p>
        </div>

      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="relative">
          
          {/* === 3D TICKET COMPONENT === */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-0 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

            {/* Left Panel — Benefits */}
            <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 md:p-10 flex flex-col gap-7">
              {/* Glare */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">O que está incluído</p>
                <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wide">Ingresso — Taxa Social</h3>
              </div>

              <ul className="flex flex-col gap-5 flex-1">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-[5%] bg-[#ee6983]/10 border border-[#ee6983]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <b.icon className="w-4 h-4 text-[#ee6983]" strokeWidth={1.5} />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed pt-1">{b.text}</p>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-white/30 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#ee6983]/60" strokeWidth={1.5} />
                Pagamento 100% seguro via Kiwify / PIX
              </div>
            </div>

            {/* Center Divider — Ticket Perforation Effect */}
            <div className="hidden lg:flex flex-col items-center justify-between py-6 w-10 bg-[#0a0a0a] relative z-10">
              {/* Top notch */}
              <div className="w-5 h-5 rounded-full bg-background -ml-2.5" />
              {/* Dashed line */}
              <div className="flex-1 border-l-2 border-dashed border-white/10 mx-auto my-4" />
              {/* Bottom notch */}
              <div className="w-5 h-5 rounded-full bg-background -ml-2.5" />
            </div>

            {/* Right Panel — Price & CTA */}
            <div className="relative bg-gradient-to-br from-[#1a0b13] to-[#0a0a0a] border border-white/8 p-8 md:p-10 flex flex-col justify-between gap-8">
              {/* Glare */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent" />
              {/* Decorative background diagonal */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ee6983]/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Investimento</p>
                
                {/* Price Display */}
                <div className="flex items-start gap-1 mb-1">
                  <span className="text-[#ee6983] font-black text-2xl mt-2">R$</span>
                  <span className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none tabular-nums">49</span>
                  <span className="text-white/40 font-bold text-xl mt-3">,00</span>
                </div>
                <p className="text-white/30 text-xs tracking-wide mb-8">PIX • Única parcela</p>

                {/* Live counter badge */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[5%] px-3 py-2 w-fit mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#ee6983] animate-pulse" />
                  <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Vagas Limitadas</span>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <button className="btn-matte group relative overflow-hidden w-full text-white py-5 px-8 rounded-[5%] font-black text-sm md:text-base uppercase tracking-widest">
                  <span className="relative z-10">GARANTIR MINHA VAGA</span>
                </button>
                <p className="text-center text-white/25 text-[11px] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
                  Ambiente seguro — Kiwify
                </p>
              </div>
            </div>

          </div>
          {/* === END 3D TICKET === */}

        </motion.div>
      </div>
    </div>
  </section>
);

export default PricingSection;
