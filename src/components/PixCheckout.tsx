import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, CheckCircle2, ShieldCheck, MapPin, Building, GraduationCap, HeartHandshake, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const PIX_KEY = "59.418.846/0001-99";
const WHATSAPP_NUMBER = "558498682061";

const plans = [
  {
    id: "profissional",
    name: "Profissional",
    basePrice: 147.0,
    priceStr: "147,00",
    sufix: "",
    icon: Building,
    highlight: true,
    desc: "Experiência completa de imersão",
    whatsappText: "Plano Profissional"
  },
  {
    id: "estudante",
    name: "Estudante Externo",
    basePrice: 73.5,
    priceStr: "73,50",
    sufix: "",
    icon: GraduationCap,
    highlight: false,
    desc: "Para estudantes de outras instituições",
    whatsappText: "Plano Estudante"
  },
  {
    id: "unifacex",
    name: "Estudante UNIFACEX",
    basePrice: 20.0,
    priceStr: "20,00",
    sufix: "+ 1kg Alimento",
    icon: HeartHandshake,
    highlight: false,
    desc: "Taxa social especial",
    whatsappText: "Plano Estudante UNIFACEX"
  }
];

const PixCheckout = ({ initialTier = "profissional" }: { initialTier?: string }) => {
  const { data: configs } = useSiteConfig();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(initialTier);
  const [userName, setUserName] = useState("");
  const [copied, setCopied] = useState(false);
  const [sessionId] = useState(() => {
    try { return crypto.randomUUID(); } catch(e) { return Math.random().toString(36).substring(2); }
  });

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const enviarEvento = async (tipo_evento: string, categoria: string | undefined) => {
    try {
      const metadata = {
        userAgent: window.navigator.userAgent,
        timestamp: new Date().toISOString(),
        userName: userName || 'Anônimo'
      };
      
      supabase.from("logs_interacoes").insert([
        {
          tipo_evento,
          categoria: categoria || 'desconhecido',
          session_id: sessionId,
          metadata
        }
      ]).then();
    } catch (error) {
      console.error("Erro interno no pipeline de tracking:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      enviarEvento('intent_pix', selectedPlan?.id);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePlanSelection = (id: string) => {
    setSelectedPlanId(id);
    setCurrentStep(2);
    // Smooth scroll to top of checkout
    const element = document.getElementById('checkout-wizard');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const selectedPriceStr = selectedPlan?.priceStr || "0,00";
  const wppMessage = `Olá Lúcia! Meu nome é ${userName}.\n\nSegue o meu comprovante de pagamento via PIX do Fórum.\n\nPlano: ${selectedPlan?.whatsappText}\nValor: R$ ${selectedPlan?.priceStr}${selectedPlan?.sufix ? ` ${selectedPlan.sufix}` : ""}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(wppMessage)}`;

  const stepVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
    transition: { duration: 0.3 }
  };

  return (
    <div id="checkout-wizard" className="w-full max-w-2xl mx-auto space-y-6 pb-12 min-h-[500px] scroll-mt-24">
      {/* Definições de Gradiente SVG para Ícones */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="checkoutIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#ffcce0" offset="0%" />
            <stop stopColor="#ee6983" offset="50%" />
            <stop stopColor="#9b2d41" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Logo Dinâmico do Checkout */}
      {configs?.checkout_logo && (
        <div className="flex justify-center mb-6">
          <img 
            src={configs.checkout_logo} 
            alt="Logo Checkout" 
            className="h-16 md:h-20 w-auto object-contain brightness-110 drop-shadow-[0_0_15px_rgba(238,105,131,0.2)]"
          />
        </div>
      )}

      {/* Progress Circles */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              currentStep >= s ? "bg-[#ee6983] text-white shadow-[0_0_15px_rgba(238,105,131,0.3)]" : "bg-white/5 text-white/20 border border-white/10"
            }`}>
                {currentStep > s ? <Check className="w-4 h-4" strokeWidth={3} /> : s}
            </div>
            {s < 3 && <div className={`w-8 h-[2px] mx-1 ${currentStep > s ? "bg-[#ee6983]" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.section key="step1" {...stepVariants} className="space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                Selecione seu <span className="text-[#ee6983]">Plano</span>
              </h2>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Escolha uma categoria para avançar</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePlanSelection(plan.id)}
                  className={`relative rounded-2xl flex flex-col items-center justify-center p-4 md:p-5 border cursor-pointer overflow-hidden transition-all duration-500 ${
                    selectedPlanId === plan.id
                      ? "bg-gradient-to-br from-[#ee6983] to-[#b6304b] border-[#ee6983]/60 shadow-[0_15px_30px_rgba(238,105,131,0.25)] ring-1 ring-white/20"
                      : "bg-[#0c0c0c] border-white/5 hover:border-[#ee6983]/40"
                  }`}
                >
                  <div className={`mb-3 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-md ${
                    selectedPlanId === plan.id 
                      ? "bg-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]" 
                      : "bg-white/[0.03] border border-white/10 group-hover:border-[#ee6983]/30"
                  }`}>
                    <plan.icon 
                      className="w-5 h-5 md:w-5.5 md:h-5.5 transition-colors duration-500" 
                      stroke={selectedPlanId === plan.id ? "white" : "url(#checkoutIconGradient)"} 
                      strokeWidth={selectedPlanId === plan.id ? 2 : 1.5} 
                    />
                  </div>
                  
                  <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-center text-white/90">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-end justify-center gap-1 my-3">
                     <span className={`font-bold text-xs mb-1 transition-colors ${selectedPlanId === plan.id ? "text-white/80" : "text-[#ee6983]"}`}>R$</span>
                     <span className="text-3xl md:text-3xl font-black text-white leading-none tracking-tighter">{plan.priceStr.split(',')[0]}</span>
                     <span className={`font-bold text-xs mb-1 transition-colors ${selectedPlanId === plan.id ? "text-white/40" : "text-white/30"}`}>,{plan.priceStr.split(',')[1]}</span>
                  </div>
                  
                  <p className={`text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-center leading-tight transition-colors ${
                    selectedPlanId === plan.id ? "text-white/70" : "text-white/30"
                  }`}>
                    {plan.desc}
                  </p>

                  {selectedPlanId === plan.id && (
                    <motion.div 
                      layoutId="selectedGlow"
                      className="absolute inset-0 bg-white/5 pointer-events-none"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {currentStep === 2 && selectedPlan && (
          <motion.section key="step2" {...stepVariants} className="space-y-6">
            <button onClick={() => setCurrentStep(1)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Voltar
            </button>

            <div className="bg-[#121011] border border-[#ee6983]/20 rounded-2xl p-8 flex flex-col items-center relative overflow-hidden">
               <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/60 to-transparent" />
               
               <div className="text-center mb-8">
                 <h2 className="text-xl font-black text-white uppercase tracking-tighter">Pagamento via <span className="text-[#ee6983]">PIX</span></h2>
                 <p className="text-white/40 text-xs mt-2">Copie a chave CNPJ e pague o valor do plano {selectedPlan.name}</p>
               </div>

               <div className="w-full max-w-sm space-y-4">
                  <div className="bg-black/50 border border-white/10 rounded-xl p-5 flex flex-col items-center">
                    <span className="text-[#ee6983] text-[9px] font-black uppercase tracking-[0.4em] mb-2 opacity-80">CHAVE PIX CNPJ</span>
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-mono">{PIX_KEY}</span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                      copied ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    {copied ? <><Check className="w-4 h-4" strokeWidth={3} /> Chave Copiada!</> : <><Copy className="w-4 h-4" /> Copiar Chave PIX</>}
                  </button>

                  <div className="pt-6 border-t border-white/5 flex flex-col items-center">
                    <span className="text-white/40 text-[10px] uppercase font-black mb-1">Total a Pagar</span>
                    <div className="text-4xl font-black text-white tracking-tighter">
                      <span className="text-[#ee6983] text-lg mr-1 font-bold">R$</span>{selectedPlan.priceStr}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full mt-6 bg-gradient-to-r from-[#ee6983] to-[#d64765] hover:brightness-110 text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group transition-all shadow-xl"
                  >
                    Já Paguei, Continuar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
            
            <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ee6983]" />
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Garantido</span>
                </div>
            </div>
          </motion.section>
        )}

        {currentStep === 3 && selectedPlan && (
          <motion.section key="step3" {...stepVariants} className="space-y-6">
            <button onClick={() => setCurrentStep(2)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Voltar ao PIX
            </button>

            <div className="bg-[#121011] border border-white/10 rounded-2xl p-10 text-center relative overflow-hidden">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Validar <span className="text-[#25D366]">Comprovante</span></h2>
              <p className="text-white/50 text-xs mb-8 max-w-xs mx-auto">Informe seu nome completo para emissão da credencial {selectedPlan.name}.</p>

              <div className="w-full max-w-sm mx-auto space-y-6">
                <div className="text-left">
                  <label className="text-white/40 text-[9px] uppercase font-black tracking-widest ml-1 mb-2 block">Nome Completo</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Sua Identificação"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#ee6983]/50 outline-none transition-all font-medium text-sm"
                  />
                </div>

                <button
                  disabled={userName.trim().length < 3}
                  onClick={() => {
                    enviarEvento('intent_whatsapp', selectedPlan.id);
                    window.open(whatsappUrl, '_blank');
                  }}
                  className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl ${
                    userName.trim().length >= 3 ? "bg-[#25D366] hover:bg-[#20bd5a] text-white" : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  VALIDAR COMPROVANTE
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixCheckout;
