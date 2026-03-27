import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import ProgressSteps from "@/components/ProgressSteps";
import OrderSummary from "@/components/OrderSummary";
import PixPayment from "@/components/PixPayment";

const Checkout = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ nome: string } | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("inscricao_data");
    if (!raw) {
      navigate("/inscricao", { replace: true });
      return;
    }
    try {
      setUserData(JSON.parse(raw));
    } catch {
      navigate("/inscricao", { replace: true });
    }
  }, [navigate]);

  const handleConfirm = () => {
    setConfirming(true);
    // Simulates payment processing (will be replaced by Supabase webhook verification)
    setTimeout(() => {
      navigate("/confirmacao");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ee6983] opacity-[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#850e35] opacity-[0.03] blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(238,105,131,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(238,105,131,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top nav */}
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-white/[0.06]">
          <button
            onClick={() => navigate("/inscricao")}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={1.5} />
            Voltar
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ee6983] animate-pulse" />
            <span className="text-[#ee6983] font-bold text-xs uppercase tracking-[0.2em] hidden sm:block">
              Instituto Mulheres de Sucesso
            </span>
          </div>
          <div className="w-12" />
        </nav>

        {/* Progress */}
        <div className="px-4 py-8 sm:py-10">
          <ProgressSteps currentStep={2} />
        </div>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-10"
            >
              <p className="text-[#ee6983] font-bold text-xs uppercase tracking-[0.3em] mb-3">
                — Etapa 2 de 3 —
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {userData?.nome ? (
                  <>Quase lá,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">
                      {userData.nome.split(" ")[0]}!
                    </span>
                  </>
                ) : (
                  <>Pagamento via{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">
                      PIX
                    </span>
                  </>
                )}
              </h1>
              <p className="text-white/40 text-sm mt-3 max-w-sm mx-auto">
                Realize o pagamento via PIX para confirmar sua inscrição.
              </p>
            </motion.div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10 items-start">

              {/* Payment card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white/[0.025] border border-white/[0.08] rounded-2xl overflow-hidden"
              >
                {/* Top glare */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent" />

                {/* PIX label */}
                <div className="px-6 md:px-8 pt-6 pb-5 border-b border-white/[0.06] flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#ee6983]/10 border border-[#ee6983]/25 px-3 py-2 rounded-lg">
                    <Zap className="w-4 h-4 text-[#ee6983]" strokeWidth={1.5} />
                    <span className="text-[#ee6983] font-black text-xs uppercase tracking-wider">PIX</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Pagamento via PIX</p>
                    <p className="text-white/35 text-xs">Aprovação instantânea</p>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <PixPayment />
                </div>

                {/* Confirm button */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={handleConfirm}
                    disabled={confirming}
                    className={`btn-matte w-full text-white py-4 px-8 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                      confirming ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {confirming ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verificando Pagamento...
                      </>
                    ) : (
                      "Já Realizei o Pagamento"
                    )}
                  </button>
                  <p className="text-center text-white/20 text-[11px] mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
                    Sua inscrição só será confirmada após a verificação do pagamento
                  </p>
                </div>
              </motion.div>

              {/* Order summary */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:sticky lg:top-8 space-y-4"
              >
                <OrderSummary compact />

                {/* Payer info */}
                {userData && (
                  <div className="bg-white/[0.025] border border-white/[0.08] rounded-2xl p-5 space-y-1">
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Inscrita como</p>
                    {Object.entries(userData as Record<string, string>)
                      .filter(([k]) => ["nome", "email"].includes(k))
                      .map(([k, v]) => (
                        <p key={k} className="text-white/60 text-sm">
                          <span className="text-white/30 text-xs mr-2 capitalize">{k}:</span>
                          {v}
                        </p>
                      ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
