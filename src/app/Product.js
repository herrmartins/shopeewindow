import mongoose from "mongoose";
import connectDB from "./lib/mongodb";

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const getProductModel = async () => {
  await connectDB();
  return mongoose.models.Product || mongoose.model("Product", Product);
};

export { Product, getProductModel };