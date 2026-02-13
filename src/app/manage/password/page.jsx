import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PasswordChangeForm from "./components/PasswordChangeForm";
import changePasswordAction from "@/app/actions/changePassword";

const PasswordPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/manage/auth?msg=noauth");
  }

  return <PasswordChangeForm formAction={changePasswordAction} />;
};

export default PasswordPage;
