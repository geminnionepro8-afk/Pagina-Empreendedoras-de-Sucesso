import { motion } from "framer-motion";
import { MoveRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteConfig } from "@/hooks/useSiteConfig";

// Optimized WebP versions
import heroSpeakerWebP from "@/assets/hero-speaker.webp";
import heroSpeakerPlaceholder from "@/assets/hero-speaker.placeholder.webp";

import OptimizedImage from "@/components/ui/OptimizedImage";

const HeroSection = () => {
  const { data: configs } = useSiteConfig();
  
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-[clamp(3rem,10vh,6rem)] md:pt-[clamp(4rem,12vh,7.5rem)] pb-12 md:pb-20 overflow-hidden bg-black">
      {/* Background Original Image filling the whole section */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={configs?.hero_bg || heroSpeakerWebP}
          placeholderSrc={heroSpeakerPlaceholder}
          alt="Palestrante Evento"
          priority={true}
          objectPosition="70% top"
          className="w-full h-full lg:!object-[right_top]"
        />
        {/* Gradiente protegendo o texto na esquerda, sem sumir com a mulher na direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        
        {/* Subtle Glow behind the text */}
        <div className="absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ee6983] opacity-[0.15] blur-[120px] md:blur-[150px] rounded-full pointer-events-none z-10" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col items-start text-left space-y-6 md:space-y-8 max-w-2xl py-8 md:py-12">

          {/* Logo/Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 w-fit">
              <img 
                src={configs?.hero_logo || "/images/logo-instituto-trimmed.webp"} 
                alt="Instituto Mulheres de Sucesso" 
                className="h-12 sm:h-16 md:h-20 w-auto object-left object-contain brightness-110 drop-shadow-[0_0_15px_rgba(238,105,131,0.2)]" 
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] px-3.5 py-2 md:px-4 md:py-2.5 rounded-full backdrop-blur-md shadow-2xl">
                <Calendar className="w-3.5 h-3.5 text-[#ee6983]" strokeWidth={2} />
                <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">17 e 18 de Abril</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] px-3.5 py-2 md:px-4 md:py-2.5 rounded-full backdrop-blur-md shadow-2xl">
                <MapPin className="w-3.5 h-3.5 text-[#ee6983]" strokeWidth={2} />
                <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Natal, RN</span>
              </div>
            </div>
          </motion.div>
 
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl xl:text-[clamp(3rem,6vw,4.75rem)] font-light text-white leading-[1.05] tracking-tight uppercase"
          >
            O Fórum da Mulher <br className="hidden sm:block" />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] via-[#f493a7] to-[#ee6983] drop-shadow-sm">
              Empreendedora
            </span>
          </motion.h1>
 
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-lg text-white/80 max-w-lg font-normal leading-relaxed tracking-wide drop-shadow-lg"
          >
            Onde estética, psique e medicina integrativa se unem para blindar a sua saúde e acelerar o crescimento do seu CNPJ.
          </motion.p>
 
          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto pt-4 relative z-20"
          >
            <Link
              to="/inscricao"
              className="group relative overflow-hidden bg-gradient-to-r from-[#ee6983] via-[#f493a7] to-[#ee6983] text-white px-10 py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-[0.2em] w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(238,105,131,0.2)] hover:shadow-[0_25px_60px_rgba(238,105,131,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              GARANTIR MINHA VAGA
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
