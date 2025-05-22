"use client"
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';

function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All Categories';
  /* console.log('Search params category:', category); */

  const [displayedProducts, setDisplayedProducts] = useState([]);

  /* useEffect(() => {
    const filteredProducts = category === 'All Categories'
      ? products
      : products.filter((p) => p.category === category);
    setDisplayedProducts(filteredProducts);
  }, [category]); */

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{category}</h1>
      {displayedProducts.length > 0 ? (
        <ul>
          {displayedProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found for {category}</p>
      )}
    </div>
  );
}
export default ProductsPage;
