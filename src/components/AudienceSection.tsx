import { motion } from "framer-motion";
import audienceBg from "@/assets/audience-bg.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const audiences = [
  {
    title: "Saúde Inabalável",
    text: "Quer blindar sua saúde e energia sem abrir mão da alta performance profissional.",
    image: "/images/audience/saude.png"
  },
  {
    title: "Conexões Genuínas",
    text: "Busca conexões genuínas com outras mulheres líderes, sem competição predatória.",
    image: "/images/audience/conexoes.png"
  },
  {
    title: "Liderança de Impacto",
    text: "Busca o equilíbrio entre performance sustentável, bem-estar e liderança de impacto.",
    image: "/images/audience/lideranca.png"
  },
];

const AudienceSection = () => {
  return (
    <section className="bg-[#151515] py-24 md:py-32 relative overflow-visible border-t border-[#ee6983]/10">
      
      {/* Subtle glow no fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] sm:w-[500px] sm:h-[500px] bg-[#ee6983] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">

        {/* Título centralizado Premium */}
        <motion.div {...fadeUp} className="flex flex-col items-center mb-20 md:mb-32 text-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-[1px] bg-[#ee6983]/40" />
            <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
              Para quem é o Fórum
            </p>
            <div className="w-6 h-[1px] bg-[#ee6983]/40" />
          </div>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight leading-tight">
            O Fórum é para
            <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              você que
            </span>
          </h2>
        </motion.div>

        {/* Layout baseado no "Process" */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-10 lg:gap-14 xl:gap-20 items-start relative">
          
          {/* Lado Esquerdo - Imagem Principal (Sticky) */}
          <div className="lg:sticky top-24 lg:top-32 2xl:top-40 z-0 hidden lg:block">
            <div className="w-full aspect-[3/4] xl:aspect-[4/5] rounded-[32px] bg-[#0c0c0c] border border-white/5 overflow-hidden group relative">
              {/* Imagem Principal */}
              <img 
                 src={audienceBg} 
                 alt="O movimento por trás do fórum" 
                 className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-700 ease-out z-10" 
              />
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
                className="sticky top-24 lg:top-32 2xl:top-40 bg-[#080808] border border-[#ee6983]/10 hover:border-[#ee6983]/30 transition-colors duration-500 rounded-[32px] p-8 sm:p-12 z-10 flex flex-col justify-between"
              >
                <div className="mb-10 sm:mb-12">
                  <div className="mb-8">
                    <span className="text-[#ee6983]/60 font-medium text-[15px] tracking-widest">
                      /{String(i + 1).padStart(3, '0')}
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

                {/* Imagem Menor do Card (Transformação) */}
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] bg-[#0c0c0c] border border-white/5 overflow-hidden group cursor-pointer relative mt-auto">
                    {/* Imagem Representativa */}
                    <img 
                       src={item.image} 
                       alt={item.title} 
                       className="absolute inset-0 w-full h-full object-cover brightness-[0.5] group-hover:brightness-100 transition-all duration-700 ease-out z-10" 
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
