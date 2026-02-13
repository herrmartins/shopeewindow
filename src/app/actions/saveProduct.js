"use server";
import { getProductModel, serializeProduct } from "@/app/models/Product";
import { deleteFromLocalStorage, uploadToLocalStorage } from "../lib/localStorage";
import { revalidatePath } from "next/cache";

export default async function saveProduct(prevState, formData) {
  const Product = await getProductModel();
  const category = formData.get("categorySelect");

  const id = formData.get("_id");
  const name = formData.get("name");
  const price = formData.get("price");
  const priceFrom = formData.get("priceFrom");
  const urlLink = formData.get("url");
  const description = formData.get("description");
  const imageFile = formData.get("image");
  let imageUrl = formData.get("imageUrl") || null;

  console.log("TEM PREÇO DE: ", priceFrom);

  if (!name || !category) {
    return {
      status: "error",
      message: "Nome do produto e categoria são campos obrigatórios...",
    };
  }

  if (imageFile.size > 0 && typeof imageFile === "object") {
    if (imageUrl) await deleteFromLocalStorage(imageUrl, "product");
    imageUrl = await uploadToLocalStorage(imageFile, "product");
  }

  if (id && id.trim() !== "") {
    try {
      await Product.updateOne(
        { _id: id },
        { name, price, description, urlLink, priceFrom, imageUrl, category }
      );
      revalidatePath("/");
      revalidatePath("/manage");
      return {
        status: "success",
        message: "Produto atualizado com sucesso!",
        redirect: "/manage"
      };
    } catch (err) {
      console.log(`Erro ao editar registro: ${err}`);
      return {
        status: "error",
        message: "Erro ao atualizar produto. Tente novamente.",
      };
    }
  } else {
    try {
      const newProduct = await Product.create({
        name,
        price,
        description,
        urlLink,
        priceFrom,
        imageUrl,
        category,
      });
      const fullProduct = await Product.findById(newProduct._id).lean();
      if (!fullProduct) {
        throw new Error("Failed to retrieve created product");
      }
      const serializedProduct = serializeProduct(fullProduct);
      revalidatePath("/");
      revalidatePath("/manage");

      return {
        status: "success",
        message: "Produto criado com sucesso!",
        redirect: "/manage"
      };
    } catch (err) {
      console.log(`Erro ao criar registro: ${err}`);
      return {
        status: "error",
        message: "Erro ao criar produto. Tente novamente.",
      };
    }
  }
}
