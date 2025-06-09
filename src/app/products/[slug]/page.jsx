import { getCategoryModel } from "@/app/models/Category";
import { getProductModel } from "@/app/models/Product";
import SubCategories from "@/app/components/categories/SubCategories";
import { serializeCategories } from "@/app/models/Category";
import ProductsGrid from "@/app/components/ProductsList";
import Pagination from "@/app/components/shared/Pagination";
import { CategoriesPath } from "@/app/components/categories/CategoriesPath";
import {findCategoryPath} from "@/app/products/service/findCategoryPath";

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
  const sParams = await searchParams;
  const currentPage = parseInt(sParams?.page || "1", 10);
  const skip = (currentPage - 1) * pageSize;

  let category = null;
  let categoryParents = [];

  if (slug) {
    category = await Category.findOne({ slug: slug }).lean();
    products = await Product.find({ category: category._id })
      .skip(skip)
      .limit(pageSize)
      .lean();
    total = await Product.countDocuments({ category: category._id });

    const rawSubCategories = await Category.find({
      parent: category._id,
    }).lean();

    categoryParents = await findCategoryPath(category._id);

    console.log(categoryParents);

    if (rawSubCategories.length > 0) {
      /* Separeted from the products of the chosen category
       to avoid errors. */
      const subCategoryIds = rawSubCategories.map((cat) => cat._id);

      const subCategoryProducts = await Product.find({
        category: { $in: subCategoryIds },
      })
        .skip(skip)
        .limit(pageSize)
        .lean();

      products = [...products, ...subCategoryProducts];

      const subTotal = await Product.countDocuments({
        category: { $in: subCategoryIds },
      });
      total += subTotal;
    }

    subCategories = rawSubCategories.map(serializeCategories);
  } else {
    products = await Product.find().skip(skip).limit(pageSize).lean();
    total = await Product.countDocuments({});
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 m-3">
        {subCategories && (
          <div>
            <SubCategories categories={subCategories} />
            {categoryParents.length > 1 && (
              <div className="block">
                <CategoriesPath path={categoryParents} />
              </div>
            )}
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
          <ProductsGrid products={products} category={category} />
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
