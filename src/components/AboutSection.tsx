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
    <>
      {/* Venue info bar */}
      <section className="bg-background py-16">
        <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden border-accent-thin">
            <img src={venuePhoto} alt="Salão de Atos PUCRS" className="w-full h-64 object-cover" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 card-glass px-4 py-3 w-fit">
              <Calendar className="w-5 h-5 text-accent-orange" /> <span className="text-foreground font-medium">25 de novembro</span>
            </div>
            <div className="flex items-center gap-2 card-glass px-4 py-3 w-fit">
              <MapPin className="w-5 h-5 text-destructive" /> <span className="text-foreground font-medium">PUCRS - Porto Alegre/RS</span>
            </div>
            <p className="text-muted-foreground">
              Av. Ipiranga, 6681 Partenon – <span className="text-foreground font-semibold">Porto Alegre / RS</span>
            </p>
            <p className="text-muted-foreground">
              Salão de Atos da PUCRS em Porto Alegre, o cenário perfeito para uma jornada de sucesso
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={audienceBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeUp} className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-foreground">
              o que é <span className="font-black">O FLFEZTIVAL:</span>
            </h2>
            <p className="text-body">
              Explore uma jornada transformadora no FLFeztival, um evento inovador que reúne empreendedores(as) visionários e líderes de negócios inspiradores.
            </p>
            <p className="text-body">
              Em um dia envolvente no prestigiado <span className="text-foreground font-semibold">Salão de Atos da PUCRS</span>, mergulhe em um oceano de conhecimento, onde empresários(as) de sucesso não apenas compartilham suas histórias, mas também desvendam os segredos do seu sucesso.
            </p>
            <p className="text-body">
              Prepare-se para absorver insights práticos sobre empreendedorismo, estratégias de negócios e mentalidade vencedora. Este ano, estamos honrados em apresentar palestras inspiradoras de renomados especialistas, incluindo João Adibe, Renata Vichi e Flávio Augusto.
            </p>
            <p className="text-accent-orange font-semibold">
              Participe deste evento extraordinário e transforme seus sonhos em realizações notáveis
            </p>
          </motion.div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-16">
        <div className="section-container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-2xl font-black tracking-[0.3em] text-foreground">
              <span className="font-black">FLF</span><span className="font-light">EZTIVAL</span>
            </span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card-glass p-6 space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-accent-orange" />
                </div>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="btn-cta">GARANTIR MINHA VAGA</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
