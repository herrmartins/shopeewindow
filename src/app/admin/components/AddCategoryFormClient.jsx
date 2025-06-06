"use client";

import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const AddCategoryForm = ({
  categories,
  selectedCategory,
  onSetFormData,
  formAction,
  formData,
  handleInputChange,
  handleEmojiClick,
  onResetForm,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="lg:w-full md:w-2xl max-w-5xl m-5 p-8 bg-zinc-800 rounded-lg">
      <h2 className="text-3xl text-gray-300 font-bold mb-6 text-center">
        Select Category
      </h2>

      {formData.isEditing && (
        <h3 className="inline-block text-sm font-semibold bg-blue-600 text-white px-4 py-1 rounded-full shadow-md mb-4">
          Editando: {selectedCategory?.title} {selectedCategory?.emoji}
        </h3>
      )}

      <form action={formAction}>
        <div className="mb-6">
          <label
            htmlFor="categorySelect"
            className="block text-gray-200 font-semibold mb-2"
          >
            Categoria
          </label>
          <input type="hidden" name="id" value={selectedCategory?._id || ""} />
          <input
            type="hidden"
            name="isEditing"
            value={formData.isEditing ? "true" : "false"}
          />

          <select
            id="parentId"
            name="parentId"
            value={formData.parentId}
            onChange={handleInputChange}
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id.toString()}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-300 font-semibold mb-2"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="emoji"
            className="block text-gray-200 font-semibold mb-2"
          >
            Emoji
          </label>
          <div className="flex items-center gap-3">
            <input type="hidden" name="emoji" value={formData.emoji} />
            <div className="text-2xl">{formData.emoji || "🙂"}</div>
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
            >
              {formData.emoji ? "Trocar Emoji" : "Selecionar Emoji"}
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}

          <div className="flex flex-col mt-3">
            <label htmlFor="image" className="text-gray-200 font-semibold mb-2">
              Imagem
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-6 rounded-xl transition"
          />
          <button
            type="button"
            onClick={onResetForm}
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold mt-3 py-2 px-6 rounded-xl transition"
          >
            LIMPAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
