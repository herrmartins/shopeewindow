import React from "react";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/shared/logo.png"
        alt="Webtvbrazil LOGO"
        width={120}
        height={80}
      />
      <p>
        Super descontos SHOPEE na WEBTVBRAZIL{" "}
        <span>
          <Link href="/about" className="no-underline text-inherit hover:no-underline">
          <FaInfoCircle />
          </Link>
        </span>
      </p>
    </div>
  );
}

export default Header;
