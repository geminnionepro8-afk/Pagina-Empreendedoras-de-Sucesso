import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Smartphone, AlertCircle, RefreshCw } from "lucide-react";

// Mock PIX key — will be replaced by real API or static dict
const MOCK_PIX_CODE = "59.418.846/0001-99";

const EXPIRY_SECONDS = 15 * 60;

const PRICES: Record<string, string> = {
  profissional: "147,00",
  estudante: "73,50",
  unifacex: "20,00"
};

const PixPayment = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXPIRY_SECONDS);
  const [expired, setExpired] = useState(false);
  const [price, setPrice] = useState("147,00");

  useEffect(() => {
    try {
      const dataStr = sessionStorage.getItem("inscricao_data");
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data.ingresso_tipo && PRICES[data.ingresso_tipo]) {
          setPrice(PRICES[data.ingresso_tipo]);
        }
      }
    } catch(e) { /* ignore */ }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleCopy = () => {
    navigator.clipboard.writeText("59418846000199").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleRefresh = () => {
    setTimeLeft(EXPIRY_SECONDS);
    setExpired(false);
  };

  const steps = [
    { n: "01", text: "Abra o app do seu banco no celular" },
    { n: "02", text: "Vá para Área PIX e escolha pagar via CNPJ" },
    { n: "03", text: "Cole a chave CNPJ copiada abaixo" },
    { n: "04", text: `Transfira exatamente o valor de: R$ ${price}` },
  ];

  return (
    <div className="space-y-6">
      {/* Expiry countdown */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
        expired ? "border-red-500/30 bg-red-500/5" : timeLeft < 120 ? "border-amber-500/30 bg-amber-500/5" : "border-white/8 bg-white/[0.02]"
      }`}>
        <div className="flex items-center gap-2">
          <AlertCircle className={`w-4 h-4 ${expired ? "text-red-400" : timeLeft < 120 ? "text-amber-400" : "text-white/40"}`} strokeWidth={1.5} />
          <span className={`text-xs font-medium ${expired ? "text-red-400" : timeLeft < 120 ? "text-amber-400" : "text-white/40"}`}>
            {expired ? "Pagamento pendente" : "Aguardando pagamento"}
          </span>
        </div>
        {!expired ? (
          <span className={`font-black text-sm tabular-nums ${timeLeft < 120 ? "text-amber-400" : "text-white/70"}`}>
            {minutes}:{seconds}
          </span>
        ) : (
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-[#ee6983] text-xs font-bold hover:text-[#ee6983]/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={2} />
            Atualizar Status
          </button>
        )}
      </div>

      {/* QR Code */}
      <AnimatePresence mode="wait">
        {!expired ? (
          <motion.div
            key="qr"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            {/* QR visual mock */}
            <div className="relative w-44 h-44 bg-white rounded-2xl p-3 shadow-[0_0_40px_rgba(238,105,131,0.15)] flex flex-col justify-center items-center">
               <div className="text-black font-black flex flex-col items-center justify-center gap-1">
                 <span className="text-xl">PIX CNPJ</span>
                 <span className="text-3xl tracking-tighter shadow-sm">{MOCK_PIX_CODE}</span>
               </div>
              {/* Center logo overlay */}
              <div className="absolute inset-x-0 -bottom-4 flex items-center justify-center">
                <div className="w-10 h-10 bg-[#151515] border border-white/10 rounded-lg flex items-center justify-center shadow-lg">
                  <Smartphone className="w-5 h-5 text-[#ee6983]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs text-center mt-3">
              Instituto Mulheres de Sucesso Brasileiras
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="expired"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-44 text-white/20 text-sm"
          >
            Tempo esgotado para esta guia
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIX key copy */}
      <div className="space-y-2">
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.15em]">COPIE A CHAVE PIX (CNPJ)</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 overflow-hidden">
            <p className="text-white/60 text-lg font-mono font-bold truncate select-all leading-relaxed">
              {MOCK_PIX_CODE}
            </p>
          </div>
          <button
            onClick={handleCopy}
            disabled={expired}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-300 ${
              copied
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                : expired
                ? "bg-white/[0.02] border border-white/5 text-white/20 cursor-not-allowed"
                : "bg-[#ee6983]/15 border border-[#ee6983]/30 text-[#ee6983] hover:bg-[#ee6983]/25 cursor-pointer"
            }`}
          >
            {copied ? <Check className="w-4 h-4" strokeWidth={2} /> : <Copy className="w-4 h-4" strokeWidth={1.5} />}
            {copied ? "Copiado!" : "Copiar Chave"}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="border-t border-white/[0.06] pt-5 space-y-3">
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.15em] mb-4">Como confirmar:</p>
        {steps.map(s => (
          <div key={s.n} className="flex items-start gap-3">
            <span className="text-[#ee6983]/60 font-black text-xs leading-none mt-0.5 w-5 flex-shrink-0">{s.n}</span>
            <p className="text-white/55 text-sm leading-snug">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixPayment;
