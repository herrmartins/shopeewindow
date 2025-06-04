import { getCategoryModel } from "@/app/models/Category";
import { getProductModel } from "@/app/models/Product";
import Image from "next/image";

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const Category = await getCategoryModel();
  const Product = await getProductModel();
  let products = [];

  let category = null;

  if (slug) {
    products = await Product.find({ categorySlug: slug }).lean();
    category = await Category.findOne({slug: slug}).lean();
  } else {
    products = await Product.find().lean();
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
        <p>
          Não há produtos{" "}
          {category ? category?.title : "para esta categoria..."}
        </p>
      )}
    </div>
  );
}
