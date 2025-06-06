import React from "react";
import CategoryBand from "./components/categories/CategoryBand";
import ProductsList from "./components/ProductsList";
import { getProductModel } from "./models/Product";

export default async function Body() {
  const Product = await getProductModel();
  const products = await Product.find().lean();

  return (
    <>
      <CategoryBand />
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
          <ProductsList products={products} />
        </div>
      </div>
    </>
  );
}
