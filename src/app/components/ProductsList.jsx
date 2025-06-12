import ProductCard from "../products/components/ProductCard";

function ProductsGrid({ products, category }) {
  return (
    <>
      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id.toString()} {...product} />
          ))}
        </div>
      ) : (
        <p>
          Não há produtos {category ? category?.title : "para esta categoria..."}
        </p>
      )}
    </>
  );
}

export default ProductsGrid;
