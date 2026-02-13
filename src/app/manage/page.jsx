import { getCategoryModel, serializeCategories } from "../models/Category";
import CategoriesManagementClient from "./components/CategoriesManagementClient";
import { loadOrphanProducts } from "../actions/loadOrphanProducts";
import VisitorCounter from "../components/VisitorCounter";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { User } from "../models/User";
import connectDB from "../lib/mongodb";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/manage/auth?msg=noauth");
  }

  if (!session.user.hasSecurityQuestion) {
    redirect("/manage/security-question");
  }

  const Category = await getCategoryModel();
  const rawCategories = await Category.find().sort({ order: 1 }).lean();
  const categories = rawCategories.map(serializeCategories);

  const orphanProducts = await loadOrphanProducts();

  await connectDB();
  const productCount = await Category.countDocuments();
  const categoryCount = await Category.distinct("title").then(titles => titles.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 lg:py-10 max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Painel Administrativo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Bem-vindo de volta, {session.user.name}
              </p>
            </div>
            <div className="flex gap-3">
              <a href="/manage/categories" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Gerenciar Categorias
              </a>
              <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 dark:border-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Ver Loja
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Categorias</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categoryCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Produtos</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{productCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visitantes</p>
                <VisitorCounter />
              </div>
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sistema</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-1">Online</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/manage/logo" className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Logo</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Alterar logo</p>
                </div>
              </div>
            </a>

            <a href="/manage/carousel" className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Carousel</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Produtos em destaque</p>
                </div>
              </div>
            </a>

            <a href="/manage/password" className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Senha</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Alterar senha</p>
                </div>
              </div>
            </a>

            <a href="/manage/categories" className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative">
              {orphanProducts?.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {orphanProducts.length}
                </span>
              )}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Categorias</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gerenciar + órfãos</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              Gerenciar Produtos
            </h2>
          </div>
          <div className="p-6">
            <CategoriesManagementClient
              initialCategories={categories}
              initialOrphanProducts={orphanProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
