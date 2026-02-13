"use server";

import { getCategoryModel } from "../models/Category";

export default async function updateCategoryOrder(categories) {
  console.log("updateCategoryOrder called with categories:", categories?.map(c => ({ _id: c._id, title: c.title })));

  const Category = await getCategoryModel();

  try {
    // Update each category with its new position in the array
    const updatePromises = categories.map((cat, index) => {
      console.log(`Setting order ${index} for category ${cat.title} (${cat._id})`);
      return Category.updateOne(
        { _id: cat._id },
        { order: index }
      );
    });

    await Promise.all(updatePromises);
    console.log("All category orders updated successfully");

    return { status: "success", message: "Ordem das categorias atualizada com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar ordem das categorias:", error);
    return { status: "error", message: "Erro ao atualizar ordem das categorias." };
  }
}
