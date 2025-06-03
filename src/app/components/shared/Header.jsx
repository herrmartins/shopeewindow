import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-center items-center">
      <Link href="/">
        <Image
          src="/shared/logo.png"
          alt="Webtvbrazil LOGO"
          width={120}
          height={80}
          priority
        />
      </Link>

      <p className="flex">
        Super descontos SHOPEE na WEBTVBRAZIL{" "}
        <span className="mx-2 mt-1 text-blue-300">
          <Link
            href="/about"
          >
            <FaInfoCircle />
          </Link>
        </span>
      </p>
    </div>
  );
}

export default Header;
