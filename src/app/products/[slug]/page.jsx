import { getCategoryModel } from "@/app/models/Category";
import Image from "next/image";

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  await getCategoryModel();
  const Category = await getCategoryModel();

  let products = [];
  let categoryEntity = null;

  if (slug === "all-categories") {
    const allCategories = await Category.find({}).lean();
    products = allCategories.flatMap((category) => category?.products || []).flat();
  } else {
    categoryEntity = await Category.findOne({
      slug: { $regex: new RegExp(`^${slug}$`, "i") },
    }).lean();
    if (categoryEntity) {
      products = categoryEntity.products || [];
    }
  }

  return (
    <div>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id.toString()} className="mb-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="mt-2 object-cover"
              />
            ) : (
              <p className="mt-2 text-gray-500">No image available</p>
            )}
          </div>
        ))
      ) : (
        <p>No products found for {categoryEntity ? categoryEntity.title : "All Categories"}</p>
      )}
    </div>
  );
}