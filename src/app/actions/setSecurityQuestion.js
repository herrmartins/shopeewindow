"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongodb";
import { redirect } from "next/navigation";

export default async function setSecurityQuestion(prevState, formData) {
  const securityQuestion = formData.get("securityQuestion");
  const securityAnswer = formData.get("securityAnswer");
  const confirmAnswer = formData.get("confirmAnswer");

  if (!securityQuestion || !securityAnswer || !confirmAnswer) {
    return {
      status: "error",
      message: "Todos os campos são obrigatórios.",
    };
  }

  if (securityAnswer !== confirmAnswer) {
    return {
      status: "error",
      message: "A resposta e a confirmação não coincidem.",
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

  const hashedAnswer = await bcrypt.hash(securityAnswer, 10);
  await User.updateOne(
    { _id: user._id },
    { securityQuestion, securityAnswer: hashedAnswer }
  );

  redirect("/manage");
}
