import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
  { name: "Alice Fuscella", role: "12 years in -centered care.", bio: "Especialista em gestão de saúde e bem-estar corporativo, traz mais de uma década de experiência transformando a cultura organizacional através da liderança feminina inspiradora.", img: s1 },
  { name: "Eneida Carreiro", role: "Mindfulness Coach Specialist", bio: "Doutora em caminhos de inovação, focando em como a tecnologia e o fator humano se fundem para criar novos paradigmas de sucesso sustentável para empreendedoras.", img: s2 },
  { name: "Bruna Covre", role: "Emotional Wellness Advisor", bio: "Referência em performance feminina, Bruna explora as fronteiras da medicina integrada para otimizar a saúde de mulheres que ocupam posições de alta liderança.", img: s3 },
  { name: "Raphael Almeida", role: "Cognitive Behavior Therapist", bio: "Fundador de metodologias disruptivas na saúde, Raphael compartilha sua visão de como a fisiologia impacta diretamente as decisões de negócios de alto nível.", img: s4 },
  { name: "Mitia Montenegro", role: "Trauma Recovery Expert", bio: "Psicóloga com foco em alta performance, ajuda líderes a navegar por ambientes de alta pressão mantendo a integridade emocional e o equilíbrio mental.", img: s5 },
  { name: "Wanderley Cunha", role: "CEO Vectax", bio: "Consultor estratégico e gestor de grandes contas nacionais, Wanderley traz uma visão de mercado robusta sobre governança e crescimento exponencial.", img: s6 },
  { name: "Glenda Oliveira", role: "Mestre em Biotecnologia", bio: "Pesquisadora e mentora, Glenda aplica a ciência à rotina de negócios para criar processos mais eficientes e baseados em dados sólidos.", img: s7 },
  { name: "Danielle Mafra", role: "Executiva em ESG", bio: "Líder em sustentabilidade corporativa, Danielle orienta sobre como construir marcas que não apenas lucram, mas geram impacto real e duradouro no mundo.", img: s8 },
  { name: "Dani Maia", role: "Dermatologista", bio: "Especialista em estética e saúde, foca na autoestima como pilar fundamental da autoconfiança para mulheres empreendedoras de sucesso.", img: s9 },
  { name: "Marina Aragão", role: "Cons. Empresarial", bio: "Mentora de negócios focada em escala, sua consultoria ajuda empreendedoras a estruturarem suas empresas para o crescimento autogerenciável.", img: s10 },
];

const TeamSection = () => {
  return (
    <section className="team">
      <div className="container">
        <div className="team-wrapper">
          <div className="team-one-top-wrapper">
            <div className="team-one-top-grid-wrap">
              <div className="team-one-top-left-wrapper">
                <div className="section-caption-wrap">
                  <div className="w-6 h-[1px] bg-[#ee6983]/40" />
                  <p className="caption-text">Team Member</p>
                  <div className="w-6 h-[1px] bg-[#ee6983]/40" />
                </div>
                <div className="team-one-title-wrap">
                  <h2 className="team-title">
                    Lideranças que <br />
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                      constroem o futuro.
                    </span>
                  </h2>
                </div>
              </div>
              <div className="team-one-top-right-wrapper">
                <a href="#inscricao" className="primary-button appointment-button w-inline-block">
                  <div className="button-text-wrap">
                    <div className="primary-button-text">Garantir Vaga</div>
                    <div className="primary-button-text-hover">Garantir Vaga</div>
                  </div>
                  <div className="button-icon-wrap">
                    <img src="https://cdn.prod.website-files.com/6825c2925e24e79e2bf4a9ed/68282e9440a929f1c3e5d3e8_Arrow-Up.png" loading="lazy" width="20" alt="" className="primary-button-icon"/>
                  </div>
                </a>
              </div>
            </div>
            <img src="https://cdn.prod.website-files.com/6825c2925e24e79e2bf4a9ed/682b0e1e1e3a1d317c72222f_Vector.png" loading="lazy" alt="" className="team-top-line"/>
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
                                <div className="member-name-wrap">
                                  <div className="team-member-name">{member.name}</div>
                                </div>
                                <div className="team-text-wrap">
                                  <div className="experience-info-title">Experiência:</div>
                                  <p className="experience-text">{member.role}</p>
                                </div>
                                <div className="bio-wrap mt-4">
                                  <p className="text-white/40 text-[14px] leading-relaxed italic line-clamp-6">
                                    "{member.bio}"
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="team-card-button-wrap mt-6">
                              <a href="#" className="secondary-button w-inline-block">
                                <div>Sobre {member.name.split(' ')[0]}</div>
                              </a>
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
          --team-border: rgba(238, 105, 131, 0.15);
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
          margin-bottom: 24px;
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
          font-size: 56px;
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
          opacity: 0.1;
        }

        .team-cards-grid-wrap {
          grid-column-gap: 16px;
          grid-row-gap: 40px;
          grid-template-columns: repeat(5, 1fr);
          display: grid;
        }

        .team-single-card {
          perspective: 2500px;
          cursor: pointer;
        }

        .team-card-wrapper {
          width: 100%;
          height: 480px;
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
          padding: 32px;
          background-color: #0c0c0c;
          border-color: var(--team-accent);
        }

        .team-card-top-wrap {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 24px;
        }

        .team-card-image-wrap {
          width: 90px;
          height: 90px;
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
        }

        .secondary-button:hover {
          background: var(--team-accent);
          color: white;
        }

        @media screen and (max-width: 1400px) {
          .team-cards-grid-wrap {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media screen and (max-width: 1100px) {
          .team-cards-grid-wrap {
            grid-template-columns: repeat(3, 1fr);
          }
          .team-title {
            font-size: 42px;
          }
        }

        @media screen and (max-width: 767px) {
          .team-cards-grid-wrap {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-card-wrapper {
            height: 480px;
          }
        }

        @media screen and (max-width: 479px) {
          .team-cards-grid-wrap {
            grid-template-columns: 1fr;
          }
          .team-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
