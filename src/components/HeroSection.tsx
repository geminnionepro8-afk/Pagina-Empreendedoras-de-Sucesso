import { motion } from "framer-motion";
import { MoveRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import audienceBg from "@/assets/audience-bg.jpg";
import heroSpeakerUrl from "@/assets/hero-speaker.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const fadeRight = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-black">
      {/* Background Original Image filling the whole section */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSpeakerUrl}
          alt="Palestrante Evento"
          className="w-full h-full object-cover object-[70%_top] lg:object-right"
        />
        {/* Gradiente protegendo o texto na esquerda, sem sumir com a mulher na direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        
        {/* Subtle Glow behind the text */}
        <div className="absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ee6983] opacity-[0.15] blur-[120px] md:blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col items-start text-left space-y-8 max-w-2xl py-12">

          {/* Logo/Brand */}
          <motion.div {...fadeRight} className="flex flex-col gap-4">
            <div className="flex items-center gap-4 w-fit">
              <img 
                src="/images/logo-instituto-trimmed.png" 
                alt="Instituto Mulheres de Sucesso" 
                className="h-14 sm:h-16 md:h-20 w-auto object-left object-contain brightness-110 drop-shadow-[0_0_15px_rgba(238,105,131,0.2)]" 
              />
            </div>

            {/* Row Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ee6983] animate-pulse" />
                <Calendar className="w-3.5 h-3.5 text-white/40" strokeWidth={2} />
                <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">17 e 18 de Abril</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
                <MapPin className="w-3.5 h-3.5 text-[#ee6983]" strokeWidth={2} />
                <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Natal, RN</span>
              </div>
            </div>
          </motion.div>
 
          {/* Main Title */}
          <motion.h1
            {...fadeRight} transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight uppercase"
          >
            Alta Performance <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#f493a7] drop-shadow-sm">
              e Saúde
            </span>
          </motion.h1>
 
          {/* Description */}
          <motion.p
            {...fadeRight} transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-white/50 max-w-lg font-light leading-relaxed tracking-wide"
          >
            Onde estética, psique e medicina integrativa se unem para blindar a sua saúde e acelerar o crescimento do seu CNPJ.
          </motion.p>
 
          {/* CTA Button */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="w-full sm:w-auto pt-4 relative z-20">
            <Link
              to="/inscricao"
              className="group relative overflow-hidden bg-gradient-to-br from-[#ee6983] via-[#ee6983] to-[#c74a62] text-white px-12 py-5 rounded-xl font-black text-sm md:text-base uppercase tracking-widest w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(238,105,131,0.25)] hover:shadow-[0_25px_60px_rgba(238,105,131,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              GARANTIR MINHA VAGA
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
