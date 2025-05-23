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
      width={25}
      height={25}
      className="w-[25px] h-[25px] object-cover"
      loading="lazy"
    />
  );

  if (!imageUrl && emoji) {
    imageOrEmoji = (
      <span className="text-[25px] leading-none flex items-center justify-center w-[25px] h-[25px]">{emoji}</span>
    );
  }

  return (
    <Link
      href={`products?category=${slug}`}
      className="no-underline text-inherit hover:text-inherit"
    >
      <div className="flex flex-col items-center w-16 transition-colors duration-300">
        <div className="flex items-center justify-center w-6 h-6">
          {imageOrEmoji}
        </div>
        <h3 className="text-[12px] font-light truncate text-white leading-tight mt-1">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryCard;