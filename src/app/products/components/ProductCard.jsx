import Image from "next/image";
import Link from "next/link";

function ProductCard({ name, imageUrl, price, description, urlLink }) {
  const cardContent = (
    <div className="flex flex-col gap-2 w-48 p-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.80] hover:z-10">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center dark:bg-gray-600 dark:text-gray-100">
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
            <span className="text-gray-400 text-sm dark:text-gray-300">Sem imagem</span>
          )}
        </div>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-500 text-center">{name}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-600 text-center">R$ {price}</p>
      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-600 text-center">{description}</p>
      )}
    </div>
  );

  return urlLink ? (
    <Link href={urlLink} className="no-underline text-inherit hover:no-underline">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

export default ProductCard;