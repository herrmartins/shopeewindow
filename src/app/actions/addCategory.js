// app/actions/addCategory.js
"use server";

import { getCategoryModel } from "../models/Category";
import cloudinary from "../lib/claudinary";

export default async function addCategory(prevState, formData) {
  const Category = await getCategoryModel();
  const id = formData.get("categorySelect");
  const title = formData.get("title");
  const emoji = formData.get("emoji");
  const imageFile = formData.get("image");

  if (!title || !emoji) {
    return {
      status: "error",
      message: "Both title and emoji are required.",
    };
  }

  let imageUrl = null;

  if (imageFile && typeof imageFile === "object") {
    imageUrl = await uploadToCloudinary(imageFile);    
  }

  if (id && id.trim() !== "") {
    await Category.updateOne(
      { _id: id },
      { title, emoji, updatedAt: new Date() }
    );

    return {
      status: "updated",
      id,
      data: { title, emoji, _id: id },
    };
  } else {
    const newCategory = await Category.create({ title, emoji, imageUrl });
    const fullCategory = await Category.findById(newCategory._id).lean();
    fullCategory._id = fullCategory._id.toString();
    return { status: "created", category: fullCategory };
  }
}

async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}
