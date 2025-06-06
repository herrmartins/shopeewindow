import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ _id, name, imageUrl, price, description, urlLink }) {
  console.log("HTML: ", urlLink)
  const imageOrFallback = imageUrl ? (
    <Image
      src={imageUrl}
      alt={name}
      width={64}
      height={64}
      className="w-16 h-16 object-cover rounded-md"
      loading="lazy"
    />
  ) : (
    <div className="w-16 h-16 bg-gray-600 rounded-md flex items-center justify-center text-gray-300 text-xs">
      Sem imagem
    </div>
  );

  return (
    <Link
      href={urlLink || ""}
      className="no-underline text-inherit hover:no-underline"
    >
      <div className="flex flex-col gap-1 w-40 p-3 rounded-lg bg-zinc-800 text-white transition hover:bg-zinc-700">
        <div className="flex justify-center">{imageOrFallback}</div>
        <h3 className="text-sm font-semibold truncate text-center">{name}</h3>
        <p className="text-xs text-gray-400 text-center">R$ {price}</p>
        {description && (
          <p className="text-[10px] text-gray-500 text-center truncate">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
