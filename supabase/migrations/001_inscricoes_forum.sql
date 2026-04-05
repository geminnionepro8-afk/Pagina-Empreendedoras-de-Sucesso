-- ============================================
-- MIGRAÇÃO: inscricoes_forum
-- Fórum Mulheres de Sucesso 2026
-- Supabase — Executar no SQL Editor
-- ============================================

-- 1. Adicionar colunas faltantes à tabela existente
-- (Se a tabela 'inscricoes' já existe, usamos ALTER TABLE)

DO $$
BEGIN
  -- ingresso_tipo: estudante / profissional / unifacex
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='ingresso_tipo') THEN
    ALTER TABLE inscricoes ADD COLUMN ingresso_tipo text DEFAULT 'profissional';
  END IF;

  -- valor_pago em centavos (14700 = R$ 147,00)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='valor_pago') THEN
    ALTER TABLE inscricoes ADD COLUMN valor_pago integer DEFAULT 0;
  END IF;

  -- Flags de controle de e-mail (n8n lê essas flags antes de disparar)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='email_confirmacao_enviado') THEN
    ALTER TABLE inscricoes ADD COLUMN email_confirmacao_enviado boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='email_preparacao_enviado') THEN
    ALTER TABLE inscricoes ADD COLUMN email_preparacao_enviado boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='email_vespera_enviado') THEN
    ALTER TABLE inscricoes ADD COLUMN email_vespera_enviado boolean DEFAULT false;
  END IF;

  -- Validação de documento (IA de visão via n8n)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='validacao_status') THEN
    ALTER TABLE inscricoes ADD COLUMN validacao_status text DEFAULT 'pendente';
  END IF;

  -- URL do comprovante no Storage
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='comprovante_url') THEN
    ALTER TABLE inscricoes ADD COLUMN comprovante_url text NULL;
  END IF;

  -- ID de referência do pagamento (PagSeguro / Kiwify)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='payment_id') THEN
    ALTER TABLE inscricoes ADD COLUMN payment_id text NULL;
  END IF;

  -- Timestamp de atualização
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscricoes' AND column_name='updated_at') THEN
    ALTER TABLE inscricoes ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- 2. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON inscricoes;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON inscricoes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 3. Índices para performance do n8n
CREATE INDEX IF NOT EXISTS idx_inscricoes_status ON inscricoes(status);
CREATE INDEX IF NOT EXISTS idx_inscricoes_ingresso_tipo ON inscricoes(ingresso_tipo);
CREATE INDEX IF NOT EXISTS idx_inscricoes_email_flags ON inscricoes(email_confirmacao_enviado, email_preparacao_enviado, email_vespera_enviado);

-- 4. RLS (Row Level Security) — permitir insert via anon key
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;

-- Policy: anon pode inserir
DROP POLICY IF EXISTS "anon_insert_inscricoes" ON inscricoes;
CREATE POLICY "anon_insert_inscricoes" ON inscricoes
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: anon pode ler suas próprias linhas (por email)
DROP POLICY IF EXISTS "anon_select_inscricoes" ON inscricoes;
CREATE POLICY "anon_select_inscricoes" ON inscricoes
  FOR SELECT TO anon
  USING (true);

-- Policy: service_role tem acesso total (usado pelo n8n)
DROP POLICY IF EXISTS "service_full_access" ON inscricoes;
CREATE POLICY "service_full_access" ON inscricoes
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Storage Bucket para comprovantes de estudante
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprovantes', 'comprovantes', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: anon pode fazer upload ao bucket
DROP POLICY IF EXISTS "anon_upload_comprovantes" ON storage.objects;
CREATE POLICY "anon_upload_comprovantes" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'comprovantes');

-- Policy: service_role pode ler (n8n busca a imagem para IA)
DROP POLICY IF EXISTS "service_read_comprovantes" ON storage.objects;
CREATE POLICY "service_read_comprovantes" ON storage.objects
  FOR SELECT TO service_role
  USING (bucket_id = 'comprovantes');

-- ============================================
-- FIM DA MIGRAÇÃO
-- ============================================
