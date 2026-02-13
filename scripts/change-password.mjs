#!/usr/bin/env node

/**
 * Script simples para trocar senha de usuário
 *
 * Uso:
 *   node scripts/change-password.mjs <username> <nova-senha>
 *
 * Exemplo:
 *   node scripts/change-password.mjs admin novaSenha123
 */

import "dotenv/config";
import { existsSync, readFileSync } from "fs";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Carregar .env.local se existir
const envLocalPath = path.join(process.cwd(), ".env.local");
if (existsSync(envLocalPath)) {
  const envContent = readFileSync(envLocalPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

// Schema do User
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

async function changePassword(username, newPassword) {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI não encontrada no .env");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✅ Conectado ao MongoDB");

  const User = mongoose.model("User", userSchema);

  // Buscar usuário
  const user = await User.findOne({ username });

  if (!user) {
    console.error(`❌ Usuário "${username}" não encontrado`);
    await mongoose.disconnect();
    process.exit(1);
  }

  // Hash da nova senha
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Atualizar
  await User.updateOne({ username }, { $set: { password: hashedPassword } });

  console.log(`✅ Senha atualizada para o usuário: ${username}`);
  await mongoose.disconnect();
}

// Main
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log("\nUso: node scripts/change-password.mjs <username> <nova-senha>\n");
  console.log("Exemplo: node scripts/change-password.mjs admin novaSenha123\n");
  process.exit(1);
}

const [username, newPassword] = args;

changePassword(username, newPassword).catch((err) => {
  console.error("❌ Erro:", err.message);
  process.exit(1);
});
