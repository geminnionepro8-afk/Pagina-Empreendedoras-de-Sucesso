// Script para executar a migração 001 no Supabase
// Adiciona campos de ingresso, flags de e-mail, validação IA, storage
import pg from "pg";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const { Client } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client({
  user: "postgres.fjahkgcadgmukojxjobx",
  password: "9?.qq2SV%#u&tTF",
  host: "aws-1-sa-east-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log("🔌 Conectando ao Supabase...");
  await client.connect();
  console.log("✅ Conectado!\n");

  // ==========================================
  // PARTE 1: Adicionar colunas novas
  // ==========================================
  console.log("📋 PARTE 1: Adicionando colunas à tabela inscricoes...");

  const columnsToAdd = [
    { name: "ingresso_tipo", def: "text DEFAULT 'profissional'" },
    { name: "valor_pago", def: "integer DEFAULT 0" },
    { name: "email_confirmacao_enviado", def: "boolean DEFAULT false" },
    { name: "email_preparacao_enviado", def: "boolean DEFAULT false" },
    { name: "email_vespera_enviado", def: "boolean DEFAULT false" },
    { name: "validacao_status", def: "text DEFAULT 'pendente'" },
    { name: "comprovante_url", def: "text NULL" },
    { name: "payment_id", def: "text NULL" },
    { name: "updated_at", def: "timestamptz DEFAULT now()" },
  ];

  for (const col of columnsToAdd) {
    try {
      const check = await client.query(
        `SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name=$1`,
        [col.name]
      );
      if (check.rowCount === 0) {
        await client.query(`ALTER TABLE inscricoes ADD COLUMN ${col.name} ${col.def}`);
        console.log(`  ✅ Coluna '${col.name}' adicionada`);
      } else {
        console.log(`  ⏭️  Coluna '${col.name}' já existe`);
      }
    } catch (err) {
      console.error(`  ❌ Erro na coluna '${col.name}':`, err.message);
    }
  }

  // ==========================================
  // PARTE 2: Trigger updated_at
  // ==========================================
  console.log("\n⚙️  PARTE 2: Criando trigger de updated_at...");
  try {
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    await client.query(`DROP TRIGGER IF EXISTS set_updated_at ON inscricoes`);
    await client.query(`
      CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON inscricoes
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log("  ✅ Trigger 'set_updated_at' configurado");
  } catch (err) {
    console.error("  ❌ Erro no trigger:", err.message);
  }

  // ==========================================
  // PARTE 3: Índices de performance
  // ==========================================
  console.log("\n📊 PARTE 3: Criando índices...");
  const indexes = [
    { name: "idx_inscricoes_status", sql: "CREATE INDEX IF NOT EXISTS idx_inscricoes_status ON inscricoes(status)" },
    { name: "idx_inscricoes_ingresso_tipo", sql: "CREATE INDEX IF NOT EXISTS idx_inscricoes_ingresso_tipo ON inscricoes(ingresso_tipo)" },
    { name: "idx_inscricoes_email_flags", sql: "CREATE INDEX IF NOT EXISTS idx_inscricoes_email_flags ON inscricoes(email_confirmacao_enviado, email_preparacao_enviado, email_vespera_enviado)" },
  ];
  for (const idx of indexes) {
    try {
      await client.query(idx.sql);
      console.log(`  ✅ Índice '${idx.name}' criado`);
    } catch (err) {
      console.error(`  ❌ Erro no índice '${idx.name}':`, err.message);
    }
  }

  // ==========================================
  // PARTE 4: RLS Policies
  // ==========================================
  console.log("\n🔒 PARTE 4: Configurando RLS policies...");
  try {
    await client.query("ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY");
    console.log("  ✅ RLS habilitado");
  } catch (err) {
    console.log("  ⏭️  RLS já habilitado");
  }

  const policies = [
    {
      name: "anon_insert_inscricoes",
      sql: `CREATE POLICY "anon_insert_inscricoes" ON inscricoes FOR INSERT TO anon WITH CHECK (true)`,
    },
    {
      name: "anon_select_inscricoes",
      sql: `CREATE POLICY "anon_select_inscricoes" ON inscricoes FOR SELECT TO anon USING (true)`,
    },
  ];

  for (const pol of policies) {
    try {
      await client.query(`DROP POLICY IF EXISTS "${pol.name}" ON inscricoes`);
      await client.query(pol.sql);
      console.log(`  ✅ Policy '${pol.name}' aplicada`);
    } catch (err) {
      console.error(`  ❌ Erro na policy '${pol.name}':`, err.message);
    }
  }

  // ==========================================
  // PARTE 5: Verificação final
  // ==========================================
  console.log("\n🔍 PARTE 5: Verificação — Colunas atuais da tabela inscricoes:");
  const result = await client.query(`
    SELECT column_name, data_type, column_default
    FROM information_schema.columns
    WHERE table_name = 'inscricoes'
    ORDER BY ordinal_position
  `);
  console.log("  ┌──────────────────────────────┬────────────────────┬──────────────────────┐");
  console.log("  │ COLUNA                       │ TIPO               │ DEFAULT              │");
  console.log("  ├──────────────────────────────┼────────────────────┼──────────────────────┤");
  for (const row of result.rows) {
    const col = row.column_name.padEnd(28);
    const type = row.data_type.padEnd(18);
    const def = (row.column_default || "—").substring(0, 20).padEnd(20);
    console.log(`  │ ${col} │ ${type} │ ${def} │`);
  }
  console.log("  └──────────────────────────────┴────────────────────┴──────────────────────┘");
  console.log(`\n  Total: ${result.rows.length} colunas`);

  // ==========================================
  // PARTE 6: Contagem de registros
  // ==========================================
  const count = await client.query("SELECT COUNT(*) as total FROM inscricoes");
  console.log(`  Registros existentes: ${count.rows[0].total}`);

  await client.end();
  console.log("\n🎉 Migração concluída com sucesso!");
}

main().catch((err) => {
  console.error("❌ ERRO FATAL:", err.message);
  process.exit(1);
});
