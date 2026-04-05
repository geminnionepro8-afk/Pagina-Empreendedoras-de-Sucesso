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
            <div className="hidden md:inline-flex items-center gap-2 bg-[#ee6983]/15 border border-[#ee6983]/50 px-4 py-1.5 rounded-full w-fit backdrop-blur-sm">
              <span className="text-[#ee6983] font-bold text-xs uppercase tracking-[0.2em]">Instituto Mulheres de Sucesso</span>
            </div>

            {/* Row Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/[0.07] border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
                <Calendar className="w-4 h-4 text-[#ee6983]" strokeWidth={1.5} />
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">17 e 18 de abril</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.07] border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
                <MapPin className="w-4 h-4 text-[#ee6983]" strokeWidth={1.5} />
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">UNIFACEX - Capim Macio</span>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            {...fadeRight} transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight uppercase"
          >
            Fórum de Alta <br />
            <span className="text-[#ee6983] font-black drop-shadow-lg">
              Performance e Saúde
            </span> <br />
            <span className="text-white/95 text-[20px] sm:text-[24px] lg:text-[28px] font-medium tracking-wide mt-2 block lowercase drop-shadow-md" style={{fontVariant: 'small-caps'}}>
              Da Mulher Empreendedora
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeRight} transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-white/90 max-w-lg font-light leading-relaxed drop-shadow-md"
          >
            Onde estética, psique e{" "}
            <span className="text-[#ee6983] font-semibold">medicina integrativa</span>{" "}
            se unem para blindar a sua saúde e acelerar o crescimento do seu CNPJ.
          </motion.p>

          {/* CTA Button */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="w-full sm:w-auto pt-4 relative z-20">
            <Link
              to="/inscricao"
              className="group relative overflow-hidden btn-matte text-white px-10 py-5 rounded-xl font-black text-sm md:text-base uppercase tracking-widest w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(238,105,131,0.25)] hover:shadow-[0_15px_50px_rgba(238,105,131,0.4)] transition-all"
            >
              GARANTIR MINHA VAGA
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={1.5} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
