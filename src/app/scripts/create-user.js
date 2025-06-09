import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const uri = "mongodb://admin:rafa****@localhost:27017/shopeemagnata?authSource=admin"

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

async function run() {
  await mongoose.connect(uri)

  const hashed = await bcrypt.hash("admin123", 10)

  const existing = await User.findOne({ email: "admin" })
  if (existing) {
    console.log("⚠️  User already exists.")
  } else {
    await User.create({
      name: "Admin",
      email: "admin",
      password: hashed
    })
    console.log("✅ User created.")
  }

  await mongoose.disconnect()
}

run().catch(console.error)
