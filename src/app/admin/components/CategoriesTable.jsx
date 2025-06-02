"use client";
import { FaBan, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";

const CategoriesTable = ({ cats, onDeleteCategory, onEditCategory }) => {
  return (
    <table className="w-full table-auto border border-gray-700 rounded-lg overflow-hidden text-sm text-gray-300  m-4">
      <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
        <tr>
          <th className="px-4 py-2 border-b border-gray-700">Categoria</th>
          <th className="px-4 py-2 border-b border-gray-700">Imagem</th>
          <th className="px-4 py-2 border-b border-gray-700">Emoji</th>
          <th className="px-4 py-2 border-b border-gray-700">Ação</th>
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
                <span className="flex justify-center text-green-400">
                  <FaCheck />
                </span>
              ) : (
                <span className="italic text-red-500 flex justify-center">
                  <FaBan />
                </span>
              )}
            </td>
            <td className="px-4 py-2 border-b border-gray-700 text-xl">
              <span className="flex justify-center">{cat.emoji}</span>
            </td>
            <td className="px-4 py-2 border-b border-gray-700 text-xl">
              <span className="flex justify-center gap-3 text-xl">
                <FaEdit
                  className="hover:text-yellow-300 cursor-pointer"
                  onClick={() => onEditCategory(cat._id)}
                />
                <FaTrash
                  className="hover:text-red-400 cursor-pointer"
                  onClick={() => onDeleteCategory(cat._id)}
                />
                <IoAddCircleSharp className=" hover:text-blue-400 cursor-pointer" />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
