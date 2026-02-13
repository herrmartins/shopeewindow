import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  securityQuestion: String,
  securityAnswer: String,
})

export const User = mongoose.models.User || mongoose.model("User", UserSchema)
