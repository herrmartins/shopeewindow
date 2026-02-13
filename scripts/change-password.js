#!/usr/bin/env node

/**
 * Script para alterar senha de usuário no MongoDB
 *
 * Uso:
 *   node scripts/change-password.js --user "username" --pass "nova_senha"
 *
 * Exemplo:
 *   node scripts/change-password.js --user "mosca" --pass "admin123"
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Parse argumentos
const args = process.argv.slice(2);
let username = "";
let newPassword = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--user" && args[i + 1]) {
    username = args[i + 1];
  } else if (args[i] === "--pass" && args[i + 1]) {
    newPassword = args[i + 1];
  }
}

if (!username || !newPassword) {
  console.log("\n❌ Erro: Parâmetros --user e --pass são obrigatórios\n");
  console.log("Uso:");
  console.log("  node scripts/change-password.js --user \"username\" --pass \"nova_senha\"\n");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shopeewindow";

async function changePassword() {
  try {
    console.log("\n🔐 Alterando senha de usuário...");
    console.log(`   Usuário: ${username}`);

    // Conectar ao MongoDB
    console.log(`   Conectando ao MongoDB...`);
    await mongoose.connect(MONGODB_URI);
    console.log("   ✅ Conectado!\n");

    // Buscar usuário
    const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
      name: String,
      username: { type: String, unique: true },
      email: { type: String, unique: true },
      password: String,
      securityQuestion: String,
      securityAnswer: String,
    }));

    const user = await User.findOne({ username });

    if (!user) {
      console.log(`❌ Usuário "${username}" não encontrado!\n`);
      process.exit(1);
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha
    await User.updateOne(
      { username },
      { password: hashedPassword }
    );

    console.log(`✅ Senha alterada com sucesso!`);
    console.log(`   Usuário: ${username}`);
    console.log(`   Nova senha: ${newPassword}\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro:", error.message);
    process.exit(1);
  }
}

changePassword();
