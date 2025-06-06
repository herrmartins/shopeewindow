import { getCategoryModel } from "@/app/models/Category";
import { getProductModel } from "@/app/models/Product";
import SubCategories from "@/app/components/categories/SubCategories";
import { serializeCategories } from "@/app/models/Category";
import ProductsList from "@/app/components/ProductsList";

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const Category = await getCategoryModel();
  const Product = await getProductModel();
  let products = [];
  let subCategories = [];

  let category = null;

  if (slug) {
    products = await Product.find({ categorySlug: slug }).lean();
    category = await Category.findOne({ slug: slug }).lean();
    const rawSubCategories = await Category.find({
      parent: category._id,
    }).lean();
    subCategories = rawSubCategories.map(serializeCategories);
  } else {
    products = await Product.find().lean();
  }

  return (
    <div className="flex justify-center flex-wrap gap-2 m-3">
      {subCategories && <SubCategories categories={subCategories} />}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        <ProductsList products={products} category={category} />
      </div>
    </div>
  );
}
