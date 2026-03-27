// Script para criar a tabela inscricoes no Supabase via connection string direta
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

const sql = `
create table if not exists public.inscricoes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  nome text not null,
  email text not null,
  telefone text not null,
  instagram text,
  cpf text not null,
  cidade text not null,
  ingresso text not null default 'taxa_social',
  valor_cents integer not null default 4900,
  pagseguro_order_id text unique,
  pix_qr_code text,
  pix_copia_cola text,
  pix_expira_em timestamptz,
  status text not null default 'pendente'
    check (status in ('pendente', 'pago', 'expirado', 'cancelado'))
);

alter table public.inscricoes enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename='inscricoes' and policyname='allow_anon_insert'
  ) then
    create policy "allow_anon_insert" on public.inscricoes
      for insert to anon with check (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename='inscricoes' and policyname='allow_anon_select'
  ) then
    create policy "allow_anon_select" on public.inscricoes
      for select to anon using (true);
  end if;
end $$;
`;

async function main() {
  console.log("Conectando ao Supabase...");
  await client.connect();
  console.log("Conectado! Criando tabela...");
  await client.query(sql);
  console.log("SUCESSO: Tabela inscricoes criada com RLS.");
  await client.end();
}

main().catch((err) => {
  console.error("ERRO:", err.message);
  process.exit(1);
});
