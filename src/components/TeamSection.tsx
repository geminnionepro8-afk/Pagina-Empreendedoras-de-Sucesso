import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/ui/SectionLabel";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Optimized WebP imports
import s11 from "@/assets/speakers/11.webp";
import s12 from "@/assets/speakers/12.webp";
import s13 from "@/assets/speakers/13.webp";
import s14 from "@/assets/speakers/14.webp";

// Placeholders for blur-up
import s11ph from "@/assets/speakers/11.placeholder.webp";
import s12ph from "@/assets/speakers/12.placeholder.webp";
import s13ph from "@/assets/speakers/13.placeholder.webp";
import s14ph from "@/assets/speakers/14.placeholder.webp";

const teamMembers = [
  { 
    name: "Prof. MSc. Lucia Leandro", 
    role: "CEO Mulheres de Sucesso", 
    bio: "CEO do Instituto Mulheres de Sucesso Brasileiras e Coordenadora do MBA em Gestão de Liderança Feminina UNIFACEX.", 
    img: s14,
    placeholder: s14ph
  },
  { 
    name: "Candysse Figueiredo", 
    role: "Reitora do UNIFACEX", 
    bio: "Lidera a gestão acadêmica com excelência e inovação institucional, trazendo uma visão vibrante e acessível para a alta gestão educacional.", 
    img: s13,
    placeholder: s13ph
  },
  { 
    name: "Prof. Celly Franck", 
    role: "Pró Reitor Acadêmico", 
    bio: "Pró Reitor Acadêmico do UNIFACEX, conciliando o rigor acadêmico com uma postura de liderança moderna, equilibrada e próxima.", 
    img: s11,
    placeholder: s11ph
  },
  { 
    name: "Dra. Rossana Ferreira", 
    role: "Advogada do Instituto", 
    bio: "Advogada do Instituto Mulheres de Sucesso Brasileiras, combinando seriedade jurídica com elegância e sofisticação estratégica.", 
    img: s12,
    placeholder: s12ph
  },
];

const TeamSection = () => {
  return (
    <section className="team">
      <div className="container">
        <div className="team-wrapper">
          <div className="team-one-top-wrapper">
            <div className="team-one-top-grid-wrap">
              <div className="team-one-top-left-wrapper">
                <SectionLabel text="Governança Executiva" />
                <div className="team-one-title-wrap">
                  <h2 className="team-title">
                    A Força por Trás <br />
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                      Do Instituto
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
                          <OptimizedImage
                            src={member.img}
                            placeholderSrc={member.placeholder}
                            alt={member.name}
                            objectPosition="top"
                          />
                        </div>
                        <div className="team-card-content-wrap back">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="team-card-top-wrap">
                                <div className="team-card-image-wrap">
                                  <OptimizedImage
                                    src={member.img}
                                    placeholderSrc={member.placeholder}
                                    alt={member.name}
                                    objectPosition="top"
                                    style={{ borderRadius: '8px' }}
                                  />
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
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin: 0 auto;
          width: 100%;
        }

        .team-cards-grid-wrap .w-dyn-item {
          width: 100%;
        }

        .team-single-card {
          perspective: 2500px;
          cursor: pointer;
          width: 100%;
        }

        .team-card-wrapper {
          width: 100%;
          height: clamp(500px, 75vh, 650px);
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
          margin-bottom: 32px;
        }

        .team-card-image-wrap {
          width: 180px;
          height: 180px;
          border-radius: 16px;
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
          .team-cards-grid-wrap {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (max-width: 1150px) {
          .team-title {
            font-size: clamp(32px, 6vw, 42px);
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
          .team-card-wrapper {
            height: 500px;
          }
        }

        @media screen and (max-width: 640px) {
          .team-cards-grid-wrap {
            grid-template-columns: 1fr;
          }
        }

        @media screen and (max-width: 479px) {
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
