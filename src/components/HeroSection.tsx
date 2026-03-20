import { motion } from "framer-motion";
import { MoveRight, Calendar, MapPin } from "lucide-react";
import audienceBg from "@/assets/audience-bg.jpg";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";
import speaker5 from "@/assets/speaker-5.jpg";

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

const popIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, type: "spring", bounce: 0.4 },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-black">
      {/* Background with cinematic blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={audienceBg} 
          alt="Palco Evento FLFEZTIVAL" 
          className="w-full h-full object-cover opacity-20 grayscale brightness-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        {/* Pink Glow in the center/right */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.08] blur-[120px] rounded-full" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8">
            
            {/* Logo/Brand */}
            <motion.div {...fadeRight} className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 bg-[#ee6983]/10 border border-[#ee6983]/30 px-4 py-2 rounded-[5%] w-fit backdrop-blur-sm">
                <span className="text-[#ee6983] font-bold text-xs uppercase tracking-[0.2em]">Instituto Mulheres de Sucesso</span>
              </div>

              {/* Row Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2 rounded-[5%] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <Calendar className="w-4 h-4 text-[#ee6983]" strokeWidth={1.5} />
                  <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">17 e 18 de abril</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2 rounded-[5%] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <MapPin className="w-4 h-4 text-[#ee6983]" strokeWidth={1.5} />
                  <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider">UNIFACEX - Natal/RN</span>
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              {...fadeRight} transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase"
            >
              I FÓRUM DE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6983] to-[#850e35]">
                ESTÉTICA E PERFORMANCE
              </span> <br />
              DA MULHER EMPREENDEDORA
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              {...fadeRight} transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed"
            >
              Uma imersão completa na interseção entre saúde integrativa, estética avançada e liderança feminina de alto impacto para mulheres visionárias.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="w-full sm:w-auto">
              <button className="group relative overflow-hidden btn-matte text-white px-10 py-5 rounded-[5%] font-black text-sm md:text-base uppercase tracking-widest w-full sm:w-auto flex items-center justify-center gap-3">
                GARANTIR MINHA VAGA
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Speakers Cluster */}
          <div className="lg:col-span-6 relative h-[500px] md:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
            {/* Background Texture behind speakers */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
              <img src={audienceBg} alt="Background Elements" className="w-full h-full object-cover rounded-full blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>

            {/* Center Main Speaker (Speaker 3 - João Adibe in the reference middle) */}
            <motion.div 
              {...popIn} transition={{ delay: 0.4 }}
              className="absolute z-30 w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-[#ee6983]/30 overflow-hidden shadow-2xl bg-black"
            >
              <img src={speaker3} alt="Speaker" className="w-full h-full object-cover mask-image-radial" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#ee6983]/20 via-transparent to-transparent" />
            </motion.div>

            {/* Top Left (Speaker 1 - Renata Vichi) */}
            <motion.div 
              {...popIn} transition={{ delay: 0.5 }}
              className="absolute z-20 top-0 left-0 md:left-10 w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-white/10 overflow-hidden shadow-xl"
            >
              <img src={speaker1} alt="Speaker" className="w-full h-full object-cover" />
            </motion.div>

            {/* Top Right (Speaker 2 - Flávio Augusto) */}
            <motion.div 
              {...popIn} transition={{ delay: 0.6 }}
              className="absolute z-20 top-0 right-0 md:right-10 w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-white/10 overflow-hidden shadow-xl"
            >
              <img src={speaker2} alt="Speaker" className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Left (Speaker 4 - Carlos Busch) */}
            <motion.div 
              {...popIn} transition={{ delay: 0.7 }}
              className="absolute z-20 bottom-0 left-0 md:left-4 w-44 h-44 md:w-56 md:h-56 rounded-full border-2 border-white/10 overflow-hidden shadow-xl"
            >
              <img src={speaker4} alt="Speaker" className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Right (Speaker 5 - Luciano Potter) */}
            <motion.div 
              {...popIn} transition={{ delay: 0.8 }}
              className="absolute z-20 bottom-0 right-0 md:right-4 w-44 h-44 md:w-56 md:h-56 rounded-full border-2 border-white/10 overflow-hidden shadow-xl"
            >
              <img src={speaker5} alt="Speaker" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Glow Effects behind speakers */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-[400px] h-[400px] bg-[#ee6983]/5 blur-[80px] rounded-full animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
