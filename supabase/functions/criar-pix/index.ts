// Supabase Edge Function: criar-pix
// Proxy seguro para a API PagSeguro — gera QR Code PIX real
// Token NUNCA é exposto no frontend

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ─── 1. Configuração (Secrets) ───
    const PAGSEGURO_TOKEN = Deno.env.get("PAGSEGURO_TOKEN");
    const PAGSEGURO_API_URL =
      Deno.env.get("PAGSEGURO_API_URL") ||
      "https://sandbox.api.pagseguro.com";
    
    // In Edge Functions, URL and ANON_KEY are usually auto-injected. 
    // SERVICE_ROLE is NOT unless manually set.
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";

    if (!PAGSEGURO_TOKEN) {
      return new Response(
        JSON.stringify({ error: "PAGSEGURO_TOKEN não configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── 2. Ler dados do body ───
    const body = await req.json();
    const { nome, email, telefone, instagram, cpf, cidade, ingresso_tipo } =
      body;

    if (!nome || !email || !cpf || !ingresso_tipo) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios: nome, email, cpf, ingresso_tipo" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── 3. Mapear valores (em centavos) ───
    const VALOR_MAP: Record<string, number> = {
      profissional: 14700,
      estudante: 7350,
      unifacex: 2000,
    };
    const valorCentavos = VALOR_MAP[ingresso_tipo] || 14700;

    // ─── 4. Inserir no Supabase ───
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: inscricao, error: dbError } = await supabase
      .from("inscricoes")
      .insert({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: (telefone || "").replace(/\D/g, ""),
        instagram: instagram?.trim() || null,
        cpf: cpf.replace(/\D/g, ""),
        cidade: (cidade || "").trim(),
        ingresso_tipo,
        valor_pago: valorCentavos,
        status: "pendente",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB Error:", dbError);
      return new Response(
        JSON.stringify({ success: false, error: "Erro ao salvar no banco", detail: dbError.message }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const inscricaoId = inscricao.id;

    // ─── 5. Criar pedido no PagSeguro com QR Code ───
    const telefoneClean = (telefone || "").replace(/\D/g, "");
    const ddd = telefoneClean.substring(0, 2) || "84";
    const numero = telefoneClean.substring(2) || "999999999";

    // Format date: YYYY-MM-DDTHH:mm:ss-03:00 (NO milliseconds!)
    const expDate = new Date(Date.now() + 60 * 60 * 1000); // 60 min
    const pad = (n: number) => String(n).padStart(2, '0');
    const expirationDate = `${expDate.getFullYear()}-${pad(expDate.getMonth()+1)}-${pad(expDate.getDate())}T${pad(expDate.getHours())}:${pad(expDate.getMinutes())}:${pad(expDate.getSeconds())}-03:00`;

    const TICKET_NAMES: Record<string, string> = {
      profissional: "Ingresso Profissional - Forum Mulheres de Sucesso 2026",
      estudante: "Ingresso Estudante - Forum Mulheres de Sucesso 2026",
      unifacex: "Ingresso UNIFACEX - Forum Mulheres de Sucesso 2026",
    };

    const orderPayload = {
      reference_id: inscricaoId,
      customer: {
        name: nome.trim(),
        email: email.trim().toLowerCase(),
        tax_id: cpf.replace(/\D/g, ""),
        phones: [
          {
            country: "55",
            area: ddd,
            number: numero,
            type: "MOBILE",
          },
        ],
      },
      items: [
        {
          name: TICKET_NAMES[ingresso_tipo] || "Ingresso Forum 2026",
          quantity: 1,
          unit_amount: valorCentavos,
        },
      ],
      qr_codes: [
        {
          amount: {
            value: valorCentavos,
          },
          expiration_date: expirationDate,
        },
      ],
      notification_urls: [
        Deno.env.get("WEBHOOK_URL") || "https://seu-n8n.com/webhook/pagseguro",
      ],
    };

    console.log("PagSeguro request:", JSON.stringify(orderPayload, null, 2));

    const pgResponse = await fetch(`${PAGSEGURO_API_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAGSEGURO_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const pgData = await pgResponse.json();

    if (!pgResponse.ok) {
      console.error("PagSeguro Error Status:", pgResponse.status);
      console.error("PagSeguro Error Body:", JSON.stringify(pgData));
      return new Response(
        JSON.stringify({
          success: false,
          error: "Erro na API do PagSeguro",
          pgStatus: pgResponse.status,
          detail: JSON.stringify(pgData.error_messages || pgData),
          payload_sent: orderPayload
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── 6. Extrair dados do QR Code ───
    const qrCode = pgData.qr_codes?.[0];
    const qrCodeText = qrCode?.text || null; // Copia e cola
    const qrCodePngUrl =
      qrCode?.links?.find((l: any) => l.media === "image/png")?.href || null;
    const orderId = pgData.id;

    // ─── 7. Atualizar inscrição com dados do PagSeguro ───
    await supabase
      .from("inscricoes")
      .update({
        pagseguro_order_id: orderId,
        pix_qr_code: qrCodePngUrl,
        pix_copia_cola: qrCodeText,
        pix_expira_em: expDate.toISOString(),
        payment_id: qrCode?.id || null,
      })
      .eq("id", inscricaoId);

    // ─── 8. Retornar para o frontend ───
    return new Response(
      JSON.stringify({
        success: true,
        inscricao_id: inscricaoId,
        order_id: orderId,
        qr_code: {
          image_url: qrCodePngUrl,
          text: qrCodeText, // Copia e cola
          expiration: expDate.toISOString(),
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Unexpected error in Edge Function:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Erro inesperado na Edge Function", 
        message: err.message,
        stack: err.stack 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
