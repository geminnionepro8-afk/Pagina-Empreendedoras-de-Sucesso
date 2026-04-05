import { motion } from "framer-motion";
import laptopImg from "@/assets/laptop_support.png";
import cardImg from "@/assets/service-card.png";
import { MessageCircle, Diamond } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const InstitutionalSection = () => {
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
          className="max-w-[1200px] min-h-[650px] mx-auto rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative flex items-center overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center w-full h-full">
            
            {/* LADO ESQUERDO: TEXTO E SUPORTE */}
            <div className="p-8 md:p-16 flex flex-col gap-10 relative z-20">
              <div className="space-y-6">
                {/* Etiqueta */}
                <div className="flex items-center gap-3">
                  <Diamond className="w-3.5 h-3.5 text-[#ee6983]" strokeWidth={2} />
                  <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
                    Suporte Personalizado
                  </p>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-5xl font-light text-white uppercase tracking-tighter leading-tight">
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
                className="w-[350px] h-[344px] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-[20px] flex flex-col items-start gap-6 group hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-full h-[180px] rounded-[16px] overflow-hidden shrink-0 border border-white/10 group-hover:scale-[1.02] transition-transform">
                  <img src={cardImg} alt="Atendimento" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col gap-6 text-left w-full">
                  <h3 className="text-white font-bold text-[15px] leading-tight uppercase tracking-widest">
                    SUPORTE HUMANO IMEDIATO
                  </h3>
                  <a 
                    href="https://wa.me/558499912061" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-[#ee6983] hover:bg-[#ff7c96] text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 px-8 rounded-xl transition-all flex items-center justify-center sm:justify-start gap-2 shadow-lg shadow-[#ee6983]/20 w-fit"
                  >
                    <MessageCircle className="w-4 h-4" />
                    CHAMAR AGORA
                  </a>
                </div>
              </motion.div>
            </div>

            {/* LADO DIREITO: IMAGEM LAPTOP PNG */}
            <div className="relative h-full flex items-center justify-end">
              
              {/* Símbolo de Fundo Acinzentado Atrás do Notebook */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[-20%] w-[800px] h-[800px] pointer-events-none z-0 flex items-center justify-center opacity-[0.06] text-gray-400 select-none">
                <MessageCircle className="w-full h-full" strokeWidth={0.5} />
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 150, scale: 0.9 }}
                whileInView={{ opacity: 1, x: -100, scale: 1.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full flex justify-end"
              >
                <img 
                  src={laptopImg} 
                  alt="Atendimento WhatsApp" 
                  className="w-full max-w-[1100px] h-auto object-contain" 
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
