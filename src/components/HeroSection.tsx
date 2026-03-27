import { motion } from "framer-motion";
import { MoveRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import audienceBg from "@/assets/audience-bg.jpg";

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
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-black">
      {/* Background with cinematic blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={audienceBg}
          alt="Palco Evento"
          className="w-full h-full object-cover opacity-60 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        {/* Pink Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.08] blur-[120px] rounded-full" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col items-start text-left space-y-8 max-w-2xl">

          {/* Logo/Brand */}
          <motion.div {...fadeRight} className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-[#ee6983]/15 border border-[#ee6983]/50 px-4 py-1.5 rounded-full w-fit backdrop-blur-sm">
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
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">UNIFACEX - Natal/RN</span>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            {...fadeRight} transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.2] tracking-tight uppercase"
          >
            I Fórum de <br />
            <span className="text-[#ee6983] font-bold">
              Estética e Performance
            </span> <br />
            da Mulher Empreendedora
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeRight} transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-white/75 max-w-lg font-light leading-relaxed"
          >
            Uma imersão completa na interseção entre{" "}
            <span className="text-[#ee6983] font-semibold">saúde integrativa, estética avançada</span>{" "}
            e liderança feminina de alto impacto{" "}
            para mulheres visionárias.
          </motion.p>

          {/* CTA Button */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="w-full sm:w-auto">
            <Link
              to="/inscricao"
              className="group relative overflow-hidden btn-matte text-white px-10 py-5 rounded-[10px] font-black text-sm md:text-base uppercase tracking-widest w-full sm:w-auto flex items-center justify-center gap-3"
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
