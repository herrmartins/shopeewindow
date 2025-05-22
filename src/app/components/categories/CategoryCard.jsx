import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategoryCard({ _id, title, imageUrl, slug, emoji }) {
  let imageOrEmoji = (
    <Image
      src={
        imageUrl ||
        "https://en.m.wikipedia.org/wiki/File:No_image_available.svg"
      }
      alt={title}
      width={15}
      height={15}
      className="w-[15px] h-[15px] object-cover"
      loading="lazy"
    />
  );

  if (!imageUrl && emoji) {
    imageOrEmoji = (
      <span className="text-[10px] leading-none">{emoji}</span>
    );
  }

  return (
    <Link
      href={`products?category=${slug}`}
      className="no-underline text-inherit hover:text-inherit"
    >
      <div className="flex flex-col items-center w-12 transition-colors duration-300">
        <div className="flex items-center justify-center w-4 h-4">
          {imageOrEmoji}
        </div>
        <h3 className="text-[10px] font-normal truncate text-white leading-tight mt-1">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryCard;