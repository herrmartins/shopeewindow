import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (connected) {
    /* console.log("MongoDB is connected"); */
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    connected = true;
    /* console.log("MongoDB connected succesfully"); */
  } catch (error) {
    /* console.log("Erro ao conectar com o DB: ", error) */
    throw error
  }
};

export default connectDB;