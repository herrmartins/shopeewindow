"use client";

import { FaCheck } from "react-icons/fa";

function OrphanProductItem({ product, categories, onUpdateCategory, isSelected }) {
  return (
    <tr className={isSelected ? "bg-indigo-50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}>
      <td className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
            {product.description && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {product.description}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 text-center">
        <div className="inline-flex items-center gap-1">
          {product.price && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
              R$ {product.price.toFixed(2)}
            </span>
          )}
          {product.priceFrom && (
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-full">
              R$ {product.priceFrom?.toFixed(2)}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
        <select
          value={product.category || ""}
          onChange={(e) => onUpdateCategory(product._id, e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        >
          <option value="">Selecione...</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.emoji} {cat.title}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
        <a
          href={product.urlLink}
          target="_blank"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
        >
          Ver
        </a>
      </td>
    </tr>
  );
}

function OrphanProductsTable({ products, categories, onUpdateCategory }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8 text-center">
        <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl mb-4 inline-block">
          <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 0l-2 2m2 0l2-2m-2 2v6a2 2 0 01-2 2h-6a2 2 0 01-2 2v-6a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum produto orfao encontrado
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Todos os produtos estao associados a categorias validas.
        </p>
        <a
          href="/manage/categories"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
        >
          Gerenciar Categorias
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 0l-2 2m2 0l2-2m-2 2v6a2 2 0 01-2 2h-6a2 2 0 01-2 2v-6a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            Produtos Orfaos ({products.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Precos
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nova Categoria
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {products.map((product) => (
                <OrphanProductItem
                  key={product._id}
                  product={product}
                  categories={categories}
                  onUpdateCategory={onUpdateCategory}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrphanProductsTable;
