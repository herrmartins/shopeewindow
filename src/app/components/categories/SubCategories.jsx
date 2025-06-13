"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

export default function SubCategories({ categories }) {
  const [showSubcategories, setShowSubcategories] = useState(false);
  if (!categories?.length) return null;

  return (
    <div className="w-full mt-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 shadow-sm p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold text-neutral-800 dark:text-white">
          Subcategorias
        </h3>
        <button
          onClick={() => setShowSubcategories((prev) => !prev)}
          className="flex items-center gap-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full transition"
          aria-expanded={showSubcategories}
        >
          {showSubcategories ? (
            <>
              Ocultar <FaChevronUp className="text-xs" />
            </>
          ) : (
            <>
              Ver Subcategorias <FaChevronDown className="text-xs" />
            </>
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showSubcategories
            ? "max-h-[500px] opacity-100 mt-2"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-wrap gap-3 mt-2">
          {categories.map((cat) => (
            <Link key={cat._id} href={`/products/${cat.slug}`}>
              <li className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-900 dark:bg-sky-800 dark:hover:bg-sky-700 dark:text-white text-sm font-medium cursor-pointer transition whitespace-nowrap">
                <span className="text-base">{cat.emoji}</span>
                <span className="truncate">{cat.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
