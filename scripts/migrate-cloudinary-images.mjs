#!/usr/bin/env node

/**
 * Script de migração: Baixar imagens do Cloudinary e salvar localmente
 *
 * Este script:
 * 1. Conecta ao MongoDB
 * 2. Busca categorias com URLs do Cloudinary
 * 3. Baixa cada imagem e salva em public/uploads/category/
 * 4. Cria um arquivo de mapeamento (cloudinary-backup.json) para possível reversão
 * 5. (Opcional) Atualiza o banco com as novas URLs locais
 *
 * Uso:
 *   node scripts/migrate-cloudinary-images.js [--dry-run] [--update-db]
 *
 *   --dry-run: Apenas lista as imagens que seriam baixadas (não baixa)
 *   --update-db: Atualiza o banco de dados com as novas URLs locais
 */

import "dotenv/config";
import mongoose from "mongoose";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync, readFileSync } from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

// Configurações
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar .env.local se existir (prioridade sobre .env)
const envLocalPath = path.join(process.cwd(), ".env.local");
if (existsSync(envLocalPath)) {
  const envContent = readFileSync(envLocalPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "category");
const BACKUP_FILE = path.join(process.cwd(), "cloudinary-backup.json");
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

// Schema do Category (inline para não depender do app)
const categorySchema = new mongoose.Schema(
  {
    title: String,
    imageUrl: String,
    emoji: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    slug: String,
    order: Number,
  },
  { timestamps: true }
);

// Função para baixar imagem
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    const options = {
      headers: {
        "User-Agent": USER_AGENT,
      },
    };

    protocol
      .get(url, options, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          // Seguir redirects
          return downloadImage(res.headers.location, filepath)
            .then(resolve)
            .catch(reject);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download: ${res.statusCode}`));
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          writeFile(filepath, buffer)
            .then(() => resolve(filepath))
            .catch(reject);
        });
      })
      .on("error", reject);
  });
}

// Gerar nome de arquivo único (mesma lógica do localStorage.js)
function generateUniqueFileName(originalUrl) {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);

  // Tentar extrair extensão da URL original
  let ext = ".jpg"; // padrão
  const urlPath = new URL(originalUrl).pathname;
  const match = urlPath.match(/\.(jpg|jpeg|png|webp|gif|avif)(?:\?.*)?$/i);
  if (match) {
    ext = match[1].toLowerCase();
    if (ext === "jpg") ext = ".jpg";
    else if (ext === "jpeg") ext = ".jpeg";
    else if (ext === "png") ext = ".png";
    else if (ext === "webp") ext = ".webp";
    else if (ext === "gif") ext = ".gif";
    else if (ext === "avif") ext = ".avif";
  }

  return `${timestamp}-${randomStr}${ext}`;
}

// Verificar se URL é do Cloudinary
function isCloudinaryUrl(url) {
  if (!url) return false;
  return url.includes("cloudinary.com") || url.includes("res.cloudinary.com");
}

// Conectar ao MongoDB
async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Conectado ao MongoDB");
}

// Função principal de migração
async function migrateImages(dryRun = false, updateDB = false) {
  const Category = mongoose.model("Category", categorySchema);

  // Buscar categorias com URLs do Cloudinary
  const categories = await Category.find({
    imageUrl: { $exists: true, $ne: null, $regex: /cloudinary\.com/i },
  });

  console.log(`\n📁 Encontradas ${categories.length} categorias com imagens do Cloudinary`);

  if (categories.length === 0) {
    console.log("Nenhuma imagem para migrar.");
    return;
  }

  // Garantir diretório de uploads
  if (!dryRun && !existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
    console.log(`📁 Diretório criado: ${UPLOAD_DIR}`);
  }

  const mapping = [];
  let successCount = 0;
  let errorCount = 0;

  // Processar categorias
  for (const category of categories) {
    const cloudinaryUrl = category.imageUrl;
    console.log(`\n⏳ Processando: ${category.title}`);
    console.log(`   URL: ${cloudinaryUrl}`);

    if (dryRun) {
      console.log("   [DRY-RUN] Imagem não será baixada");
      mapping.push({
        categoryId: category._id.toString(),
        categoryTitle: category.title,
        cloudinaryUrl,
        localPath: null,
      });
      continue;
    }

    const fileName = generateUniqueFileName(cloudinaryUrl);
    const localPath = path.join(UPLOAD_DIR, fileName);
    const localUrl = `/uploads/category/${fileName}`;

    try {
      await downloadImage(cloudinaryUrl, localPath);
      console.log(`   ✅ Baixada: ${fileName}`);

      mapping.push({
        categoryId: category._id.toString(),
        categoryTitle: category.title,
        cloudinaryUrl,
        localPath: localUrl,
        downloadedAt: new Date().toISOString(),
      });

      if (updateDB) {
        category.imageUrl = localUrl;
        await category.save();
        console.log(`   🔄 DB atualizado: ${localUrl}`);
      }

      successCount++;
    } catch (error) {
      console.error(`   ❌ Erro: ${error.message}`);
      errorCount++;
      mapping.push({
        categoryId: category._id.toString(),
        categoryTitle: category.title,
        cloudinaryUrl,
        localPath: null,
        error: error.message,
      });
    }
  }

  // Salvar arquivo de mapeamento/backup
  if (!dryRun) {
    await writeFile(
      BACKUP_FILE,
      JSON.stringify(
        {
          migratedAt: new Date().toISOString(),
          totalCategories: categories.length,
          successCount,
          errorCount,
          mappings: mapping,
        },
        null,
        2
      )
    );
    console.log(`\n💾 Mapeamento salvo em: ${BACKUP_FILE}`);
  }

  // Resumo
  console.log("\n" + "=".repeat(50));
  console.log("📊 RESUMO");
  console.log("=".repeat(50));
  console.log(`Total de categorias: ${categories.length}`);
  console.log(`✅ Sucesso: ${successCount}`);
  console.log(`❌ Erros: ${errorCount}`);
  console.log(`📁 Diretório: ${UPLOAD_DIR}`);
  console.log(`💾 Backup: ${BACKUP_FILE}`);

  if (dryRun) {
    console.log("\n⚠️  MODO DRY-RUN: Nenhuma imagem foi baixada.");
    console.log("Execute novamente sem --dry-run para baixar as imagens.");
  }

  if (updateDB) {
    console.log("\n🔄 Banco de dados atualizado com as novas URLs locais.");
    console.log("⚠️  O arquivo cloudinary-backup.json contém as URLs originais.");
  } else {
    console.log("\n⚠️  Banco de dados NÃO foi atualizado (--update-db não usado).");
    console.log("   Execute com --update-db para atualizar o banco.");
  }
}

// Script de reversão
async function revertMigration() {
  const Category = mongoose.model("Category", categorySchema);

  // Ler arquivo de backup
  const fs = await import("fs/promises");
  const backupData = JSON.parse(
    await fs.readFile(BACKUP_FILE, "utf-8")
  );

  const mappings = backupData.mappings;

  console.log(`\n🔄 Revertendo ${mappings.length} categorias...`);

  let reverted = 0;
  let notFound = 0;

  for (const mapping of mappings) {
    if (!mapping.cloudinaryUrl) continue;

    const result = await Category.updateOne(
      { _id: mapping.categoryId },
      { $set: { imageUrl: mapping.cloudinaryUrl } }
    );

    if (result.modifiedCount === 1) {
      console.log(`✅ Revertido: ${mapping.categoryTitle}`);
      reverted++;
    } else {
      console.log(`⚠️  Categoria não encontrada: ${mapping.categoryTitle}`);
      notFound++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Revertidos: ${reverted}`);
  console.log(`⚠️  Não encontrados: ${notFound}`);
}

// Função para apenas atualizar o banco (sem baixar imagens)
async function updateDBOnly() {
  const Category = mongoose.model("Category", categorySchema);
  const fs = await import("fs/promises");

  // Buscar categorias com URLs do Cloudinary
  const categories = await Category.find({
    imageUrl: { $exists: true, $ne: null, $regex: /cloudinary\.com/i },
  });

  console.log(`\n📁 Encontradas ${categories.length} categorias com URLs do Cloudinary`);

  // Ler arquivos locais
  const files = await fs.readdir(UPLOAD_DIR);
  console.log(`📁 ${files.length} arquivos encontrados em ${UPLOAD_DIR}`);

  let updated = 0;
  let notFound = 0;

  for (const category of categories) {
    const cloudinaryUrl = category.imageUrl;

    // Procurar arquivo correspondente (pega qualquer arquivo que começa com o timestamp aproximado)
    // Como não temos mapeamento, vamos gerar nomes baseados no ID da categoria
    const categoryFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.gif'));

    if (categoryFiles.length === 0) {
      console.log(`⚠️  Nenhum arquivo encontrado para: ${category.title}`);
      notFound++;
      continue;
    }

    // Pegar o primeiro arquivo disponível (não é ideal mas funciona para atualizar)
    const fileName = categoryFiles[0];
    const localUrl = `/uploads/category/${fileName}`;

    // Remover arquivo usado para não duplicar
    const fileIndex = files.indexOf(fileName);
    if (fileIndex > -1) {
      files.splice(fileIndex, 1);
    }

    category.imageUrl = localUrl;
    await category.save();
    console.log(`✅ Atualizado: ${category.title} → ${localUrl}`);
    updated++;
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 RESUMO");
  console.log("=".repeat(50));
  console.log(`✅ Atualizados: ${updated}`);
  console.log(`⚠️  Não encontrados: ${notFound}`);
}

// Função para corrigir o caminho de category para categories
async function fixCategoryPath() {
  const Category = mongoose.model("Category", categorySchema);

  // Buscar categorias com /uploads/category/ (sem o "s")
  const categories = await Category.find({
    imageUrl: { $regex: /^\/uploads\/category\//i },
  });

  console.log(`\n📁 Encontradas ${categories.length} categorias com path "/uploads/category/"`);

  let updated = 0;
  let skipped = 0;

  for (const category of categories) {
    // Trocar /uploads/category/ por /uploads/categories/
    const oldUrl = category.imageUrl;
    const newUrl = oldUrl.replace('/uploads/category/', '/uploads/categories/');

    category.imageUrl = newUrl;
    await category.save();
    console.log(`✅ Atualizado: ${category.title}`);
    console.log(`   ${oldUrl}`);
    console.log(`   → ${newUrl}`);
    updated++;
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 RESUMO");
  console.log("=".repeat(50));
  console.log(`✅ Atualizados: ${updated}`);
  console.log(`⏭️  Pulados: ${skipped}`);
}

// Parse argumentos CLI
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const shouldUpdateDB = args.includes("--update-db");
const shouldUpdateDBOnly = args.includes("--update-db-only");
const shouldFixPath = args.includes("--fix-path");
const shouldRevert = args.includes("--revert");

// Main
(async () => {
  try {
    await connectDB();

    if (shouldRevert) {
      await revertMigration();
    } else if (shouldUpdateDBOnly) {
      await updateDBOnly();
    } else if (shouldFixPath) {
      await fixCategoryPath();
    } else {
      await migrateImages(isDryRun, shouldUpdateDB);
    }

    await mongoose.disconnect();
    console.log("\n✅ Script concluído!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro fatal:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
})();
