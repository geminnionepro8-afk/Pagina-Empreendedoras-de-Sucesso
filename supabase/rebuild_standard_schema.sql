-- SOLUÇÃO SÓLIDA: RECONSTRUÇÃO DA TABELA SITE_CONFIG
-- Este script alinha o banco de dados com o padrão profissional do Dashboard.

-- 1. Remover a coluna UUID que causa conflito
ALTER TABLE site_config DROP COLUMN IF EXISTS id;

-- 2. Renomear as colunas para o padrão do código (id e value)
-- Nota: id_key vira id, content vira value
ALTER TABLE site_config RENAME COLUMN id_key TO id;
ALTER TABLE site_config RENAME COLUMN content TO value;

-- 3. Definir o novo ID (ex: 'hero_logo') como a Chave Primária
ALTER TABLE site_config ADD PRIMARY KEY (id);

-- 4. Reconfigurar Segurança RLS para o Dashboard
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura para todos" ON site_config;
CREATE POLICY "Permitir leitura para todos" ON site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção de novas configs" ON site_config;
CREATE POLICY "Permitir inserção de novas configs" ON site_config FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização de configs" ON site_config;
CREATE POLICY "Permitir atualização de configs" ON site_config FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir reset de configs" ON site_config;
CREATE POLICY "Permitir reset de configs" ON site_config FOR DELETE USING (true);

-- 5. Garantir que a coluna updated_at existe
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- IMPORTANTE: Após executar isso, o Admin funcionará 100% sem erros de coluna.
