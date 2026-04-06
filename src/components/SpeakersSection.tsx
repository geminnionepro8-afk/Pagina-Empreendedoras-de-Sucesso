import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Stethoscope, Activity, Brain, Briefcase, TestTube, Leaf, Sparkles, Target, GraduationCap, Dumbbell, Building2, Microscope } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

import s1 from "@/assets/speakers/1.png";
import s2 from "@/assets/speakers/2.png";
import s3 from "@/assets/speakers/3.png";
import s4 from "@/assets/speakers/4.png";
import s5 from "@/assets/speakers/5.png";
import s6 from "@/assets/speakers/6.png";
import s7 from "@/assets/speakers/7.png";
import s8 from "@/assets/speakers/8.png";
import s9 from "@/assets/speakers/9.png";
import s10 from "@/assets/speakers/10.png";

const speakers = [
  { 
    id: "s1",
    name: "Alice Fuscella", 
    fullName: "Prof. Dra. Alice Fuscella",
    role: "Coordenadora de Odontologia e Práticas Integrativas", 
    shortRole: "Coord. Odontologia",
    description: "Referência na área educacional e de bem-estar corporativo. É a principal Coordenadora de Odontologia e Núcleo de Práticas Integrativas no UNIFACEX, atuando com liderança formativa.",
    img: s1,
    Icon: GraduationCap
  },
  { 
    id: "s2",
    name: "Eneida Carreiro", 
    fullName: "Dra. Eneida Carreiro",
    role: "Doutora em Biotecnologia e Fisioterapeuta", 
    shortRole: "Fisioterapeuta",
    description: "Fisioterapeuta amplamente especializada em Dermatofuncional e estética. Traz a inovação dos seus estudos de Mestrado e Doutorado em Biotecnologia diretamente para a estética aplicada.",
    img: s2,
    Icon: Activity
  },
  { 
    id: "s3",
    name: "Bruna Covre", 
    fullName: "Dra. Bruna Covre",
    role: "Médica Endocrinologista Integrativa", 
    shortRole: "Médica Endocrinologista",
    description: "Médica Endocrinologista altamente especializada em Medicina Funcional Integrativa. O seu super foco é a excelência clínica aliada à longevidade hormonal da mulher de sucesso.",
    img: s3,
    Icon: Stethoscope
  },
  { 
    id: "s4",
    name: "Raphael Almeida", 
    fullName: "Dr. Raphael Almeida",
    role: "Fisioterapeuta, Docente e Empreendedor", 
    shortRole: "Fisioterapeuta",
    description: "Especialista clínico renomado em Disfunções da Coluna Vertebral e Traumato-Ortopedia. É o idealizador por trás do Método EDP (É de Propósito) e atual Coordenador.",
    img: s4,
    Icon: Dumbbell
  },
  { 
    id: "s5",
    name: "Mitia Montenegro", 
    fullName: "Mitia Montenegro",
    role: "Psicóloga Esp. em TCC e Neurobiologia", 
    shortRole: "Psicóloga",
    description: "Profissional de atuação ímpar em Arquitetura e Psicologia. Detém forte autoridade no tratamento executivo focando em saúde mental, neurobiologia avançada e neuro-adequações da TCC.",
    img: s5,
    Icon: Brain
  },
  { 
    id: "s6",
    name: "Wanderley Cunha", 
    fullName: "Wanderley Cunha",
    role: "Gestor e CEO da Vectax Produtora", 
    shortRole: "CEO Vectax",
    description: "Empreendedor que atua na linha de frente como CEO, guiando e escalando os grandes softwares comerciais que aceleram a comunicação corporativa do país de ponta a ponta.",
    img: s6,
    Icon: Building2
  },
  { 
    id: "s7",
    name: "Glenda Oliveira", 
    fullName: "Dra. Glenda Oliveira",
    role: "Mestre em Biotecnologia e Biomédica", 
    shortRole: "Biomédica",
    description: "Sólida na área de estética e cosmética. É Esteticista, Biomédica e Fisioterapeuta, mantendo sua atuação com um rigoroso Mestrado internacional em Biotecnologia e Docência em mercado livre.",
    img: s7,
    Icon: Microscope
  },
  { 
    id: "s8",
    name: "Danielle Mafra", 
    fullName: "Danielle Mafra",
    role: "Superintendente do SESI RN em ESG", 
    shortRole: "Executiva em ESG",
    description: "Atual líder e Superintendente Regional do SESI RN, Danielle dita o mercado após certificar seu exato poder de impacto em seu Mestrado em Governança Executiva de ESG na Nova SBE.",
    img: s8,
    Icon: Leaf
  },
  { 
    id: "s9",
    name: "Dani Maia", 
    fullName: "Dra. Dani Maia",
    role: "Dermatologista Clínica e CEO Corporativa", 
    shortRole: "Dermatologista",
    description: "Muito mais que Médica Dermatologista, é empresária que fundou e concebeu a marca Clínica Daniela Maia, cruzando a prestação de alto padrão com serviços operacionais irretocáveis na gestão.",
    img: s9,
    Icon: Sparkles
  },
  { 
    id: "s10",
    name: "Marina Aragão", 
    fullName: "Marina Aragão",
    role: "Coordenadora de Educação IEL RN", 
    shortRole: "Cons. Empresarial",
    description: "Atua ativamente como Coordenadora de Carreiras do IEL RN. Sua visão executiva agrupa sua formação em Administração em alto nível somado a sua grande força em soluções empresariais escaláveis.",
    img: s10,
    Icon: Target
  },
];

const SpeakersSection = () => {
  const [activeTab, setActiveTab] = useState(speakers[0].id);
  const activeSpeaker = speakers.find(s => s.id === activeTab) || speakers[0];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20 relative overflow-hidden border-t border-[#ee6983]/10">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[200px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-[1400px] mx-auto px-5 lg:px-8">
        
        {/* Header Centralizado - Mais Compacto Verticalmente */}
        <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
          <SectionLabel text="Nossos Especialistas" centered />
          <h2 className="text-[34px] sm:text-4xl md:text-5xl lg:text-[clamp(1.75rem,3.5vw,3.75rem)] font-light text-white uppercase tracking-tighter leading-tight pb-1">
            Quem vai transformar <br className="hidden md:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              Sua Trajetória
            </span>
          </h2>
        </div>

        {/* Definições de Gradiente SVG Global para Ícones */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#ffcce0" offset="0%" />
              <stop stopColor="#ee6983" offset="50%" />
              <stop stopColor="#9b2d41" offset="100%" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layout Tabs - Estrutura Rente e Refinada */}
        <div className="grid grid-cols-1 lg:grid-cols-[clamp(320px,25vw,390px)_1fr_0.85fr] gap-4 lg:gap-6 items-stretch h-full">
          
          {/* Sidebar de Seletores - Mais Compacto */}
          <div className="grid grid-cols-2 grid-rows-5 gap-2.5 lg:gap-3 h-full">
            {speakers.map((speaker) => (
              <button
                key={speaker.id}
                onClick={() => setActiveTab(speaker.id)}
                className={`relative flex flex-col justify-between p-3 xl:p-4 rounded-md border transition-all duration-300 ease-out text-left group overflow-hidden h-full active:scale-[0.98] ${
                  activeTab === speaker.id 
                    ? "bg-gradient-to-br from-[#ee6983] to-[#b6304b] border-[#ee6983]/60 shadow-[0_4px_20px_rgba(238,105,131,0.25)] z-0" 
                    : "bg-gradient-to-br from-[#181818] to-[#050505] border-white/5 hover:border-white/20 hover:scale-[1.04] hover:-translate-y-1 hover:z-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Top Section: Avatar e Ícone */}
                <div className="flex items-start justify-between w-full mb-1">
                  <div className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0 border border-white/10 transition-all duration-300 ${activeTab === speaker.id ? 'border-white/30' : 'group-hover:border-white/20'}`}>
                    <img src={speaker.img} alt={speaker.name} className={`w-full h-full object-cover transition-all duration-500 scale-105 ${activeTab === speaker.id ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`} />
                  </div>
                  <div className={`mt-0 transition-all duration-300 ${activeTab === speaker.id ? "opacity-100 scale-100" : "opacity-100 scale-95 group-hover:scale-100"}`}>
                    {speaker.Icon && <speaker.Icon stroke={activeTab === speaker.id ? "white" : "url(#iconGradient)"} strokeWidth={activeTab === speaker.id ? 1.5 : 1} className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                </div>

                {/* Bottom Section: Nome e Cargo (Fontes Preservadas) */}
                <div className="flex flex-col mt-auto w-full">
                  <span className={`text-[14px] sm:text-[15px] xl:text-[16px] font-semibold whitespace-normal leading-tight transition-colors duration-300 ${
                    activeTab === speaker.id ? "text-white" : "text-white/80 group-hover:text-white"
                  }`}>
                    {speaker.name}
                  </span>
                  <span className={`text-[11px] sm:text-[12px] xl:text-[13px] font-medium tracking-wide truncate transition-colors ${
                    activeTab === speaker.id ? "text-white/90" : "text-white/40 group-hover:text-white/60"
                  } mt-0.5`}>
                     {speaker.shortRole}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Imagem Central - Rente ao Grid */}
          <div className="relative w-full h-full min-h-[300px] lg:min-h-0 perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpeaker.id + "img"}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)", transition: { duration: 0.15, ease: "easeIn" } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-[#080808]"
              >
                <img 
                  src={activeSpeaker.img} 
                  alt={activeSpeaker.fullName} 
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card de Bio - Mais Compacto no Padding (Fontes Preservadas) */}
          <div className="relative w-full h-full perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpeaker.id + "info"}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <div className="bg-gradient-to-br from-[#1f1f1f] via-[#111] to-[#080808] border border-white/5 border-t-white/10 hover:border-[#ee6983]/20 transition-all duration-500 rounded-2xl p-6 lg:p-8 xl:p-12 flex flex-col justify-between h-full shadow-2xl relative">
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-[clamp(1.5rem,2.8vw,2.6rem)] font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 mb-3 lg:mb-4 leading-snug py-1">
                      {activeSpeaker.fullName}
                    </h3>
                    
                    <div className="mb-6 lg:mb-8 opacity-90">
                       <span className="text-[10px] lg:text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#ffcce0] via-[#ee6983] to-[#ee6983]">
                         {activeSpeaker.role}
                       </span>
                    </div>

                    <p className="text-white/60 text-[15px] xl:text-[18px] 2xl:text-[20px] font-light leading-relaxed pr-2 lg:pr-6">
                      {activeSpeaker.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-end justify-between">
                    <span className="text-white/50 text-[9px] uppercase tracking-[0.5em] font-medium">FÓRUM 2026</span>
                    {activeSpeaker.Icon && <activeSpeaker.Icon className="w-10 h-10 xl:w-12 xl:h-12" stroke="url(#iconGradient)" strokeWidth={1} />}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>



      </div>
    </section>
  );
};

export default SpeakersSection;
