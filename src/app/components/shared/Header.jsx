import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";
import ThemeSwitch from "./ThemeSwitch";
import SearchFormComponent from "./SearchForm";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex justify-center items-center mb-2">
        <Link href="/">
          <Image
            src="/shared/logoshop.png"
            alt="Mosca's Shop LOGO"
            width={240}
            height={160}
            priority
          />
        </Link>

        <p className="flex">
          <span className="mx-2 mt-1 text-blue-300">
            <Link href="/about">
              <FaInfoCircle />
            </Link>
          </span>
          <ThemeSwitch />
        </p>
        {session && <LogoutButton isLoggedIn={!!session} />}
      </div>
      <div className="flex justify-center">
        <SearchFormComponent />
      </div>
    </>
  );
}
