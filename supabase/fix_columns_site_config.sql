-- CORREÇÃO DEFINITIVA DA TABELA DE CONFIGURAÇÕES
-- O erro "Could not find the 'value' column" acontece porque o banco ainda está usando nomes antigos.

-- 1. Renomear as colunas se elas existirem com os nomes antigos
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_config' AND column_name='id_key') THEN
    ALTER TABLE site_config RENAME COLUMN id_key TO id;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_config' AND column_name='content') THEN
    ALTER TABLE site_config RENAME COLUMN content TO value;
  END IF;
END $$;

-- 2. Garantir que a tabela existe com a estrutura correta (caso não exista)
CREATE TABLE IF NOT EXISTS site_config (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Recriar as políticas de segurança para garantir acesso total
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura para todos" ON site_config;
CREATE POLICY "Permitir leitura para todos" ON site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção/update para todos" ON site_config;
CREATE POLICY "Permitir inserção/update para todos" ON site_config FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir update real" ON site_config;
CREATE POLICY "Permitir update real" ON site_config FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir delete para todos" ON site_config;
CREATE POLICY "Permitir delete para todos" ON site_config FOR DELETE USING (true);

-- IMPORTANTE: Após executar este comando, o erro de "coluna value não encontrada" desaparecerá.
