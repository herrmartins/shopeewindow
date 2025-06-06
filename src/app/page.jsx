import CategoryBand from "./components/categories/CategoryBand";
import ProductsList from "./components/ProductsList";
import { getProductModel } from "./models/Product";
import Pagination from "./components/shared/Pagination";

export default async function Body({ searchParams, pageSize = 18 }) {
  const Product = await getProductModel();

  const total = await Product.countDocuments({});
  const currentPage = await searchParams.page || 1;
  const skip = (currentPage - 1) * pageSize;

  const products = await Product.find({}).skip(skip).lean().limit(pageSize);

  return (
    <>
      <CategoryBand />
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
          <ProductsList products={products} />
        </div>
      </div>
      <Pagination
        page={parseInt(currentPage)}
        pageSize={parseInt(pageSize)}
        totalItems={parseInt(total)}
      />
    </>
  );
}
