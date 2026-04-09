-- COMANDOS PARA LIBERAR ACESSO ÀS TABELAS NO SUPABASE
-- Execute estes comandos no seu Editor SQL do Supabase para garantir que o Admin consiga ler e salvar dados.

-- 1. Liberar tabela de Configurações (site_config)
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura para todos" ON site_config;
CREATE POLICY "Permitir leitura para todos" ON site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir atualização para todos" ON site_config;
CREATE POLICY "Permitir atualização para todos" ON site_config FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir update para todos" ON site_config;
CREATE POLICY "Permitir update para todos" ON site_config FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir delete para todos" ON site_config;
CREATE POLICY "Permitir delete para todos" ON site_config FOR DELETE USING (true);


-- 2. Liberar tabela de Interações (logs_interacoes)
ALTER TABLE logs_interacoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura de logs" ON logs_interacoes;
CREATE POLICY "Permitir leitura de logs" ON logs_interacoes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção de logs" ON logs_interacoes;
CREATE POLICY "Permitir inserção de logs" ON logs_interacoes FOR INSERT WITH CHECK (true);

-- IMPORTANTE: Ao executar os comandos acima, o Dashboard começará a receber os dados imediatamente.
