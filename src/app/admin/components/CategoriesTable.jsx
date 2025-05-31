"use client";
import { FaBan } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react";

const CategoriesTable = ({ cats }) => {

  return (
    <table className="w-full table-auto border border-gray-700 rounded-lg overflow-hidden text-sm text-gray-300">
      <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
        <tr>
          <th className="px-4 py-2 border-b border-gray-700">Categoria</th>
          <th className="px-4 py-2 border-b border-gray-700">Imagem</th>
          <th className="px-4 py-2 border-b border-gray-700">Emoji</th>
        </tr>
      </thead>
      <tbody>
        {cats.map((cat) => (
          <tr
            key={cat._id}
            className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition"
          >
            <td className="px-4 py-2 border-b border-gray-700">{cat.title}</td>
            <td className="px-4 py-2 border-b border-gray-700">
              {cat.imageUrl ? (
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  className="w-10 h-10 object-cover rounded-md border border-gray-600"
                />
              ) : (
                <span className="italic text-red-500 flex justify-center">
                  <FaBan />
                </span>
              )}
            </td>
            <td className="px-4 py-2 border-b border-gray-700 text-xl ">
              <span className="flex justify-center">{cat.emoji}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
