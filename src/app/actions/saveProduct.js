"use server";
import { getProductModel } from "@/app/models/Product";
import { uploadToCloudinary } from "../lib/claudinary";
import { getCategoryModel } from "../models/Category";

export default async function saveProduct(formData) {
  const Product = await getProductModel();
  const category = formData.get("categorySelect");

  const name = formData.get("name");
  const price = formData.get("price");
  const urlLink = formData.get("url");
  const description = formData.get("description");
  const imageFile = formData.get("image");

  if (!name || !price || !category) {
    return {
      status: "error",
      message: "Nome do produto, preço e categoria são campos obrigatórios...",
    };
  }

  let imageUrl = null;

  if (imageFile.size > 0 && typeof imageFile === "object") {
    imageUrl = await uploadToCloudinary(imageFile, "product");
  }

  const newProduct = await Product.create({
    name,
    price,
    description,
    urlLink,
    imageUrl,
    category
  });

  const fullProduct = await Product.findById(newProduct._id).lean();
  fullProduct._id = fullProduct._id.toString();
  const id = fullProduct._id;

  return {
    status: "created",
    id,
    data: { name, price, description, urlLink, imageUrl, category, _id: id },
  };
}
