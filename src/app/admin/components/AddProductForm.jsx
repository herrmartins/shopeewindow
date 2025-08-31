import saveProduct from "@/app/actions/saveProduct";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";

async function AddProductForm({
  categories,
  selectedCategory = null,
  product = undefined,
}) {
  if (product) {
    const Category = await getCategoryModel();
    const gottenCat = await Category.findOne({ _id: product.category }).lean();
    selectedCategory = serializeCategories(gottenCat);
  }

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 space-y-5 shadow-sm">
      <form action={saveProduct} className="space-y-4">
        {product?._id && <input type="hidden" name="_id" value={product._id} />}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Produto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={product?.name || ""}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label
            htmlFor="categorySelect"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Categoria
          </label>
          <select
            id="categorySelect"
            name="categorySelect"
            defaultValue={product?.category || selectedCategory?._id || ""}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">-- Selecione uma categoria --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Preço
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price || ""}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="priceFrom"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            A partir de
          </label>
          <input
            type="number"
            id="priceFrom"
            name="priceFrom"
            step="0.01"
            min="0"
            required
            defaultValue={product?.priceFrom || ""}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Descrição
          </label>
          <input
            id="description"
            name="description"
            required
            defaultValue={product?.description || ""}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Link
          </label>
          <input
            id="url"
            name="url"
            required
            defaultValue={product?.urlLink || ""}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Imagem
          </label>
          {product?.imageUrl && (
            <input type="hidden" name="imageUrl" value={product.imageUrl} />
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <input
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-xl transition"
            value={product ? "Atualizar" : "Salvar"}
          />
          <button
            type="reset"
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-xl transition"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
