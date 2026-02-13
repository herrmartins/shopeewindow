"use server";
import { getProductModel } from "../models/Product";
import { deleteFromLocalStorage } from "../lib/localStorage";
import { redirect } from "next/navigation";

export async function deleteProduct(productId) {
  const Product = await getProductModel();

  const product = await Product.findOne({_id: productId })
  if (product.imageUrl) await deleteFromLocalStorage(product.imageUrl, "product");
  
  await Product.deleteOne({ _id: productId });
  redirect("/");
}
