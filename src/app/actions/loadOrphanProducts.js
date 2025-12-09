"use server";

import { getProductModel, serializeProduct } from "../models/Product";

export async function loadOrphanProducts() {
  try {
    const Product = await getProductModel();
    const products = await Product.find({ category: null }).lean();

    if (!products) {
      return [];
    }

    return products.map(serializeProduct).filter(Boolean);
  } catch (error) {
    console.error("Error loading orphan products:", error);
    throw new Error("Failed to load orphan products");
  }
}