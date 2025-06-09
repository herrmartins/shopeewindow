import Image from "next/image";
import Link from "next/link";

function ProductCard({ name, imageUrl, price, description, urlLink }) {
  const cardContent = (
    <div className="flex flex-col gap-2 w-48 p-4 rounded-lg bg-zinc-800 text-white transition-all duration-300 ease-in-out hover:bg-zinc-700 hover:scale-[2] hover:z-10">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-gray-600 rounded-md flex items-center justify-center">
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
            <span className="text-gray-300 text-sm">Sem imagem</span>
          )}
        </div>
      </div>
      <h3 className="text-base font-semibold text-center">{name}</h3>
      <p className="text-sm text-gray-400 text-center">R$ {price}</p>
      {description && (
        <p className="text-xs text-gray-500 text-center">
          {description}
        </p>
      )}
    </div>
  );

  return urlLink ? (
    <Link
      href={urlLink}
      className="no-underline text-inherit hover:no-underline"
    >
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

export default ProductCard;