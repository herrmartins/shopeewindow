"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

export default function SubCategories({ categories }) {
  if (!categories || categories.length === 0) return null;
  const [showSubcategories, setShowSubcategories] = useState(false);

  return (
    <div className="w-full mt-3 bg-gray-500 rounded-lg p-2 shadow-sm border border-gray-600">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-200">Subcategorias</h3>
        <button
          className="flex items-center gap-1 bg-blue-400 text-gray-50 text-xs font-medium py-1 px-3 rounded-full hover:bg-blue-500 transition-colors duration-200 focus:outline-none"
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
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-gray-600">
          {categories.map((cat) => (
            <Link href={`/products/${cat.slug}`} key={cat._id}>
              <li className="bg-gray-400 hover:bg-gray-400 text-gray-50 p-2 rounded-md transition-colors duration-200 flex items-center gap-1 cursor-pointer">
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
