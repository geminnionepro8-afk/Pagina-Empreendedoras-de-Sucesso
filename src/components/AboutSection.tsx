import { motion } from "framer-motion";
import { Target, Users, Presentation, Award } from "lucide-react";
import audienceBg from "@/assets/audience-bg.jpg";
import venuePhoto from "@/assets/venue-photo.jpg";
import { Calendar, MapPin } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const features = [
  { icon: Target, text: "Conteúdo direto e objetivo. Aprenda estratégias dos empresários que lideram empresas bilionárias" },
  { icon: Users, text: "Oportunidades de ampliar seu networking" },
  { icon: Presentation, text: "Palestrantes que construíram seus impérios do zero" },
  { icon: Award, text: "Possibilidade de fazer parte de um grupo seleto de empresários e ser mentorado por Flávio Augusto." },
];

const AboutSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-flf-dark border-t-0">
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src={audienceBg} alt="Plateia" className="w-full h-full object-cover opacity-[0.15] mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-flf-dark via-flf-dark/90 to-transparent" />
      </div>

      <div className="section-container relative z-10 space-y-24">
        {/* Texts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-16">
          <motion.div {...fadeUp} className="space-y-6">
            <h2 className="text-3xl md:text-5xl text-white">
              o que é <span className="font-black">O FLFEZTIVAL:</span>
            </h2>
            <div className="space-y-4 text-flf-lightGray font-medium leading-relaxed max-w-lg">
              <p>
                Explore uma jornada transformadora no FLFEZTIVAL, um evento inovador que reúne empreendedores(as) visionários e líderes de negócios inspiradores.
              </p>
              <p>
                Em um dia envolvente no prestigiado <strong className="text-white font-semibold">Salão de Atos da PUCRS</strong>, mergulhe em um oceano de conhecimento, onde empresários(as) de sucesso não apenas compartilham suas histórias, mas também desvendam os segredos do seu sucesso.
              </p>
              <p>
                Prepare-se para absorver insights práticos sobre empreendedorismo, estratégias de negócios e mentalidade vencedora. Este ano, estamos honrados em apresentar palestras inspiradoras de renomados especialistas, incluindo João Adibe, Renata Vichi e Flávio Augusto.
              </p>
              <p className="text-flf-orange font-semibold pt-2">
                Participe deste evento extraordinário e transforme seus sonhos em realizações notáveis
              </p>
            </div>
          </motion.div>
          <div className="hidden lg:block" />
        </div>

        {/* Separator Logo */}
        <motion.div {...fadeUp} className="text-center">
          <span className="text-2xl font-black tracking-[0.3em] text-white">
            <span className="font-black">FLF</span><span className="font-light text-flf-lightGray">EZTIVAL</span>
          </span>
        </motion.div>

        {/* Features / Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-flf-gray/20 rounded-xl p-6 space-y-5 border border-flf-gray/30 hover:border-flf-orange/50 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <f.icon className="w-8 h-8 text-flf-orange" strokeWidth={1.5} />
              </div>
              <p className="text-sm border-t border-flf-gray/30 pt-4 text-flf-lightGray font-medium leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
