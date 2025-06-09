import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center items-center mb-2">
      <Link href="/">
        <Image
          src="/shared/logoshop.png"
          alt="Webtvbrazil LOGO"
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
      </p>
      {session && <LogoutButton />}
    </div>
  );
}

export default Header;
