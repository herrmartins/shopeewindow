import connectDB from "../lib/mongodb";
import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
}, { timestamps: true });

const getConfigModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["Config"];
  }
  return mongoose.models.Config || mongoose.model("Config", configSchema);
};

export { getConfigModel };