import AddProductForm from "@/app/admin/components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const ProductPageWithCatId = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acesso negado...</p>;
  }
  const awaitedParams = await params;
  const { categoryId } = awaitedParams;

  const Category = await getCategoryModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  let selectedCategory = null;
  if (categoryId) {
    selectedCategory = await Category.findById(categoryId).exec();
    selectedCategory = serializeCategories(selectedCategory);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="mt-2 mb-2 text-3xl">
            Adicionar Produtos à{" "}
            {selectedCategory ? selectedCategory.title : "Categoria"}
          </h1>
        </div>
        <Link
          href="/admin"
          className="text-sky-500 hover:text-sky-300 transition flex items-start"
        >
          <FaArrowLeft className="w-5 h-5 mb-2 mx-2" title="Voltar" />
          <span>Voltar às categorias</span>
        </Link>
        <div className="flex justify-center">
          <AddProductForm
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPageWithCatId;
