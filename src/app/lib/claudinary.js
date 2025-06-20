import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file, folder = "general") {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Usuário não autenticado...");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}

async function deleteFromCloudinary(imageUrl, folder) {
  const session = await getServerSession();
  if (!session) throw new Error('Usuário não autenticado...');

  try {
    const parts = imageUrl.split('/');
    const publicId = parts.at(-1).split('.')[0];
    const fullPublicId = folder ? `${folder}/${publicId}` : publicId;

    try {
      await cloudinary.api.resource(fullPublicId, { resource_type: 'image' });
    } catch (error) {
      if (error.http_code === 404) {
        console.warn(`File not found in Cloudinary: ${fullPublicId}`);
        return false;
      }
      console.error(`Error checking resource: ${error.message}`);
      throw new Error(`Erro ao verificar recurso: ${error.message}`);
    }

    const result = await cloudinary.uploader.destroy(fullPublicId, {
      resource_type: 'image',
      invalidate: true,
    });

    if (result.result === 'not found') {
      console.warn(`File already deleted: ${fullPublicId}`);
      return false;
    }
    if (result.result !== 'ok') {
      throw new Error(`Falha ao apagar arquivo: ${result.result}`);
    }
    return true;
  } catch (error) {
    console.error(`Erro ao deletar: ${error.message}`);
    return false;
  }
}

export { uploadToCloudinary, deleteFromCloudinary };
