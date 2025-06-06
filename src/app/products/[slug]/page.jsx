import { getCategoryModel } from "@/app/models/Category";
import { getProductModel } from "@/app/models/Product";
import SubCategories from "@/app/components/categories/SubCategories";
import { serializeCategories } from "@/app/models/Category";
import ProductsList from "@/app/components/ProductsList";
import Pagination from "@/app/components/shared/Pagination";

export default async function ProductsPage({
  params,
  searchParams,
  pageSize = 18,
}) {
  const { slug } = await params;

  const Category = await getCategoryModel();
  const Product = await getProductModel();
  let products = [];
  let subCategories = [];

  let total = 0;
  const currentPage = (await searchParams.page) || 1;
  const skip = (currentPage - 1) * pageSize;

  let category = null;

  if (slug) {
    products = await Product.find({ categorySlug: slug }).skip(skip).lean();
    total = await Product.countDocuments({ categorySlug: slug });

    category = await Category.findOne({ slug: slug }).lean();
    const rawSubCategories = await Category.find({
      parent: category._id,
    }).lean();
    subCategories = rawSubCategories.map(serializeCategories);
  } else {
    products = await Product.find().lean();
    total = await Product.countDocuments({});
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 m-3">
        {subCategories && <SubCategories categories={subCategories} />}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
          <ProductsList products={products} category={category} />
        </div>
      </div>
      <Pagination
        page={parseInt(currentPage)}
        pageSize={parseInt(pageSize)}
        totalItems={parseInt(total)}
        slug={slug}
      />
    </>
  );
}
