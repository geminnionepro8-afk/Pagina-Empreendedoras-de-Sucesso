import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/[0.05] bg-[#020202] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Voltar</span>
          </Link>
          <img src="/images/logo-instituto-trimmed.webp" alt="Logo" className="h-8 object-contain" />
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Termos de Uso e Políticas</h1>
          <p className="text-white/40 text-sm md:text-base leading-relaxed">
            Leia atentamente as condições de uso, privacidade e proteção intelectual associadas ao site do I Fórum da Mulher Empreendedora.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#ee6983] uppercase tracking-widest border-b border-white/10 pb-3">1. Propriedade Intelectual da Plataforma</h2>
          <p className="text-white/70 leading-relaxed font-medium">
            A estrutura tecnológica, código-fonte, automações de vendas e design de interface deste website são de propriedade intelectual da <strong className="text-white">Upsiden</strong>, licenciados exclusivamente para o uso do evento I Fórum da Mulher Empreendedora. A reprodução, cópia, ou modificação de qualquer elemento sistêmico sem autorização expressa constitui violação de direitos autorais protegidos por lei.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#ee6983] uppercase tracking-widest border-b border-white/10 pb-3">2. Propriedade de Conteúdo</h2>
          <p className="text-white/70 leading-relaxed font-medium">
            Textos descritivos, informações sobre palestrantes, fotos, vídeos publicitários e promessas relativas ao evento são de propriedade exclusiva e responsabilidade legal do Instituto Mulheres de Sucesso Brasileiras. A Upsiden isenta-se de qualquer responsabilidade sobre o conteúdo curado e veiculado através desta plataforma.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#ee6983] uppercase tracking-widest border-b border-white/10 pb-3">3. Políticas de Credenciamento e Vagas</h2>
          <p className="text-white/70 leading-relaxed font-medium">
            Todas as credenciais são nominais e intransferíveis. O acesso ao evento está condicionado à confirmação do pagamento via PIX, onde a validação ocorre unicamente pelo envio do comprovante aprovado pela organização. Reservamo-nos o direito de encerrar as vendas a qualquer momento após o atingimento da capacidade máxima do local.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#ee6983] uppercase tracking-widest border-b border-white/10 pb-3">4. Proteção de Dados (LGPD)</h2>
          <p className="text-white/70 leading-relaxed font-medium">
            Garantimos o sigilo dos seus dados de cadastro. As informações solicitadas durante o processo de inscrição (Nome, CPF, E-mail e Telefone) são utilizadas única e exclusivamente para a finalidade de emissão da sua credencial, confecção de certificados e comunicação transacional a respeito do evento, não sendo comercializadas em nenhuma circunstância.
          </p>
        </section>

        <footer className="pt-12 text-center text-white/30 text-xs">
          Última atualização: Abril de 2024
        </footer>
      </main>
    </div>
  );
};

export default Terms;
