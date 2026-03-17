import { Instagram, Facebook, Youtube } from "lucide-react";

const sponsors = {
  partner: ["CIMED"],
  media: ["Grupo RBS"],
  semente: ["KTO", "MARPA"],
  anjo: ["PROFITTO", "BTG Pactual"],
  apoiadores: ["Água da Pedra", "GTD", "TECNOPUC", "ORLLA", "Grupoflex", "BERTUZZI", "Elev"],
};

const FooterSection = () => (
  <footer className="bg-background">
    {/* Sponsors */}
    <section className="py-16 border-t border-border/10">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries({ "PATROCINADOR PARTNER": sponsors.partner, "MEDIA PARTNER": sponsors.media, "PATROCINADOR SEMENTE": sponsors.semente, "PATROCINADOR ANJO": sponsors.anjo }).map(([title, names]) => (
            <div key={title} className="text-center">
              <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-4">{title}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {names.map((n) => (
                  <span key={n} className="text-foreground font-bold text-sm">{n}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-4">APOIADORES</p>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.apoiadores.map((n) => (
              <span key={n} className="text-foreground/60 text-sm font-medium">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <section className="py-12 border-t border-border/10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <span className="text-xl font-black tracking-[0.3em] text-foreground">
              <span className="font-black">FLF</span><span className="font-light">EZTIVAL</span>
            </span>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>Este site não faz parte do site do Facebook ou do Facebook Inc.</p>
            <p className="mt-2">Além disso, este site NÃO é endossado pelo Facebook de forma alguma.</p>
          </div>

          {/* Social */}
          <div className="space-y-4 md:text-right">
            <p className="text-foreground text-sm font-medium">Acompanhe nossas redes</p>
            <div className="flex gap-3 md:justify-end">
              {[
                { Icon: Instagram, bg: "bg-secondary" },
                { Icon: Facebook, bg: "bg-[hsl(221,44%,41%)]" },
                { Icon: Youtube, bg: "bg-destructive" },
              ].map(({ Icon, bg }, i) => (
                <a key={i} href="#" className={`${bg} w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}>
                  <Icon className="w-5 h-5 text-foreground" />
                </a>
              ))}
            </div>
            <button className="text-xs text-foreground border border-foreground/20 rounded-full px-4 py-2 hover:bg-foreground/5 transition-colors">
              POLÍTICA DE PRIVACIDADE
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/10 text-center">
          <p className="text-xs text-muted-foreground">
            Copyright © FLFEZTIVAL / Todos os direitos reservados RAPHAELA DUTRA SEFTON LTDA CNPJ:51.952.551/0001-96
          </p>
        </div>
      </div>
    </section>
  </footer>
);

export default FooterSection;
