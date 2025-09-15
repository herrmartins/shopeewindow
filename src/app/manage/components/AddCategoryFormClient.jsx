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
    <div
      className="lg:w-full md:w-2xl max-w-5xl m-5 p-8 rounded-xl 
                    bg-white dark:bg-neutral-800 
                    border border-neutral-200 dark:border-neutral-700 
                    shadow-sm transition-colors"
    >
      <h2 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mb-6">
        {isEditing ? "Editar Categoria" : "Nova Categoria"}
      </h2>

      {isEditing && (
        <h3 className="inline-block text-sm font-semibold bg-blue-600 text-white px-4 py-1 rounded-full shadow-md mb-4">
          Editando: {selectedCategory?.title} {selectedCategory?.emoji}
        </h3>
      )}

      <form action={formAction}>
        <input type="hidden" name="id" value={selectedCategory?._id || ""} />
        <input type="hidden" name="isEditing" value={isEditing} />

        {/* Categoria Select */}
        <div className="mb-6">
          <label
            htmlFor="parentId"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Categoria
          </label>
          <select
            id="parentId"
            name="parentId"
            value={formData.parentId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 
                       bg-neutral-50 dark:bg-neutral-700 
                       text-neutral-800 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">-- Selecione uma categoria --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id.toString()}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Título */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 
                       bg-neutral-50 dark:bg-neutral-700 
                       text-neutral-800 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Emoji */}
        <div className="mb-6">
          <label
            htmlFor="emoji"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Emoji
          </label>
          <div className="flex items-center gap-3">
            <input type="hidden" name="emoji" value={formData.emoji} />
            <div className="text-2xl">{formData.emoji || "🙂"}</div>
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              {formData.emoji ? "Trocar Emoji" : "Selecionar Emoji"}
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>

        {/* Imagem */}
        <div className="mb-6 flex flex-col items-center">
          {selectedCategory?.imageUrl && (
            <Image
              src={
                selectedCategory.imageUrl ||
                "https://en.m.wikipedia.org/wiki/File:No_image_available.svg"
              }
              alt="Sem imagem"
              width={100}
              height={100}
              loading="lazy"
            />
          )}
          {selectedCategory?.imageUrl && (
            <input type="hidden" name="imageUrl" value={selectedCategory.imageUrl}/>
          )}
          <label
            htmlFor="image"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 mt-2"
          >
            Selecione Imagem
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 
                       bg-neutral-50 dark:bg-neutral-700 
                       text-neutral-800 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <input
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-xl transition"
            value={isEditing ? "Atualizar" : "Cadastrar"}
          />
          <button
            type="button"
            onClick={onResetForm}
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-xl transition"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
