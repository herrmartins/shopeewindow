"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

export default function SubCategories({ categories }) {
  if (!categories || categories.length === 0) return null;
  const [showSubcategories, setShowSubcategories] = useState(false);

  return (
    <div className="w-full mt-3 bg-white rounded-lg p-2 shadow-md border border-gray-200 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Subcategorias</h3>
        <button
          className="flex items-center gap-1 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs font-medium py-1 px-3 rounded-full shadow-sm hover:shadow-md hover:from-blue-500 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 dark:ring-1 dark:ring-blue-400"
          onClick={() => setShowSubcategories((prev) => !prev)}
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
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showSubcategories ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-gray-900 dark:text-white">
          {categories.map((cat) => (
            <Link href={`/products/${cat.slug}`} key={cat._id}>
              <li
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition-colors duration-200 flex items-center gap-1 cursor-pointer dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
              >
                <span className="text-sm">{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}