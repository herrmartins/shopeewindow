"use client";

import { FaBan, FaCheck, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from "react";

function CategoryItem({ cat, index, onDeleteCategory, onEditCategory, onMoveUp, onMoveDown, isFirst, isLast, isEditing }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
          />
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 flex items-center justify-center text-xl">
            {cat.emoji}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{cat.title}</div>
            {cat.parent && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Pai: {typeof cat.parent === "object" ? cat.parent.title : cat.parent}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {cat.slug}
        </div>
      </td>
      <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-center">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
            title="Mover para cima"
          >
            <FaArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
            title="Mover para baixo"
          >
            <FaArrowDown className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEditCategory(cat._id)}
            className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded-lg transition-all"
            title="Editar"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteCategory(cat._id)}
            className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-all"
            title="Excluir"
          >
            <FaTrash className="w-4 h-4" />
          </button>
          <a href={"/manage/product/add/" + cat._id} className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded-lg transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0l-2 2m2 0l2 2m2 2v6a2 2 0 01-2 2h 6a2 2 0 01-2 2v-6a2 2 0 012 2m0 0V5a2 2 0 012 2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </a>
        </div>
      </td>
    </tr>
  );
}

function CategoriesTable({ cats, onDeleteCategory, onEditCategory, isEditing, onSaveOrder }) {
  const [localCats, setLocalCats] = useState(cats);

  // Sync localCats when cats prop changes
  useEffect(() => {
    setLocalCats(cats);
  }, [cats]);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newCats = [...localCats];
    [newCats[index - 1], newCats[index]] = [newCats[index], newCats[index - 1]];
    setLocalCats(newCats);
  };

  const handleMoveDown = (index) => {
    if (index === localCats.length - 1) return;
    const newCats = [...localCats];
    [newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]];
    setLocalCats(newCats);
  };

  const handleSaveOrder = () => {
    console.log("handleSaveOrder called with localCats:", localCats.map(c => ({ _id: c._id, title: c.title })));
    // Pass the localCats to parent's onSaveOrder
    onSaveOrder(localCats);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2 2v-6a2 2 0 012 2m0 0V5a2 2 0 012 2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            Categorias ({localCats.length})
          </h2>
          <button
            onClick={handleSaveOrder}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
          >
            Salvar Ordem
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoria</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Slug</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ordem</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {localCats.map((cat, index) => (
                <CategoryItem
                  key={cat._id}
                  cat={cat}
                  index={index}
                  onDeleteCategory={onDeleteCategory}
                  onEditCategory={onEditCategory}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  isFirst={index === 0}
                  isLast={index === localCats.length - 1}
                  isEditing={isEditing}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoriesTable;
