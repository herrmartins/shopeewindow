"use client";

import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import Image from "next/image";

const AddCategoryForm = ({
  categories,
  selectedCategory,
  onSetFormData,
  formAction,
  formData,
  handleInputChange,
  handleEmojiClick,
  onResetForm,
  isEditing,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEditing ? "Editar Categoria" : "Nova Categoria"}
            </h2>
            {isEditing && selectedCategory && (
              <p className="text-indigo-100 text-sm mt-1">
                Editando: {selectedCategory.title} {selectedCategory.emoji}
              </p>
            )}
          </div>
          <div className="p-2 bg-white/20 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <form action={formAction} className="p-6">
        <input type="hidden" name="id" value={selectedCategory?._id || ""} />
        <input type="hidden" name="isEditing" value={isEditing} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categoria Select */}
          <div>
            <label
              htmlFor="parentId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Categoria Pai (opcional)
              </span>
            </label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="">Nenhuma (categoria principal)</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id.toString()}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Título da Categoria
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ex: Eletrônicos"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-white placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
        </div>

        {/* Emoji */}
        <div className="mt-6">
          <label
            htmlFor="emoji"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Emoji
            </span>
          </label>
          <div className="flex items-center gap-4">
            <input type="hidden" name="emoji" value={formData.emoji} />
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl text-4xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              {formData.emoji || "🙂"}
            </div>
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formData.emoji ? "Trocar Emoji" : "Selecionar Emoji"}
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>

        {/* Imagem */}
        <div className="mt-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Imagem da Categoria
            </span>
          </label>
          <div className="flex flex-col items-center">
            {selectedCategory?.imageUrl && (
              <div className="mb-4 p-2 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <Image
                  src={selectedCategory.imageUrl}
                  alt="Imagem atual"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </div>
            )}
            {selectedCategory?.imageUrl && (
              <input type="hidden" name="imageUrl" value={selectedCategory.imageUrl}/>
            )}
            <div className="w-full">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                         bg-gray-50 dark:bg-gray-700
                         text-gray-800 dark:text-white
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-medium
                         file:bg-indigo-50 file:text-indigo-700
                         dark:file:bg-indigo-900/30 dark:file:text-indigo-300
                         hover:file:bg-indigo-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <input
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            value={isEditing ? "💾 Atualizar Categoria" : "✨ Cadastrar Categoria"}
          />
          <button
            type="button"
            onClick={onResetForm}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
