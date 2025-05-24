// src/app/products/[slug]/page.jsx
import { getCategoryModel } from "@/app/Category";
import { getProductModel } from "@/app/Product";

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  await getCategoryModel();
  const Category = await getCategoryModel();
  await getProductModel();
  const Product = await getProductModel();

  const categoryEntity = slug === "all-categories"
    ? null
    : await Category.findOne({ slug });

  const products = slug === "all-categories"
    ? await Product.find({}).lean()
    : await Product.find({ categorySlug: slug }).lean();
    

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {categoryEntity ? categoryEntity.title : "All Categories"}
      </h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id.toString()}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found for {categoryEntity ? categoryEntity.title : "All Categories"}</p>
      )}
    </div>
  );
}