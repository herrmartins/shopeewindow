import AddProductForm from "@/app/admin/components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
      <div className="flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl">
            Adicionar Produtos à{" "}
            {selectedCategory ? selectedCategory._doc.title : "Categoria"}
          </h1>
        </div>
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
