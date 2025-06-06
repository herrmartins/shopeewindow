import React from "react";
import addProduct from "@/app/actions/addProduct";

function AddProductForm({ categories, selectedCategory = null }) {
  return (
    <div className="bg-gray-700 rounded-2xl p-3 flex flex-col">
      <form action={addProduct}>
        <div>
          <label htmlFor="name">Produto:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <div>
          <label htmlFor="categorySlug">Categoria:</label>
          <select
            id="categorySelect"
            name="categorySelect"
            defaultValue={selectedCategory?._id || ""}
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            required
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            id="description"
            name="description"
            required
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <div>
          <label htmlFor="url">Link:</label>
          <input
            id="url"
            name="url"
            required
            className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

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

        <div className="flex gap-3">
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-6 rounded-xl transition"
          />
          <button
            type="button"
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold mt-3 py-2 px-6 rounded-xl transition"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
