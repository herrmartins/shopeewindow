// app/actions/addCategory.js
"use server";

import { getCategoryModel } from "../models/Category";

export default async function addCategory(prevState, formData) {
  console.log("FORM DATA", formData);

  const Category = await getCategoryModel();
  const id = formData.get("categorySelect");
  const title = formData.get("title");
  const emoji = formData.get("emoji");

  if (!title || !emoji) {
    return {
      status: "error",
      message: "Both title and emoji are required.",
    };
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
    const newCategory = await Category.create({ title, emoji });
    const fullCategory = await Category.findById(newCategory._id).lean();
    fullCategory._id = fullCategory._id.toString();
    return { status: "created", category: fullCategory };
  }
}
