import React from "react";
import logo from "../../../../public/shared/logo.png";
import Image from "next/image";

function Header() {
  return (
    <div className="flex justify-center items-center">
      <Image src={logo} alt="Webtvbrazil LOGO" width={120} height={80} />
      <p>Super descontos SHOPEE na WEBTVBRAZIL</p>
    </div>
  );
}

export default Header;
