import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const UPLOAD_DIR = path.join(PUBLIC_DIR, 'uploads');

// Garantir que o diretório de uploads existe
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Garantir que o subdiretório da pasta existe
async function ensureFolderDir(folder) {
  const folderPath = path.join(UPLOAD_DIR, folder);
  if (!existsSync(folderPath)) {
    await mkdir(folderPath, { recursive: true });
  }
  return folderPath;
}

// Gerar nome de arquivo único
function generateUniqueFileName(originalName, options = {}) {
  const { prefix = '', extOverride } = options;
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  const ext = extOverride || path.extname(originalName);
  const safePrefix = prefix ? `${prefix}-` : '';
  return `${safePrefix}${timestamp}-${randomStr}${ext}`;
}

async function uploadToLocalStorage(file, folder = "general", options = {}) {
  const { prefix = '', normalizeImage = false } = options;
  const session = await getServerSession();

  if (!session) {
    throw new Error("Usuário não autenticado...");
  }

  await ensureUploadDir();
  const folderPath = await ensureFolderDir(folder);

  const arrayBuffer = await file.arrayBuffer();
  let buffer = Buffer.from(arrayBuffer);
  let extOverride;

  if (normalizeImage && file.type?.startsWith('image/')) {
    buffer = await sharp(buffer)
      .rotate()
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();
    extOverride = '.png';
  }

  const fileName = generateUniqueFileName(file.name, { prefix, extOverride });
  const filePath = path.join(folderPath, fileName);

  await writeFile(filePath, buffer);

  // Retornar URL pública (caminho relativo a /public)
  return `/uploads/${folder}/${fileName}`;
}

async function deleteFromLocalStorage(imageUrl, folder) {
  const session = await getServerSession();
  if (!session) throw new Error('Usuário não autenticado...');

  try {
    // Extrair apenas o nome do arquivo da URL
    const parts = imageUrl.split('/');
    const fileName = parts.at(-1);

    // Se for uma URL do Cloudinary, não fazer nada (apenas retorna)
    if (imageUrl.includes('cloudinary.com')) {
      console.warn(`Arquivo do Cloudinary não será deletado localmente: ${imageUrl}`);
      return false;
    }

    const folderPath = await ensureFolderDir(folder);
    const filePath = path.join(folderPath, fileName);

    // Verificar se o arquivo existe antes de deletar
    if (!existsSync(filePath)) {
      console.warn(`File not found in local storage: ${filePath}`);
      return false;
    }

    await unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Erro ao deletar: ${error.message}`);
    return false;
  }
}

export { uploadToLocalStorage, deleteFromLocalStorage };
