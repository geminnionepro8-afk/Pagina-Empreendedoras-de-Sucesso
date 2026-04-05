import { motion } from "framer-motion";
import mainImg from "@/assets/service-main.png";
import cardImg from "@/assets/service-card.png";

const InstitutionalSection = () => {
  return (
    <section className="service-section">
      <div className="container service-container">
        <div className="service-wrapper">
          
          {/* ══ CONTEÚDO DA ESQUERDA (TÍTULO + CARD) ══ */}
          <div className="service-content-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="service-text-wrap"
            >
              <h2 className="service-title">
                Tire suas dúvidas <br />
                <span className="inline-pill-wrap">
                  <img src={cardImg} alt="" className="pill-img" />
                </span>
                {" "}e garanta sua vaga!
              </h2>
            </motion.div>

            {/* CARD FLUTUANTE (SUPORTE) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="service-float-card"
            >
              <div className="card-image-wrap">
                <img src={cardImg} alt="Atendimento" className="card-img" />
              </div>
              <div className="card-info-wrap">
                <h3 className="card-title">Suporte 100% Humano e Imediato!</h3>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="card-button">
                  Chamar agora!
                </a>
              </div>
            </motion.div>
          </div>

          {/* ══ IMAGEM DA DIREITA (MAIN LAPTOP) ══ */}
          <div className="service-image-col">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="main-image-wrap"
            >
              <img src={mainImg} alt="Atendimento no Notebook" className="main-service-img" />
              <div className="main-image-overlay" />
            </motion.div>
          </div>

        </div>
      </div>

      <style>{`
        .service-section {
          background-color: #050505;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        /* Curva de fundo inspirada na Mentara */
        .service-section::before {
          content: "";
          position: absolute;
          top: -20%;
          right: -10%;
          width: 80%;
          height: 140%;
          background: radial-gradient(circle at center, rgba(238, 105, 131, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          transform: rotate(-15deg);
          pointer-events: none;
        }

        .service-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .service-wrapper {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        /* ── TÍTULO E PILL ── */
        .service-title {
          color: white;
          font-size: 54px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 40px;
        }

        .inline-pill-wrap {
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          background: #111;
          padding: 4px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 48px;
          width: 84px;
          overflow: hidden;
          margin: 0 8px;
        }

        .pill-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100px;
        }

        /* ── CARD FLUTUANTE ── */
        .service-float-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 20px;
          max-width: 280px;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
        }

        .card-image-wrap {
          width: 100%;
          height: 140px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-title {
          color: white;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 16px;
        }

        .card-button {
          display: block;
          width: 100%;
          background: #ee6983; /* Cor da marca */
          color: white;
          text-align: center;
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .card-button:hover {
          background: #ff7c96;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(238, 105, 131, 0.3);
        }

        /* ── IMAGEM PRINCIPAL ── */
        .main-image-wrap {
          width: 100%;
          height: 540px;
          border-radius: 32px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
        }

        .main-service-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5, 5, 5, 0.6), transparent);
        }

        /* ── RESPONSIVO ── */
        @media (max-width: 1024px) {
          .service-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .service-title { font-size: 42px; }
          .service-float-card { margin: 0 auto; }
          .main-image-wrap { height: 400px; }
          .inline-pill-wrap { height: 36px; width: 64px; }
        }

        @media (max-width: 768px) {
          .service-section { padding: 60px 0; }
          .service-title { font-size: 32px; }
          
          /* Mobile Stack: Title -> Card -> Main Image */
          .service-content-col {
            display: flex;
            flex-direction: column;
          }
          
          .service-text-wrap { order: 1; margin-bottom: 40px; }
          .service-float-card { order: 2; margin-bottom: 40px; }
          .service-image-col { order: 3; }
        }
      `}</style>
    </section>
  );
};

export default InstitutionalSection;
