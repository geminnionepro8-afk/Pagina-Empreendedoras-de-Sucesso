import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

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
    image: "/images/audience/saude.png"
  },
  {
    tag: "CONEXÕES",
    title: "Networking Real",
    text: "Sente à mesa com lideranças femininas focadas em crescer de verdade, sem máscaras.",
    image: "/images/audience/conexoes.png"
  },
  {
    tag: "IMAGEM CLÍNICA",
    title: "Posicionamento",
    text: "Descubra como a estética refinada e a saúde postural elevam o valor do negócio.",
    image: "/images/audience/lideranca.png"
  },
];

const AudienceSection = () => {
  return (
    <section className="bg-[#080808] py-24 md:py-32 relative overflow-visible border-t border-[#ee6983]/10">
      
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">

        {/* Título centralizado Premium */}
        <motion.div {...fadeUp} className="flex flex-col items-center mb-20 md:mb-32 text-center">
          <SectionLabel text="Para quem é o Fórum" centered />
          <h2 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight leading-tight">
            O Fórum é para
            <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              você que
            </span>
          </h2>
          <p className="mt-8 text-white/50 text-[15px] sm:text-lg max-w-2xl text-center mx-auto leading-[1.8] font-light px-4">
            Já parou de romantizar a exaustão e busca faturamento sustentável fortemente aliado ao próprio bem-estar.
          </p>
        </motion.div>

        {/* Layout baseado no "Process" */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.15fr] gap-10 lg:gap-14 xl:gap-20 items-start relative">
          
          {/* Lado Esquerdo - Card Fixo de Características */}
          <div className="lg:sticky top-24 lg:top-32 2xl:top-40 z-0 hidden lg:block">
            <div className="w-full h-[520px] rounded-[24px] xl:rounded-[32px] bg-gradient-to-br from-[#151314] via-[#0a0a0a] to-[#040404] border border-white/5 shadow-2xl p-10 xl:p-14 relative overflow-hidden group flex flex-col justify-center">
              {/* Glow sutil nativo no topo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent blur-md" />
              
              <h3 className="text-3xl xl:text-4xl font-semibold tracking-tight leading-tight mb-8 xl:mb-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
                O Fórum atende exatamente a você que:
              </h3>
              
              <ul className="space-y-8 lg:space-y-12">
                {[
                  "Quer faturar mais sem adoecer no processo",
                  "Entende que o seu bem-estar dita o ritmo da sua empresa",
                  "Procura estar perto de mulheres com os mesmos desafios",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 lg:gap-5 items-start">
                    <CheckCircle2 className="w-6 h-6 xl:w-7 xl:h-7 shrink-0 text-[#ee6983] opacity-80 mt-0.5" strokeWidth={1.5} />
                    <p className="text-white/70 text-[16px] xl:text-[18px] leading-[1.6] font-light">{item}</p>
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
                className="sticky top-24 lg:top-32 2xl:top-40 h-[520px] bg-gradient-to-b from-[#141213] to-[#050505] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-[#ee6983]/10 transition-colors duration-500 rounded-[32px] p-8 sm:p-12 z-10 flex flex-col justify-between"
              >
                <div className="mb-10 sm:mb-12">
                  <div className="mb-8">
                    <span className="text-[#ee6983] font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-white text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-white/60 text-lg sm:text-xl leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Imagem Menor do Card (Transformação Limitada) */}
                <div className="w-full h-[180px] xl:h-[200px] rounded-[24px] bg-[#0c0c0c] border border-white/5 overflow-hidden group cursor-pointer relative mt-auto">
                    {/* Imagem Representativa */}
                    <img 
                       src={item.image} 
                       alt={item.title} 
                       className="absolute inset-0 w-full h-full object-cover brightness-100 transition-all duration-700 ease-out z-10" 
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
