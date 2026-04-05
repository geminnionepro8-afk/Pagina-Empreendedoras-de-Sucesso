import { Target, Users, Presentation } from "lucide-react";
import aboutAudienceBg from "@/assets/about-audience-2.jpg";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-wrapper">
          {/* Layout Master Ultra-Slim: Magazine Style (1.2fr Texto | 0.8fr Imagem) */}
          <div className="about-top-grid-wrap">

            {/* ══ COLUNA DA ESQUERDA (ENXUTA & SÓLIDA) ══ */}
            <div className="about-top-left-wrapper flex flex-col h-full">

              {/* Caption Exclusiva MS 2026 */}
              <div className="section-caption-wrap">
                <p className="caption-text">MS 2026 · EXCLUSIVIDADE</p>
              </div>

              {/* Título - 2 Linhas / 42px */}
              <div className="about-title-wrap">
                <h2 className="about-title">
                  O QUE É O <br />
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                    FÓRUM DE ESTÉTICA E PERFORMANCE:
                  </span>
                </h2>
              </div>

              {/* Parágrafo Minimalista */}
              <div className="about-text-wrap">
                <p className="about-text">
                  Explore uma jornada de transformação no <strong>I Fórum de Estética e Performance da Mulher Empreendedora</strong> — um encontro pioneiro que reúne líderes femininas visionárias dispostas a ir além dos resultados financeiros.
                </p>
              </div>

              {/* Botão Travado a Esquerda */}
              <div className="about-button-wrap">
                <a href="#inscricao" className="primary-button">
                  <div className="button-text-wrap">
                    <div className="primary-button-text">Garantir Vaga</div>
                    <div className="primary-button-text-hover">Garantir Vaga</div>
                  </div>
                  <div className="button-icon-wrap">
                    <img src="https://cdn.prod.website-files.com/6825c2925e24e79e2bf4a9ed/68282e9440a929f1c3e5d3e8_Arrow-Up.png" loading="lazy" width="18" alt="" className="primary-button-icon" />
                  </div>
                </a>
              </div>

              {/* ══ OS 3 CARDS COMPACTOS (SINCRONIA DE BASE) ══ */}
              <div className="about-item-grid-wrap">
                <div className="about-single-item">
                  <div className="about-item-icon-wrap">
                    <Target className="w-7 h-7 text-[#ee6983]" />
                  </div>
                  <div className="about-item-text-wrap">
                    <h3 className="about-item-title">Autoridade</h3>
                    <p className="about-item-text">Alinhamento visual <br /> e imagem projetada.</p>
                  </div>
                </div>

                <div className="about-single-item">
                  <div className="about-item-icon-wrap">
                    <Users className="w-7 h-7 text-[#ee6983]" />
                  </div>
                  <div className="about-item-text-wrap">
                    <h3 className="about-item-title">Conexões</h3>
                    <p className="about-item-text">Alta decisão <br /> e networking de topo.</p>
                  </div>
                </div>

                <div className="about-single-item">
                  <div className="about-item-icon-wrap">
                    <Presentation className="w-7 h-7 text-[#ee6983]" />
                  </div>
                  <div className="about-item-text-wrap">
                    <h3 className="about-item-title">Referência</h3>
                    <p className="about-item-text">Saúde, estética <br /> e gestão estratégica.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ══ COLUNA DA DIREITA (IMAGEM SLIM / SINCRONIZADA) ══ */}
            <div className="about-top-right-wrapper h-full">
              <div className="about-image-card h-full">
                <img src={aboutAudienceBg} alt="Plateia do evento" className="about-image" />
                <div className="about-image-overlay" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        :root {
          --about-bg: #050505;
          --about-accent: #ee6983;
          --about-card-bg: #0d0d0d;
          --about-border: rgba(238, 105, 131, 0.08);
          --about-text-muted: rgba(255, 255, 255, 0.5);
        }

        .about-section {
          background-color: var(--about-bg);
          padding-top: 80px;
          padding-bottom: 80px;
          overflow: hidden;
        }

        .about-container {
          width: 100%;
          max-width: 1260px !important; /* Aumentado 15% a partir de 1100px */
          margin-left: auto;
          margin-right: auto;
          padding-left: 20px;
          padding-right: 20px;
        }

        .about-top-grid-wrap {
          grid-column-gap: 56px;
          grid-row-gap: 32px; /* Reduzindo gap vertical */
          grid-template-rows: auto;
          grid-template-columns: 1.15fr 0.85fr;
          display: grid;
          align-items: stretch;
        }

        .section-caption-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }

        .caption-text {
          color: var(--about-accent);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .about-title {
          color: white;
          font-size: 48px; /* Ligeiramente menor para ajudar na altura */
          font-weight: 200;
          line-height: 1.1;
          text-transform: uppercase;
          margin-bottom: 16px; /* Menor espaçamento */
          letter-spacing: -0.02em;
        }

        .about-text {
          color: var(--about-text-muted);
          font-size: 16px;
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 28px; /* Menor espaçamento */
        }

        .about-button-wrap {
          margin-top: 0px;
          margin-bottom: 36px; /* Menor espaçamento */
          display: flex;
          justify-content: flex-start;
        }

        .primary-button {
          background-color: var(--about-accent);
          color: #000;
          padding: 8px 10px 8px 24px;
          border-radius: 100px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          width: auto;
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
          background-color: #000;
          border-radius: 100px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-item-grid-wrap {
          grid-column-gap: 20px;
          grid-row-gap: 16px;
          grid-template-rows: auto;
          grid-template-columns: 1fr 1fr 1fr;
          display: grid;
          margin-top: auto;
        }

        .about-single-item {
          border: 1px solid var(--about-border);
          background-color: var(--about-card-bg);
          border-radius: 16px;
          padding: 20px 16px; /* Pad. menor para reduzir altura */
          transition: all 0.4s ease;
        }

        .about-single-item:hover {
          border-color: rgba(238, 105, 131, 0.2);
          transform: translateY(-4px);
        }

        .about-item-icon-wrap {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          width: 50px; /* Levemente menor */
          height: 50px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-item-title {
          color: white;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .about-item-text {
          color: rgba(255, 255, 255, 0.3);
          font-size: 14px;
          line-height: 1.4;
          font-weight: 300;
        }

        /* ══ IMAGEM (ESTREITA E SINCRONIZADA) ══ */
        .about-image-card {
          width: 100%;
          height: 100%;
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

        @media screen and (max-width: 1100px) {
          .about-title { font-size: 36px; }
          .about-top-grid-wrap { grid-template-columns: 1fr; }
          .about-top-right-wrapper { order: -1; min-height: 380px; }
        }

        @media screen and (max-width: 767px) {
          .about-item-grid-wrap { grid-template-columns: 1fr; margin-top: 32px; }
          .about-section { padding-top: 80px; padding-bottom: 80px; }
          .about-title { font-size: 32px; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
