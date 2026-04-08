import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProgressSteps from "@/components/ProgressSteps";
import RegistrationForm from "@/components/RegistrationForm";
import OrderSummary from "@/components/OrderSummary";

// This would normally come from a shared state, but for now we calculate it based on the form logic
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ingressoTipo, setIngressoTipo] = useState(location.state?.selectedTier || "profissional");

  const steps = [
    { number: 1, label: "Ingresso" },
    { number: 2, label: "Seus Dados" },
    ...(ingressoTipo !== "profissional" ? [{ number: 3, label: "Documentação" }] : []),
    ...(ingressoTipo === "unifacex" ? [{ number: 4, label: "Doação" }] : []),
    { number: 5, label: "Resumo" }
  ].map((s, i) => ({ ...s, number: i + 1 }));

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ee6983] opacity-[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#850e35] opacity-[0.03] blur-[100px] rounded-full" />
        {/* Subtle grid overlay */}
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
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={1.5} />
            Voltar
          </button>
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo-instituto-trimmed.png" 
              alt="Instituto Mulheres de Sucesso" 
              className="h-10 w-auto object-contain brightness-110" 
            />
          </div>
          <div className="w-12" /> {/* Spacer */}
        </nav>

        {/* Progress - We don't control step here, RegistrationForm does. 
            So we just pass initial state or handle it via a shared context/callback if needed.
            For now, we'll let RegistrationForm render its own ProgressSteps internal to the card for better cohesion.
        */}

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 xl:px-8 pb-12 md:pb-16 pt-8 md:pt-12">
          <div className="max-w-[1200px] mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-8 md:mb-10"
            >
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                Inscrição{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] via-[#f78298] to-[#ee6983]">
                  Página-Empreendedoras
                </span>
              </h1>
              <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] max-w-sm mx-auto font-bold opacity-80">
                — Processo de Credenciamento 2026 —
              </p>
            </motion.div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-6 xl:gap-10 items-start">

              {/* Form card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white/[0.025] border border-white/[0.08] rounded-2xl p-6 md:p-8 overflow-hidden"
              >
                {/* Top glare */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <RegistrationForm onTicketChange={setIngressoTipo} />
              </motion.div>

              {/* Order summary */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:sticky lg:top-8"
              >
                <OrderSummary ingresso_tipo={ingressoTipo} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
