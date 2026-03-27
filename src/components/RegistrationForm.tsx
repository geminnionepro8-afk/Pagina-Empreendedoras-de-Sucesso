import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, AtSign, FileText, MapPin, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  instagram: string;
  cpf: string;
  cidade: string;
}

interface Errors {
  [key: string]: string;
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

const maskInstagram = (v: string) => {
  const trimmed = v.replace(/[^a-zA-Z0-9._]/g, "");
  return trimmed ? `@${trimmed.replace(/^@/, "")}` : "";
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    nome: "", email: "", telefone: "", instagram: "", cpf: "", cidade: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    if (!data.nome.trim() || data.nome.trim().split(" ").length < 2)
      e.nome = "Informe seu nome completo.";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "E-mail inválido.";
    if (data.telefone.replace(/\D/g, "").length < 10)
      e.telefone = "Telefone inválido.";
    if (data.cpf.replace(/\D/g, "").length < 11)
      e.cpf = "CPF inválido.";
    if (!data.cidade.trim())
      e.cidade = "Informe sua cidade.";
    return e;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "telefone") value = maskPhone(value);
    if (name === "cpf") value = maskCPF(value);
    if (name === "instagram") value = maskInstagram(value);
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const v = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: v[name] || "" }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const v = validate(form);
    setErrors(prev => ({ ...prev, [name]: v[name] || "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase
        .from("inscricoes")
        .insert({
          nome: form.nome.trim(),
          email: form.email.trim().toLowerCase(),
          telefone: form.telefone.replace(/\D/g, ""),
          instagram: form.instagram.trim() || null,
          cpf: form.cpf.replace(/\D/g, ""),
          cidade: form.cidade.trim(),
        })
        .select("id, nome, email, cidade")
        .single();

      if (error) throw error;

      // Persist full data + Supabase ID for next steps
      sessionStorage.setItem(
        "inscricao_data",
        JSON.stringify({ ...form, id: data.id })
      );

      navigate("/pagamento");
    } catch (err: unknown) {
      console.error("Supabase insert error:", err);
      setSubmitError(
        "Ocorreu um erro ao salvar sua inscrição. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: "nome",      label: "Nome Completo", icon: User,     type: "text",  placeholder: "Seu nome completo",    col: "full", required: true  },
    { name: "email",     label: "E-mail",         icon: Mail,     type: "email", placeholder: "seu@email.com",        col: "half", required: true  },
    { name: "telefone",  label: "Telefone",        icon: Phone,    type: "tel",   placeholder: "(84) 99999-9999",      col: "half", required: true  },
    { name: "instagram", label: "Instagram",       icon: AtSign,   type: "text",  placeholder: "@seuinstagram",        col: "half", required: false },
    { name: "cpf",       label: "CPF",             icon: FileText, type: "text",  placeholder: "000.000.000-00",       col: "half", required: true  },
    { name: "cidade",    label: "Cidade",           icon: MapPin,   type: "text",  placeholder: "Natal",                col: "full", required: true  },
  ] as const;

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {fields.map((field, i) => {
          const error = errors[field.name];
          const isFull = field.col === "full";
          return (
            <motion.div
              key={field.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className={isFull ? "sm:col-span-2" : ""}
            >
              <label className="block text-white/60 text-xs font-bold uppercase tracking-[0.15em] mb-2">
                {field.label}
                {field.required && <span className="text-[#ee6983] ml-0.5">*</span>}
              </label>
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none ${
                  error ? "text-red-400" : "text-white/25 group-focus-within:text-[#ee6983]"
                }`}>
                  <field.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  autoComplete="off"
                  disabled={isLoading}
                  className={`w-full bg-white/[0.04] border rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 disabled:opacity-50
                    ${error
                      ? "border-red-500/50 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                      : "border-white/8 focus:border-[#ee6983]/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(238,105,131,0.12)]"
                    }`}
                />
                {error && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <AlertCircle className="w-4 h-4 text-red-400" strokeWidth={1.5} />
                  </div>
                )}
              </div>
              {error && touched[field.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-red-400 text-[11px] font-medium"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Submit error */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
        >
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-red-400 text-sm">{submitError}</p>
        </motion.div>
      )}

      <motion.div
        {...fadeUp}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8"
      >
        <button
          type="submit"
          disabled={isLoading}
          className="btn-matte group w-full text-white py-4 px-8 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
              Salvando inscrição...
            </>
          ) : (
            <>
              Continuar para o Pagamento
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
            </>
          )}
        </button>
        <p className="text-center text-white/20 text-xs mt-3">
          (* campos obrigatórios) · Dados protegidos e criptografados.
        </p>
      </motion.div>
    </form>
  );
};

export default RegistrationForm;
