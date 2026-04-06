import { motion } from "framer-motion";
import { MessageCircle, HelpCircle } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const faqs = [
  {
    q: "Onde será realizado o evento?",
    a: "O I Fórum de Estética e Performance será realizado no UNIFACEX - Campus Capim Macio, em Natal - RN. O campus oferece infraestrutura moderna, auditório climatizado, poltronas confortáveis e estacionamento seguro.",
  },
  {
    q: "Quais os horários do evento?",
    a: "No dia 17 de Abril iniciaremos às 17:00 com o credenciamento e palestras até as 21:30. No dia 18 de Abril, a programação será o dia todo, iniciando as 08:00 e finalizando o evento oficial às 17:00.",
  },
  {
    q: "Haverá emissão de certificado?",
    a: "Sim! Todos os participantes receberão um certificado digital de participação emitido pelo Instituto Mulheres de Sucesso, que reforça seu engajamento em saúde integrativa e gestão de alta performance.",
  },
  {
    q: "A quem se destina o Fórum?",
    a: "Mulheres empreendedoras, líderes de equipe, profissionais da saúde e estética avançada, e qualquer mulher que deseje blindar sua saúde contra o Burnout enquanto acelera sua carreira.",
  },
  {
    q: "Como funciona a Taxa Social e Formas de Pagamento?",
    a: "Para estudantes UNIFACEX, o Instituto oferece uma Taxa Social de apenas R$ 20,00 (+ 1kg de alimento). O pagamento é realizado de forma segura via PIX diretamente no final do nosso formulário de inscrição oficial.",
  },
];

const FAQSection = () => (
  <section className="bg-[#080808] py-24 relative overflow-hidden">
    <div className="section-container relative z-10">
      <motion.div {...fadeUp} className="mb-20 space-y-4 max-w-4xl mx-auto text-center flex flex-col items-center">
        <SectionLabel text="Tire suas dúvidas" centered />
        <h2 className="text-[34px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
          Perguntas <br />
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">Frequentes</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-[15px] pt-4">
          Tem alguma dúvida sobre o evento? Separamos abaixo as repostas para as questões mais comuns feitas pela nossa comunidade.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto mb-20">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              {...fadeUp} 
              transition={{ delay: i * 0.1 }}
            >
              <AccordionItem 
                value={`item-${i}`} 
                className="bg-[#050505] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#ee6983]/30 data-[state=open]:bg-white/5 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-[16px] md:text-[18px] font-medium text-white/90 hover:text-white hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-[15px] leading-relaxed pb-6 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
