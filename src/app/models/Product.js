import connectDB from "../lib/mongodb";
import mongoose from "mongoose";

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceFrom: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    urlLink: {
      type: String,
      default: null,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const getProductModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["Product"];
  }
  return mongoose.models.Product || mongoose.model("Product", Product);
};

function serializeProduct(productObj) {
  if (!productObj || !productObj._id) {
    console.warn("Invalid product object:", productObj);
    return null;
  }

  try {
    return {
      _id: productObj._id?.toString?.() ?? "",
      name: productObj.name ?? "",
      description: productObj.description ?? "",
      price: productObj.price ?? 0,
      priceFrom: productObj.priceFrom ?? 0,
      imageUrl: productObj.imageUrl ?? "",
      urlLink: productObj.urlLink ?? "",
      category: productObj.category?.toString?.() ?? "",
      createdAt: productObj.createdAt?.toISOString?.() ?? null,
      updatedAt: productObj.updatedAt?.toISOString?.() ?? null,
    };
  } catch (error) {
    console.error("Error serializing product:", error, productObj);
    return null;
  }
}
Product.index({ name: "text" });
export { Product, getProductModel, serializeProduct };
