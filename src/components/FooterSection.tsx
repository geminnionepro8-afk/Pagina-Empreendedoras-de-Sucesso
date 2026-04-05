import { ShieldCheck, Mail, MapPin, Phone, Lock, ChevronRight } from "lucide-react";

const FooterSection = () => (
  <footer className="bg-[#050505] relative overflow-hidden border-t border-white/5">
    {/* Refined lighting effects */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl h-[1px] bg-gradient-to-r from-transparent via-[#ee6983]/30 to-transparent" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[100px] bg-[#ee6983]/5 blur-[100px] rounded-full pointer-events-none" />

    {/* Navigation & Info Section */}
    <section className="py-20 lg:py-24 relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="space-y-8 lg:col-span-5 pr-0 lg:pr-12 border-r-0 lg:border-r border-white/[0.02]">
            <div className="flex flex-col gap-4">
              <img 
                src="/images/logo-instituto-trimmed.png" 
                alt="Instituto Mulheres de Sucesso Brasileiras" 
                className="h-20 md:h-24 w-auto object-left object-contain" 
              />
            </div>
            <div className="space-y-4">
              <p className="text-white/40 text-[15px] leading-relaxed font-light max-w-md">
                O <strong className="text-white/80 font-medium">I Fórum de Estética e Performance da Mulher Empreendedora</strong> é uma imersão completa em saúde integrativa, estética avançada e liderança feminina de alto impacto, desenhado para transformar sua trajetória.
              </p>
              <div className="flex items-center gap-4 pt-2">
                 <span className="text-[#ee6983] text-xs font-bold tracking-widest uppercase">17 e 18 de Abril</span>
                 <span className="w-1 h-1 rounded-full bg-white/20" />
                 <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Natal, RN</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8 lg:col-span-4 lg:pl-8">
            <div className="space-y-3">
              <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[11px] opacity-80">Atendimento e Local</h4>
              <div className="w-10 h-[1px] bg-gradient-to-r from-[#ee6983] to-transparent" />
            </div>
            
            <ul className="space-y-6">
              <li className="group flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:border-[#ee6983]/30 group-hover:bg-[#ee6983]/10 transition-all duration-500 shadow-xl">
                  <MapPin className="w-4 h-4 text-white/50 group-hover:text-[#ee6983] transition-colors" />
                </div>
                <div className="flex flex-col pt-0.5 space-y-1">
                  <span className="text-white/90 font-medium text-sm tracking-wide">UNIFACEX</span>
                  <span className="text-white/40 text-[13px] leading-relaxed">Campus Capim Macio<br/>Natal – RN, CEP 59082-100</span>
                </div>
              </li>
              
              <li className="group flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:border-[#ee6983]/30 group-hover:bg-[#ee6983]/10 transition-all duration-500 shadow-xl">
                  <Phone className="w-4 h-4 text-white/50 group-hover:text-[#ee6983] transition-colors" />
                </div>
                <div className="flex flex-col pt-0.5 space-y-1">
                  <span className="text-white/90 font-medium text-sm tracking-wide">Suporte Exclusivo</span>
                  <span className="text-white/40 text-[13px] leading-relaxed">84 9 9868-2061<br/>Prof. MSc. Lucia Leandro</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Security & Trust */}
          <div className="space-y-8 lg:col-span-3">
            <div className="space-y-3">
              <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[11px] opacity-80">Transação Segura</h4>
              <div className="w-10 h-[1px] bg-gradient-to-r from-[#ee6983] to-transparent" />
            </div>
            
            <p className="text-white/40 text-[13px] leading-relaxed font-light">
              Ambiente protegido com criptografia de ponta a ponta. Seus dados estão 100% seguros.
            </p>
            
            <div className="flex flex-col gap-3 pt-2">
              <div className="group relative overflow-hidden flex items-center gap-4 bg-[#0a0a0a] border border-white/[0.05] hover:border-white/10 px-4 py-3.5 rounded-xl transition-all duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ee6983]/0 via-[#ee6983]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <Lock className="w-4 h-4 text-[#ee6983] relative z-10" />
                <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.15em] relative z-10">Certificado SSL</span>
              </div>
              <div className="group relative overflow-hidden flex items-center gap-4 bg-[#0a0a0a] border border-white/[0.05] hover:border-[#ee6983]/30 px-4 py-3.5 rounded-xl transition-all duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ee6983]/0 via-[#ee6983]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <ShieldCheck className="w-4 h-4 text-[#ee6983] relative z-10" />
                <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.15em] relative z-10">Compra Garantida</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Footer Bottom */}
    <section className="bg-[#020202] py-8 border-t border-white/[0.02]">
      <div className="section-container">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-[12px] text-white/50 tracking-[0.05em] font-medium">
            &copy; {new Date().getFullYear()} <span className="text-white/70">Instituto Mulheres de Sucesso Brasileiras</span>
          </p>
          <p className="text-[11px] text-white/30 font-light tracking-wide">
            CNPJ: 59.418.846/0001-99 • Todos os direitos reservados.
          </p>
        </div>
        
        <div className="mt-8 border-t border-white/[0.02] pt-6 flex justify-center">
           <p className="text-[10px] text-white/20 font-light leading-relaxed max-w-4xl text-center text-balance">
            Este site não faz parte do website do Facebook / Meta ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook de nenhuma maneira. FACEBOOK é uma marca comercial independente da FACEBOOK, Inc.
           </p>
        </div>
      </div>
    </section>
  </footer>
);

export default FooterSection;
