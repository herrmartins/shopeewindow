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
      className="w-[50px] h-[50px] object-cover"
      loading="lazy"
    />
  );

  if (!imageUrl && emoji) {
    imageOrEmoji = <span className="text-[50px] leading-none">{emoji}</span>;
  }

  return (
    <Link
      href={`/products/${slug}`}
      className="no-underline text-inherit hover:no-underline"
    >
      <div className="flex flex-col items-center gap-2 min-w-fit px-3 py-2 text-center bg-secondary rounded-lg hover:bg-opacity-80 transition-colors duration-300">
        <div className="flex items-center justify-center">{imageOrEmoji}</div>
        <h3 className="text-xs font-light leading-tight whitespace-nowrap">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
