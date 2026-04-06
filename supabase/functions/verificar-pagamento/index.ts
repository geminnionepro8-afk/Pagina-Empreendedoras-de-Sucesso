// Supabase Edge Function: verificar-pagamento
// O frontend faz polling nesta function para saber se o PIX foi pago
// Consulta o status direto no Supabase (que o n8n atualiza via webhook)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";

    const body = await req.json();
    const { inscricao_id } = body;

    if (!inscricao_id) {
      return new Response(
        JSON.stringify({ error: "inscricao_id é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .from("inscricoes")
      .select("id, status, nome, ingresso_tipo, pagseguro_order_id, pix_expira_em")
      .eq("id", inscricao_id)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: "Inscrição não encontrada" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verificar se o PIX expirou
    const agora = new Date();
    const expira = data.pix_expira_em ? new Date(data.pix_expira_em) : null;
    const expirado = expira ? agora > expira : false;

    // Se expirou e ainda está pendente, marcar como expirado
    if (expirado && data.status === "pendente") {
      await supabase
        .from("inscricoes")
        .update({ status: "expirado" })
        .eq("id", inscricao_id);

      return new Response(
        JSON.stringify({
          status: "expirado",
          message: "O QR Code PIX expirou. Gere um novo.",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        status: data.status,
        nome: data.nome,
        ingresso_tipo: data.ingresso_tipo,
        pago: data.status === "pago",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Erro:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
