"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddProductFormClient({
  categories,
  selectedCategory = null,
  product = undefined,
  serverAction,
}) {
  const router = useRouter();
  const [state, formAction] = useActionState(serverAction, null);

  useEffect(() => {
    if (state?.status === "success" && state?.redirect) {
      const timer = setTimeout(() => {
        router.push(state.redirect);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {product ? "Editar Produto" : "Novo Produto"}
              </h2>
              {selectedCategory && (
                <p className="text-emerald-100 text-sm mt-1">
                  Categoria: {selectedCategory.emoji} {selectedCategory.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Toast */}
        {state?.status && (
          <div className={`mx-6 mt-4 p-4 rounded-xl flex items-center gap-3 ${
            state.status === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
          }`}>
            {state.status === "success" ? (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{state.message}</span>
            {state.status === "success" && (
              <svg className="w-5 h-5 ml-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </div>
        )}

        <form action={formAction} className="p-6 space-y-5">
          {product?._id && <input type="hidden" name="_id" value={product._id} />}

          {/* Nome do Produto */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Nome do Produto *
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={product?.name || ""}
              placeholder="Ex: iPhone 15 Pro"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-white placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="categorySelect"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Categoria *
              </span>
            </label>
            <select
              id="categorySelect"
              name="categorySelect"
              defaultValue={product?.category || selectedCategory?._id || ""}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            >
              <option value="">-- Selecione uma categoria --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.emoji} {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Preço De */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .843-3 3h.01M12 8c1.657 0 3 .843 3 3h.01M12 8V5m0 0 0 0-2h-6c-1.657 0-3 .843-3 3v6c0 1.657.843 3 3 3h6c1.657 0 3-.843 3-3V8m-6 0c-1.657 0-3 .843-3 3v6c0 1.657.843 3 3 3h6c1.657 0 3-.843 3-3V8m-6 0c-1.657 0-3 .843-3 3v6c0 1.657.843 3 3 3h6c1.657 0 3-.843 3-3V8z" />
                  </svg>
                  Preço De *
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">R$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  defaultValue={product?.price || ""}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-800 dark:text-white placeholder:text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Preço Por */}
            <div>
              <label
                htmlFor="priceFrom"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  A partir de *
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">R$</span>
                <input
                  type="number"
                  id="priceFrom"
                  name="priceFrom"
                  step="0.01"
                  min="0"
                  required
                  defaultValue={product?.priceFrom || ""}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-800 dark:text-white placeholder:text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0h.01M9 12h6m-6 0h.01M12 9v6m0-6 0h.01M12 9v6m0-6 0h.01M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0h.01M9 12h6m-6 0h.01M12 9v6m0-6 0h.01M12 9v6m0-6 0h.01M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Descrição
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              defaultValue={product?.description || ""}
              rows="3"
              placeholder="Descreva o produto..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-white placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none"
            />
          </div>

          {/* Link */}
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656-1.172l-4-4a4 4 0 010-5.656 1.172l-4 4a4 4 0 005.656 1.172l4-4a4 4 0 010 5.656 1.172l4-4a4 4 0 005.656 1.172l-4-4a4 4 0 01-5.656-1.172l-4 4a4 4 0 010-5.656-1.172l-4 4a4 4 0 005.656 1.172l4-4a4 4 0 015.656-1.172l-4-4a4 4 0 01-5.656-1.172z" />
                </svg>
                Link do Produto *
              </span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              required
              defaultValue={product?.urlLink || ""}
              placeholder="https://shopee.com.br/produto"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-white placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Imagem */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Imagem do Produto
              </span>
            </label>
            {product?.imageUrl && (
              <div className="mb-3 p-2 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 inline-block">
                <Image
                  src={product.imageUrl}
                  alt="Imagem atual"
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            {product?.imageUrl && (
              <input type="hidden" name="imageUrl" value={product.imageUrl} />
            )}
            <div className="relative">
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
                         file:bg-emerald-50 file:text-emerald-700
                         dark:file:bg-emerald-900/30 dark:file:text-emerald-300
                         hover:file:bg-emerald-100
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <input
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              value={product ? "💾 Atualizar Produto" : "✨ Adicionar Produto"}
              disabled={state?.status === "success"}
            />
            <button
              type="reset"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
