import { useState } from "react";
import { motion } from "framer-motion";
import laptopImg from "@/assets/laptop_support.png";
import cardImg from "@/assets/service-card.png";
import { MessageCircle } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const InstitutionalSection = () => {
  const [laptopLoaded, setLaptopLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);

  return (
    <section id="atendimento" className="bg-[#080808] py-12 md:py-16 relative overflow-hidden">
      {/* Linha Separadora Sutil */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />

      <div className="section-container relative z-10 px-5">
        {/* Card Mestre (Big Card) - Dimensões Master 1200x650 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1200px] min-h-[min(650px,85vh)] mx-auto rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative flex items-center overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center w-full h-full">
            
            {/* LADO ESQUERDO: TEXTO E SUPORTE */}
            <div className="p-8 md:p-12 xl:p-16 flex flex-col gap-8 xl:gap-10 relative z-20">
              <div className="space-y-6">
                {/* Etiqueta */}
                <SectionLabel text="Suporte Personalizado" />

                <h2 className="text-[34px] md:text-5xl lg:text-4xl xl:text-5xl font-light text-white uppercase tracking-tighter leading-tight">
                  Tire suas dúvidas <br />
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                    e garanta sua vaga!
                  </span>
                </h2>
              </div>

              {/* Card de Foco (Suporte) - Proporção 350x344 Vertical Alinhado à Esquerda */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-[320px] xl:max-w-[350px] aspect-[350/344] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 xl:p-6 rounded-[20px] flex flex-col items-start gap-5 xl:gap-6 group hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className={`w-full aspect-video rounded-[16px] overflow-hidden shrink-0 border border-white/10 relative ${!cardLoaded ? 'img-skeleton' : ''}`}>
                  <img 
                    src={cardImg} 
                    alt="Atendimento" 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.05] ${cardLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`} 
                    onLoad={() => setCardLoaded(true)}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="flex flex-col gap-6 text-left w-full">
                  <h3 className="text-white font-bold text-[13px] xl:text-[15px] leading-tight uppercase tracking-widest">
                    SUPORTE HUMANO IMEDIATO
                  </h3>
                  <a 
                    href="https://wa.me/558498682061" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-[#ee6983] hover:bg-[#ff7c96] text-white text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 px-6 xl:py-4 xl:px-8 rounded-xl transition-all flex items-center justify-center sm:justify-start gap-2 shadow-lg shadow-[#ee6983]/20 w-fit"
                  >
                    <MessageCircle className="w-4 h-4" />
                    CHAMAR AGORA
                  </a>
                </div>
              </motion.div>
            </div>

            {/* LADO DIREITO: IMAGEM LAPTOP PNG (HIDDEN ON MOBILE) */}
            <div className="relative h-full hidden lg:flex items-center justify-end">
              
              {/* Símbolo de Fundo Acinzentado Atrás do Notebook */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[-20%] w-[800px] h-[800px] pointer-events-none z-0 flex items-center justify-center opacity-[0.06] text-gray-400 select-none">
                <MessageCircle className="w-full h-full" strokeWidth={0.5} />
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 150, scale: 0.9 }}
                whileInView={{ opacity: 1, x: -50, scale: 1.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative z-10 w-full flex justify-end ${!laptopLoaded ? 'img-skeleton rounded-2xl mx-12' : ''}`}
              >
                <img 
                  src={laptopImg} 
                  alt="Atendimento WhatsApp" 
                  className={`w-full max-w-[900px] xl:max-w-[1100px] h-auto object-contain transition-all duration-1000 ${laptopLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-95'}`} 
                  onLoad={() => setLaptopLoaded(true)}
                  loading="eager"
                  fetchPriority="high"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                    maskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
                  }}
                />
              </motion.div>
            </div>


          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalSection;
