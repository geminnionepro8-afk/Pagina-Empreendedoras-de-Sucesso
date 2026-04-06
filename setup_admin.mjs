// Script admin: criar bucket + verificação completa via service_role
const SUPABASE_URL = "https://fjahkgcadgmukojxjobx.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYWhrZ2NhZGdtdWtvanhqb2J4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDU3NTI2NSwiZXhwIjoyMDkwMTUxMjY1fQ.64_Lai3ij5fF16PIRz6podV4-6BVsduf61yhpR_RAW8";

const headers = {
  "apikey": SERVICE_ROLE_KEY,
  "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
};

async function main() {
  console.log("=== ADMIN SUPABASE - SETUP COMPLETO ===\n");

  // ==========================================
  // 1. Criar bucket "comprovantes"
  // ==========================================
  console.log("[1/4] Criando bucket 'comprovantes'...");
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: "comprovantes",
        name: "comprovantes",
        public: false,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("  OK: Bucket 'comprovantes' criado com sucesso (privado)");
    } else if (data.message?.includes("already exists")) {
      console.log("  SKIP: Bucket 'comprovantes' ja existe");
    } else {
      console.log("  AVISO:", data.message || JSON.stringify(data));
    }
  } catch (err) {
    console.log("  ERRO:", err.message);
  }

  // ==========================================
  // 2. Listar buckets existentes
  // ==========================================
  console.log("\n[2/4] Listando buckets...");
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, { headers });
    const buckets = await res.json();
    if (Array.isArray(buckets)) {
      for (const b of buckets) {
        console.log(`  - ${b.name} (publico: ${b.public}, criado: ${b.created_at})`);
      }
      if (buckets.length === 0) console.log("  (nenhum bucket)");
    }
  } catch (err) {
    console.log("  ERRO:", err.message);
  }

  // ==========================================
  // 3. Verificar tabela inscricoes via REST
  // ==========================================
  console.log("\n[3/4] Verificando tabela 'inscricoes' via REST API...");
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/inscricoes?select=*&limit=5&order=created_at.desc`,
      { headers }
    );
    const rows = await res.json();
    if (Array.isArray(rows)) {
      console.log(`  Total retornado: ${rows.length} registro(s)`);
      if (rows.length > 0) {
        // Mostrar colunas do primeiro registro
        const cols = Object.keys(rows[0]);
        console.log(`  Colunas encontradas (${cols.length}):`);
        for (const c of cols) {
          console.log(`    - ${c}`);
        }
        console.log("\n  Ultimos registros:");
        for (const r of rows) {
          console.log(`    nome: ${r.nome || "?"} | email: ${r.email || "?"} | tipo: ${r.ingresso_tipo || "N/A"} | status: ${r.status} | val: ${r.validacao_status || "N/A"}`);
        }
      }
    } else {
      console.log("  Resposta:", JSON.stringify(rows));
    }
  } catch (err) {
    console.log("  ERRO:", err.message);
  }

  // ==========================================
  // 4. Teste de insert + delete (dry run)
  // ==========================================
  console.log("\n[4/4] Teste de insert com novos campos...");
  try {
    const testData = {
      nome: "TESTE AUTOMACAO",
      email: "teste@automacao.dev",
      telefone: "84999999999",
      cpf: "00000000000",
      cidade: "Natal",
      ingresso_tipo: "profissional",
      valor_pago: 14700,
      status: "pendente",
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inscricoes`, {
      method: "POST",
      headers: { ...headers, "Prefer": "return=representation" },
      body: JSON.stringify(testData),
    });
    const inserted = await res.json();
    if (res.ok && Array.isArray(inserted) && inserted.length > 0) {
      const row = inserted[0];
      console.log("  OK: Insert funcionou!");
      console.log(`    id: ${row.id}`);
      console.log(`    ingresso_tipo: ${row.ingresso_tipo}`);
      console.log(`    valor_pago: ${row.valor_pago}`);
      console.log(`    email_confirmacao_enviado: ${row.email_confirmacao_enviado}`);
      console.log(`    email_preparacao_enviado: ${row.email_preparacao_enviado}`);
      console.log(`    email_vespera_enviado: ${row.email_vespera_enviado}`);
      console.log(`    validacao_status: ${row.validacao_status}`);

      // Limpar registro de teste
      const delRes = await fetch(
        `${SUPABASE_URL}/rest/v1/inscricoes?id=eq.${row.id}`,
        { method: "DELETE", headers }
      );
      if (delRes.ok) {
        console.log("  OK: Registro de teste removido");
      }
    } else {
      console.log("  RESPOSTA:", JSON.stringify(inserted));
    }
  } catch (err) {
    console.log("  ERRO:", err.message);
  }

  console.log("\n=== SETUP COMPLETO ===");
}

main();
