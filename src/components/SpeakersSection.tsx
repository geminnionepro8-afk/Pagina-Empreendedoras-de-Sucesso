import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Stethoscope, Activity, Brain, Briefcase, TestTube, Leaf, Sparkles, Target, GraduationCap, Dumbbell, Building2, Microscope } from "lucide-react";

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
    role: "Coord. Odontologia e Práticas Integrativas UNIFACEX", 
    shortRole: "Coord. Odontologia",
    description: "Referência em Práticas Integrativas, a Dra. Alice lidera a inovação acadêmica no UNIFACEX, conectando ciência e bem-estar de forma multidimensional.",
    img: s1,
    Icon: GraduationCap
  },
  { 
    id: "s2",
    name: "Eneida Carreiro", 
    fullName: "Dra. Eneida Carreiro",
    role: "Fisio. Dermatofuncional e Dra. em Biotecnologia", 
    shortRole: "Fisioterapeuta",
    description: "Especialista em biomecânica da beleza e biotecnologia aplicada, Dra. Eneida traz o que há de mais avançado em performance estética sustentável.",
    img: s2,
    Icon: Activity
  },
  { 
    id: "s3",
    name: "Bruna Covre", 
    fullName: "Dra. Bruna Covre",
    role: "Médica Endocrinologista e Funcional Integrativa", 
    shortRole: "Médica Endocrinologista",
    description: "Com foco na saúde hormonal e longevidade, Dra. Bruna guia mulheres à alta performance através do equilíbrio biológico e medicina de precisão.",
    img: s3,
    Icon: Stethoscope
  },
  { 
    id: "s4",
    name: "Raphael Almeida", 
    fullName: "Dr. Raphael Almeida",
    role: "Fisio. Esp. Traumato-Ortopedia e Método EDP", 
    shortRole: "Fisio. Traumato-Ortopedia",
    description: "Criador do Método EDP, Dr. Raphael é autoridade em reabilitação e otimização física, blindando o corpo para os desafios da liderança.",
    img: s4,
    Icon: Dumbbell
  },
  { 
    id: "s5",
    name: "Mitia Montenegro", 
    fullName: "Mitia Montenegro",
    role: "Psicóloga Esp. em Saúde Mental, TCC e Autismo", 
    shortRole: "Psicóloga Esp. Saúde Mental",
    description: "Especialista em resiliência emocional, Mitia trabalha a mente como o principal ativo da mulher de sucesso, focando em equilíbrio e clareza.",
    img: s5,
    Icon: Brain
  },
  { 
    id: "s6",
    name: "Wanderley Cunha", 
    fullName: "Wanderley Cunha",
    role: "CEO Vectax Produtora", 
    shortRole: "CEO Vectax",
    description: "Expert em comunicação e imagem corporativa, Wanderley ensina como projetar autoridade visual e impacto através da presença de marca.",
    img: s6,
    Icon: Building2
  },
  { 
    id: "s7",
    name: "Glenda Oliveira", 
    fullName: "Dra. Glenda Oliveira",
    role: "Biomédica, Esteticista e Mestre em Biotecnologia", 
    shortRole: "Biomédica",
    description: "Mestre em biotecnologia, Dra. Glenda une estética avançada e rigor científico para resultados de alta performance na imagem pessoal.",
    img: s7,
    Icon: Microscope
  },
  { 
    id: "s8",
    name: "Danielle Mafra", 
    fullName: "Danielle Mafra",
    role: "Superint. Regional SESI RN e Executiva em ESG", 
    shortRole: "Executiva em ESG",
    description: "Líder executiva de impacto, Danielle traz a visão estratégica de ESG e sustentabilidade para o desenvolvimento de carreiras femininas.",
    img: s8,
    Icon: Leaf
  },
  { 
    id: "s9",
    name: "Dani Maia", 
    fullName: "Dra. Dani Maia",
    role: "Dermatologista, CEO Clínica Daniela Maia", 
    shortRole: "Dermatologista",
    description: "Dermatologista e empresária, Dra. Dani Maia compartilha sua experiência em gestão e cuidado com a pele como base da autoconfiança.",
    img: s9,
    Icon: Sparkles
  },
  { 
    id: "s10",
    name: "Marina Aragão", 
    fullName: "Marina Aragão",
    role: "Cons. Empresarial e Coord. Carreiras IEL RN", 
    shortRole: "Cons. Empresarial",
    description: "Especialista em carreiras e mercado corporativo, Marina orienta sobre o posicionamento estratégico para alcançar o próximo nível.",
    img: s10,
    Icon: Target
  },
];

const SpeakersSection = () => {
  const [activeTab, setActiveTab] = useState(speakers[0].id);
  const activeSpeaker = speakers.find(s => s.id === activeTab) || speakers[0];

  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 relative overflow-hidden border-t border-[#ee6983]/10">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#ee6983] opacity-[0.02] blur-[200px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-[1400px] mx-auto px-5 lg:px-8">
        
        {/* Header Centralizado */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1px] bg-[#ee6983]/40" />
            <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
              Corpo Docente
            </p>
            <div className="w-8 h-[1px] bg-[#ee6983]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
            As Autoridades que <br className="hidden md:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              Transformarão Você
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
        <div className="grid grid-cols-1 lg:grid-cols-[390px_1fr_0.85fr] gap-4 lg:gap-8 items-stretch h-full">
          
          {/* Sidebar de Seletores - Alinhamento Perfeito de Altura */}
          <div className="grid grid-cols-2 grid-rows-5 gap-3 lg:gap-4 h-full">
            {speakers.map((speaker) => (
              <button
                key={speaker.id}
                onClick={() => setActiveTab(speaker.id)}
                className={`flex flex-col justify-between p-4 rounded-md border transition-all duration-300 text-left group overflow-hidden h-full ${
                  activeTab === speaker.id 
                    ? "bg-gradient-to-br from-[#ff7a94] to-[#c74c64] border-[#ee6983] shadow-[0_8px_25px_rgba(238,105,131,0.35)]" 
                    : "bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a] border-white/5 border-t-white/10 hover:border-white/15 hover:from-[#252525] hover:to-[#0f0f0f]"
                }`}
              >
                {/* Top Section: Avatar e Ícone */}
                <div className="flex items-start justify-between w-full mb-2">
                  <div className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-white/10 transition-colors duration-300 ${activeTab === speaker.id ? 'border-white/30' : ''}`}>
                    <img src={speaker.img} alt={speaker.name} className={`w-full h-full object-cover transition-all duration-500 scale-105 ${activeTab === speaker.id ? "grayscale-0" : "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"}`} />
                  </div>
                  <div className={`mt-0 transition-all duration-300 ${activeTab === speaker.id ? "opacity-100 scale-100" : "opacity-100 scale-95 group-hover:scale-100"}`}>
                    {speaker.Icon && <speaker.Icon stroke={activeTab === speaker.id ? "white" : "url(#iconGradient)"} strokeWidth={activeTab === speaker.id ? 1.5 : 1} className="w-7 h-7" />}
                  </div>
                </div>

                {/* Bottom Section: Nome e Cargo */}
                <div className="flex flex-col mt-auto w-full">
                  <span className={`text-[15px] sm:text-[16px] font-semibold whitespace-normal leading-tight transition-colors duration-300 ${
                    activeTab === speaker.id ? "text-white" : "text-white/80 group-hover:text-white"
                  }`}>
                    {speaker.name}
                  </span>
                  <span className={`text-[12px] sm:text-[13px] font-medium tracking-wide truncate transition-colors ${
                    activeTab === speaker.id ? "text-white/90" : "text-white/40 group-hover:text-white/60"
                  } mt-0.5`}>
                     {speaker.shortRole}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Imagem Central - MAIOR (Nivelada) */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-0 perspective-[1000px]">
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

          {/* Card de Bio - MAIOR (Nivelado) */}
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
                <div className="bg-gradient-to-br from-[#1f1f1f] via-[#111] to-[#080808] border border-white/5 border-t-white/10 hover:border-[#ee6983]/20 transition-all duration-500 rounded-2xl p-8 lg:p-10 flex flex-col justify-between h-full shadow-2xl relative">
                  <div>
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-3">
                      {activeSpeaker.fullName}
                    </h3>
                    
                    <div className="text-[#ee6983] text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.2em] mb-6 lg:mb-8 border-b border-white/5 pb-6">
                       {activeSpeaker.role}
                    </div>

                    <p className="text-white/60 text-base lg:text-lg xl:text-xl font-light leading-relaxed">
                      {activeSpeaker.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-end justify-between">
                    <span className="text-white/50 text-[9px] uppercase tracking-[0.5em] font-medium">FÓRUM 2026</span>
                    {activeSpeaker.Icon && <activeSpeaker.Icon className="w-12 h-12" stroke="url(#iconGradient)" strokeWidth={1} />}
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
