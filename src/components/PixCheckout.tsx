import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronDown, CheckCircle2, ShieldCheck, MapPin, Building, GraduationCap, HeartHandshake } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(initialTier);
  const [copied, setCopied] = useState(false);
  const [sessionId] = useState(() => {
    try { return crypto.randomUUID(); } catch(e) { return Math.random().toString(36).substring(2); }
  });

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const enviarEvento = async (tipo_evento: string, categoria: string | undefined) => {
    try {
      const metadata = {
        userAgent: window.navigator.userAgent,
        timestamp: new Date().toISOString()
      };
      
      // Async fire and forget tracking
      supabase.from("logs_interacoes").insert([
        {
          tipo_evento,
          categoria: categoria || 'desconhecido',
          session_id: sessionId,
          metadata
        }
      ]).then(); // explicitly avoiding await to not block UI
    } catch (error) {
      console.error("Erro interno no pipeline de tracking:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      enviarEvento('copiou_pix', selectedPlan?.id);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const selectedPriceStr = selectedPlan?.priceStr || "0,00";
  const wppMessage = `Olá Lúcia!\n\nSegue o meu comprovante de pagamento via PIX do Fórum.\n\nPlano: ${selectedPlan?.whatsappText}\nValor: R$ ${selectedPlan?.priceStr}${selectedPlan?.sufix ? ` ${selectedPlan.sufix}` : ""}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(wppMessage)}`;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 pb-12">
      {/* Etapa 1: Seleção do Plano */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#ee6983]/20 text-[#ee6983] flex items-center justify-center font-black text-xs border border-[#ee6983]/30">
            1
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
            Selecione seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] via-[#ffb1c1] to-[#ee6983]">Plano</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-2xl flex flex-col items-center justify-center p-6 border cursor-pointer overflow-hidden transition-all duration-300 ${
                selectedPlanId === plan.id
                  ? "bg-gradient-to-br from-[#ee6983] to-[#b6304b] border-[#ee6983]/60 shadow-[0_10px_30px_rgba(238,105,131,0.3)] scale-[1.02] z-10"
                  : plan.highlight
                  ? "bg-[#141213] border-[#ee6983]/30 hover:border-[#ee6983]/60 hover:scale-[1.01]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:scale-[1.01]"
              }`}
            >
              {selectedPlanId === plan.id && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                  <CheckCircle2 fill="#ee6983" className="w-5 h-5 text-white" strokeWidth={1} />
                </div>
              )}
              
              <div className={`mb-3 w-12 h-12 rounded-full flex items-center justify-center ${selectedPlanId === plan.id ? "bg-white/20" : "bg-white/5"} transition-colors`}>
                <plan.icon className={`w-6 h-6 ${selectedPlanId === plan.id ? "text-white" : "text-[#ee6983]"}`} strokeWidth={1.5} />
              </div>
              
              <h3 className={`text-sm font-black uppercase tracking-wider mb-1 text-center ${selectedPlanId === plan.id ? "text-white" : "text-white/90"}`}>
                {plan.name}
              </h3>
              <p className={`text-[10px] uppercase font-bold text-center tracking-[0.15em] mb-4 ${selectedPlanId === plan.id ? "text-white/70" : "text-white/40"}`}>
                {plan.desc}
              </p>
              
              <div className="flex items-end justify-center gap-1">
                 <span className={`font-bold text-sm mb-1 ${selectedPlanId === plan.id ? "text-white/80" : "text-[#ee6983]"}`}>R$</span>
                 <span className={`text-4xl font-black tracking-tight leading-none ${selectedPlanId === plan.id ? "text-white" : "text-white"}`}>{plan.priceStr.split(',')[0]}</span>
                 <span className={`font-bold text-sm mb-1 ${selectedPlanId === plan.id ? "text-white/80" : "text-white/50"}`}>,{plan.priceStr.split(',')[1]}</span>
              </div>
              
              {plan.sufix && (
                <p className={`text-[10px] font-black uppercase mt-2 tracking-widest ${selectedPlanId === plan.id ? "text-white/90" : "text-[#ee6983]"}`}>{plan.sufix}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Resumo do Plano Expandido */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#121011] border border-[#ee6983]/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
                  
                  <div className="flex-1">
                     <p className="text-[#ee6983] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Plano Escolhido</p>
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        {selectedPlan.name}
                        {selectedPlan.id === "profissional" && <span className="bg-[#ee6983]/20 text-[#ee6983] text-[10px] font-black px-2 py-1 rounded-md tracking-widest border border-[#ee6983]/30">MAIS VENDIDO</span>}
                     </h3>
                  </div>

                  <div className="bg-[#0a0909] py-3 px-6 rounded-xl border border-white/5 text-center flex-shrink-0 min-w-[200px]">
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest block mb-1">Total a pagar:</span>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-[#ee6983] font-bold">R$</span>
                      <span className="text-3xl font-black text-white">{selectedPlan.priceStr}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ee6983] shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-white/60 text-sm font-medium">Bônus inclusos (Certificado + Acesso)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-white/60 text-sm font-medium">Sistema de credenciamento oficial</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#ee6983] shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-white/60 text-sm font-medium">Presencial UNIFACEX 17 e 18 de Abril</p>
                  </div>
                  {selectedPlan.id === "unifacex" && (
                     <div className="flex items-start gap-3 col-span-1 md:col-span-2 mt-2 bg-[#ee6983]/10 p-3 rounded-lg border border-[#ee6983]/20">
                      <HeartHandshake className="w-5 h-5 text-[#ee6983] shrink-0 mt-0.5" strokeWidth={2} />
                      <p className="text-[#ee6983] text-sm font-bold">Lembrete: Entrega obrigatória de 1kg de alimento no credenciamento físico.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {selectedPlan && (
        <>
          {/* Etapa 2: Copiar PIX */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#ee6983]/20 text-[#ee6983] flex items-center justify-center font-black text-xs border border-[#ee6983]/30">
                2
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                Copie a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] via-[#ffb1c1] to-[#ee6983]">Chave PIX</span>
              </h2>
            </div>
            
            <div className="bg-[#121011] border border-[#ee6983]/20 rounded-2xl p-6 md:p-8 flex flex-col items-center relative overflow-hidden">
               {/* Resplendor fundo */}
               <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/60 to-transparent" />
               <div className="absolute -top-10 scale-150 right-0 w-64 h-64 bg-[#ee6983]/10 blur-[80px] rounded-full pointer-events-none" />

               <p className="text-white/60 text-center text-sm md:text-base font-medium max-w-lg mb-8">
                 Clique no botão abaixo para copiar nossa chave PIX (CNPJ). Em seguida, abra o aplicativo do seu banco e cole-a na área de pagamento (PIX Copia e Cola ou Transferir).
               </p>

               <div className="w-full max-w-sm space-y-3 relative z-10">
                  <div className="bg-[#050505] border border-white/10 rounded-xl p-4 flex flex-col items-center">
                    <span className="text-[#ee6983] text-[9px] font-black uppercase tracking-[0.4em] mb-2 opacity-80">CHAVE PIX CNPJ</span>
                    <span className="text-2xl md:text-3xl font-black tracking-tighter text-white font-mono">{PIX_KEY}</span>
                    <span className="text-white/40 text-[11px] font-medium mt-1">Instituto Mulheres de Sucesso Brasileiras</span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className={`w-full py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                      copied
                        ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/25"
                        : "bg-gradient-to-r from-[#ee6983] to-[#d64765] hover:brightness-110 text-white shadow-[#ee6983]/20 hover:-translate-y-1"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" strokeWidth={3} />
                        Copiado! Agora vá pro banco
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" strokeWidth={2.5} />
                        Copiar Chave PIX
                      </>
                    )}
                  </button>
               </div>
               
               <div className="mt-8 flex flex-col items-center">
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">Pague exatos</span>
                  <div className="flex items-center gap-1.5 shadow-2xl bg-black px-6 py-2 rounded-lg border border-[#ee6983]/20">
                     <span className="text-[#ee6983] font-black text-lg">R$</span>
                     <span className="text-white font-black text-4xl tracking-tighter">{selectedPlan.priceStr}</span>
                  </div>
               </div>
               
            </div>
          </section>

          {/* Etapa 3: Enviar Comprovante */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#ee6983]/20 text-[#ee6983] flex items-center justify-center font-black text-xs border border-[#ee6983]/30">
                3
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                Envie o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] via-[#ffb1c1] to-[#ee6983]">Comprovante</span>
              </h2>
            </div>

            <div className="bg-[#121011] border border-white/5 rounded-2xl p-6 md:p-8 relative">
               <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-bold text-white mb-3">Quase lá! Valide sua vaga com a organização.</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xl">
                    Após realizar a transferência no valor exato do plano escolhido, clique no botão para mandar o comprovante diretamente para a <strong className="text-white">Lúcia no WhatsApp</strong>. Sem esse envio, a sua credencial não é emitida.
                  </p>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => enviarEvento('clicou_whatsapp', selectedPlan?.id)}
                    className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-10 py-5 rounded-xl font-black text-[13px] uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_rgba(37,211,102,0.25)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,211,102,0.35)]"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    ENVIAR COMPROVANTE VIA WHATSAPP
                  </a>
               </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PixCheckout;
