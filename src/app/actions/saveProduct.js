"use server";
import { getProductModel } from "@/app/models/Product";
import { deleteFromCloudinary, uploadToCloudinary } from "../lib/claudinary";
import { redirect } from "next/navigation";

export default async function saveProduct(formData) {
  const Product = await getProductModel();
  const category = formData.get("categorySelect");

  const id = formData.get("_id");
  const name = formData.get("name");
  const price = formData.get("price");
  const urlLink = formData.get("url");
  const description = formData.get("description");
  const imageFile = formData.get("image");
  let imageUrl = formData.get("imageUrl") || null;

  if (!name || !price || !category) {
    return {
      status: "error",
      message: "Nome do produto, preço e categoria são campos obrigatórios...",
    };
  }

  

  if (imageFile.size > 0 && typeof imageFile === "object") {
    if (imageUrl) await deleteFromCloudinary(imageUrl, "product");
    imageUrl = await uploadToCloudinary(imageFile, "product");
  }

  if (id && id.trim() !== "") {
    try {
      await Product.updateOne(
        { _id: id },
        { name, price, description, urlLink, imageUrl, category }
      );
    } catch (err) {
      console.log(`Erro ao editar registro: ${err}`);
    }

    redirect(`/admin`);
  } else {
    const newProduct = await Product.create({
      name,
      price,
      description,
      urlLink,
      imageUrl,
      category,
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
}
