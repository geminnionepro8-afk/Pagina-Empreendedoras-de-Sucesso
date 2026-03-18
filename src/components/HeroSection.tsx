import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8 },
};

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const HeroSection = () => {
  const target = new Date("2026-11-25T08:00:00-03:00");
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      {/* Background Image - Full Size */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="FLFEZTIVAL Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients to darken the left side and bottom to make everything super readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent w-full lg:w-[60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="w-full lg:max-w-[45%] flex flex-col items-start gap-8">
          
          {/* Logo - Standardized */}
          <motion.div {...fadeUp} className="mb-2">
            <span className="text-[28px] font-medium tracking-[0.2em] text-white">
              FLFEZTIVAL
            </span>
          </motion.div>

          <div className="flex flex-col items-start gap-6">
            {/* Badges - Thin outline, transparent */}
            <motion.div {...fadeUp} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-2 rounded-lg border border-white/20 bg-transparent text-[13px] font-medium text-white/90">
                <Calendar className="w-4 h-4 text-[#C16D3A]" />
                25 de novembro
              </div>
              <div className="flex items-center gap-2 px-5 py-2 rounded-lg border border-white/20 bg-transparent text-[13px] font-medium text-white/90">
                <MapPin className="w-4 h-4 text-[#C16D3A]" />
                PUCRS - Porto Alegre/RS
              </div>
            </motion.div>

            {/* Headline - Matched styling and font sizes perfectly to reference */}
            <motion.h1 
              {...fadeUp}
              className="text-[32px] md:text-[40px] lg:text-[46px] leading-[1.1] font-bold text-white uppercase tracking-tight"
            >
              <span className="text-[#DE8A56]">O MAIOR EVENTO</span> DE<br />
              <span className="font-semibold">EMPREENDEDORISMO E</span><br />
              <span className="font-semibold">NEGÓCIOS DO <span className="text-[#DE8A56]">SUL DO PAÍS</span></span>
            </motion.h1>

            {/* Description - Standard thin elegant font */}
            <motion.p 
              {...fadeUp}
              className="text-white/80 text-[15px] md:text-[17px] font-light leading-[1.6] max-w-lg pr-4"
            >
              Um insight pode transformar seu negócio para sempre! Tenha acesso aos maiores empreendedores(as) e empresários(as) do Brasil no FLFEztival 2026.
            </motion.p>

            {/* CTA Button */}
            <motion.div {...fadeUp} className="pt-4">
              <button className="bg-[#00B41E] text-white px-10 py-4 font-bold text-[15px] rounded hover:bg-[#009b1a] transition-all uppercase tracking-wide">
                GARANTIR MINHA VAGA
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Countdown Bar */}
      <div className="bg-[#FF6600] w-full py-5 relative z-20">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-14">
          <span className="text-black font-black text-xl lg:text-2xl italic uppercase tracking-tighter">
            O EVENTO COMEÇA EM:
          </span>
          <div className="flex gap-6 lg:gap-10 tabular-nums">
            {[
              { value: days, label: "Dias" },
              { value: hours, label: "Horas" },
              { value: minutes, label: "Minutos" },
              { value: seconds, label: "Segundos" },
            ].map((item) => (
              <div key={item.label} className="text-center flex items-baseline gap-1.5">
                <span className="text-3xl md:text-5xl font-black text-black leading-none">{String(item.value).padStart(2, "0")}</span>
                <span className="text-black/80 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
