import Image from "next/image";
import Link from "next/link";

function CategoryCard({ _id, title = "Produto", slug, imageUrl, emoji }) {

  let imageOrEmoji = (
    <Image
      src={
        imageUrl ||
        "https://en.m.wikipedia.org/wiki/File:No_image_available.svg"
      }
      alt={title}
      width={25}
      height={25}
      className="w-[25px] h-[25px] object-cover"
      loading="lazy"
    />
  );

  if (!imageUrl && emoji) {
    imageOrEmoji = <span className="text-[25px] leading-none">{emoji}</span>;
  }

  return (
    <Link
      href={`/products/${slug}`}
      className="no-underline text-inherit hover:no-underline"
    >
      <div className="flex flex-col items-center gap-2 w-32 transition-colors duration-300 text-white text-center">
        <div className="flex items-center justify-center">{imageOrEmoji}</div>
        <h3 className="text-xs font-light truncate leading-tight">{title}</h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
