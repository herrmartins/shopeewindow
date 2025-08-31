"use server";

import { redirect } from "next/navigation";
import { deleteFromCloudinary, uploadToCloudinary } from "../lib/claudinary";
import { getCategoryModel, serializeCategories } from "../models/Category";

export default async function addCategory(prevState, formData) {
  const Category = await getCategoryModel();
  const id = formData.get("id");
  const title = formData.get("title");
  const emoji = formData.get("emoji");
  const parent = formData.get("parentId") || null;
  const imageFile = formData.get("image");
  const isEditing = formData.get("isEditing") === "true";
  let imageUrl = formData.get("imageUrl") || null;

  if (!title || !emoji) {
    return {
      status: "error",
      message: "Both title and emoji are required.",
    };
  }

  if (imageFile.size > 0 && typeof imageFile === "object") {
    try {
      if (imageUrl) await deleteFromCloudinary(imageUrl, "categories");
    } catch (err)  {
      throw new Error("Erro ao apagar arquivo...")
    }
    imageUrl = await uploadToCloudinary(imageFile, "categories");
  }

  if (isEditing && id && id.trim() !== "") {
    await Category.updateOne(
      { _id: id },
      { title, emoji, parent, imageUrl, updatedAt: new Date() }
    );

    redirect('/admin')
  } else {
    const newCategory = await Category.create({
      title,
      emoji,
      parent,
      imageUrl,
    });
    const fullCategory = await Category.findById(newCategory._id).lean();
    if (!fullCategory) {
      throw new Error("Failed to retrieve created category");
    }
    return { status: "created", category: serializeCategories(fullCategory) };
  }
}
