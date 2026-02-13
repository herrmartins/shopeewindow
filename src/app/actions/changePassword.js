"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongodb";

export default async function changePassword(prevState, formData) {
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (!currentPassword || !newPassword || !confirmPassword) {
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

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return {
      status: "error",
      message: "Usuário não autenticado.",
    };
  }

  await connectDB();

  const user = await User.findById(session.user.id);
  if (!user) {
    return {
      status: "error",
      message: "Usuário não encontrado.",
    };
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return {
      status: "error",
      message: "A senha atual está incorreta.",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne(
    { _id: user._id },
    { password: hashedPassword }
  );

  return {
    status: "success",
    message: "Senha alterada com sucesso.",
  };
}
