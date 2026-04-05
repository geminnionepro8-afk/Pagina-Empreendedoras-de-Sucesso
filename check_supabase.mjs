// Script de diagnóstico: verificar estado completo do Supabase
import pg from "pg";
const { Client } = pg;

const client = new Client({
  user: "postgres.fjahkgcadgmukojxjobx",
  password: "9?.qq2SV%#u&tTF",
  host: "aws-1-sa-east-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log("✅ Conectado ao Supabase\n");

  // 1. Colunas da tabela
  console.log("═══════════════════════════════════════════════════════");
  console.log("  ESTRUTURA DA TABELA: inscricoes");
  console.log("═══════════════════════════════════════════════════════");
  const cols = await client.query(`
    SELECT column_name, data_type, column_default, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'inscricoes'
    ORDER BY ordinal_position
  `);
  for (const r of cols.rows) {
    const nullable = r.is_nullable === "YES" ? "NULL" : "NOT NULL";
    const def = r.column_default ? ` [${r.column_default.substring(0, 30)}]` : "";
    console.log(`  • ${r.column_name.padEnd(30)} ${r.data_type.padEnd(22)} ${nullable}${def}`);
  }
  console.log(`\n  Total: ${cols.rows.length} colunas\n`);

  // 2. Índices
  console.log("═══════════════════════════════════════════════════════");
  console.log("  ÍNDICES");
  console.log("═══════════════════════════════════════════════════════");
  const idxs = await client.query(`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE tablename = 'inscricoes'
  `);
  for (const r of idxs.rows) {
    console.log(`  • ${r.indexname}`);
  }
  console.log();

  // 3. Policies RLS
  console.log("═══════════════════════════════════════════════════════");
  console.log("  POLICIES RLS");
  console.log("═══════════════════════════════════════════════════════");
  const pols = await client.query(`
    SELECT policyname, cmd, roles
    FROM pg_policies
    WHERE tablename = 'inscricoes'
  `);
  for (const r of pols.rows) {
    console.log(`  • ${r.policyname.padEnd(30)} CMD: ${r.cmd.padEnd(8)} ROLES: ${r.roles}`);
  }
  console.log();

  // 4. Triggers
  console.log("═══════════════════════════════════════════════════════");
  console.log("  TRIGGERS");
  console.log("═══════════════════════════════════════════════════════");
  const trgs = await client.query(`
    SELECT trigger_name, event_manipulation, action_timing
    FROM information_schema.triggers
    WHERE event_object_table = 'inscricoes'
  `);
  for (const r of trgs.rows) {
    console.log(`  • ${r.trigger_name.padEnd(30)} ${r.action_timing} ${r.event_manipulation}`);
  }
  if (trgs.rows.length === 0) console.log("  (nenhum trigger encontrado)");
  console.log();

  // 5. Registros existentes
  console.log("═══════════════════════════════════════════════════════");
  console.log("  DADOS EXISTENTES");
  console.log("═══════════════════════════════════════════════════════");
  const count = await client.query("SELECT COUNT(*) as total FROM inscricoes");
  console.log(`  Total de registros: ${count.rows[0].total}`);

  const sample = await client.query(`
    SELECT nome, email, ingresso_tipo, valor_pago, status, 
           email_confirmacao_enviado, validacao_status
    FROM inscricoes
    ORDER BY created_at DESC
    LIMIT 5
  `);
  if (sample.rows.length > 0) {
    console.log("\n  Últimos registros:");
    for (const r of sample.rows) {
      console.log(`  → ${(r.nome || "—").padEnd(20)} | ${(r.email || "—").padEnd(25)} | tipo: ${(r.ingresso_tipo || "—").padEnd(12)} | status: ${r.status} | email_conf: ${r.email_confirmacao_enviado}`);
    }
  }

  // 6. Buckets de Storage
  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  STORAGE BUCKETS");
  console.log("═══════════════════════════════════════════════════════");
  try {
    const buckets = await client.query("SELECT id, name, public FROM storage.buckets");
    for (const r of buckets.rows) {
      console.log(`  • ${r.name.padEnd(20)} público: ${r.public}`);
    }
    if (buckets.rows.length === 0) console.log("  (nenhum bucket encontrado)");
  } catch (err) {
    console.log("  ⚠️  Sem acesso ao storage.buckets via pooler");
  }

  await client.end();
  console.log("\n✅ Diagnóstico completo!");
}

main().catch((err) => {
  console.error("❌ ERRO:", err.message);
  process.exit(1);
});
