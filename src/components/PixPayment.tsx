import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Smartphone, AlertCircle, RefreshCw } from "lucide-react";

// Mock PIX key — will be replaced by real Supabase/payment API
const MOCK_PIX_CODE =
  "00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540549.005802BR5925INSTITUTO MULHERES DE SUCESSO6008NATAL/RN62070503***6304ABCD";

const EXPIRY_SECONDS = 15 * 60;

const PixPayment = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXPIRY_SECONDS);
  const [expired, setExpired] = useState(false);

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
    navigator.clipboard.writeText(MOCK_PIX_CODE).then(() => {
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
    { n: "02", text: "Escolha pagar via PIX com QR Code ou chave" },
    { n: "03", text: "Escaneie o QR Code ou cole a chave copiada" },
    { n: "04", text: "Confirme o pagamento de R$ 49,00" },
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
            {expired ? "QR Code expirado" : "QR Code expira em"}
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
            Gerar novo
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
            <div className="relative w-44 h-44 bg-white rounded-2xl p-3 shadow-[0_0_40px_rgba(238,105,131,0.15)]">
              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Corner blocks */}
                <rect x="10" y="10" width="50" height="50" rx="6" fill="#111" />
                <rect x="18" y="18" width="34" height="34" rx="4" fill="white" />
                <rect x="26" y="26" width="18" height="18" rx="2" fill="#111" />

                <rect x="140" y="10" width="50" height="50" rx="6" fill="#111" />
                <rect x="148" y="18" width="34" height="34" rx="4" fill="white" />
                <rect x="156" y="26" width="18" height="18" rx="2" fill="#111" />

                <rect x="10" y="140" width="50" height="50" rx="6" fill="#111" />
                <rect x="18" y="148" width="34" height="34" rx="4" fill="white" />
                <rect x="26" y="156" width="18" height="18" rx="2" fill="#111" />

                {/* Data dots */}
                {[70,80,90,100,110,120,130].map(x =>
                  [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180].map(y => {
                    const on = (x + y + x * y) % 17 < 9;
                    if (!on) return null;
                    if (x < 70 && y < 70) return null;
                    if (x > 130 && y < 70) return null;
                    if (x < 70 && y > 130) return null;
                    return <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1.5" fill="#111" />;
                  })
                )}
              </svg>
              {/* Center logo overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Smartphone className="w-5 h-5 text-[#ee6983]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs text-center">
              Aponte a câmera do seu celular para o QR Code
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="expired"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-44 text-white/20 text-sm"
          >
            QR Code expirado
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIX key copy */}
      <div className="space-y-2">
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.15em]">Ou copie a chave PIX</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 overflow-hidden">
            <p className="text-white/40 text-[11px] font-mono truncate select-all leading-relaxed">
              {MOCK_PIX_CODE.slice(0, 50)}...
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
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="border-t border-white/[0.06] pt-5 space-y-3">
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.15em] mb-4">Como pagar:</p>
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
