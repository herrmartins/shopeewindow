import AddProductForm from "../../components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";

const ProductPageWithCatId = async ({ params }) => {
  const awaitedParams = await params;
  const { categoryId } = awaitedParams;
  console.log("Awaited params: ", awaitedParams);
  

  const Category = await getCategoryModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  let selectedCategory = null;
  if (categoryId) {
    selectedCategory =await Category.findById(categoryId).exec();
    selectedCategory = serializeCategories(selectedCategory);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl">Adicionar Produtos à {selectedCategory ? selectedCategory._doc.title : "Categoria"}</h1>
        </div>
        <div className="flex justify-center">
          <AddProductForm categories={categories} selectedCategory={selectedCategory} />
        </div>
      </div>
    </>
  );
};

export default ProductPageWithCatId;
