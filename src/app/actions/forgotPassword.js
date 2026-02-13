"use server";

import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongodb";

export default async function forgotPassword(prevState, formData) {
  const username = formData.get("username");
  const securityAnswer = formData.get("securityAnswer");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (!username || !securityAnswer || !newPassword || !confirmPassword) {
    return {
      status: "error",
      message: "Todos os campos são obrigatórios.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      status: "error",
      message: "A nova senha e a confirmação não coincidem.",
    };
  }

  if (newPassword.length < 6) {
    return {
      status: "error",
      message: "A nova senha deve ter pelo menos 6 caracteres.",
    };
  }

  await connectDB();

  const user = await User.findOne({ username });
  if (!user) {
    return {
      status: "error",
      message: "Usuário não encontrado.",
    };
  }

  if (!user.securityQuestion || !user.securityAnswer) {
    return {
      status: "error",
      message: "Este usuário não possui pergunta de segurança configurada. Entre em contato com o administrador.",
    };
  }

  const isValidAnswer = await bcrypt.compare(securityAnswer, user.securityAnswer);
  if (!isValidAnswer) {
    return {
      status: "error",
      message: "Resposta incorreta.",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne(
    { _id: user._id },
    { password: hashedPassword }
  );

  return {
    status: "success",
    message: "Senha redefinida com sucesso. Você já pode fazer login.",
  };
}
