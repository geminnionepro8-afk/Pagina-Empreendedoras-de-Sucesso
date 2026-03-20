import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-04-17T17:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-baseline gap-1">
      <span className="text-4xl md:text-6xl font-black tabular-nums tracking-tighter">
        {value}
      </span>
      <span className="text-[10px] md:text-xs font-display font-normal opacity-80 pb-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-[#ee6983] py-6 md:py-8 relative z-30 shadow-[0_10px_30px_rgba(238,105,131,0.3)]">
      <div className="section-container flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-black">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg md:text-2xl font-medium tracking-tight text-center"
        >
          O <span className="font-extrabold font-display">I Fórum de Estética e Performance</span> começa em:
        </motion.p>
        
        <div className="flex items-center gap-6 md:gap-12">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
