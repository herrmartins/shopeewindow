import { getProductModel, serializeProduct } from "@/app/models/Product";
import AddProductForm from "@/app/admin/components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ProductPageForm = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acesso negado...</p>;
  }
  const Category = await getCategoryModel();
  const Product = await getProductModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  const { productId } = await params;

  const product = await Product.findOne({ _id: productId }).lean();

  return (
    <>
      <div className="flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl">Página de Produtos</h1>
        </div>
        <div className="flex justify-center">
          <AddProductForm
            categories={categories}
            product={serializeProduct(product)}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPageForm;
