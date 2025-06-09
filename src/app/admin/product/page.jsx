import AddProductForm from "../components/AddProductForm";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ProductPageForm = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acesso negado...</p>;
  }
  const Category = await getCategoryModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  return (
    <>
      <div className="flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl">Página de Produtos</h1>
        </div>
        <div className="flex justify-center">
          <AddProductForm categories={categories} />
        </div>
      </div>
    </>
  );
};

export default ProductPageForm;
