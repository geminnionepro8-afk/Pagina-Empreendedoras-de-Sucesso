import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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

const teamMembers = [
  { name: "Prof. Dra. Alice Fuscella", role: "Coord. Odontologia UNIFACEX", bio: "Coordenadora de Odontologia e Práticas Integrativas no UNIFACEX, de forte liderança sistêmica.", img: s1 },
  { name: "Dra. Eneida Carreiro", role: "Doutora em Biotecnologia", bio: "Fisioterapeuta focada em Dermatofuncional e estética, com amplo Doutorado em Biotecnologia.", img: s2 },
  { name: "Dra. Bruna Covre", role: "Médica Endocrinologista", bio: "Médica Endocrinologista de grande referência em Medicina Funcional Integrativa e longevidade.", img: s3 },
  { name: "Dr. Raphael Almeida", role: "Fisioterapeuta e Empreendedor", bio: "Especialista em Disfunções da Coluna e Ortopedia. Criador do Método EDP e Coordenador Unifasex.", img: s4 },
  { name: "Mitia Montenegro", role: "Esp. Saúde Mental e Autismo", bio: "Psicóloga com profunda expertise em saúde mental, neurobiologia, TCC e tratamentos do autismo.", img: s5 },
  { name: "Wanderley Cunha", role: "CEO Vectax Produtora", bio: "Diretor criativo e CEO da Vectax, produtora responsável por líderes de software como Clickmassa.", img: s6 },
  { name: "Dra. Glenda Oliveira", role: "Mestre em Biotecnologia", bio: "Esteticista e Biomédica consolidada desde 1996, unindo a prática e o Mestrado em Biotecnologia.", img: s7 },
  { name: "Danielle Mafra", role: "Superintendente SESI RN", bio: "Líder Executiva Regional do SESI RN, com mestrado em governança de sustentabilidade pela Nova SBE.", img: s8 },
  { name: "Dra. Dani Maia", role: "Dermatologista e CEO", bio: "Médica Dermatologista de altíssimo nível, fundadora e gestora da renomada Clínica Daniela Maia.", img: s9 },
  { name: "Marina Aragão", role: "Coord. Educação IEL RN", bio: "Especialista em Consultoria Empresarial e líder das frentes ativas de carreira no IEL RN.", img: s10 },
];

const TeamSection = () => {
  return (
    <section className="team">
      <div className="container">
        <div className="team-wrapper">
          <div className="team-one-top-wrapper">
            <div className="team-one-top-grid-wrap">
              <div className="team-one-top-left-wrapper">
                <SectionLabel text="Mentes de Alto Impacto" />
                <div className="team-one-title-wrap">
                  <h2 className="team-title">
                    Lideranças que moldam <br />
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                      o próximo nível
                    </span>
                  </h2>
                </div>
              </div>
              <div className="team-one-top-right-wrapper">
                <Link to="/inscricao" className="primary-button appointment-button w-inline-block">
                  <div className="button-text-wrap">
                    <div className="primary-button-text">Garantir Vaga</div>
                    <div className="primary-button-text-hover">Garantir Vaga</div>
                  </div>
                  <div className="button-icon-wrap">
                    <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                </Link>
              </div>
            </div>
            <img 
              src="https://cdn.prod.website-files.com/6825c2925e24e79e2bf4a9ed/682b0e1e1e3a1d317c72222f_Vector.png" 
              loading="lazy" 
              alt="" 
              className="team-top-line" 
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(56%) sepia(51%) saturate(1637%) hue-rotate(307deg) brightness(97%) contrast(93%)', 
                opacity: 0.8 
              }} 
            />
          </div>
          <div className="team-cards-wrapper">
            <div className="teams-collection-list w-dyn-list">
              <div role="list" className="team-cards-grid-wrap w-dyn-items">
                {teamMembers.map((member, i) => (
                  <div key={i} role="listitem" className="w-dyn-item">
                    <div className="team-single-card">
                      <div className="team-card-wrapper">
                        <div className="team-card-content-wrap">
                          <img src={member.img} loading="lazy" alt={member.name} className="team-member-image" />
                        </div>
                        <div className="team-card-content-wrap back">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="team-card-top-wrap">
                                <div className="team-card-image-wrap">
                                  <img src={member.img} loading="lazy" alt="" className="team-member-image" style={{ borderRadius: '8px' }}/>
                                </div>
                              </div>
                              <div className="team-maember-info-wrapper">
                                <div className="member-name-wrap mb-1">
                                  <div className="text-[26px] xl:text-[30px] font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 leading-tight">
                                    {member.name}
                                  </div>
                                </div>
                                <div className="team-text-wrap mb-4">
                                  <div className="text-[#ee6983] font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Experiência:</div>
                                  <p className="text-white text-[13px] font-medium leading-[1.4]">{member.role}</p>
                                </div>
                                <div className="bio-wrap">
                                  <p className="text-white/80 text-[14px] lg:text-[15px] font-light leading-[1.7] pr-2">
                                    {member.bio}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-full mt-4">
                              <div className="flex justify-center items-center w-full bg-gradient-to-r from-[#ee6983] to-[#c74c64] py-3 rounded-full text-white font-bold uppercase tracking-widest text-[11px] sm:text-[12px] shadow-lg border border-[#ee6983]/30">
                                {member.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --team-bg: #050505;
          --team-card-bg: #111111;
          --team-border: rgba(255, 255, 255, 0.1);
          --team-accent: #ee6983;
          --team-text: #ffffff;
          --team-text-muted: rgba(255, 255, 255, 0.4);
        }

        .team {
          background-color: var(--team-bg);
          padding-top: 132px;
          padding-bottom: 132px;
          overflow: hidden;
          position: relative;
        }

        .container {
          width: 100%;
          max-width: 1560px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 20px;
          padding-right: 20px;
        }

        .team-one-top-wrapper {
          margin-bottom: 64px;
          position: relative;
        }

        .team-one-top-grid-wrap {
          grid-column-gap: 20px;
          grid-row-gap: 20px;
          grid-template-rows: auto;
          grid-template-columns: 1fr auto;
          display: grid;
          align-items: flex-end;
        }

        .section-caption-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .caption-text {
          color: var(--team-accent);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.4em;
          font-size: 11px;
        }

        .team-title {
          color: var(--team-text);
          font-size: clamp(34px, 8vw, 56px);
          font-weight: 200;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .primary-button {
          background-color: var(--team-accent);
          color: white;
          padding: 14px 32px;
          border-radius: 100px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .button-text-wrap {
          display: block;
          position: relative;
          height: 14px;
          overflow: hidden;
        }

        .primary-button-text {
          display: block;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .primary-button-text-hover {
          position: absolute;
          top: 100%;
          left: 0;
          display: block;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .primary-button:hover .primary-button-text {
          transform: translateY(-100%);
        }

        .primary-button:hover .primary-button-text-hover {
          transform: translateY(-100%);
        }

        .team-top-line {
          width: 100%;
          margin-top: 48px;
          opacity: 0.3;
        }

        .team-cards-grid-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px 16px;
          margin: 0 auto;
        }

        .team-cards-grid-wrap .w-dyn-item {
          flex: 0 1 calc(20% - 16px);
          min-width: 250px;
        }

        .team-single-card {
          perspective: 2500px;
          cursor: pointer;
          width: 100%;
        }

        .team-card-wrapper {
          width: 100%;
          height: clamp(440px, 65vh, 520px);
          position: relative;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .team-single-card:hover .team-card-wrapper {
          transform: rotateY(180deg);
        }

        .team-card-content-wrap {
          border: 1px solid var(--team-border);
          background-color: var(--team-card-bg);
          backface-visibility: hidden;
          border-radius: 20px;
          position: absolute;
          inset: 0%;
          overflow: hidden;
        }

        .team-member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.8s ease;
        }

        .team-single-card:hover .team-member-image {
          transform: scale(1.05);
        }

        .team-card-content-wrap.back {
          transform: rotateY(180deg);
          padding: 24px;
          background-color: #0c0c0c;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .team-card-top-wrap {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .team-card-image-wrap {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .team-member-name {
          color: white;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.1;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: none; /* Substituído pelo layout inline Neo-design */
        }

        .experience-info-title {
          color: var(--team-accent);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .experience-text {
          color: white;
          font-size: 14px;
          line-height: 1.4;
          font-weight: 500;
        }

        .secondary-button {
          background: white;
          color: black;
          padding: 12px 20px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 9px;
          display: block;
          text-align: center;
          transition: all 0.3s ease;
          width: fit-content;
          margin: 0 auto;
        }

        .secondary-button:hover {
          background: var(--team-accent);
          color: white;
        }

        @media screen and (max-width: 1400px) {
          .team-cards-grid-wrap .w-dyn-item {
            flex: 0 1 calc(25% - 16px);
          }
        }

        @media screen and (max-width: 1150px) {
          .team-cards-grid-wrap .w-dyn-item {
            flex: 0 1 calc(33.333% - 16px);
          }
          .team-title {
            font-size: 42px;
          }
        }

        @media screen and (max-width: 1024px) {
          .team-one-top-grid-wrap {
            grid-template-columns: 1fr;
            text-align: center;
            align-items: center;
            gap: 24px;
          }
          .team-one-top-left-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .team-one-top-right-wrapper {
            display: flex;
            justify-content: center;
            width: 100%;
          }
          .team { padding-top: 80px; padding-bottom: 80px; }
        }

        @media screen and (max-width: 850px) {
          .team-cards-grid-wrap .w-dyn-item {
            flex: 0 1 calc(50% - 16px);
            min-width: 200px;
          }
          .team-card-wrapper {
            height: clamp(400px, 60vh, 480px);
          }
        }

        @media screen and (max-width: 479px) {
          .team-cards-grid-wrap .w-dyn-item {
            flex: 0 1 100%;
          }
          .team-title {
            font-size: 36px;
          }
          .team-one-top-wrapper { margin-bottom: 48px; }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
