"use server";
import { revalidatePath } from "next/cache";
import { getCategoryModel } from "../models/Category";

export async function deleteCategory(categoryId) {
  const Category = await getCategoryModel();
  
  await Category.deleteOne({ _id: categoryId });
}
