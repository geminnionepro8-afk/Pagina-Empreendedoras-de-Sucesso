import { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, AtSign, FileText, MapPin, ArrowRight, ArrowLeft, AlertCircle, Loader2, Building, GraduationCap, HeartHandshake, Check, Upload, Trash2, Pizza, Coffee, Beef, Cookie, Apple, Soup } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import ProgressSteps from "./ProgressSteps";

interface FormData {
  ingresso_tipo: string;
  nome: string;
  email: string;
  telefone: string;
  instagram: string;
  cpf: string;
  cidade: string;
  alimento_tipo: string;
  comprovante_file: string | null;
}

interface Errors {
  [key: string]: string;
}

interface RegistrationFormProps {
  onTicketChange?: (id: string) => void;
}

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};

const maskCPF = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
};

const ticketOptions = [
  { id: "profissional", label: "Profissional", price: "R$ 147", icon: Building },
  { id: "estudante", label: "Estudante Externo", price: "R$ 73,50", icon: GraduationCap },
  { id: "unifacex", label: "Est. UNIFACEX", price: "R$ 20 + 1kg Alimento", icon: HeartHandshake },
];

const foodOptions = [
  { id: "arroz", label: "Arroz (1kg)", icon: Cookie, contribution: "1kg" },
  { id: "feijao", label: "Feijão (1kg)", icon: Soup, contribution: "1kg" },
  { id: "macarrao", label: "Macarrão (2 pacotes 500g)", icon: Pizza, contribution: "1kg" },
  { id: "acucar", label: "Açúcar (1kg)", icon: Coffee, contribution: "1kg" },
  { id: "fuba", label: "Fubá (2 pacotes 500g)", icon: Apple, contribution: "1kg" },
  { id: "farinha", label: "Farinha (1kg)", icon: Beef, contribution: "1kg" },
];

const RegistrationForm = ({ onTicketChange }: RegistrationFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    ingresso_tipo: location.state?.selectedTier || "profissional",
    nome: "", email: "", telefone: "", instagram: "", cpf: "", cidade: "",
    alimento_tipo: "", comprovante_file: null
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.selectedTier) {
      setForm(p => ({ ...p, ingresso_tipo: location.state.selectedTier }));
      onTicketChange?.(location.state.selectedTier);
    }
  }, [location.state, onTicketChange]);

  const steps = [
    { number: 1, label: "Ingresso" },
    { number: 2, label: "Seus Dados" },
    ...(form.ingresso_tipo !== "profissional" ? [{ number: 3, label: "Documentação" }] : []),
    ...(form.ingresso_tipo === "unifacex" ? [{ number: 4, label: "Doação" }] : []),
    { number: 5, label: "Resumo" }
  ].map((s, i) => ({ ...s, number: i + 1 }));

  const validateStep = (s: number): boolean => {
    const e: Errors = {};
    if (s === 2) {
      if (!form.nome.trim() || form.nome.trim().split(" ").length < 2) e.nome = "Nome completo obrigatório.";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "E-mail inválido.";
      if (form.ingresso_tipo === 'unifacex' && !form.email.endsWith('@unifacex.edu.br')) {
         e.email = "Use seu e-mail @unifacex.edu.br";
      }
      if (form.telefone.replace(/\D/g, "").length < 11) e.telefone = "Número de celular inválido.";
      if (form.cpf.replace(/\D/g, "").length < 11) e.cpf = "CPF inválido.";
      if (!form.cidade.trim()) e.cidade = "Informe sua cidade.";
    }
    if (s === 3 && form.ingresso_tipo !== "profissional" && !form.comprovante_file) {
      e.comprovante = "Obrigatório anexar comprovante.";
    }
    if (s === 4 && form.ingresso_tipo === "unifacex" && !form.alimento_tipo) {
      e.alimento = "Selecione um item para doação.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 5) handleSubmit();
      else setStep(prev => prev + 1);
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const { data, error } = await supabase.functions.invoke('criar-pix', {
        body: { 
          ...form, 
          email: form.email.toLowerCase(), 
          telefone: form.telefone.replace(/\D/g, ""), 
          cpf: form.cpf.replace(/\D/g, ""),
          instagram: form.instagram.trim() || null
        }
      });
      if (error || !data?.success) throw new Error(data?.error || "Erro ao processar sua inscrição.");
      sessionStorage.setItem("inscricao_data", JSON.stringify({ ...form, ...data }));
      navigate("/pagamento");
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTicketSelect = (id: string) => {
    setForm(p => ({ ...p, ingresso_tipo: id }));
    onTicketChange?.(id);
  };

  const fade = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <ProgressSteps currentStep={step} steps={steps} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" {...fade} className="space-y-4 md:space-y-6">
            <div className="flex flex-col gap-1 mb-1">
              <span className="text-[#ee6983] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Seleção</span>
              <h2 className="text-white font-bold text-base md:text-lg">Qual o seu tipo de ingresso?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {ticketOptions.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTicketSelect(t.id)}
                  className={`flex flex-col items-center p-5 xl:p-6 rounded-2xl border transition-all duration-500 relative group overflow-hidden ${
                    form.ingresso_tipo === t.id ? "bg-[#ee6983]/10 border-[#ee6983] shadow-[0_0_20px_rgba(238,105,131,0.15)]" : "bg-white/[0.03] border-white/10 hover:border-white/20"
                  }`}
                >
                  {form.ingresso_tipo === t.id && (
                     <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-5 md:h-5 bg-[#ee6983] rounded-full flex items-center justify-center">
                        <Check className="text-white w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} />
                     </div>
                  )}
                  <t.icon className={`w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 transition-colors duration-300 ${form.ingresso_tipo === t.id ? "text-[#ee6983]" : "text-white/20 group-hover:text-white/40"}`} />
                  <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.1em] text-white mb-1">{t.label}</span>
                  <span className="text-[9px] md:text-[10px] font-bold text-[#ee6983] opacity-80">{t.price}</span>
                </button>
              ))}
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-4">
               <AlertCircle className="w-5 h-5 text-[#ee6983] shrink-0" />
               <p className="text-white/40 text-[11px] leading-relaxed">
                  O tipo de ingresso selecionado define os bônus incluídos e os requisitos de comprovação (para estudantes e convênios sociais).
               </p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...fade} className="space-y-4 md:space-y-6">
            <div className="flex flex-col gap-1 mb-1">
              <span className="text-[#ee6983] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Dados</span>
              <h2 className="text-white font-bold text-base md:text-lg">Suas informações de contato</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: "nome", label: "Nome Completo", icon: User, type: "text", full: true, placeholder: "Como no seu documento" },
                { name: "email", label: form.ingresso_tipo === 'unifacex' ? "Seu E-mail @unifacex.edu.br" : "Seu melhor E-mail", icon: Mail, type: "email", full: true, placeholder: "contato@exemplo.com" },
                { name: "telefone", label: "WhatsApp Celular", icon: Phone, type: "tel", placeholder: "(00) 00000-0000" },
                { name: "instagram", label: "Seu Instagram", icon: AtSign, type: "text", placeholder: "@perfil.oficial" },
                { name: "cpf", label: "CPF para nota", icon: FileText, type: "text", placeholder: "000.000.000-00" },
                { name: "cidade", label: "Sua Cidade / UF", icon: MapPin, type: "text", placeholder: "Ex: Natal/RN" },
              ].map(f => (
                <div key={f.name} className={`${f.full ? "sm:col-span-2" : ""} space-y-1.5`}>
                  <div className="flex justify-between items-center px-1">
                    <label className={`block text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${focusedField === f.name ? 'text-[#ee6983]' : 'text-white/80'}`}>
                      {f.label}
                    </label>
                  </div>
                  <div className="relative group/input">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === f.name ? 'text-[#ee6983]' : 'text-white/20'}`}>
                      <f.icon className="w-4 h-4" strokeWidth={focusedField === f.name ? 2.5 : 1.5} />
                    </div>
                    <input
                      type={f.type}
                      value={(form as any)[f.name]}
                      onFocus={() => setFocusedField(f.name)}
                      onBlur={() => setFocusedField(null)}
                      onChange={e => setForm({ 
                        ...form, 
                        [f.name]: f.name === 'telefone' ? maskPhone(e.target.value) : f.name === 'cpf' ? maskCPF(e.target.value) : e.target.value 
                      })}
                      className={`w-full bg-white/[0.04] border rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/10 outline-none transition-all duration-300 ${
                        errors[f.name] 
                          ? 'border-red-500/50 bg-red-500/5' 
                          : focusedField === f.name 
                          ? 'border-[#ee6983] bg-[#ee6983]/5 shadow-[0_4px_16px_rgba(238,105,131,0.1)]' 
                          : 'border-white/10 group-hover/input:border-white/20 bg-white/[0.02]'
                      }`}
                      placeholder={f.placeholder}
                    />
                  </div>
                  <AnimatePresence>
                    {errors[f.name] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-[10px] sm:text-[11px] font-bold mt-1 px-1 flex items-center gap-1"
                      >
                         <AlertCircle className="w-3 h-3" /> {errors[f.name]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" {...fade} className="space-y-6">
            <div className="text-center space-y-2 mb-8">
               <span className="text-[#ee6983] font-black text-[10px] uppercase tracking-[0.25em]">Validação</span>
               <h3 className="text-white font-bold text-xl uppercase tracking-tight">Comprovação de Matrícula</h3>
               <p className="text-white/40 text-sm max-w-sm mx-auto">Anexe sua carteirinha ou declaração para validar o benefício estudantil.</p>
            </div>
            <div 
              className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-500 relative group overflow-hidden ${form.comprovante_file ? 'border-[#ee6983] bg-[#ee6983]/5' : 'border-white/10 hover:border-[#ee6983]/30 hover:bg-white/[0.04] bg-white/[0.02]'}`}
              onClick={() => setForm({ ...form, comprovante_file: "id_uploaded.pdf" })}
            >
               {form.comprovante_file ? (
                 <>
                   <div className="w-16 h-16 bg-[#ee6983] rounded-2xl flex items-center justify-center mb-5 rotate-3 shadow-[0_10px_30px_rgba(238,105,131,0.3)]">
                     <Check className="text-white w-8 h-8" strokeWidth={3} />
                   </div>
                   <p className="text-white font-black text-sm uppercase tracking-widest">Documento Selecionado</p>
                   <p className="text-white/40 text-xs mt-2 italic">comprovante_matrícula.pdf</p>
                   <button onClick={(e) => { e.stopPropagation(); setForm({...form, comprovante_file: null}); }} className="mt-8 px-6 py-2 rounded-full border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-500/10 transition-all">
                     <Trash2 className="w-3.5 h-3.5" /> Remover arquivo
                   </button>
                 </>
               ) : (
                 <>
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                     <Upload className="w-7 h-7 text-white/20" />
                   </div>
                   <p className="text-white/60 text-sm font-bold">Clique para selecionar o arquivo</p>
                   <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">PDF, PNG ou JPG (até 5MB)</p>
                 </>
               )}
            </div>
            {errors.comprovante && <p className="text-red-400 text-center text-xs font-bold leading-relaxed bg-red-400/5 p-3 rounded-lg border border-red-400/10">{errors.comprovante}</p>}
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" {...fade} className="space-y-8">
            <div className="text-center space-y-2">
               <span className="text-[#ee6983] font-black text-[10px] uppercase tracking-[0.25em]">Responsabilidade</span>
               <h3 className="text-white font-bold text-xl uppercase tracking-tight">Sua Doação Social</h3>
               <p className="text-white/40 text-sm max-w-sm mx-auto">Para liberar seu ingresso social, selecione o item (1kg) que entregará no credenciamento.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
               {foodOptions.map(f => (
                 <button
                   key={f.id}
                   onClick={() => setForm({ ...form, alimento_tipo: f.id })}
                   className={`flex flex-col items-center p-6 rounded-2xl border transition-all duration-500 group relative ${form.alimento_tipo === f.id ? 'bg-[#ee6983]/20 border-[#ee6983] scale-[1.05] shadow-[0_10px_30px_rgba(238,105,131,0.2)]' : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/[0.05]'}`}
                 >
                   <div className="absolute top-3 right-3">
                     <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md border ${form.alimento_tipo === f.id ? 'bg-[#ee6983] text-white border-transparent' : 'bg-white/5 text-white/30 border-white/10'}`}>
                       {f.contribution}
                     </span>
                   </div>
                   <f.icon className={`w-8 h-8 mb-4 transition-transform duration-500 ${form.alimento_tipo === f.id ? 'text-[#ee6983] scale-110' : 'text-white/20 group-hover:scale-110'}`} />
                   <span className={`text-[10px] font-black uppercase tracking-widest text-center leading-tight ${form.alimento_tipo === f.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>{f.label}</span>
                   {form.alimento_tipo === f.id && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-3 w-5 h-5 bg-[#ee6983] rounded-full flex items-center justify-center">
                        <Check className="text-white w-3 h-3" strokeWidth={4} />
                     </motion.div>
                   )}
                 </button>
               ))}
            </div>
            {errors.alimento && <p className="text-red-400 text-center text-xs font-bold bg-red-400/5 p-3 rounded-xl">{errors.alimento}</p>}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" {...fade} className="space-y-6">
             <div className="flex flex-col gap-1 mb-2">
                <span className="text-[#ee6983] font-black text-[10px] uppercase tracking-[0.2em]">Conferência</span>
                <h2 className="text-white font-bold text-lg">Confirme seus dados</h2>
             </div>
             <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 bg-[#ee6983]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#ee6983]/10 transition-colors" />
                <div className="flex justify-between items-center border-b border-white/5 pb-5">
                   <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">Plano Selecionado</span>
                   <span className="text-[#ee6983] font-black uppercase text-sm tracking-widest underline decoration-2 underline-offset-4">{ticketOptions.find(t => t.id === form.ingresso_tipo)?.label}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                  {[
                    { label: "Participante", value: form.nome },
                    { label: "E-mail Oficial", value: form.email },
                    { label: "WhatsApp", value: form.telefone },
                    { label: "CPF", value: form.cpf },
                    { label: "Cidade Origem", value: form.cidade },
                    ...(form.alimento_tipo ? [{ label: "Item Doação", value: foodOptions.find(f => f.id === form.alimento_tipo)?.label }] : [])
                  ].map(item => (
                    <div key={item.label} className="space-y-1">
                      <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] block">{item.label}</span>
                      <span className="text-white/80 text-[14px] font-bold block truncate">{item.value || "—"}</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="flex items-start gap-4 p-5 bg-[#ee6983]/10 border border-[#ee6983]/20 rounded-2xl">
                <AlertCircle className="w-5 h-5 text-[#ee6983] shrink-0 mt-0.5" />
                <p className="text-white/50 text-[11px] leading-relaxed font-bold">
                   Esses dados serão utilizados para o seu credenciamento físico e certificado digital. Certifique-se de que estão 100% corretos antes de emitir o PIX.
                </p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {submitError && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-400 text-sm font-bold">{submitError}</p>
        </motion.div>
      )}

      <div className="mt-12 flex items-center gap-5">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="h-16 px-10 rounded-2xl border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 hover:text-white transition-all flex items-center gap-3 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-[#ee6983] via-[#d4566f] to-[#ee6983] bg-[length:200%_auto] hover:bg-right text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_12px_24px_rgba(238,105,131,0.25)] hover:shadow-[0_16px_32px_rgba(238,105,131,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {step === steps.length ? "Finalizar e Ver QR Code" : "Avançar Próxima Etapa"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
