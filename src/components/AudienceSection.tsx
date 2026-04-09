import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const audiences = [
  {
    tag: "CORPO & MENTE",
    title: "Fim do Esgotamento",
    text: "Aprenda métodos que blindam sua saúde física e mental para focar no que dá lucro.",
    image: "/images/audience/saude.webp",
    placeholder: "/images/audience/saude.placeholder.webp"
  },
  {
    tag: "CONEXÕES",
    title: "Networking Real",
    text: "Sente à mesa com lideranças femininas focadas em crescer de verdade, sem máscaras.",
    image: "/images/audience/conexoes.webp",
    placeholder: "/images/audience/conexoes.placeholder.webp"
  },
  {
    tag: "IMAGEM CLÍNICA",
    title: "Posicionamento",
    text: "Descubra como a estética refinada e a saúde postural elevam o valor do negócio.",
    image: "/images/audience/lideranca.webp",
    placeholder: "/images/audience/lideranca.placeholder.webp"
  },
];

const AudienceSection = () => {
  return (
    <section className="bg-[#080808] py-16 md:py-24 relative overflow-visible border-t border-[#ee6983]/10">
      
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">

        {/* Título centralizado Premium */}
        <motion.div {...fadeUp} className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <SectionLabel text="Para quem é o Fórum" centered />
          <h2 className="text-[34px] sm:text-4xl md:text-5xl xl:text-[clamp(2rem,4vw,3.75rem)] font-light text-white uppercase tracking-tight leading-tight">
            O Fórum é para
            <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              você que
            </span>
          </h2>
          <p className="mt-6 text-white/50 text-sm md:text-base max-w-2xl text-center mx-auto leading-[1.7] font-light px-4">
            Já parou de romantizar a exaustão e busca faturamento sustentável fortemente aliado ao próprio bem-estar.
          </p>
        </motion.div>

        {/* Layout baseado no "Process" */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.15fr] gap-8 xl:gap-16 items-start relative">
          
          {/* Lado Esquerdo - Card Fixo de Características */}
          <div className="lg:sticky top-24 lg:top-32 z-0 hidden lg:block">
            <div className="w-full h-[clamp(400px,60vh,520px)] rounded-[24px] xl:rounded-[32px] bg-gradient-to-br from-[#151314] via-[#0a0a0a] to-[#040404] border border-white/5 shadow-2xl p-8 xl:p-12 relative overflow-hidden group flex flex-col justify-center">
              {/* Glow sutil nativo no topo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent blur-md" />
              
              <h3 className="text-2xl xl:text-4xl font-semibold tracking-tight leading-tight mb-6 xl:mb-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
                O Fórum atende exatamente a você que:
              </h3>
              
              <ul className="space-y-6 xl:space-y-10">
                {[
                  "Quer faturar mais sem adoecer no processo",
                  "Entende que o seu bem-estar dita o ritmo da sua empresa",
                  "Procura estar perto de mulheres com os mesmos desafios",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-5 h-5 xl:w-7 xl:h-7 shrink-0 text-[#ee6983] opacity-80 mt-0.5" strokeWidth={1.5} />
                    <p className="text-white/70 text-sm xl:text-[18px] leading-[1.6] font-light">{item}</p>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>

          {/* Lado Direito - Cards com Stacking Effect */}
          <div className="flex flex-col gap-6 lg:gap-10">
            {audiences.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="sticky top-24 lg:top-32 h-[clamp(400px,60vh,520px)] bg-gradient-to-b from-[#141213] to-[#050505] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-[#ee6983]/10 transition-colors duration-500 rounded-[32px] p-8 sm:p-10 z-10 flex flex-col justify-between"
              >
                <div className="mb-6 xl:mb-8">
                  <div className="mb-6">
                    <span className="text-[#ee6983] font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-white text-2xl sm:text-3xl xl:text-4xl font-medium tracking-tight leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-white/60 text-base sm:text-lg xl:text-xl leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Imagem Menor do Card (Transformação Limitada) */}
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[140px] xl:h-[200px] rounded-[20px] sm:rounded-[24px] bg-[#0c0c0c] border border-white/5 overflow-hidden group cursor-pointer relative mt-6 lg:mt-auto">
                  <OptimizedImage
                    src={item.image}
                    placeholderSrc={item.placeholder}
                    alt={item.title}
                    objectPosition="top"
                    className="brightness-100 transition-all duration-700 ease-out"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AudienceSection;
