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

  if (!session) {
    throw new Error("Usuário não autenticado...");
  }

try {
    const parts = imageUrl.split("/");
    const publicId = parts.at(-1).split(".").at(0);
    const fullPublicId = folder ? `${folder}/${publicId}` : publicId;

    const result = await cloudinary.uploader.destroy(fullPublicId);

    if (result.result !== "ok") {
      throw new Error("Falha ao apagar arquivo");
    }
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar: ${error.message}`);
  }
}

export { uploadToCloudinary, deleteFromCloudinary };
