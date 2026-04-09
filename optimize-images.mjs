/**
 * optimize-images.mjs
 * 
 * Gera versões WebP otimizadas de todas as imagens do projeto.
 * - Originais NÃO são alterados
 * - WebP gerado lado a lado com mesmo nome + .webp
 * - Imagens grandes são redimensionadas para largura máxima adequada
 * - Placeholders tiny gerados para efeito blur-up progressivo
 * 
 * Uso: node optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════
// CONFIGURAÇÃO
// ═══════════════════════════════════════════════════

const IMAGE_DIRS = [
  path.join(__dirname, 'src', 'assets'),
  path.join(__dirname, 'src', 'assets', 'speakers'),
  path.join(__dirname, 'public', 'images'),
  path.join(__dirname, 'public', 'images', 'audience'),
];

const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Configuração de largura máxima por padrão de nome
const MAX_WIDTH_RULES = [
  { pattern: /speakers\/\d+\.png$/i, maxWidth: 800 },      // Speaker photos: 800px é mais que suficiente
  { pattern: /laptop_support/i, maxWidth: 1200 },           // Laptop: 1200px de largura
  { pattern: /hero-speaker/i, maxWidth: 1920 },             // Hero: full HD width
  { pattern: /service-card/i, maxWidth: 600 },              // Card pequeno
  { pattern: /service-main/i, maxWidth: 800 },              // Service main
  { pattern: /event-info/i, maxWidth: 1200 },               // Event info
  { pattern: /audience/i, maxWidth: 800 },                  // Audience cards
  { pattern: /about-audience/i, maxWidth: 800 },            // About audience
  { pattern: /logo-instituto/i, maxWidth: 500 },            // Logo
  { pattern: /laptop_premium/i, maxWidth: 1000 },           // Laptop premium
  { pattern: /hero-bg/i, maxWidth: 1920 },                  // Hero background
  { pattern: /auditorium/i, maxWidth: 800 },                // Auditorium
  { pattern: /venue/i, maxWidth: 1200 },                    // Venue
];

// Qualidade WebP (0-100). 80 é excelente para fotos, visualmente indistinguível
const WEBP_QUALITY = 82;
const PLACEHOLDER_WIDTH = 20; // 20px de largura para placeholder blur-up

// ═══════════════════════════════════════════════════
// FUNÇÕES
// ═══════════════════════════════════════════════════

function getMaxWidth(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  for (const rule of MAX_WIDTH_RULES) {
    if (rule.pattern.test(normalized)) {
      return rule.maxWidth;
    }
  }
  return 1200; // Default
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function getImageFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const s = await stat(fullPath);
      if (s.isFile()) {
        const ext = path.extname(entry).toLowerCase();
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          // Skip files that are already optimized WebP outputs
          if (!entry.endsWith('.webp') && !entry.includes('.placeholder.')) {
            files.push(fullPath);
          }
        }
      }
    }
  } catch (err) {
    console.warn(`⚠ Diretório não encontrado: ${dir}`);
  }
  return files;
}

async function optimizeImage(inputPath) {
  const dir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const outputWebP = path.join(dir, `${baseName}.webp`);
  const outputPlaceholder = path.join(dir, `${baseName}.placeholder.webp`);

  const originalSize = (await stat(inputPath)).size;
  const maxWidth = getMaxWidth(inputPath);

  try {
    // Get original dimensions
    const metadata = await sharp(inputPath).metadata();
    const needsResize = metadata.width > maxWidth;

    // ── Generate optimized WebP ──
    let pipeline = sharp(inputPath);
    
    if (needsResize) {
      pipeline = pipeline.resize({ 
        width: maxWidth, 
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    await pipeline
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(outputWebP);

    const optimizedSize = (await stat(outputWebP)).size;

    // ── Generate tiny placeholder for blur-up ──
    await sharp(inputPath)
      .resize({ width: PLACEHOLDER_WIDTH, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 20 })
      .toFile(outputPlaceholder);

    const placeholderSize = (await stat(outputPlaceholder)).size;
    const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(
      `  ✅ ${path.basename(inputPath)}` +
      `  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}` +
      `  (${reduction}% menor)` +
      `${needsResize ? ` [redimensionado: ${metadata.width}px → ${maxWidth}px]` : ''}` +
      `  | placeholder: ${formatBytes(placeholderSize)}`
    );

    return { originalSize, optimizedSize, placeholderSize };
  } catch (err) {
    console.error(`  ❌ Erro em ${path.basename(inputPath)}: ${err.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════

async function main() {
  console.log('\n══════════════════════════════════════════════════');
  console.log('  🖼️  OTIMIZADOR DE IMAGENS — WebP + Placeholders');
  console.log('══════════════════════════════════════════════════\n');

  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalFiles = 0;

  for (const dir of IMAGE_DIRS) {
    const files = await getImageFiles(dir);
    if (files.length === 0) continue;

    const relDir = path.relative(__dirname, dir);
    console.log(`\n📁 ${relDir}/  (${files.length} imagens)`);
    console.log('─'.repeat(60));

    for (const file of files) {
      const result = await optimizeImage(file);
      if (result) {
        totalOriginal += result.originalSize;
        totalOptimized += result.optimizedSize;
        totalFiles++;
      }
    }
  }

  console.log('\n══════════════════════════════════════════════════');
  console.log(`  📊 RESULTADO FINAL`);
  console.log(`     Arquivos processados: ${totalFiles}`);
  console.log(`     Tamanho original:     ${formatBytes(totalOriginal)}`);
  console.log(`     Tamanho otimizado:    ${formatBytes(totalOptimized)}`);
  console.log(`     Redução total:        ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`     Economia:             ${formatBytes(totalOriginal - totalOptimized)}`);
  console.log('══════════════════════════════════════════════════\n');
}

main().catch(console.error);
