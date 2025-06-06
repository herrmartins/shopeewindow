"use server";

import { uploadToCloudinary } from "../lib/claudinary";
import { getCategoryModel } from "../models/Category";

export default async function addCategory(prevState, formData) {
  const Category = await getCategoryModel();
  const id = formData.get("id");
  const title = formData.get("title");
  const emoji = formData.get("emoji");
  const parent = formData.get("parentId") || null;
  const imageFile = formData.get("image");
  const isEditing = formData.get("isEditing") === "true";

  if (!title || !emoji) {
    return {
      status: "error",
      message: "Both title and emoji are required.",
    };
  }

  let imageUrl = null;

  if (imageFile.size > 0 && typeof imageFile === "object") {
    imageUrl = await uploadToCloudinary(imageFile, "categories");
  }

  if (isEditing && id && id.trim() !== "") {
    await Category.updateOne(
      { _id: id },
      { title, emoji, parent, updatedAt: new Date() }
    );

    return {
      status: "updated",
      id,
      data: { title, emoji, parent, _id: id },
    };
  } else {
    const newCategory = await Category.create({
      title,
      emoji,
      parent,
      imageUrl,
    });
    const fullCategory = await Category.findById(newCategory._id).lean();
    fullCategory._id = fullCategory._id.toString();
    return { status: "created", category: fullCategory };
  }
}
