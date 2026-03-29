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
    <div className="flex flex-col items-center flex-1 px-2 py-1">
      <span className="text-3xl sm:text-4xl md:text-5xl font-black tabular-nums tracking-tighter text-white leading-none drop-shadow-sm">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 mt-1.5 drop-shadow-sm">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <span className="text-2xl md:text-3xl font-black text-white/40 -mt-4 select-none flex-shrink-0">:</span>
  );

  return (
    <div className="w-full bg-[#ee6983] py-5 md:py-7 relative z-30 shadow-[0_10px_30px_rgba(238,105,131,0.3)]">
      <div className="section-container text-white relative z-10">

        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-center gap-12">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base md:text-xl font-semibold tracking-tight text-right leading-snug flex-shrink-0 drop-shadow-sm"
          >
            O <span className="font-extrabold text-white">I Fórum de<br />Estética e Performance</span><br />
            <span className="font-normal text-white/90 text-sm">começa em:</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <TimeUnit value={timeLeft.days} label="Dias" />
            <Separator />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <Separator />
            <TimeUnit value={timeLeft.minutes} label="Minutos" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col items-center gap-5">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base font-semibold text-center leading-snug drop-shadow-md"
          >
            O <span className="font-extrabold text-white">I Fórum de Estética e Performance</span>{" "}
            <span className="font-normal text-white/90">começa em:</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
            className="flex items-center gap-2 w-full max-w-sm mx-auto"
          >
            <TimeUnit value={timeLeft.days} label="Dias" />
            <Separator />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <Separator />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default CountdownTimer;
