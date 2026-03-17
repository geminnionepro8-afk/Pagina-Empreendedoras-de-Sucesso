import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";
import speaker5 from "@/assets/speaker-5.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
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
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 60% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)"
      }} />

      <div className="section-container relative z-10 pt-16 pb-8">
        {/* Logo */}
        <motion.div {...fadeUp} className="mb-8">
          <span className="text-2xl font-black tracking-[0.3em] text-foreground">
            <span className="font-black">FLF</span>
            <span className="font-light">EZTIVAL</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
          {/* Left: Text */}
          <motion.div {...fadeUp} className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium">
                <Calendar className="w-4 h-4" /> 25 de novembro
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium">
                <MapPin className="w-4 h-4 text-destructive" /> PUCRS - Porto Alegre/RS
              </span>
            </div>

            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
              <span className="text-accent-orange">O MAIOR EVENTO</span> DE EMPREENDEDORISMO E NEGÓCIOS DO{" "}
              <span className="font-black">SUL DO PAÍS</span>
            </h1>

            <p className="text-body text-lg max-w-lg">
              Um insight pode transformar seu negócio para sempre! Tenha acesso aos maiores
              empreendedores(as) e empresários(as) do Brasil no FLFeztival 2023
            </p>

            <button className="btn-cta text-lg">GARANTIR MINHA VAGA</button>
          </motion.div>

          {/* Right: Speaker montage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-3 gap-3">
              {[speaker1, speaker2, speaker3, speaker4, speaker5].map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-1 row-span-1" : ""} ${i === 1 ? "col-span-1 row-span-1 -mt-8" : ""} ${i === 2 ? "col-span-1 row-span-1 mt-4" : ""}`}
                  style={{ aspectRatio: i === 1 ? "3/4" : "1/1" }}
                >
                  <img
                    src={src}
                    alt={`Palestrante ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Countdown bar */}
      <div className="bg-accent-orange w-full py-4">
        <div className="section-container flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <span className="text-background font-black text-lg md:text-xl">
            O Evento <span className="font-black">FLFEZTIVAL</span> começa em:
          </span>
          <div className="flex gap-4 md:gap-6 tabular-nums">
            {[
              { value: days, label: "Dias" },
              { value: hours, label: "Horas" },
              { value: minutes, label: "Minutos" },
              { value: seconds, label: "Segundos" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <span className="text-3xl md:text-4xl font-black text-background">{String(item.value).padStart(2, "0")}</span>
                <span className="text-background text-xs md:text-sm ml-1 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
