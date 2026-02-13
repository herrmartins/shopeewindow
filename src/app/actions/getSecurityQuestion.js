"use server";

import { User } from "@/app/models/User";
import connectDB from "@/app/lib/mongodb";

export default async function getSecurityQuestion(prevState, formData) {
  const username = formData.get("username");

  if (!username) {
    return {
      status: "error",
      message: "O nome de usuário é obrigatório.",
      securityQuestion: null,
    };
  }

  await connectDB();

  const user = await User.findOne({ username });
  if (!user) {
    return {
      status: "error",
      message: "Usuário não encontrado.",
      securityQuestion: null,
    };
  }

  if (!user.securityQuestion) {
    return {
      status: "error",
      message: "Este usuário não possui pergunta de segurança configurada. Entre em contato com o administrador.",
      securityQuestion: null,
    };
  }

  return {
    status: "success",
    message: "",
    securityQuestion: user.securityQuestion,
  };
}
