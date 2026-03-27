import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type InscricaoStatus = "pendente" | "pago" | "expirado" | "cancelado";

export interface Inscricao {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  telefone: string;
  instagram: string | null;
  cpf: string;
  cidade: string;
  ingresso: string;
  valor_cents: number;
  status: InscricaoStatus;
  pagseguro_order_id: string | null;
  pix_qr_code: string | null;
  pix_copia_cola: string | null;
  pix_expira_em: string | null;
}
