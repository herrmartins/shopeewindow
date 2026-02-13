import AddProductForm from "@/app/manage/components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

const ProductPageWithCatId = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-red-500 text-white px-6 py-3 rounded-xl mb-4 inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 0l-2 2m2 0l2-2m-2 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="font-semibold">Acesso Negado</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Voce precisa estar logado para acessar esta pagina.</p>
          <Link href="/manage/auth" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  const awaitedParams = await params;
  const { categoryId } = awaitedParams;

  const Category = await getCategoryModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  let selectedCategory = null;
  if (categoryId && categoryId !== "add") {
    const rawSelectedCategory = await Category.findById(categoryId).lean();
    selectedCategory = serializeCategories(rawSelectedCategory);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Link
            href="/manage"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7 7m0 0l-7 7m7-7l-7 7m0 0l-7-7m7 7l-7-7m-7 7l-7-7m7 7a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Voltar ao Painel
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            {selectedCategory ? "Editar Produto" : "Adicionar Produto"}
          </h1>
          {selectedCategory && (
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Categoria: {selectedCategory.emoji} {selectedCategory.title}
            </p>
          )}
        </div>

        <AddProductForm
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default ProductPageWithCatId;
