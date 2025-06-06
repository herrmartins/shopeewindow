import { getCategoryModel } from "@/app/models/Category";
import { getProductModel } from "@/app/models/Product";
import ProductCard from "../components/ProductCard";
import SubCategories from "@/app/components/categories/SubCategories";
import { serializeCategories } from "@/app/models/Category";

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const Category = await getCategoryModel({ parent: null });
  const Product = await getProductModel();
  let products = [];
  let subCategories = [];

  let category = null;

  if (slug) {
    products = await Product.find({ categorySlug: slug }).lean();
    category = await Category.findOne({ slug: slug }).lean();
    const rawSubCategories = await Category.find({ parent: category._id }).lean();
    subCategories = rawSubCategories.map(serializeCategories);

  } else {
    products = await Product.find().lean();
  }

  return (
    <div className="flex justify-center flex-wrap gap-2 m-3">
      {subCategories && (
          <SubCategories
              categories={subCategories}
          />
      )}
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id.toString()} className="mb-4">
            <ProductCard {...product} />
          </div>
        ))
      ) : (
        <p>
          Não há produtos{" "}
          {category ? category?.title : "para esta categoria..."}
        </p>
      )}

    </div>
  );
}
