import Image from "next/image";
import { FaInfoCircle, FaLock } from "react-icons/fa";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";
import ThemeSwitch from "./ThemeSwitch";
import SearchFormComponent from "./SearchForm";
import AdminButton from "./AdminButton";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex justify-center">
        <Link href="/">
          <Image
            src="/shared/logo1.jpg"
            alt="Mosca's Shop LOGO"
            width={900}
            height={255}
            priority
          />
        </Link>
      </div>
      <div className="flex justify-center items-center mb-2">
        <p className="flex">
          <span className="mx-2 mt-1">
            {/* <Link
              href="/about"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full 
               text-neutral-700 dark:text-neutral-300
               hover:bg-neutral-200 dark:hover:bg-neutral-700
               transition-colors duration-200"
              aria-label="Área administrativa"
              title="Área administrativa"
            >
              <FaInfoCircle />
            </Link> */}
          </span>
          <ThemeSwitch />
        </p>
        {session && <LogoutButton isLoggedIn={!!session} />}
        {!session && (
          <span className="mx-2 mt-1">
            {/* <Link
              href="/admin/auth"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full 
               text-neutral-700 dark:text-neutral-300
               hover:bg-neutral-200 dark:hover:bg-neutral-700
               transition-colors duration-200"
              aria-label="Área administrativa"
              title="Área administrativa"
            >
              <FaLock className="w-4 h-4" />
            </Link> */}
          </span>
        )}
        {session && <AdminButton />}
      </div>
      <div className="flex justify-center">
        <SearchFormComponent />
      </div>
    </>
  );
}
