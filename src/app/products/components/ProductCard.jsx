'use client';

import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ShareButton";
import { useSession } from "next-auth/react";
import ProductAdminMenu from "./ProductAdminMenu";

function ProductCard({ _id, name, imageUrl, price, priceFrom, description, urlLink, category, highlight, showDescription = true }) {
  const { data: session } = useSession();
  const shareUrl = urlLink || `${typeof window !== 'undefined' ? window.location.origin : ''}/products?product=${_id}`;

  const cardContent = (
    <div
      id={highlight ? `product-${_id}` : undefined}
      className={`relative flex flex-col gap-2 w-48 p-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.50] hover:z-10 ${highlight ? 'ring-2 ring-blue-500' : ''}`}
    >
      {shareUrl && (
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20"
          onClick={(e) => e.preventDefault()}
        >
          <ShareButton productName={name} shareUrl={shareUrl} />
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center dark:bg-gray-50 text-black">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-md"
              loading="lazy"
            />
          ) : (
            <span className="text-gray-400 text-sm dark:text-gray-300">
              Sem imagem
            </span>
          )}
        </div>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-500 text-center">
        {name}
      </h3>
      {/* <p className="text-sm text-gray-700 dark:text-gray-600 text-center">R$ {price}</p> */}
      <p className="text-sm text-gray-700 dark:text-gray-600 text-center">A partir de R$ {priceFrom} {showDescription}</p>
      {showDescription && description && (
        <p className="text-xs text-gray-600 dark:text-gray-600 text-justify">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div className="relative">
      {urlLink ? (
        <Link
          href={urlLink}
          className="no-underline text-inherit hover:no-underline block"
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
      {showDescription && session && <ProductAdminMenu id={_id} />}
    </div>
  );
}

export default ProductCard;
