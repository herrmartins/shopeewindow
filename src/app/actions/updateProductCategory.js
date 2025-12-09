"use server";

import { getProductModel } from "../models/Product";
import { revalidatePath } from "next/cache";

export async function updateProductCategory(productId, newCategoryId) {
  try {
    const Product = await getProductModel();

    const updateData = {
      category: newCategoryId || null,
    };

    const result = await Product.updateOne(
      { _id: productId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      throw new Error("Product not found");
    }

    revalidatePath("/manage/categories");

    return { status: "success", message: "Categoria do produto atualizada com sucesso" };
  } catch (error) {
    console.error("Error updating product category:", error);
    throw new Error("Falha ao atualizar categoria do produto");
  }
}