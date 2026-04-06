import { CalendarFold, MapPin, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import eventInfoImg from "@/assets/event-info-image.jpg";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-wrapper">
          {/* Layout Master Ultra-Slim: Magazine Style (1.2fr Texto | 0.8fr Imagem) */}
          <div className="about-top-grid-wrap">

            {/* ══ COLUNA DA ESQUERDA (ENXUTA & SÓLIDA) ══ */}
            <div className="about-top-left-wrapper flex flex-col h-full">
              {/* Definição de Gradiente SVG */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="aboutIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#ffcce0" offset="0%" />
                    <stop stopColor="#ee6983" offset="50%" />
                    <stop stopColor="#9b2d41" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Caption Oficial (Laço Rosa Standard) */}
              <SectionLabel text="SOBRE A IMERSÃO" />

              {/* Título - Forçado em 2 Linhas via Grid e nowraps lógicos */}
              <div className="about-title-wrap">
                <h2 className="about-title">
                  A EVOLUÇÃO DAS <br />
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                    MULHERES DE SUCESSO
                  </span>
                </h2>
              </div>

              {/* Parágrafo Enxuto, Maior e Brilhante */}
              <div className="about-text-wrap">
                <p className="about-text leading-relaxed">
                  Crie raízes sólidas entre as líderes do Nordeste. Uma imersão pioneira focada em não deixar sua saúde mental e física para depois enquanto você escala seus lucros. Construa alianças comerciais e absorva toda a medicina integrativa a favor da sua rotina.
                </p>
              </div>

              {/* Botão Travado a Esquerda */}
              <div className="about-button-wrap">
                <Link to="/inscricao" className="primary-button group">
                  <div className="button-text-wrap">
                    <div className="primary-button-text">Garantir Vaga</div>
                    <div className="primary-button-text-hover">Garantir Vaga</div>
                  </div>
                  <div className="button-icon-wrap transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4 text-[#ffcce0]" strokeWidth={2.5} />
                  </div>
                </Link>
              </div>

              {/* ══ OS 3 CARDS COMPACTOS (LOGÍSTICA INVERTIDA) ══ */}
              <div className="about-item-grid-wrap">
                <div className="about-single-item relative overflow-visible group">
                  <div className="about-item-icon-wrap relative z-10">
                    <CalendarFold className="w-6 h-6" stroke="url(#aboutIconGradient)" strokeWidth={1.5} />
                  </div>
                  <div className="about-item-text-wrap relative z-10">
                    <h3 className="about-item-title tracking-tight">Data</h3>
                    <p className="about-item-text font-medium text-white/70">17 e 18 de <br /> Abril de 2026</p>
                  </div>
                </div>

                <div className="about-single-item relative overflow-visible group">
                  <div className="about-item-icon-wrap relative z-10">
                    <Clock className="w-6 h-6" stroke="url(#aboutIconGradient)" strokeWidth={1.5} />
                  </div>
                  <div className="about-item-text-wrap relative z-10">
                    <h3 className="about-item-title tracking-tight">Horário</h3>
                    <p className="about-item-text font-medium text-white/70">Abertura: 08h <br /> Fechamento: 21h30</p>
                  </div>
                </div>

                <div className="about-single-item relative overflow-visible group">
                  <div className="about-item-icon-wrap relative z-10">
                    <MapPin className="w-6 h-6" stroke="url(#aboutIconGradient)" strokeWidth={1.5} />
                  </div>
                  <div className="about-item-text-wrap relative z-10">
                    <h3 className="about-item-title tracking-tight">Local</h3>
                    <p className="about-item-text font-medium text-white/70">UNIFACEX <br /> Capim Macio</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ══ COLUNA DA DIREITA (NOVA IMAGEM AUDITÓRIO) ══ */}
            <div className="about-top-right-wrapper h-full">
              <div className="about-image-card h-[550px] border border-[rgba(238,105,131,0.15)] shadow-[0_0_40px_rgba(0,0,0,0.8)] relative group">
                <img src={eventInfoImg} alt="Auditório do evento Unifacex" className="about-image transition-transform duration-[2s] group-hover:scale-105" />
                <div className="about-image-overlay" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        :root {
          --about-bg: #121212;
          --about-accent: #ee6983;
          --about-card-bg: #0d0d0d;
          --about-border: rgba(238, 105, 131, 0.08);
          --about-text-muted: rgba(255, 255, 255, 0.5);
        }

        .about-section {
          background-color: var(--about-bg);
          padding-top: clamp(40px, 5vh, 80px);
          padding-bottom: clamp(40px, 5vh, 80px);
          overflow: hidden;
        }

        .about-container {
          width: 100%;
          max-width: 1260px;
          margin-left: auto;
          margin-right: auto;
          padding-left: clamp(20px, 4vw, 40px);
          padding-right: clamp(20px, 4vw, 40px);
        }

        .about-top-grid-wrap {
          grid-column-gap: clamp(24px, 4vw, 56px);
          grid-row-gap: 32px; 
          grid-template-rows: auto;
          grid-template-columns: 1.15fr 0.85fr;
          display: grid;
          align-items: stretch;
        }

        .section-caption-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .section-caption-text {
          color: #ee6983;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4em;
          text-transform: uppercase;
        }

        .about-title {
          color: white;
          font-size: clamp(34px, 10vw, 52px);
          font-weight: 200;
          line-height: 1.05;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }

        .about-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(15px, 1.1vw, 17px);
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 32px;
        }

        .about-button-wrap {
          margin-top: 0px;
          margin-bottom: 36px;
          display: flex;
          justify-content: flex-start;
        }

        .primary-button {
          background: linear-gradient(135deg, #ee6983 0%, #b6304b 100%);
          border: 1px solid rgba(238, 105, 131, 0.4);
          color: #fff;
          padding: 6px 8px 6px 20px;
          border-radius: 100px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          width: auto;
          box-shadow: 0 4px 15px rgba(238, 105, 131, 0.2);
        }

        .button-text-wrap {
          display: block;
          position: relative;
          height: 20px;
          overflow: hidden;
        }

        .primary-button-text, .primary-button-text-hover {
          display: block;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .primary-button-text-hover { position: absolute; top: 100%; left: 0; }
        .primary-button:hover .primary-button-text { transform: translateY(-100%); }
        .primary-button:hover .primary-button-text-hover { transform: translateY(-100%); }

        .button-icon-wrap {
          background-color: #7a1229;
          border-radius: 100px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-item-grid-wrap {
          grid-column-gap: clamp(12px, 1.5vw, 20px);
          grid-row-gap: 16px;
          grid-template-rows: auto;
          grid-template-columns: 1fr 1fr 1fr;
          display: grid;
          margin-top: auto;
        }

        .about-single-item {
          background: linear-gradient(135deg, #1f1f1f 0%, #111111 50%, #080808 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: clamp(16px, 2vw, 24px);
          min-height: clamp(140px, 15vh, 165px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 8px 30px -10px rgba(0,0,0,0.5);
        }

        .about-single-item:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.04) translateY(-4px);
          z-index: 10;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }

        .about-item-icon-wrap {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          width: clamp(40px, 3.5vw, 48px); 
          height: clamp(40px, 3.5vw, 48px);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-item-title {
          color: white;
          font-size: clamp(16px, 1.5vw, 20px);
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .about-item-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.5;
          font-weight: 300;
        }

        /* ══ IMAGEM (ESTREITA E SINCRONIZADA) ══ */
        .about-image-card {
          width: 100%;
          height: 100%;
          min-height: clamp(350px, 50vh, 550px);
          max-height: none;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.85;
        }

        .about-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(35deg, rgba(5,5,5,0.4) 0%, transparent 60%);
        }

        @media screen and (max-width: 1024px) {
          .about-title { font-size: 38px; }
          .about-top-grid-wrap { grid-template-columns: 1fr; }
          .about-top-right-wrapper { order: -1; min-height: 380px; }
          .about-item-grid-wrap { grid-template-columns: 1fr 1fr; }
        }

        @media screen and (max-width: 767px) {
          .about-item-grid-wrap { 
            grid-template-columns: 1fr; 
            margin-top: 32px; 
            gap: 12px;
          }
          .about-single-item {
            min-height: auto;
            padding: 18px;
            border-radius: 16px;
          }
          .about-item-icon-wrap {
            width: 38px;
            height: 38px;
            margin-bottom: 12px;
          }
          .about-item-icon-wrap svg {
            width: 18px;
            height: 18px;
          }
          .about-item-title {
            font-size: 16px;
            margin-bottom: 4px;
          }
          .about-section { padding-top: 60px; padding-bottom: 60px; }
          .about-title { font-size: 34px; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
