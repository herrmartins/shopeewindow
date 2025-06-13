import { getCategoryModel } from "@/app/models/Category";
import { getProductModel } from "@/app/models/Product";
import ProductsGrid from "@/app/components/ProductsList";
import Pagination from "@/app/components/shared/Pagination";
import { getProducts } from "../../service/getProducts";

export default async function SearchResultsPage({
  params,
  searchParams,
  pageSize = 18,
}) {
  const { criteria } = await params;
  if (!criteria || criteria.trim() === "") return;

  const proccessedCriteria = decodeURIComponent(criteria ?? "");

  const sParams = await searchParams;
  const currentPage = parseInt(sParams?.page || "1", 10);
  const skip = (currentPage - 1) * pageSize;

  const category = "all-categories";

  const { products, total } = await getProducts({criteria: proccessedCriteria, skip});

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto px-4 text-center">
        <div className="flex justify-center">
          <ProductsGrid products={products} />
        </div>
      </div>

      <Pagination
        page={parseInt(currentPage)}
        pageSize={parseInt(pageSize)}
        totalItems={parseInt(total)}
        category={category}
      />
    </>
  );
}
