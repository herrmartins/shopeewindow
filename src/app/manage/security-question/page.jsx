import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SecurityQuestionForm from "./components/SecurityQuestionForm";
import setSecurityQuestionAction from "@/app/actions/setSecurityQuestion";

const SecurityQuestionPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/manage/auth?msg=noauth");
  }

  return <SecurityQuestionForm formAction={setSecurityQuestionAction} />;
};

export default SecurityQuestionPage;
