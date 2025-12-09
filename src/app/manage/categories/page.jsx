import { getCategoryModel, serializeCategories } from "../../models/Category";
import { loadOrphanProducts } from "../../actions/loadOrphanProducts";
import CategoriesManagementClient from "../components/CategoriesManagementClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const CategoriesManagementPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/manage/auth?msg=noauth");
  }

  const Category = await getCategoryModel();
  const rawCategories = await Category.find().sort({ order: 1 }).lean();
  const categories = rawCategories.map(serializeCategories);

  const orphanProducts = await loadOrphanProducts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gerenciamento de Categorias</h1>
              <p className="text-indigo-100 mt-1">Gerencie categorias e produtos órfãos</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <CategoriesManagementClient
            initialCategories={categories}
            initialOrphanProducts={orphanProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagementPage;