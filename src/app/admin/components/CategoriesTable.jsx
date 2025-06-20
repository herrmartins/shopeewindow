"use client";
import { FaBan, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import Link from "next/link";

const CategoriesTable = ({ cats, onDeleteCategory, onEditCategory, isEditing }) => {
  return (
    <div className="overflow-x-auto px-4">
      <table className="w-full table-auto text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">Categoria</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">Imagem</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:block">Emoji</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat, index) => (
            <tr
              key={cat._id}
              className={`transition ${
                index % 2 === 0
                  ? "bg-white dark:bg-neutral-900"
                  : "bg-neutral-50 dark:bg-neutral-800"
              } hover:bg-blue-50 dark:hover:bg-neutral-700`}
            >
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-white">
                {cat.title}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                {cat.imageUrl ? (
                  <span className="flex justify-center text-green-600 dark:text-green-400">
                    <FaCheck />
                  </span>
                ) : (
                  <span className="flex justify-center italic text-red-500">
                    <FaBan />
                  </span>
                )}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-xl hidden md:block">
                <div className="flex justify-center">{cat.emoji}</div>
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-center gap-3 text-xl text-neutral-600 dark:text-neutral-300">
                  <FaEdit
                    className="hover:text-yellow-500 transition cursor-pointer"
                    onClick={() => onEditCategory(cat._id)}
                  />
                  <FaTrash
                    className="hover:text-red-500 transition cursor-pointer"
                    onClick={() => onDeleteCategory(cat._id)}
                  />
                  <Link href={`/admin/product/add/${cat._id}`}>
                    <IoAddCircleSharp className="hover:text-sky-500 transition cursor-pointer" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
