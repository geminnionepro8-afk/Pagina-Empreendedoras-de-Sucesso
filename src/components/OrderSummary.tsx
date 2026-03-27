import { Calendar, MapPin, Sparkles, Clock, Check, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: Calendar, text: "Acesso presencial nos 2 dias de imersão" },
  { icon: MapPin, text: "UNIFACEX — auditório climatizado, Natal/RN" },
  { icon: Sparkles, text: "Palestras, painéis e workshops exclusivos" },
  { icon: Clock, text: "Networking estruturado com mulheres líderes" },
  { icon: Check, text: "Certificado digital de participação" },
];

interface OrderSummaryProps {
  compact?: boolean;
}

const OrderSummary = ({ compact = false }: OrderSummaryProps) => {
  return (
    <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
      {/* Top glare */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ee6983]/40 to-transparent" />
      {/* Pink glow */}
      <div className="absolute -top-20 right-0 w-48 h-48 bg-[#ee6983] opacity-[0.05] blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8 space-y-6">

        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#ee6983]/10 border border-[#ee6983]/25 px-3 py-1.5 rounded-full mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ee6983] animate-pulse" />
            <span className="text-[#ee6983] text-[10px] font-bold uppercase tracking-[0.2em]">Vagas Limitadas</span>
          </div>
          <h3 className="text-white font-black text-base uppercase tracking-wide">Ingresso — Taxa Social</h3>
          <p className="text-white/40 text-xs mt-1">I Fórum de Estética e Performance da Mulher Empreendedora</p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1 pb-1 border-b border-white/8">
          <span className="text-[#ee6983] font-black text-lg leading-none">R$</span>
          <span className="text-white font-black text-5xl leading-none tracking-tighter">49</span>
          <span className="text-white/50 font-bold text-lg leading-tight mb-1">,00</span>
          <span className="text-white/30 text-xs ml-2 mb-1.5">PIX · à vista</span>
        </div>

        {/* Event details */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#ee6983] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-white/70 text-sm font-medium">17 e 18 de Abril de 2025</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#ee6983] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-white/70 text-sm font-medium">UNIFACEX · Natal, RN</span>
          </div>
        </div>

        {/* Benefits */}
        {!compact && (
          <ul className="space-y-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#ee6983]/10 border border-[#ee6983]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <b.icon className="w-3 h-3 text-[#ee6983]" strokeWidth={1.5} />
                </div>
                <p className="text-white/55 text-[13px] leading-relaxed">{b.text}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Security badge */}
        <div className="flex items-center gap-2 text-white/30 text-xs pt-1 border-t border-white/[0.06]">
          <ShieldCheck className="w-4 h-4 text-[#ee6983]/50" strokeWidth={1.5} />
          <span>Ambiente 100% seguro — Dados criptografados</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
