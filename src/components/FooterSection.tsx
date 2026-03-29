import { Instagram, Facebook, Youtube, ShieldCheck, Mail, MapPin } from "lucide-react";

const FooterSection = () => (
  <footer className="bg-[#0a0a0a] relative overflow-hidden">
    {/* Subtle top glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#ee6983]/50 to-transparent" />

    {/* Navigation & Info Section */}
    <section className="py-20 relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-[0.3em] text-[#ee6983] uppercase">Instituto</span>
              <span className="text-xl font-black tracking-tight text-white leading-tight">
                Mulheres de Sucesso<br/><span className="text-[#ee6983]">Brasileiras</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              O I Fórum de Estética e Performance da Mulher Empreendedora. Uma imersão completa em saúde integrativa, estética avançada e liderança feminina de alto impacto.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, link: "#" },
                { Icon: Facebook, link: "#" },
                { Icon: Youtube, link: "#" },
              ].map(({ Icon, link }, i) => (
                <a key={i} href={link} className="w-10 h-10 rounded-[5%] bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#ee6983] hover:border-[#ee6983] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">Local e Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ee6983] flex-shrink-0 mt-0.5" />
                <span className="text-white/40 text-sm leading-relaxed">UNIFACEX - Campus Capim Macio<br/>Natal – RN, CEP 59082-100</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ee6983] flex-shrink-0" />
                <span className="text-white/40 text-sm leading-relaxed">Informações: 84 9 9868 2061<br/>Prof. MSc. Lucia Leandro</span>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">Compra Segura</h4>
            <p className="text-white/40 text-sm">
              Ambiente protegido. Seus dados estão criptografados e 100% seguros.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-[5%] w-fit">
                <ShieldCheck className="w-5 h-5 text-[#ee6983]" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Site Seguro SSL</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-[5%] w-fit">
                <ShieldCheck className="w-5 h-5 text-[#ee6983]" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Kiwify Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Footer Bottom */}
    <section className="bg-background py-6 border-t border-white/5">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-white/30 tracking-wide text-center md:text-left">
          Copyright &copy; {new Date().getFullYear()} Instituto Mulheres de Sucesso Brasileiras / Todos os direitos reservados.
          <br className="hidden md:block"/> CNPJ: 59.418.846/0001-99
        </p>
        
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[10px] text-white/20 text-center md:text-right max-w-md">
          <p>Este site não faz parte do Facebook Inc. e não é endossado pelo Facebook de forma alguma.</p>
        </div>
      </div>
    </section>
  </footer>
);

export default FooterSection;
