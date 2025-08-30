"use client";
import { FaBan, FaCheck, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";

function CategoryItem({ cat, index, onDeleteCategory, onEditCategory, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <tr
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
        <div className="flex justify-center gap-2 text-xl text-neutral-600 dark:text-neutral-300">
          <FaArrowUp
            className={`hover:text-blue-500 transition cursor-pointer ${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !isFirst && onMoveUp(index)}
          />
          <FaArrowDown
            className={`hover:text-blue-500 transition cursor-pointer ${isLast ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !isLast && onMoveDown(index)}
          />
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
  );
}

const CategoriesTable = ({ cats, onDeleteCategory, onEditCategory, isEditing, onSaveOrder }) => {
  const [categories, setCategories] = useState(cats);

  const moveUp = (index) => {
    if (index > 0) {
      setCategories((prev) => {
        const newCategories = [...prev];
        [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
        return newCategories;
      });
    }
  };

  const moveDown = (index) => {
    if (index < categories.length - 1) {
      setCategories((prev) => {
        const newCategories = [...prev];
        [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
        return newCategories;
      });
    }
  };

  const saveOrder = () => {
    const updatedCategories = categories.map((cat, index) => ({
      ...cat,
      order: index,
    }));
    onSaveOrder(updatedCategories);
  };

  return (
    <div className="overflow-x-auto px-4">
      <button
        onClick={saveOrder}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Salvar Ordem
      </button>
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
          {categories.map((cat, index) => (
            <CategoryItem
              key={cat._id}
              cat={cat}
              index={index}
              onDeleteCategory={onDeleteCategory}
              onEditCategory={onEditCategory}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              isFirst={index === 0}
              isLast={index === categories.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
