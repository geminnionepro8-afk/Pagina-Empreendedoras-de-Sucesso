import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Instagram, Calendar, Home, Share2 } from "lucide-react";
import ProgressSteps from "@/components/ProgressSteps";

interface RegistrationData {
  nome: string;
  email: string;
  telefone: string;
  instagram: string;
  cpf: string;
  cidade: string;
}

const Success = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<RegistrationData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("inscricao_data");
    if (raw) {
      try { setData(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const selectedTier = (data as any)?.ingresso_tipo || "profissional";
  const steps = [
    { number: 1, label: "Ingresso" },
    { number: 2, label: "Seus Dados" },
    ...(selectedTier !== "profissional" ? [{ number: 3, label: "Documentação" }] : []),
    ...(selectedTier === "unifacex" ? [{ number: 4, label: "Doação" }] : []),
    { number: 5, label: "Pagamento" }
  ].map((s, i) => ({ ...s, number: i + 1 }));

  const tierNames: Record<string, string> = {
    profissional: "Ingresso Profissional",
    estudante: "Estudante Externo",
    unifacex: "Estudante UNIFACEX + Doação"
  };

  const tierPrices: Record<string, string> = {
    profissional: "R$ 147,00",
    estudante: "R$ 73,50",
    unifacex: "R$ 20,00 + 1kg Alimento"
  };

  const firstName = data?.nome?.split(" ")[0] ?? "Bem-vinda";

  const nextSteps = [
    {
      icon: Calendar,
      title: "Salve na agenda",
      desc: "17 e 18 de Abril — UNIFACEX, Natal/RN. Reserve os dois dias!",
    },
    {
      icon: Instagram,
      title: "Siga no Instagram",
      desc: "Acompanhe atualizações exclusivas e conteúdos do evento.",
      cta: { label: "@institutomulheresdesucesso", href: "https://instagram.com/institutomulheresdesucesso" },
    },
    {
      icon: Share2,
      title: "Compartilhe com amigas",
      desc: "Indique o fórum para outras mulheres empreendedoras. As vagas são limitadas!",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#ee6983] opacity-[0.05] blur-[140px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(238,105,131,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(238,105,131,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo-instituto-trimmed.png" 
              alt="Instituto Mulheres de Sucesso" 
              className="h-10 w-auto object-contain brightness-110" 
            />
          </div>
        </nav>

        {/* Progress */}
        <div className="px-4 py-8 sm:py-10">
          <ProgressSteps currentStep={steps.length + 1} steps={steps} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-2xl w-full space-y-10">

            {/* Success icon + title */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="relative inline-flex"
              >
                <div className="w-24 h-24 rounded-full bg-[#ee6983]/15 border border-[#ee6983]/30 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-[#ee6983]" strokeWidth={1.5} />
                </div>
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#ee6983]/30"
                  animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#ee6983]/20"
                  animate={{ scale: [1, 1.3, 1.6], opacity: [0.4, 0.1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-[#ee6983] font-bold text-xs uppercase tracking-[0.3em] mb-3">
                  — Inscrição Confirmada —
                </p>
                <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                  Parabéns,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">
                    {firstName}!
                  </span>
                </h1>
                <p className="text-white/50 text-base mt-4 leading-relaxed max-w-sm mx-auto">
                  Sua vaga no I Fórum de Estética e Performance está garantida. Enviamos os detalhes para o seu e-mail.
                </p>
              </motion.div>
            </div>

            {/* Booking summary card */}
            {data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/40 to-transparent" />
                <div className="p-6 md:p-8">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-bold mb-5">Resumo da inscrição</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { label: "Nome", value: data.nome },
                      { label: "E-mail", value: data.email },
                      { label: "Telefone", value: data.telefone },
                      { label: "Cidade", value: data.cidade },
                      { label: "Ingresso", value: `${tierNames[selectedTier]} — ${tierPrices[selectedTier]}` },
                      { label: "Evento", value: "17 e 18 de Abril · UNIFACEX, Natal/RN" },
                    ].map(item => (
                      <div key={item.label}>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider font-bold mb-0.5">{item.label}</p>
                        <p className="text-white/80 text-sm font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-bold">Próximos passos</p>
              {nextSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                  className="flex items-start gap-4 bg-white/[0.025] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ee6983]/10 border border-[#ee6983]/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-[#ee6983]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{step.title}</p>
                    <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ee6983] text-xs font-bold mt-1 hover:underline inline-block"
                      >
                        {step.cta.label}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Back to home */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-sm font-medium group"
              >
                <Home className="w-4 h-4 group-hover:scale-90 transition-transform" strokeWidth={1.5} />
                Voltar à página inicial
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
