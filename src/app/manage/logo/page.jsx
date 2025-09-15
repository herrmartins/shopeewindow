import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoClientWrapper from "./LogoClientWrapper";
import getLogo from "@/app/actions/getLogo";

const LogoPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/manage/auth?msg=noauth");
  }

  const currentLogo = await getLogo();

  return <LogoClientWrapper initialLogo={currentLogo} />;
};

export default LogoPage;