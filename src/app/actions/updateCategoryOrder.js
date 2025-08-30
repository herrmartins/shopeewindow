"use server";

import { getCategoryModel } from "../models/Category";

export default async function updateCategoryOrder(categories) {
  const Category = await getCategoryModel();

  try {
    const updatePromises = categories.map((cat) =>
      Category.updateOne(
        { _id: cat._id },
        { order: cat.order }
      )
    );

    await Promise.all(updatePromises);

    return { status: "success", message: "Ordem das categorias atualizada com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar ordem das categorias:", error);
    return { status: "error", message: "Erro ao atualizar ordem das categorias." };
  }
}