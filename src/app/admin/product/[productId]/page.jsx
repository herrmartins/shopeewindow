import { getProductModel } from "@/app/models/Product";
import AddProductForm from "../../components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";

const ProductPageForm = async ({params}) => {
  const Category = await getCategoryModel();
  const Product = await getProductModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  const { productId } = await params;

  const product = await Product.find({_id:productId});

  return (
    <>
      <div className="flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl">Página de Produtos</h1>
        </div>
        <div className="flex justify-center">
          <AddProductForm categories={categories} product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductPageForm;
