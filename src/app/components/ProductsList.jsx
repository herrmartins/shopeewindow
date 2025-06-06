import ProductCard from "../products/components/ProductCard";

function ProductsList({ products, category }) {
  return (
    <>
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
    </>
  );
}

export default ProductsList;
