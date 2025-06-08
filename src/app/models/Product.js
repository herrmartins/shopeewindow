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
  return {
    _id: productObj._id?.toString?.() ?? "",
    name: productObj.name ?? "",
    description: productObj.description ?? "",
    price: productObj.price ?? 0,
    imageUrl: productObj.imageUrl ?? "",
    urlLink: productObj.urlLink ?? "",
    category: productObj.category?.toString?.() ?? "",
    createdAt: productObj.createdAt?.toISOString?.() ?? null,
    updatedAt: productObj.updatedAt?.toISOString?.() ?? null,
  };
}

export { Product, getProductModel, serializeProduct };
